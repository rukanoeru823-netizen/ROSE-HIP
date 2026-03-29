/* ===========================
   求人情報エリアタブボタン
=========================== */

document.querySelectorAll('.job-tabs').forEach(tabGroup => {
  const tabs = tabGroup.querySelectorAll('.job-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      const parentRole = tab.closest('.job-role');
      const contents = parentRole.querySelectorAll('.job-content');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      parentRole.querySelector('#' + tab.dataset.target).classList.add('active');
    });
  });
});


/* ===========================
   新人教育プログラムエリアタブボタン
=========================== */

document.querySelectorAll('.training-tab').forEach(tab => {
  tab.addEventListener('click', () => {

    const parent = tab.closest('.training-tabs');
    const tabs = parent.querySelectorAll('.training-tab');
    const contents = parent.querySelectorAll('.training-content-area');

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    parent.querySelector('#' + tab.dataset.target).classList.add('active');
  });
});

/* ===========================
   Career Model タブ
=========================== */
document.querySelectorAll('.career-tab').forEach(tab => {
  tab.addEventListener('click', () => {

    const parent = tab.closest('.career-tabs');
    const tabs = parent.querySelectorAll('.career-tab');
    const contents = parent.querySelectorAll('.career-content');

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    parent.querySelector('#' + tab.dataset.target).classList.add('active');
  });
});

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