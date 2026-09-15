// =====================================================
// LEÑA & SABOR
// Animaciones y efectos visuales
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("heroWrap");
    const stickyLogo = document.getElementById("logoSticky");

    // -------------------------------------------------
    // LOGO STICKY
    // -------------------------------------------------
    if (stickyLogo) {
        const updateStickyLogo = () => {
            // Si no existe hero, ocultamos el logo sticky
            if (!hero) {
                stickyLogo.classList.remove("show");
                return;
            }

            const heroBottom = hero.getBoundingClientRect().bottom;

            // Aparece cuando el hero ya salió de la pantalla
            if (heroBottom <= 80) {
                stickyLogo.classList.add("show");
            } else {
                stickyLogo.classList.remove("show");
            }
        };

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        updateStickyLogo();
                        ticking = false;
                    });

                    ticking = true;
                }
            },
            { passive: true }
        );

        // Estado inicial
        updateStickyLogo();
    }

    // -------------------------------------------------
    // ANIMACIONES AL HACER SCROLL
    // -------------------------------------------------
    // Solo se animan elementos que tengan
    // la clase .animate-on-scroll.
    //
    // Los demás elementos permanecen visibles
    // aunque el navegador no soporte IntersectionObserver.
    // -------------------------------------------------

    const animatedElements = document.querySelectorAll(
        ".animate-on-scroll"
    );

    if ("IntersectionObserver" in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        // Una vez visible, dejamos de observarlo
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        // Si IntersectionObserver no está disponible,
        // mostramos directamente los elementos.
        animatedElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // -------------------------------------------------
    // EFECTO SUAVE PARA ELEMENTOS CON .fade-in
    // -------------------------------------------------

    const fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        fadeElements.forEach((element) => {
            fadeObserver.observe(element);
        });
    } else {
        fadeElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // -------------------------------------------------
    // BOTÓN "EXPLORAR MENÚ"
    // -------------------------------------------------
    // Si el botón existe, intenta abrir el menú lateral.
    // -------------------------------------------------

    const exploreButton = document.querySelector(
        ".hero-button, #exploreMenu"
    );

    const navbar = document.getElementById("navbar");

    if (exploreButton && navbar) {
        exploreButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Si navbar.js ya controla el botón,
            // buscamos el botón hamburguesa y lo activamos.
            const navbarToggle = document.getElementById("navbarToggle");

            if (navbarToggle && !navbar.classList.contains("open")) {
                navbarToggle.click();
            }
        });
    }

    // -------------------------------------------------
    // EVITAR EFECTOS DE ANIMACIÓN SI EL USUARIO
    // PREFIERE MENOS MOVIMIENTO
    // -------------------------------------------------

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
        document.documentElement.classList.add("reduced-motion");
    }

    // Si el usuario cambia esta configuración mientras
    // la página está abierta.
    prefersReducedMotion.addEventListener?.("change", (event) => {
        if (event.matches) {
            document.documentElement.classList.add("reduced-motion");
        } else {
            document.documentElement.classList.remove("reduced-motion");
        }
    });
});