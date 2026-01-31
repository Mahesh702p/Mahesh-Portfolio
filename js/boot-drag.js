// Boot Screen Elastic Drag
(function () {
    const boot = document.getElementById('boot-screen');
    if (!boot) return;

    let dragging = false, startX = 0, startY = 0, x = 0, y = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function canDrag(target) {
        // Block dragging on interactive elements
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.tagName === 'A') return false;
        if (target.closest('.neofetch-display') || target.closest('.boot-prompt-area')) return false;

        // Allow dragging on boot-screen or boot-content (the gap)
        const content = document.querySelector('.boot-content');
        return target === boot || target === content;
    }

    boot.addEventListener('mousedown', e => {
        if (!canDrag(e.target)) return;
        dragging = true;
        startX = e.clientX - x;
        startY = e.clientY - y;
        boot.style.cursor = 'grabbing';
        boot.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!dragging) return;
        x = e.clientX - startX;
        y = e.clientY - startY;
        boot.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        boot.style.cursor = '';

        // Smooth direct return (no overshoot)
        boot.style.transition = reducedMotion ? 'none' : 'transform 0.4s ease-out';
        boot.style.transform = '';
        x = y = 0;
    });

    // Show grab cursor on hover
    boot.addEventListener('mousemove', e => {
        if (!dragging) boot.style.cursor = canDrag(e.target) ? 'grab' : '';
    });

    // Touch support
    boot.addEventListener('touchstart', e => {
        const t = e.touches[0];
        if (!canDrag(e.target)) return;
        dragging = true;
        startX = t.clientX - x;
        startY = t.clientY - y;
        boot.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('touchmove', e => {
        if (!dragging) return;
        const t = e.touches[0];
        x = t.clientX - startX;
        y = t.clientY - startY;
        boot.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.addEventListener('touchend', () => {
        if (!dragging) return;
        dragging = false;
        boot.style.transition = reducedMotion ? 'none' : 'transform 0.4s ease-out';
        boot.style.transform = '';
        x = y = 0;
    });
})();
