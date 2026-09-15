document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const navbar = document.getElementById("navbar");
    const navbarToggle = document.getElementById("navbarToggle");
    const menuTrigger = document.querySelector(".menu-trigger");
    const menuDropdown = document.getElementById("menuDropdown");

    if (!navbar || !navbarToggle) {
        console.error("Navbar: no se encontraron los elementos principales.");
        return;
    }


    /* =====================================================
       CREAR OVERLAY SI NO EXISTE
    ====================================================== */

    let navbarOverlay = document.querySelector(".navbar-overlay");

    if (!navbarOverlay) {

        navbarOverlay = document.createElement("div");

        navbarOverlay.className = "navbar-overlay";

        document.body.appendChild(navbarOverlay);
    }


    /* =====================================================
       ABRIR / CERRAR NAVBAR
    ====================================================== */

    function openNavbar() {

        navbar.classList.add("open");

        navbarToggle.classList.add("active");

        navbarOverlay.classList.add("show");

        navbarToggle.setAttribute("aria-expanded", "true");

        navbarToggle.setAttribute("aria-label", "Cerrar menú");

        document.body.classList.add("navbar-open");

    }


    function closeNavbar() {

        navbar.classList.remove("open");

        navbarToggle.classList.remove("active");

        navbarOverlay.classList.remove("show");

        navbarToggle.setAttribute("aria-expanded", "false");

        navbarToggle.setAttribute("aria-label", "Abrir menú");

        document.body.classList.remove("navbar-open");

        closeMenu();

    }


    function toggleNavbar() {

        if (navbar.classList.contains("open")) {

            closeNavbar();

        } else {

            openNavbar();

        }

    }


    /* =====================================================
       BOTÓN HAMBURGUESA
    ====================================================== */

    navbarToggle.addEventListener("click", (event) => {

        event.preventDefault();

        event.stopPropagation();

        toggleNavbar();

    });


    /* =====================================================
       MENÚ PRINCIPAL
    ====================================================== */

    function openMenu() {

        if (!menuTrigger || !menuDropdown) {
            console.error("Navbar: no se encontró el menú desplegable.");
            return;
        }

        menuDropdown.classList.add("open");

        menuTrigger.classList.add("expanded");

        menuTrigger.setAttribute("aria-expanded", "true");

        const menuItem = menuTrigger.closest(".navbar-menu-item");

        if (menuItem) {
            menuItem.classList.add("menu-open");
        }

    }


    function closeMenu() {

        if (!menuTrigger || !menuDropdown) {
            return;
        }

        menuDropdown.classList.remove("open");

        menuTrigger.classList.remove("expanded");

        menuTrigger.setAttribute("aria-expanded", "false");

        const menuItem = menuTrigger.closest(".navbar-menu-item");

        if (menuItem) {
            menuItem.classList.remove("menu-open");
        }

    }


    function toggleMenu() {

        if (!menuTrigger || !menuDropdown) {
            return;
        }

        if (menuDropdown.classList.contains("open")) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    /* =====================================================
       BOTÓN MENÚ
    ====================================================== */

    if (menuTrigger) {

        menuTrigger.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleMenu();

        });

    }


    /* =====================================================
       ENLACES DEL SUBMENÚ
       Al seleccionar una categoría:
       - se cierra el navbar
       - se navega normalmente
    ====================================================== */

    if (menuDropdown) {

        const menuLinks = menuDropdown.querySelectorAll("a");

        menuLinks.forEach((link) => {

            link.addEventListener("click", () => {

                closeMenu();

                closeNavbar();

            });

        });

    }


    /* =====================================================
       OVERLAY
    ====================================================== */

    navbarOverlay.addEventListener("click", () => {

        closeNavbar();

    });


    /* =====================================================
       ENLACES PRINCIPALES
       NO OCULTAR INICIO
    ====================================================== */

    const navbarLinks = navbar.querySelectorAll(
        ".navbar-link:not(.menu-trigger)"
    );

    navbarLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeNavbar();

        });

    });


    /* =====================================================
       TECLA ESC
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (menuDropdown && menuDropdown.classList.contains("open")) {

                closeMenu();

            } else if (navbar.classList.contains("open")) {

                closeNavbar();

            }

        }

    });


    /* =====================================================
       EVITAR SCROLL DEL BODY CUANDO NAVBAR ESTÁ ABIERTO
    ====================================================== */

    function updateBodyScroll() {

        if (navbar.classList.contains("open")) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

    }


    const observer = new MutationObserver(updateBodyScroll);

    observer.observe(navbar, {
        attributes: true,
        attributeFilter: ["class"]
    });


    /* =====================================================
       INICIO
       SIEMPRE DEBE EXISTIR Y PERMANECER VISIBLE
    ====================================================== */

    const homeLink = navbar.querySelector('a[href="index.html"]');

    if (homeLink) {

        homeLink.style.display = "";

    }


    /* =====================================================
       ESTADO INICIAL
    ====================================================== */

    closeMenu();

    navbar.classList.remove("open");

    navbarToggle.classList.remove("active");

    navbarOverlay.classList.remove("show");

    navbarToggle.setAttribute("aria-expanded", "false");

});