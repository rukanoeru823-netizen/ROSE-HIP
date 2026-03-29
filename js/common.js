  /*
    ===========================
    Hamburger Menu Control
    ===========================
    【目的】
    ・ハンバーガーボタンでSPメニューを開閉
    ・同時にボタンの見た目を × に変形

    【CSS連動】
    ・.hamburger.is-open
    ・.sp-menu.is-open
  */

document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector(".hamburger"); // ボタン
  const spMenu = document.querySelector(".sp-menu"); // SPメニュー本体

  if (!hamburger || !spMenu) return; // ← これだけ追加

  hamburger.addEventListener("click", () => {
    // ハンバーガー → ×（戻るボタン）へ切り替え
    hamburger.classList.toggle("is-open");

    // SPメニューを表示／非表示
    spMenu.classList.toggle("is-open");
  });

});
