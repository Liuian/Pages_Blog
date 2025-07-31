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
    const langMatch = window.location.pathname.match(/\/Pages_Blog\/(en|zh|nl|de)\//); // 偵測當前語言碼
    const lang = langMatch ? langMatch[1] : "en"; // 預設語言為英文
    document.getElementById("home-link").href  = `/Pages_Blog/${lang}/`; // 動態更新連結
    document.getElementById("tools-link").href = `/Pages_Blog/${lang}/tools/`; // 動態更新連結
    document.getElementById("notes-link").href = `/Pages_Blog/${lang}/notes/`; // 動態更新連結
    document.getElementById("blog-link").href  = `/Pages_Blog/${lang}/blog/`; // 動態更新連結
    document.getElementById("about-link").href = `/Pages_Blog/${lang}/about`; // 動態更新連結
    const langSelect = document.getElementById('language-select'); // 語言選單初始化
    langSelect.value = `/${lang}/`; // 語言選單初始化
        // 語言變更時切換網址
    langSelect.addEventListener('change', function () {
        const selectedLang = this.value.replace(/\//g, ''); // e.g. "zh"
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(/\/Pages_Blog\/(en|zh|nl|de)\//, `/Pages_Blog/${selectedLang}/`); // 替換語言碼
        window.location.pathname = newPath; // 導向
    });
});
