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
        const isCollapsed = sidebar.classList.toggle("collapsed");
        toggleButton.classList.toggle("expanded", !isCollapsed); 
    });

    // Jump to top 功能
    const toTopBtn = document.createElement("button");
    toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    toTopBtn.className = "jump-top-btn";
    document.body.appendChild(toTopBtn);
    toTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 捲動到一定高度後顯示「Top」按鈕
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {toTopBtn.style.display = "block";} 
        else {toTopBtn.style.display = "none";}
    });

    // 語言切換
    const langSelect = document.getElementById('language-select');
        // Redirect on language change
    langSelect.addEventListener('change', function () {
        const selectedLangUrl = this.value;
        window.location.href = selectedLangUrl;
    });
        // Auto-select the current language based on URL
    const path = window.location.pathname;
    if (path.startsWith("/zh/")) langSelect.value = "/zh/";
    else if (path.startsWith("/nl/")) langSelect.value = "/nl/";
    else if (path.startsWith("/de/")) langSelect.value = "/de/";
    else langSelect.value = "/en/";
});
