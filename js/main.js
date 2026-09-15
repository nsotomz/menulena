document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // LEÑA & SABOR
    // Funciones generales del sitio
    // =====================================================

    // -----------------------------------------------------
    // AÑO AUTOMÁTICO DEL FOOTER
    // -----------------------------------------------------

    const currentYear = new Date().getFullYear();

    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = currentYear;
    });


    // -----------------------------------------------------
    // SCROLL SUAVE
    // -----------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    // -----------------------------------------------------
    // CERRAR MENÚ AL HACER CLICK EN UN ENLACE INTERNO
    // -----------------------------------------------------

    const navbar = document.getElementById("navbar");

    if (navbar) {
        const internalLinks = navbar.querySelectorAll(
            'a[href^="#"]'
        );

        internalLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
            });
        });
    }


    // -----------------------------------------------------
    // IMÁGENES
    // Evita problemas visuales cuando una imagen no carga.
    // -----------------------------------------------------

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });

    });


    // -----------------------------------------------------
    // ENLACES EXTERNOS
    // Instagram, TikTok, Google Maps, etc.
    // -----------------------------------------------------

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach((link) => {
        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );
    });


    // -----------------------------------------------------
    // BOTÓN VOLVER ARRIBA
    // -----------------------------------------------------

    const createBackToTop = () => {

        // Si ya existe, no creamos otro.
        if (document.getElementById("backToTop")) {
            return;
        }

        const button = document.createElement("button");

        button.id = "backToTop";
        button.className = "back-to-top";
        button.type = "button";
        button.setAttribute(
            "aria-label",
            "Volver arriba"
        );

        button.innerHTML = `
            <i class="fa-solid fa-arrow-up"></i>
        `;

        document.body.appendChild(button);

        const updateButton = () => {

            if (window.scrollY > 450) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }

        };

        window.addEventListener(
            "scroll",
            updateButton,
            { passive: true }
        );

        button.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        updateButton();
    };

    createBackToTop();


    // -----------------------------------------------------
    // PROTECCIÓN PARA PÁGINAS QUE NO TIENEN HERO
    // -----------------------------------------------------

    const hero = document.getElementById("heroWrap");

    if (hero) {
        document.body.classList.add("has-hero");
    } else {
        document.body.classList.add("no-hero");
    }


    // -----------------------------------------------------
    // DETECTAR TOUCH
    // -----------------------------------------------------

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        document.documentElement.classList.add(
            "touch-device"
        );
    }


    // -----------------------------------------------------
    // CARGA COMPLETA DE LA PÁGINA
    // -----------------------------------------------------

    window.addEventListener("load", () => {
        document.body.classList.add("page-loaded");
    });

});