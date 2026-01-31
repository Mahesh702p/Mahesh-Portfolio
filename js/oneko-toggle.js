// Oneko toggle wrapper
(function () {
    let onekoEnabled = false;
    let onekoElement = null;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'oneko-toggle';
    // Sprite is added via CSS ::before pseudo-element
    toggleBtn.setAttribute('aria-label', 'Toggle oneko cat');

    function toggleOneko() {
        onekoEnabled = !onekoEnabled;

        if (onekoEnabled) {
            toggleBtn.classList.add('active');
            loadOneko();
            return "Oneko cat enabled! Watch it follow your cursor.";
        } else {
            toggleBtn.classList.remove('active');
            removeOneko();
            return "Oneko cat disabled.";
        }
    }

    window.toggleOneko = toggleOneko;

    toggleBtn.addEventListener('click', toggleOneko);

    const navContent = document.querySelector('.navbar-content');
    if (navContent) {
        navContent.insertBefore(toggleBtn, navContent.firstChild);
    } else {
        document.body.appendChild(toggleBtn);
    }

    function loadOneko() {
        if (onekoElement) return; // Already loaded

        // Load the actual oneko script
        const script = document.createElement('script');
        script.src = 'js/oneko-cat.js';
        script.onload = function () {
            onekoElement = document.getElementById('oneko');
        };
        document.body.appendChild(script);
    }

    function removeOneko() {
        const neko = document.getElementById('oneko');
        if (neko) {
            neko.remove();
            onekoElement = null;
        }
    }
})();
