document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // LEÑA & SABOR
    // Fondo animado de hojas
    // =====================================================

    const canvas = document.getElementById("leavesCanvas");

    // Si alguna página no tiene el canvas, no hacemos nada.
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }


    // =====================================================
    // CONFIGURACIÓN
    // =====================================================

    let width = 0;
    let height = 0;

    let leaves = [];

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    // =====================================================
    // CANTIDAD DE HOJAS SEGÚN DISPOSITIVO
    // =====================================================

    const getLeafCount = () => {

        if (prefersReducedMotion.matches) {
            return 0;
        }

        const screenWidth = window.innerWidth;

        // Celulares pequeños
        if (screenWidth <= 375) {
            return 8;
        }

        // Celulares
        if (screenWidth <= 480) {
            return 10;
        }

        // Tablets
        if (screenWidth <= 768) {
            return 14;
        }

        // Tablets horizontales / laptops pequeñas
        if (screenWidth <= 1024) {
            return 18;
        }

        // PC
        if (screenWidth <= 1440) {
            return 24;
        }

        // Monitores grandes
        return 30;
    };


    // =====================================================
    // AJUSTAR CANVAS
    // =====================================================

    const resizeCanvas = () => {

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        createLeaves();
    };


    // =====================================================
    // CREAR HOJAS
    // =====================================================

    const createLeaves = () => {

        leaves = [];

        const amount = getLeafCount();

        for (let i = 0; i < amount; i++) {

            leaves.push({
                x: Math.random() * width,
                y: Math.random() * height,

                size:
                    Math.random() * 7 + 4,

                speedY:
                    Math.random() * 0.45 + 0.15,

                speedX:
                    Math.random() * 0.5 - 0.25,

                rotation:
                    Math.random() * Math.PI * 2,

                rotationSpeed:
                    Math.random() * 0.015 - 0.0075,

                opacity:
                    Math.random() * 0.35 + 0.15,

                swing:
                    Math.random() * Math.PI * 2,

                swingSpeed:
                    Math.random() * 0.015 + 0.005
            });
        }
    };


    // =====================================================
    // DIBUJAR UNA HOJA
    // =====================================================

    const drawLeaf = (leaf) => {

        ctx.save();

        ctx.translate(
            leaf.x,
            leaf.y
        );

        ctx.rotate(
            leaf.rotation
        );

        ctx.globalAlpha =
            leaf.opacity;

        // Forma sencilla de hoja
        ctx.beginPath();

        ctx.moveTo(
            0,
            -leaf.size
        );

        ctx.bezierCurveTo(
            leaf.size,
            -leaf.size * 0.45,
            leaf.size,
            leaf.size * 0.65,
            0,
            leaf.size
        );

        ctx.bezierCurveTo(
            -leaf.size,
            leaf.size * 0.65,
            -leaf.size,
            -leaf.size * 0.45,
            0,
            -leaf.size
        );

        ctx.closePath();

        // Verde natural
        ctx.fillStyle = "#4CAF50";

        ctx.fill();

        // Nervadura
        ctx.beginPath();

        ctx.moveTo(
            0,
            -leaf.size * 0.7
        );

        ctx.lineTo(
            0,
            leaf.size * 0.7
        );

        ctx.strokeStyle =
            "rgba(255,255,255,0.20)";

        ctx.lineWidth = 0.7;

        ctx.stroke();

        ctx.restore();
    };


    // =====================================================
    // ACTUALIZAR HOJAS
    // =====================================================

    const updateLeaves = () => {

        leaves.forEach((leaf) => {

            leaf.y += leaf.speedY;

            leaf.swing +=
                leaf.swingSpeed;

            leaf.x +=
                leaf.speedX +
                Math.sin(leaf.swing) * 0.15;

            leaf.rotation +=
                leaf.rotationSpeed;


            // Si sale por abajo,
            // vuelve a aparecer arriba.

            if (leaf.y > height + leaf.size) {

                leaf.y =
                    -leaf.size;

                leaf.x =
                    Math.random() * width;
            }


            // Si sale por un lateral,
            // vuelve a entrar por el otro.

            if (leaf.x > width + leaf.size) {
                leaf.x = -leaf.size;
            }

            if (leaf.x < -leaf.size) {
                leaf.x = width + leaf.size;
            }

        });
    };


    // =====================================================
    // ANIMACIÓN
    // =====================================================

    let animationFrame = null;

    const animate = () => {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateLeaves();

        leaves.forEach(drawLeaf);

        animationFrame =
            requestAnimationFrame(animate);
    };


    // =====================================================
    // REDUCIR MOVIMIENTO
    // =====================================================

    const handleMotionPreference = () => {

        if (prefersReducedMotion.matches) {

            if (animationFrame) {
                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame = null;
            }

            leaves = [];

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

        } else {

            createLeaves();

            if (!animationFrame) {
                animate();
            }
        }
    };


    // =====================================================
    // EVENTOS
    // =====================================================

    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );

    prefersReducedMotion.addEventListener?.(
        "change",
        handleMotionPreference
    );


    // =====================================================
    // INICIALIZACIÓN
    // =====================================================

    resizeCanvas();

    if (!prefersReducedMotion.matches) {
        animate();
    }

});