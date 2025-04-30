document.addEventListener("DOMContentLoaded", function () {
    // 初始化 tocbot
    tocbot.init({
        tocSelector: '.js-toc',
        contentSelector: '.js-toc-content',
        headingSelector: 'h1, h2, h3, h4, h5, h6',
        hasInnerContainers: true,
        collapseDepth: 6,
        scrollSmooth: true,
        orderedList: false,
    });

    // 切換 TOC 側邊欄顯示
    const toggleButton = document.getElementById("toggle-sidebar");
    const sidebar = document.querySelector(".sidebar");

    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    // Jump to top 功能
    const toTopBtn = document.createElement("button");
    toTopBtn.textContent = "↑ Top";
    toTopBtn.className = "jump-top-btn";
    document.body.appendChild(toTopBtn);

    toTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Back to home 功能（只有在不是首頁時顯示）
    if (window.location.pathname !== "/pages-blog/" && window.location.pathname !== "/pages-blog/index.html") {
        const backHomeLink = document.createElement("a");
        backHomeLink.textContent = "← 🏠︎ ";
        backHomeLink.href = "https://liuian.github.io/pages-blog/";
        backHomeLink.className = "back-home-link";
        document.body.appendChild(backHomeLink);
    }

    // 捲動到一定高度後顯示「Top」按鈕
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    });
});
