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
    // const langSelect = document.getElementById('language-select');
    //     // Redirect on language change
    // langSelect.addEventListener('change', function () {
    //     const currentPath = window.location.pathname; // e.g. /pages-blog/en/tools/autohotkey
    //     const newLang = this.value.replace(/\//g, ''); // e.g. "zh" from "/zh/"   
    //     const newPath = currentPath.replace(/\/pages-blog\/(en|zh|nl|de)\//, `/pages-blog/${newLang}/`); // 替換語言碼
    //     window.location.pathname = newPath; // 導向新路徑
    // });
    //     // Auto-select current language in dropdown
    // const path = window.location.pathname;
    // if (path.includes("/pages-blog/zh/")) langSelect.value = "/zh/";
    // else if (path.includes("/pages-blog/nl/")) langSelect.value = "/nl/";
    // else if (path.includes("/pages-blog/de/")) langSelect.value = "/de/";
    // else langSelect.value = "/en/";

    // 偵測當前語言碼
    const langMatch = window.location.pathname.match(/\/pages-blog\/(en|zh|nl|de)\//);
    const lang = langMatch ? langMatch[1] : "en"; // 預設語言為英文

    // 動態更新連結
    document.getElementById("home-link").href  = `/pages-blog/${lang}/`;
    document.getElementById("tools-link").href = `/pages-blog/${lang}/tools/`;
    document.getElementById("notes-link").href = `/pages-blog/${lang}/notes/`;
    document.getElementById("blog-link").href  = `/pages-blog/${lang}/blog/`;
    document.getElementById("about-link").href = `/pages-blog/${lang}/about`;

    // 語言選單初始化
    const langSelect = document.getElementById('language-select');
    langSelect.value = `/${lang}/`;

    // 語言變更時切換網址
    langSelect.addEventListener('change', function () {
        const selectedLang = this.value.replace(/\//g, ''); // e.g. "zh"
        const currentPath = window.location.pathname;

        // 替換語言碼並導向
        const newPath = currentPath.replace(/\/pages-blog\/(en|zh|nl|de)\//, `/pages-blog/${selectedLang}/`);
        window.location.pathname = newPath;
    });
});
