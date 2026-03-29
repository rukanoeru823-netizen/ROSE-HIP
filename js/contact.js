/* ===========================
   Q&A トグル処理
   ・質問をクリックすると回答を開閉する
   ・同時に開くのは1つだけ
   ・▼アイコンも一緒に回転させる
=========================== */

// すべてのQ&Aアイテムを取得
const qaItems = document.querySelectorAll('.qa-item');

// 各Q&Aアイテムに対して処理を設定
qaItems.forEach(item => {
  // 質問ボタン（クリックされる部分）を取得
  const question = item.querySelector('.qa-question');

  // 質問がクリックされた時の処理
  question.addEventListener('click', () => {

    // まず、他のQ&Aをすべて閉じる
    qaItems.forEach(other => {
      // クリックされたもの以外は active を外す
      if (other !== item) {
        other.classList.remove('active');
      }
    });

    // クリックされたQ&Aだけを開閉（トグル）
    // ・閉じていれば開く
    // ・開いていれば閉じる
    item.classList.toggle('active');
  });
});

// ==========================
// Contact Form Ajax送信
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const modal = document.getElementById("thanksModal");
  const closeBtn = document.querySelector(".modal-close");
  const overlay = document.querySelector(".modal-overlay");
  const submitBtn = document.querySelector(".form-submit");

  if (!form) return;

  // フォーム送信
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ページ遷移を止める

    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          modal.classList.add("active");
          form.reset();
        } else {
          alert("送信に失敗しました。");
        }
      })
      .catch(() => {
        alert("通信エラーが発生しました。");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "送信する";
      });
  });

  // モーダル閉じる
  [closeBtn, overlay].forEach((el) => {
    el.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  });
});

