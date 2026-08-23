// 品牌切換管理器：處理 localStorage 持久化、URL query 指定、全站同步
// 使用 CustomEvent 讓各 Astro 元件（island 腳本）可以監聽品牌變化

export type BrandKey = 'kacha' | 'worm';

const STORAGE_KEY = 'wormbakery_brand';
const EVENT_NAME = 'brandchange';

function getStoredBrand(): BrandKey {
  if (typeof window === 'undefined') return 'kacha';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'worm' || stored === 'kacha' ? stored : 'kacha';
}

function getUrlBrand(): BrandKey | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const b = params.get('brand');
  return b === 'worm' || b === 'kacha' ? b : null;
}

export function getBrand(): BrandKey {
  return getUrlBrand() ?? getStoredBrand();
}

export function setBrand(brand: BrandKey) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, brand);
  // 更新 URL query 不刷新頁面
  const url = new URL(window.location.href);
  url.searchParams.set('brand', brand);
  window.history.replaceState({}, '', url.toString());
  // 觸發 DOM 更新
  document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { brand } }));
  document.documentElement.dataset.brand = brand;
}

export function onBrandChange(callback: (brand: BrandKey) => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ brand: BrandKey }>;
    callback(custom.detail.brand);
  };
  document.addEventListener(EVENT_NAME, handler);
  return () => document.removeEventListener(EVENT_NAME, handler);
}

// 初始化：頁面載入時設定 data-brand
export function initBrand() {
  if (typeof window === 'undefined') return;
  const brand = getBrand();
  document.documentElement.dataset.brand = brand;
  // 若 URL 有指定但 localStorage 沒有，同步到 localStorage
  const urlBrand = getUrlBrand();
  if (urlBrand && urlBrand !== getStoredBrand()) {
    localStorage.setItem(STORAGE_KEY, urlBrand);
  }
}
