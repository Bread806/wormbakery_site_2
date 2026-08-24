// Strudel 歌曲資料（讀取自 src/song/*.txt）
//
// ⚠️ 約定：每首歌的 code 必須以「單一運算式」結尾（如 stack(...)），
// 因為 MiniStrudelPlayer 會在尾端串接 .gain(音量) 再 evaluate——
// transpiler 只會對最後一個運算式敘述做 return，若以宣告或註解結尾會壞。

export interface Song {
  id: string;
  title: string;
  code: string;  // Strudel 程式碼
  disabled?: boolean;  // true = 不匯出至播放器（保留 code 以便日後修復）
}

// 完整歌曲清單（含暫時停用的曲目）
const ALL_SONGS: Song[] = [
  {
    id: 'vibe',
    title: 'Vibe',
    code: `setcpm(38)
let chords = chord("<Dm7 G7>/4").dict('ireal')

stack(
  // DRUMS
  stack(
  s("909bd").struct("x*<1 2> ~ <[~@2 x] x> ~"),
  s("~ [909rim, 909sd:<2 3>]").room("<.1 .2>"),
  n("[0 0] <0 3>*<2!3 4>").s("909hh"),
  ).mask("<1 1 1 0>/4").gain(1),

  stack(
    s("rm:3").gain(.5).room(.6).sustain(.8),
    s("~ ~ 909hh ~").gain(.3),
  ).mask("<0 0 0 1>/4"),

  chords.voicing().s("gm_epiano1:6")
  .phaser("<2 3>")
  .gain(".8")
  .delay(.5)
  .room(.5),

  chords.offset(-2).voicing().s("gm_acoustic_bass:4")
  .struct("<~ x> ~ x ~ ~ x ~ ~")
  .gain(.4)
  .room(.2)
  .lpf("500 800"),
)`,
  },
  {
    // 暫時停用：sax 音色待實聽確認後再開放（移除 disabled: true 即可恢復）
    id: '4bar_sax',
    title: '4bar Sax',
    disabled: true,
    code: `// City-Pop 完整版（100 BPM）
// 結構：前 2 小節完整 → 第 3 小節留白 → 第 4 小節全回來（4 小節循環）
setcpm(100/4);

const cityChords = "< F^7 Em7 Dm7 C^7 >";

const drums = stack(
  s("909bd*4").mask("<1 1 0 1>"),
  s("~ 909sd ~ 909sd").gain(0.9).mask("<1 1 0 1>"),
  s("909hh*8").gain("0.6 0.4 0.7 0.4").mask("<1 1 1 1>"),
  s("~ [~ 909oh] ~ ~").gain(0.5).mask("<0 0 1 0>")
);

const bass = chord(cityChords)
  .rootNotes(2)
  .struct("x [~ x] x [x ~]")
  .s("sawtooth")
  .lpf(800).lpenv(3).decay(0.18).sustain(0.1).gain(0.95)
  .mask("<1 1 0 1>");

const sax = n("<0 [7 4] [9 [7 4]] [2 [4 2]]>")
  .scale("F:major")
  .struct("x [~ x] [x x ~ x] [x@1.5 ~ x@0.5]")
  .s("gm_tenor_sax")
  .legato(0.9).attack(0.04).release(0.35)
  .room(0.3).delay(0.25).delaytime(0.28).gain(1.0)
  .mask("<1 1 0 1>");

const guitar = chord(cityChords)
  .dict("ireal").anchor("C3").voicing()
  .struct("x [x x] x [x x]")
  .s("gm_acoustic_guitar_nylon")
  .room(0.2).gain(0.45)
  .mask("<0 0 0 1>");

const pad = chord(cityChords)
  .dict("ireal").anchor("C4").voicing()
  .struct("x ~ ~ x")
  .s("sawtooth").lpf(1200).release(1.5).gain(0.45)
  .mask("<1 1 0 1>");

const embellishment = n("7 9 11 12")
  .scale("F:major")
  .struct("~ ~ ~ [x*2]")
  .s("gm_glockenspiel").room(0.6)
  .off(1/8, x => x.add(note(12)).gain(0.4))
  .mask("<1 1 1 1>");

stack(drums, bass, sax, guitar, pad, embellishment)`,
  },
];

// 匯出給播放器使用的曲目（過濾掉 disabled）
export const SONGS: Song[] = ALL_SONGS.filter((s) => !s.disabled);
