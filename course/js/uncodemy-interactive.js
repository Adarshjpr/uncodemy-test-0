/* ==========================================================================
   UNCODEMY — INTERACTIVE LAYER
   --------------------------------------------------------------------------
   Dependency-free (no jQuery, no Bootstrap, no carousel library). Powers:
     1. Lucide icon rendering
     2. Learning Hub — main tabs + panels
     3. Learning Hub — horizontal carousels (arrows, dots, swipe, resize)
     4. Learning Hub — classroom filter pills (Weekdays / Weekend / Offline / Online)
     5. Tools & Technologies — infinite single-row marquee with touch swipe
     6. Program Details — click-to-load YouTube player with a 3-video playlist
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------------- utils */
    function each(list, fn) {
        Array.prototype.forEach.call(list || [], fn);
    }

    function drawIcons() {
        if (!window.lucide || typeof window.lucide.createIcons !== 'function') return;
        try {
            window.lucide.createIcons();
        } catch (e) { /* icons are decorative — never break the page for them */ }
    }

    /* ======================================================================
       1. CAROUSEL
       A viewport that scrolls horizontally one page at a time. The slide
       width comes from CSS (--lh-per-view), so the row can never wrap.
       ====================================================================== */
    function Carousel(root) {
        var viewport = root.querySelector('[data-hub-viewport]');
        var track = root.querySelector('[data-hub-track]');
        var prev = root.querySelector('[data-hub-prev]');
        var next = root.querySelector('[data-hub-next]');
        var dotsBox = root.querySelector('[data-hub-dots]');
        var controls = root.querySelector('[data-hub-controls]');
        if (!viewport || !track) return null;

        var slides = track.children;
        var pages = 1;
        var page = 0;
        var stride = 0; /* px the viewport travels for one page */

        function pageWidth() {
            return stride || viewport.clientWidth || 1;
        }

        function measure() {
            /* hidden panels report 0 — leave the last good numbers alone */
            if (!viewport.clientWidth || !slides.length) return false;

            var slideWidth = slides[0].getBoundingClientRect().width;
            var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
            if (!slideWidth) return false;

            /* how many whole slides sit in the viewport right now */
            var perView = Math.max(1, Math.round((viewport.clientWidth + gap) / (slideWidth + gap)));
            perView = Math.min(perView, slides.length);

            stride = perView * (slideWidth + gap);
            pages = Math.max(1, Math.ceil(slides.length / perView));
            return true;
        }

        function buildDots() {
            if (!dotsBox) return;
            dotsBox.innerHTML = '';
            if (pages < 2) return;
            for (var i = 0; i < pages; i++) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'learning-hub-dot' + (i === page ? ' is-active' : '');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.setAttribute('data-hub-dot', String(i));
                dotsBox.appendChild(dot);
            }
        }

        function paint() {
            if (controls) {
                if (pages < 2) controls.setAttribute('hidden', '');
                else controls.removeAttribute('hidden');
            }
            if (prev) prev.disabled = page <= 0;
            if (next) next.disabled = page >= pages - 1;
            if (dotsBox) {
                each(dotsBox.children, function (dot, i) {
                    dot.classList.toggle('is-active', i === page);
                    dot.setAttribute('aria-selected', i === page ? 'true' : 'false');
                });
            }
        }

        function goTo(index) {
            page = Math.max(0, Math.min(pages - 1, index));
            var left = page * pageWidth();
            if (typeof viewport.scrollTo === 'function') {
                viewport.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
            } else {
                viewport.scrollLeft = left;
            }
            paint();
        }

        function syncFromScroll() {
            var max = track.scrollWidth - viewport.clientWidth;
            var current = max > 0 && viewport.scrollLeft >= max - 2
                ? pages - 1
                : Math.round(viewport.scrollLeft / pageWidth());
            if (current !== page) {
                page = Math.max(0, Math.min(pages - 1, current));
            }
            paint();
        }

        function refresh() {
            if (!measure()) return;
            if (page > pages - 1) page = pages - 1;
            buildDots();
            paint();
        }

        if (prev) prev.addEventListener('click', function () { goTo(page - 1); });
        if (next) next.addEventListener('click', function () { goTo(page + 1); });

        if (dotsBox) {
            dotsBox.addEventListener('click', function (event) {
                var dot = event.target.closest ? event.target.closest('[data-hub-dot]') : null;
                if (!dot) return;
                goTo(parseInt(dot.getAttribute('data-hub-dot'), 10) || 0);
            });
        }

        var scrollTimer = null;
        viewport.addEventListener('scroll', function () {
            if (scrollTimer) window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(syncFromScroll, 90);
        }, { passive: true });

        /* keyboard support on the scroller itself */
        viewport.setAttribute('tabindex', '0');
        viewport.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') { event.preventDefault(); goTo(page + 1); }
            else if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(page - 1); }
        });

        refresh();

        return {
            refresh: refresh,
            slideCount: slides.length
        };
    }

    /* ======================================================================
       2. LEARNING HUB — tabs, panels, schedule pills
       ====================================================================== */
    function initLearningHub() {
        var hub = document.querySelector('[data-learning-hub]');
        if (!hub) return;

        var carousels = [];
        each(hub.querySelectorAll('[data-hub-carousel]'), function (node) {
            var instance = Carousel(node);
            if (instance) {
                carousels.push(instance);
                node.__ucCarousel = instance;
            }
        });

        function refreshWithin(container) {
            each(container.querySelectorAll('[data-hub-carousel]'), function (node) {
                if (node.__ucCarousel) node.__ucCarousel.refresh();
            });
        }

        function revealWithin(container) {
            each(container.querySelectorAll('[data-reveal]'), function (el) {
                el.classList.add('is-revealed');
            });
        }

        /* ---------- main tabs ---------- */
        var tabs = hub.querySelectorAll('button[data-hub-tab]');
        var panels = hub.querySelectorAll('div.learning-hub-panel');

        function activateTab(tab, focusIt) {
            if (!tab) return;
            var targetId = tab.getAttribute('data-hub-tab');

            each(tabs, function (btn) {
                var on = btn === tab;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-selected', on ? 'true' : 'false');
                btn.setAttribute('tabindex', on ? '0' : '-1');
            });

            each(panels, function (panel) {
                var on = panel.id === targetId;
                panel.classList.toggle('is-active', on);
                if (on) {
                    panel.removeAttribute('hidden');
                    revealWithin(panel);
                    /* the panel had no width while hidden — remeasure now */
                    refreshWithin(panel);
                    window.setTimeout(function () { refreshWithin(panel); }, 60);
                } else {
                    panel.setAttribute('hidden', '');
                }
            });

            /* keep the active tab visible in the scrolling tab bar,
               without moving the page itself */
            if (tab.scrollIntoView) {
                try {
                    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                } catch (e) { /* older browsers ignore the options object */ }
            }
            if (focusIt) tab.focus();
        }

        each(tabs, function (tab, index) {
            tab.addEventListener('click', function () { activateTab(tab); });
            tab.addEventListener('keydown', function (event) {
                var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                if (!step) return;
                event.preventDefault();
                activateTab(tabs[(index + step + tabs.length) % tabs.length], true);
            });
        });

        /* ---------- classroom filter pills ---------- */
        var pills = hub.querySelectorAll('button[data-hub-schedule]');
        var views = hub.querySelectorAll('div.hub-schedule-view');

        each(pills, function (pill) {
            pill.addEventListener('click', function () {
                var targetId = pill.getAttribute('data-hub-schedule');

                each(pills, function (btn) {
                    var on = btn === pill;
                    btn.classList.toggle('is-active', on);
                    btn.setAttribute('aria-selected', on ? 'true' : 'false');
                });

                each(views, function (view) {
                    var on = view.id === targetId;
                    view.classList.toggle('is-active', on);
                    if (on) {
                        view.removeAttribute('hidden');
                        refreshWithin(view);
                        window.setTimeout(function () { refreshWithin(view); }, 60);
                    } else {
                        view.setAttribute('hidden', '');
                    }
                });
            });
        });

        /* ---------- resize ---------- */
        var resizeTimer = null;
        window.addEventListener('resize', function () {
            if (resizeTimer) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                carousels.forEach(function (c) { c.refresh(); });
            }, 150);
        });

        /* images finishing late can change track width */
        window.addEventListener('load', function () {
            carousels.forEach(function (c) { c.refresh(); });

            /* safety net: if the site's lazy loader never reached a card
               because it was parked off-screen inside a scroller, load it */
            window.setTimeout(function () {
                each(hub.querySelectorAll('img[data-src]'), function (img) {
                    if (img.getAttribute('src')) return;
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                    img.setAttribute('src', img.getAttribute('data-src'));
                });
            }, 1500);
        });

        /* ---------- deep links from the sticky page navigation ---------- */
        var hashToTab = {
            '#instructor': 'hub-panel-trainers',
            '#industry-project': 'hub-panel-projects'
        };

        function applyHash() {
            var target = hashToTab[window.location.hash];
            if (!target) return;
            each(tabs, function (tab) {
                if (tab.getAttribute('data-hub-tab') === target) activateTab(tab);
            });
        }

        window.addEventListener('hashchange', applyHash);
        applyHash();
    }

    /* ======================================================================
       3. TOOLS & TECHNOLOGIES — infinite single-row marquee
       One row, 2 cards on desktop and 1 on mobile (widths come from CSS).
       The list is cloned once, so scrolling past the halfway point can be
       reset invisibly — that is what makes the loop endless in both
       directions, whether it is drifting on its own or being swiped.
       ====================================================================== */
    function initToolsCarousel() {
        var root = document.querySelector('[data-tools-carousel]');
        if (!root) return;

        var viewport = root.querySelector('[data-tools-viewport]');
        var track = root.querySelector('[data-tools-track]');
        if (!viewport || !track) return;

        var originals = Array.prototype.slice.call(track.children);
        if (!originals.length) return;

        /* these tiles are always on screen inside the carousel, so promote
           the lazy-load sources now — clones would otherwise never load */
        function promote(scope) {
            each(scope.querySelectorAll('img[data-src]'), function (img) {
                if (!img.getAttribute('src')) img.setAttribute('src', img.getAttribute('data-src'));
                img.classList.remove('lazy-load');
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            });
        }
        promote(track);

        originals.forEach(function (item) {
            var clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.removeAttribute('data-reveal');
            clone.classList.add('is-revealed');
            track.appendChild(clone);
        });
        promote(track);

        /* the originals must be visible even if the reveal observer never
           reaches them while the row is scrolling */
        originals.forEach(function (item) { item.classList.add('is-revealed'); });

        /* scrollLeft is kept as a float here so a sub-pixel drift still moves */
        var pos = 0;

        function half() {
            return track.scrollWidth / 2;
        }

        function wrap() {
            var h = half();
            if (h < 2) return;
            if (pos >= h) pos -= h;
            else if (pos <= 0) pos += h;
        }

        var paused = false;
        var resumeTimer = null;
        var SPEED = 0.45; /* px per frame — a slow, readable drift */

        function pause(forMs) {
            paused = true;
            if (resumeTimer) window.clearTimeout(resumeTimer);
            if (forMs) {
                resumeTimer = window.setTimeout(function () { paused = false; }, forMs);
            }
        }

        function resume() {
            if (resumeTimer) window.clearTimeout(resumeTimer);
            paused = false;
        }

        root.addEventListener('mouseenter', function () { pause(); });
        root.addEventListener('mouseleave', resume);
        root.addEventListener('focusin', function () { pause(); });
        root.addEventListener('focusout', resume);

        /* a swipe or a wheel nudge takes over; the drift returns afterwards */
        ['touchstart', 'pointerdown', 'wheel'].forEach(function (type) {
            viewport.addEventListener(type, function () { pause(2200); }, { passive: true });
        });

        /* a manual swipe owns the position while the drift is paused */
        viewport.addEventListener('scroll', function () {
            if (!paused) return;
            pos = viewport.scrollLeft;
            wrap();
            if (Math.abs(pos - viewport.scrollLeft) > 1) viewport.scrollLeft = pos;
        }, { passive: true });

        /* start one pixel in, so the row can be swiped backwards immediately */
        function seed() {
            if (!track.scrollWidth) return;
            pos = 1;
            viewport.scrollLeft = pos;
        }

        if (reduceMotion) {
            /* no automatic movement — the row stays swipeable */
            seed();
            return;
        }

        function step() {
            if (!paused && viewport.clientWidth) {
                pos += SPEED;
                wrap();
                viewport.scrollLeft = pos;
            }
            window.requestAnimationFrame(step);
        }

        if (window.requestAnimationFrame) {
            seed();
            window.requestAnimationFrame(step);
        }
    }

    /* ======================================================================
       4. PROGRAM DETAILS — click-to-load YouTube player
       Nothing is requested from YouTube until the visitor presses play.
       ====================================================================== */
    function initProgramVideo() {
        var frame = document.querySelector('[data-video-frame]');
        if (!frame) return;

        var iframe = frame.querySelector('iframe.program-details-video');
        var poster = frame.querySelector('[data-video-play]');
        var posterTitle = frame.querySelector('[data-video-poster-title]');
        var buttons = document.querySelectorAll('button.program-details-playlist-btn');
        if (!iframe || !poster || !buttons.length) return;

        var current = buttons[0];

        function load(autoplay) {
            var id = current.getAttribute('data-video-id');
            if (!id || id.indexOf('REPLACE_WITH') === 0) {
                /* no real id yet — keep the poster rather than an error frame */
                return false;
            }
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
                (autoplay ? '?autoplay=1&rel=0' : '?rel=0');
            iframe.removeAttribute('hidden');
            poster.style.display = 'none';
            return true;
        }

        function select(button) {
            each(buttons, function (btn) {
                var on = btn === button;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            current = button;

            var title = button.getAttribute('data-video-title') || '';
            if (posterTitle) posterTitle.textContent = title;
            iframe.setAttribute('title', title);

            var playing = !iframe.hasAttribute('hidden');
            if (playing) {
                load(true);
            } else {
                iframe.removeAttribute('src');
            }
        }

        each(buttons, function (button) {
            button.addEventListener('click', function () { select(button); });
        });

        poster.addEventListener('click', function () { load(true); });
    }

    /* ---------------------------------------------------------------- boot */
    function init() {
        drawIcons();
        initLearningHub();
        initToolsCarousel();
        initProgramVideo();
        /* icons injected into cloned tool tiles / generated dots */
        drawIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
