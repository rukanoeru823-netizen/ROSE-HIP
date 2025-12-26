/* ===========================  共通  =========================== */

/*
  ===========================
  Splash Screen Control
  ===========================
  ・ページ読み込み完了後に実行
  ・ロゴアニメーションが終わったら
    splash に is-hidden を付けて消す
*/
window.addEventListener("load", () => {
  const splash = document.querySelector(".splash");

  setTimeout(() => {
    splash.classList.add("is-hidden");
  }, 2100);
});

/* =========================== header =========================== */

/*
  ===========================
  Hamburger Menu Control
  ===========================
  ・ボタンを押すたびに
    - ハンバーガーの形を変える
    - SPメニューを表示／非表示
*/
const hamburger = document.querySelector(".hamburger");
const spMenu = document.querySelector(".sp-menu");

hamburger.addEventListener("click", () => {
  // ×（戻るボタン）に変形
  hamburger.classList.toggle("is-open");

  // メニューを降ろす／戻す
  spMenu.classList.toggle("is-open");
});

/* ===========================  main  =========================== */

/*
  ===========================
  タイムラプス切り替え制御
  ===========================
  ・timelapse を順番にフェード切り替え
  ・動画は autoplay + loop に任せる
*/

const timelapses = document.querySelectorAll(".timelapse");
let current = 0;

// 最初の1枚だけ表示
timelapses[current].classList.add("is-active");

// 一定時間ごとに切り替え
setInterval(() => {
  // 今の表示を消す
  timelapses[current].classList.remove("is-active");

  // 次へ
  current = (current + 1) % timelapses.length;

  // 次を表示
  timelapses[current].classList.add("is-active");
}, 5000); // ← 1本あたりの表示時間（5秒）

/* ===========================
   Hero Text Sync Control
   ===========================
   ・SP / PC どちらの動画でも同期させる
   ・実際に再生されている video を使う
*/

const videos = document.querySelectorAll(".hero-video");
const texts = document.querySelectorAll(".hero-text");

const SCENE_TIME = 5; // 1シーン5秒

function getActiveVideo() {
  // 再生中の video を探す
  for (const video of videos) {
    if (!video.paused && !video.ended) {
      return video;
    }
  }
  return null;
}

function syncTextWithVideo() {
  const activeVideo = getActiveVideo();
  if (!activeVideo) {
    requestAnimationFrame(syncTextWithVideo);
    return;
  }

  const currentTime = activeVideo.currentTime;
  const sceneIndex = Math.floor(currentTime / SCENE_TIME) % texts.length;

  texts.forEach((text, index) => {
    text.classList.toggle("is-active", index === sceneIndex);
  });

  requestAnimationFrame(syncTextWithVideo);
}

// どちらかの動画が再生されたら同期開始
videos.forEach(video => {
  video.addEventListener("play", () => {
    requestAnimationFrame(syncTextWithVideo);
  });
});


/* ===========================  footer  =========================== */