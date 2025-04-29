tocbot.init({
tocSelector: '.js-toc',
contentSelector: '.js-toc-content',
headingSelector: 'h1, h2, h3, h4, h5, h6',
collapseDepth: 6,
scrollSmooth: true,
orderedList: false,
});

// 切換側邊欄顯示 / 隱藏
document.getElementById('toggle-sidebar').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('collapsed');
});