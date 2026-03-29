/* ===========================  共通  =========================== */

/*
  ===========================
  Splash Screen Control
  ===========================
  【目的】
  ・ページ読み込み直後にスプラッシュを表示
  ・ロゴの落下＆バウンドアニメーション完了後に
    サブテキスト（HAIR & TOTAL BEAUTY）を表示
  ・最終的にスプラッシュ全体をフェードアウト
*/

window.addEventListener("load", () => {
  // スプラッシュ要素取得
  const splash = document.querySelector(".splash");

  // ロゴ下に表示するサブテキスト（HAIR & TOTAL BEAUTY）
  const splashSub = document.querySelector(".splash-sub");

  // ロゴ着地後にサブテキストを表示
  setTimeout(() => {
    splashSub.classList.add("is-visible");
  }, 2000);

  // ロゴアニメーション完了後にスプラッシュを非表示
  setTimeout(() => {
    splash.classList.add("is-hidden");
  }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {

  /*
    ===========================
    Hero Text Sync Control
    ===========================
    【目的】
    ・再生中の動画時間に合わせて
      ヒーローテキストを同期表示

    【ポイント】
    ・SP / PC 両方の video に対応
    ・実際に「再生中」の video を判定
    ・requestAnimationFrame で常時同期
  */

  const videos = document.querySelectorAll(".hero-video"); // ヒーロー動画
  const texts = document.querySelectorAll(".hero-text");   // ヒーローテキスト

  if (!videos.length || !texts.length) return; // ← 外側ガードだけ追加

  const SCENE_TIME = 5; // 1シーンの長さ（秒）

  /*
    再生中の video を取得
    ・paused / ended を見て判定
  */
  function getActiveVideo() {
    for (const video of videos) {
      if (!video.paused && !video.ended) {
        return video;
      }
    }
    return null;
  }

  /*
    動画の currentTime に応じて
    表示するテキストを切り替える
  */
  function syncTextWithVideo() {
    const activeVideo = getActiveVideo();

    if (!activeVideo) {
      requestAnimationFrame(syncTextWithVideo);
      return;
    }

    const currentTime = activeVideo.currentTime;
    const sceneIndex =
      Math.floor(currentTime / SCENE_TIME) % texts.length;

    texts.forEach((text, index) => {
      text.classList.toggle("is-active", index === sceneIndex);
    });

    requestAnimationFrame(syncTextWithVideo);
  }

  /*
    動画が再生されたタイミングで
    テキスト同期処理をスタート
  */
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      requestAnimationFrame(syncTextWithVideo);
    });
  });

});


document.addEventListener("DOMContentLoaded", () => {

  /*
    ===========================
    Footer Toggle Control
    ===========================
    【目的】
    ・ヒーロー下の誘導アイコンをタップして
      フッターをスライドイン表示
    ・フッター内の close 操作、または
      ハンバーガーメニュー操作時にフッターを閉じる

    【CSS連動】
    ・.footer.is-active
      → transform: translateY(0);
  */

  /* フッターを開くトリガー（ヒーロー下の矢印アイコン） */
  const btn = document.querySelector(".hero-icon-area");

  /* フッター本体 */
  const footer = document.querySelector(".footer");

  /* フッター内の close エリア */
  const footerClose = document.querySelector(".footer-close-area");

  /* ハンバーガーボタン（SPメニュー操作検知用） */
  const hamburgers = document.querySelector(".hamburger");

  if (!btn || !footer || !footerClose || !hamburgers) return;

  /*
    フッターを開く
    ・hero-icon-area をタップした時
  */
  btn.addEventListener("click", () => {
    footer.classList.add("is-active");
  });

  /*
    フッターを閉じる
    ・フッター内 close エリアをタップした時
  */
  footerClose.addEventListener("click", () => {
    footer.classList.remove("is-active");
  });

  /*
    フッターを閉じる
    ・ハンバーガーメニュー操作時
    （SPメニューとフッターの同時表示防止）
  */
  hamburgers.addEventListener("click", () => {
    footer.classList.remove("is-active");
  });

});
