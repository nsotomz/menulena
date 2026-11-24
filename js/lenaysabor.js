/* =========================================================
   LEÑA & SABOR — comportamiento del menú
   - Barra de categorías que marca la sección actual
   - Cambio a modo noche al llegar al "Menú de noche"
   - Bombillos colgantes
   - Marco vacío cuando una foto no existe
========================================================= */

(function () {

    "use strict";

    var root = document.documentElement;
    var barra = document.querySelector(".categorias");
    var noche = document.getElementById("noche");
    var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[href^='#']"));
    var secciones = chips
        .map(function (chip) { return document.querySelector(chip.getAttribute("href")); })
        .filter(Boolean);


    /* ---------- Fotos faltantes: mostrar marco con el logo ---------- */

    document.querySelectorAll(".producto-foto img").forEach(function (img) {
        var marcar = function () {
            img.parentElement.classList.add("sin-foto");
            img.remove();
        };
        if (img.complete && img.naturalWidth === 0) {
            marcar();
        } else {
            img.addEventListener("error", marcar);
        }
    });


    /* ---------- Altura de la barra (para los bombillos y anclas) ---------- */

    var medirBarra = function () {
        if (barra) {
            root.style.setProperty("--bar-h", barra.offsetHeight + "px");
        }
    };


    /* ---------- Bombillos ---------- */

    var contenedor = document.getElementById("bombillos");
    var colores = ["#FFD27A", "#FFB347", "#FFF0C2", "#FFC15E"];
    var anchoAnterior = 0;

    var crearBombillos = function () {

        if (!contenedor) {
            return;
        }

        var W = root.clientWidth;

        if (W === anchoAnterior) {
            return;
        }

        anchoAnterior = W;
        contenedor.innerHTML = "";

        var ns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", W);
        svg.setAttribute("height", 110);
        contenedor.appendChild(svg);

        var pequeno = W < 600;
        var tramo = pequeno ? Math.max(150, W / 2.4) : Math.min(300, Math.max(200, W / 4.5));
        var caida = pequeno ? 22 : 30;
        var porTramo = pequeno ? 4 : 5;
        var puntos = [];

        for (var x0 = -tramo * 0.3; x0 < W; x0 += tramo) {

            var x1 = x0 + tramo;
            var medio = (x0 + x1) / 2;
            var cy = caida * 2;

            var cable = document.createElementNS(ns, "path");
            cable.setAttribute("class", "cable");
            cable.setAttribute("d", "M " + x0 + " 0 Q " + medio + " " + cy + " " + x1 + " 0");
            svg.appendChild(cable);

            for (var k = 0; k < porTramo; k++) {
                var t = (k + 0.5) / porTramo;
                var x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * medio + t * t * x1;
                var y = 2 * (1 - t) * t * cy;
                if (x > 6 && x < W - 6) {
                    puntos.push({ x: x, y: y });
                }
            }
        }

        puntos.forEach(function (p, i) {
            var b = document.createElement("span");
            b.className = "bombillo";
            b.style.left = p.x + "px";
            b.style.top = (p.y - 1) + "px";
            b.style.setProperty("--c", colores[i % colores.length]);
            b.style.setProperty("--d", ((p.x / W) * 0.9).toFixed(2) + "s");
            b.style.setProperty("--sw", (3 + Math.random() * 3).toFixed(2) + "s");
            b.style.setProperty("--tw", (1.4 + Math.random() * 2).toFixed(2) + "s");
            b.appendChild(document.createElement("i"));
            contenedor.appendChild(b);
        });
    };


    /* ---------- Scroll: modo noche + categoría activa ---------- */

    var chipActivo = null;

    var activarChip = function (chip) {

        if (chip === chipActivo) {
            return;
        }

        if (chipActivo) {
            chipActivo.classList.remove("activo");
            chipActivo.removeAttribute("aria-current");
        }

        chipActivo = chip;

        if (chip) {
            chip.classList.add("activo");
            chip.setAttribute("aria-current", "true");

            // Mantener visible el chip activo en la barra (celular)
            var lista = chip.closest(".categorias-lista");
            if (lista) {
                var izq = chip.offsetLeft - lista.clientWidth / 2 + chip.clientWidth / 2;
                lista.scrollTo({ left: izq, behavior: "smooth" });
            }
        }
    };

    var revisar = function () {

        // Modo noche cuando el bloque de noche llega a la mitad de la pantalla
        if (noche) {
            var esNoche = noche.getBoundingClientRect().top < window.innerHeight * 0.55;
            root.classList.toggle("es-noche", esNoche);
        }

        // Categoría activa
        var limite = (barra ? barra.offsetHeight : 0) + 90;
        var actual = null;

        secciones.forEach(function (sec, i) {
            if (sec.getBoundingClientRect().top <= limite) {
                actual = chips[i];
            }
        });

        // Al final de la página, marcar la última categoría
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            actual = chips[chips.length - 1];
        }

        activarChip(actual);
    };

    var pendiente = false;

    window.addEventListener("scroll", function () {
        if (!pendiente) {
            pendiente = true;
            requestAnimationFrame(function () {
                pendiente = false;
                revisar();
            });
        }
    }, { passive: true });

    var temporizador;

    window.addEventListener("resize", function () {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () {
            medirBarra();
            crearBombillos();
            revisar();
        }, 150);
    });

    medirBarra();
    crearBombillos();
    revisar();

})();
