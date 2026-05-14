(function() {
    'use strict';

    const Carousel = function() {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = track.querySelectorAll('.carousel-slide');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        let currentIndex = 0;
        let autoPlayInterval;
        const AUTO_PLAY_DELAY = 5000;

        function createDots() {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Imagen ${index + 1} de ${slides.length}`);
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                dot.setAttribute('aria-selected', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;

            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
            updateSlideClasses();
        }

        function updateSlideClasses() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        if (slides.length > 1) {
            createDots();
            updateSlideClasses();
            startAutoPlay();
        } else if (slides.length === 1) {
            slides[0].classList.add('active');
        }
    };

    const FAQ = function() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) return;

            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion !== question) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                });

                question.setAttribute('aria-expanded', !isExpanded);
                answer.setAttribute('aria-hidden', isExpanded);
            });

            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    };

    const MobileNav = function() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const backdrop = document.querySelector('.nav-backdrop');

        if (!toggle || !menu) return;

        function closeMenu() {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }

        function openMenu() {
            menu.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            if (backdrop) backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (backdrop) {
            backdrop.addEventListener('click', closeMenu);
        }

        const links = menu.querySelectorAll('.nav-link, .btn-nav');
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
    };

    const HeaderScroll = function() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    };

    const SmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    };

    const ModelCarousel = function() {
        const track = document.getElementById('modelos-track');
        if (!track) return;

        const cards = track.querySelectorAll('.modelo-card');
        const marcaCards = document.querySelectorAll('.marca-card[data-marca]');
        const prevBtn = document.querySelector('.modelos-prev');
        const nextBtn = document.querySelector('.modelos-next');

        let currentIndex = 0;
        let autoPlayInterval;
        let selectedMarca = null;
        let filteredCards = Array.from(cards);
        const CARD_WIDTH = 304;
        const VISIBLE_CARDS = Math.floor(track.parentElement.offsetWidth / CARD_WIDTH) || 3;
        const AUTO_PLAY_DELAY = 3000;

        function getFilteredCards() {
            if (!selectedMarca) {
                return Array.from(cards);
            }
            return Array.from(cards).filter(card => card.dataset.marca === selectedMarca);
        }

        function updateFilteredCards() {
            filteredCards = getFilteredCards();
            currentIndex = 0;
            updateCarousel();
        }

        function updateCarousel() {
            const maxIndex = Math.max(0, filteredCards.length - VISIBLE_CARDS);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const offset = currentIndex * CARD_WIDTH;
            track.style.transform = `translateX(-${offset}px)`;

            cards.forEach(card => {
                const isVisible = filteredCards.includes(card);
                card.classList.toggle('hidden', !isVisible);
            });
        }

        function nextSlide() {
            const maxIndex = Math.max(0, filteredCards.length - VISIBLE_CARDS);
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }

        function prevSlide() {
            const maxIndex = Math.max(0, filteredCards.length - VISIBLE_CARDS);
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateCarousel();
        }

        function startAutoPlay() {
            if (selectedMarca) return;
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            track.classList.add('paused');
        }

        marcaCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const marca = card.dataset.marca;

                if (selectedMarca === marca) {
                    selectedMarca = null;
                    card.classList.remove('active');
                    card.setAttribute('aria-pressed', 'false');
                    startAutoPlay();
                } else {
                    marcaCards.forEach(c => {
                        c.classList.remove('active');
                        c.setAttribute('aria-pressed', 'false');
                    });
                    selectedMarca = marca;
                    card.classList.add('active');
                    card.setAttribute('aria-pressed', 'true');
                    stopAutoPlay();
                }

                updateFilteredCards();
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#marcas') && !e.target.closest('#modelos')) {
                if (selectedMarca) {
                    selectedMarca = null;
                    marcaCards.forEach(c => {
                        c.classList.remove('active');
                        c.setAttribute('aria-pressed', 'false');
                    });
                    updateFilteredCards();
                    startAutoPlay();
                }
            }
        });

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (selectedMarca) {
                    track.classList.add('paused');
                } else {
                    track.classList.remove('paused');
                    startAutoPlay();
                }
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (selectedMarca) {
                    track.classList.add('paused');
                } else {
                    track.classList.remove('paused');
                    startAutoPlay();
                }
            });
        }

        track.addEventListener('mouseenter', () => {
            if (!selectedMarca) {
                stopAutoPlay();
            }
        });

        track.addEventListener('mouseleave', () => {
            if (!selectedMarca) {
                track.classList.remove('paused');
                startAutoPlay();
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                if (!selectedMarca) {
                    startAutoPlay();
                }
            }
        });

        window.addEventListener('resize', () => {
            const newVisibleCards = Math.floor(track.parentElement.offsetWidth / CARD_WIDTH) || 3;
            if (newVisibleCards !== VISIBLE_CARDS) {
                updateCarousel();
            }
        });

        updateCarousel();
        startAutoPlay();
    };

    const FormValidation = function() {
        const form = document.querySelector('.contacto-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-error)';
                } else {
                    input.style.borderColor = '';
                }

                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = 'var(--color-error)';
                    }
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '¡Enviado!';
                submitBtn.style.background = 'var(--color-success)';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }
        });

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    };

    const init = function() {
        Carousel();
        ModelCarousel();
        FAQ();
        MobileNav();
        HeaderScroll();
        SmoothScroll();
        FormValidation();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();