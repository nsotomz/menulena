document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const navbarToggle = document.getElementById("navbarToggle");
    const menuTrigger = document.getElementById("menuTrigger");
    const menuDropdown = document.getElementById("menuDropdown");

    if (!navbar || !navbarToggle) {
        return;
    }


    /* =========================================
       OVERLAY
    ========================================= */

    let overlay = document.querySelector(".navbar-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "navbar-overlay";
        document.body.appendChild(overlay);
    }


    /* =========================================
       ICONO DEL BOTÓN
    ========================================= */

    const toggleIcon = navbarToggle.querySelector("i");


    /* =========================================
       ABRIR NAVBAR
    ========================================= */

    function openNavbar() {

        navbar.classList.add("open");
        overlay.classList.add("show");
        navbarToggle.classList.add("active");

        document.body.classList.add("navbar-open");

        if (toggleIcon) {
            toggleIcon.classList.remove("fa-bars");
            toggleIcon.classList.add("fa-xmark");
        }

        navbarToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );

        navbarToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    /* =========================================
       CERRAR NAVBAR
    ========================================= */

    function closeNavbar() {

        navbar.classList.remove("open");
        overlay.classList.remove("show");
        navbarToggle.classList.remove("active");

        document.body.classList.remove("navbar-open");

        if (toggleIcon) {
            toggleIcon.classList.remove("fa-xmark");
            toggleIcon.classList.add("fa-bars");
        }

        navbarToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        navbarToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    /* =========================================
       ABRIR / CERRAR CON BOTÓN
    ========================================= */

    navbarToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        if (navbar.classList.contains("open")) {
            closeNavbar();
        } else {
            openNavbar();
        }

    });


    /* =========================================
       SUBMENÚ "MENÚ"
    ========================================= */

    if (menuTrigger && menuDropdown) {

        menuTrigger.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                menuDropdown.classList.contains("open");

            menuDropdown.classList.toggle("open");

            menuTrigger.classList.toggle(
                "expanded",
                !isOpen
            );

            menuTrigger.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    }


    /* =========================================
       CERRAR AL SELECCIONAR UN ENLACE
    ========================================= */

    const navbarLinks = document.querySelectorAll(
        ".navbar a"
    );

    navbarLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeNavbar();

        });

    });


    /* =========================================
       CERRAR AL TOCAR EL OVERLAY
    ========================================= */

    overlay.addEventListener("click", () => {

        closeNavbar();

    });


    /* =========================================
       CERRAR CON ESC
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navbar.classList.contains("open")) {
                closeNavbar();
            }

        }

    });


    /* =========================================
       EVITAR QUE UN CLICK DENTRO DEL NAVBAR
       CIERRE EL MENÚ
    ========================================= */

    navbar.addEventListener("click", (event) => {

        event.stopPropagation();

    });


    /* =========================================
       CAMBIO DE TAMAÑO DE PANTALLA
       
       Si se pasa de móvil/tablet a escritorio
       o viceversa, mantenemos un estado limpio.
    ========================================= */

    let lastWidth = window.innerWidth;

    window.addEventListener("resize", () => {

        const currentWidth = window.innerWidth;

        /*
         * Evitamos recalcular constantemente.
         * Solo actuamos cuando realmente cambia
         * el ancho de la ventana.
         */
        if (currentWidth !== lastWidth) {

            lastWidth = currentWidth;

            /*
             * Si cambia mucho el tamaño de pantalla,
             * cerramos el menú para evitar estados
             * visuales incorrectos.
             */
            if (navbar.classList.contains("open")) {

                closeNavbar();

            }

        }

    });


    /* =========================================
       ORIENTACIÓN DEL DISPOSITIVO
    ========================================= */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(() => {

                closeNavbar();

            }, 150);

        }
    );


    /* =========================================
       ESTADO INICIAL
    ========================================= */

    navbarToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    navbarToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );

});