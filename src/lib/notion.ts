/**
 * Notion 資料層 — 年度委託燈號
 *
 * 為什麼用原生 fetch 而非 @notionhq/client：
 * 本站是純靜態 SSG，Notion 資料只在 build 時抓一次；
 * SDK 的型別與 helper 對單一 query endpoint 是不必要的依賴重量。
 */

export type MonthStatus = 'inquire' | 'busy';

export interface MonthLight {
  /** 1–12 */
  month: number;
  count: number;
  status: MonthStatus;
}

export interface YearLights {
  year: number;
  months: MonthLight[];
  /** build 當下的時間戳，頁面上標示資料新舊用 */
  syncedAt: string;
}

/** 每月委託數達此門檻即視為 busy（滿檔） */
const BUSY_THRESHOLD = 2;

// CI 未設定 secret 時會是空字串而非 undefined，故用 || 而非 ??
const DATA_SOURCE_ID =
  import.meta.env.NOTION_DATA_SOURCE_ID || '29b5ce63-0ed3-802e-bfc9-000b819da06c';

// Notion-Version 必須 >= 2025-09-03 才有 /data_sources/{id}/query endpoint
const NOTION_VERSION = '2025-09-03';
/** 工作紀錄中代表「動工日」的 date 屬性名稱 */
const DATE_FIELD = '動工時間';

type QueryResponse = {
  results: Array<{
    properties?: Record<string, { date?: { start?: string } | null } | undefined>;
  }>;
  has_more: boolean;
  next_cursor: string | null;
};

/** 以台北時區取「今天」的年/月——網站受眾在台灣，避免 UTC runner 在跨月交界判錯月份 */
export function getTaipeiToday(): { year: number; month: number } {
  const now = new Date();
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    Number(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', ...options }).format(now));
  return { year: fmt({ year: 'numeric' }), month: fmt({ month: '2-digit' }) };
}

/**
 * 查詢 Notion 並回傳 { "YYYY-MM": 件數 }。
 * 容錯降級原則：沒 token / API 掛掉 / 逾時都只 warn 不 throw，
 * 因為燈號只是輔助資訊，絕不能讓整個站 build 失敗。
 */
async function fetchMonthCounts(): Promise<Record<string, number>> {
  const token = import.meta.env.NOTION_TOKEN;
  if (!token) {
    console.warn('[notion] NOTION_TOKEN 未設定，燈號全部回退為 inquire');
    return {};
  }

  const endpoint = `https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`;
  const counts: Record<string, number> = {};
  let cursor: string | null = null;

  try {
    do {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
        // 寧可降級也不要讓 build 卡死等 Notion
        signal: AbortSignal.timeout(15_000),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      }

      const data = (await res.json()) as QueryResponse;
      for (const record of data.results) {
        const start = record.properties?.[DATE_FIELD]?.date?.start;
        // 沒填動工時間的紀錄不屬於任何月份，跳過
        if (!start) continue;
        const monthKey = start.slice(0, 7); // "2026-08-21" -> "2026-08"
        counts[monthKey] = (counts[monthKey] ?? 0) + 1;
      }
      cursor = data.has_more ? data.next_cursor : null;
    } while (cursor);
  } catch (err) {
    console.warn('[notion] 查詢失敗，燈號全部回退為 inquire：', err);
    return {};
  }

  return counts;
}

/**
 * 由委託數推導燈號（兩態：inquire / busy）。刻意設計成純函式，
 * 日後若要加第三態或手動覆寫，只需在呼叫端先查覆寫表再 fallback 到這裡。
 */
function deriveStatus(count: number): MonthStatus {
  return count >= BUSY_THRESHOLD ? 'busy' : 'inquire';
}

/** 給燈號表用的年度資料：當前曆年 1–12 月，每月件數與燈號 */
export async function getYearLights(): Promise<YearLights> {
  const { year } = getTaipeiToday();
  const counts = await fetchMonthCounts();

  const months: MonthLight[] = Array.from({ length: 12 }, (_, i) => {
    const key = `${year}-${String(i + 1).padStart(2, '0')}`;
    const count = counts[key] ?? 0;
    return { month: i + 1, count, status: deriveStatus(count) };
  });

  return { year, months, syncedAt: new Date().toISOString() };
}
