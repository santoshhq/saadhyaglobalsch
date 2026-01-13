// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active page in navigation (desktop and mobile)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop navigation - nav-links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Desktop navigation - Admission button
    const admissionLinks = document.querySelectorAll('a[href="admission.html"]');
    admissionLinks.forEach(link => {
        if (currentPage === 'admission.html') {
            link.classList.add('active');
        }
    });
    
    // Desktop navigation - Dropdown items (About Us submenu)
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Mobile navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a[href]');
        mobileLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            // Skip the About Us toggle link (href="#")
            if (linkPage === '#') return;
            
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Mobile About Submenu Toggle
    const toggleBtn = document.getElementById('mobile-about-toggle');
    const submenu = document.getElementById('mobile-about-submenu');
    const icon = document.getElementById('mobile-about-icon');

    if (toggleBtn && submenu) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            submenu.classList.toggle('active');
            
            if (icon) {
                if (submenu.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Admission Page - Inquiry Process Accordion
    const inquiryToggle = document.getElementById('inquiryToggle');
    const inquiryContent = document.getElementById('inquiryContent');
    const inquiryIcon = document.getElementById('inquiryIcon');

    if (inquiryToggle && inquiryContent) {
        inquiryToggle.addEventListener('click', function() {
            inquiryContent.classList.toggle('hidden');
            if (inquiryIcon) {
                if (inquiryContent.classList.contains('hidden')) {
                    inquiryIcon.style.transform = 'rotate(0deg)';
                } else {
                    inquiryIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }

    // Admission Page - Admission Process Accordion
    const admissionToggle = document.getElementById('admissionToggle');
    const admissionContent = document.getElementById('admissionContent');
    const admissionIcon = document.getElementById('admissionIcon');

    if (admissionToggle && admissionContent) {
        admissionToggle.addEventListener('click', function() {
            admissionContent.classList.toggle('hidden');
            if (admissionIcon) {
                if (admissionContent.classList.contains('hidden')) {
                    admissionIcon.style.transform = 'rotate(0deg)';
                } else {
                    admissionIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }
});

// Hero carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Change slide every 5 seconds
    if (heroSlides.length > 1) {
        setInterval(nextSlide, 5000);
    }
});

// Reviews carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.review-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = window.innerWidth >= 768 ? 3 : 1;
    let autoScroll = null;

    function updateCardsPerView() {
        cardsPerView = window.innerWidth >= 768 ? 3 : 1;
    }

    function getCardWidth() {
        const card = cards[0];
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        return rect.width > 0 ? rect.width : 0;
    }

    function updateCarousel() {
        const cardWidth = getCardWidth();
        const gap = 32;
        
        if (cardWidth > 0) {
            const maxIndex = Math.max(0, cards.length - cardsPerView);
            currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);
            
            const offset = -(currentIndex * (cardWidth + gap));
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(${offset}px)`;
        }
    }

    function nextReview() {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function prevReview() {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScroll = setInterval(nextReview, 5000);
    }

    function stopAutoScroll() {
        if (autoScroll) {
            clearInterval(autoScroll);
            autoScroll = null;
        }
    }

    // Initial setup
    updateCarousel();
    
    // Start auto-scroll
    startAutoScroll();

    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextReview();
            } else {
                prevReview();
            }
        }
    }

    // Optimized resize handler
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCardsPerView();
            updateCarousel();
        }, 250);
    });
});

// Admission popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('admissionPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const admissionForm = document.getElementById('admissionForm');
    const admissionYearText = document.getElementById('admissionYearText');

    // Check if current month is in admission period (December, January-June)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    const currentYear = currentDate.getFullYear();
    
    // Admission months: December (12), January (1), February (2), March (3), April (4), May (5), June (6)
    const isAdmissionPeriod = currentMonth === 12 || (currentMonth >= 1 && currentMonth <= 6);
    
    // Always update the admission year text during admission period
    if (isAdmissionPeriod && admissionYearText) {
        // Calculate admission year range
        let startYear, endYear;
        if (currentMonth === 12) {
            // December: show current year + 1 - next year + 1
            startYear = currentYear + 1;
            endYear = currentYear + 2;
        } else {
            // January to June: show current year - current year + 1
            startYear = currentYear;
            endYear = currentYear + 1;
        }
        
        // Update the admission year text
        admissionYearText.textContent = `Admission Open for ${startYear}-${endYear} | Join Saadhya Global School`;
    }
    
    // Show popup after 10 seconds only during admission period and if not shown in this session
    if (isAdmissionPeriod && popup) {
        const popupShown = sessionStorage.getItem('admissionPopupShown');
        
        if (!popupShown) {
            setTimeout(() => {
                popup.classList.remove('hidden');
                sessionStorage.setItem('admissionPopupShown', 'true');
            }, 10000);
        }
    }

    // Close popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            if (popup) popup.classList.add('hidden');
        });
    }

    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.add('hidden');
            }
        });
    }

    // Handle main admission form submission (admission.html)
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Close the admission popup if it's open
            if (popup) popup.classList.add('hidden');
            
            // Show success popup
            showAdmissionSuccessPopup();
            
            // Reset form
            admissionForm.reset();
        });
    }
    
    // Handle popup admission form submission (index.html)
    const popupAdmissionForm = document.getElementById('popupAdmissionForm');
    if (popupAdmissionForm) {
        popupAdmissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Close the admission popup
            if (popup) popup.classList.add('hidden');
            
            // Show success popup (index.html uses 'successPopup' ID)
            showIndexSuccessPopup();
            
            // Reset form
            popupAdmissionForm.reset();
        });
    }
});

// Admission Success Popup functionality
function showAdmissionSuccessPopup() {
    const successPopup = document.getElementById('admissionSuccessPopup');
    const closeSuccessBtn = document.getElementById('closeAdmissionSuccessPopup');
    
    if (successPopup) {
        // Show popup
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Auto-close after 5 seconds
        const autoCloseTimer = setTimeout(() => {
            closeSuccessPopup();
        }, 5000);
        
        // Close button handler
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                clearTimeout(autoCloseTimer);
                closeSuccessPopup();
            });
        }
        
        // Close on outside click
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                clearTimeout(autoCloseTimer);
                closeSuccessPopup();
            }
        });
    }
}

function closeSuccessPopup() {
    const successPopup = document.getElementById('admissionSuccessPopup');
    if (successPopup) {
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
    }
}

// Index page Success Popup functionality (uses different ID)
function showIndexSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    const closeSuccessBtn = document.getElementById('closeSuccessPopup');
    
    if (successPopup) {
        // Show popup
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Auto-close after 5 seconds
        const autoCloseTimer = setTimeout(() => {
            closeIndexSuccessPopup();
        }, 5000);
        
        // Close button handler
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                clearTimeout(autoCloseTimer);
                closeIndexSuccessPopup();
            });
        }
        
        // Close on outside click
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                clearTimeout(autoCloseTimer);
                closeIndexSuccessPopup();
            }
        });
    }
}

function closeIndexSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
    }
}

// Career page Success Popup functionality
function showCareerSuccessPopup() {
    const successPopup = document.getElementById('careerSuccessPopup');
    const closeSuccessBtn = document.getElementById('closeCareerSuccessPopup');
    
    if (successPopup) {
        // Show popup
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Auto-close after 5 seconds
        const autoCloseTimer = setTimeout(() => {
            closeCareerSuccessPopup();
        }, 5000);
        
        // Close button handler
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                clearTimeout(autoCloseTimer);
                closeCareerSuccessPopup();
            });
        }
        
        // Close on outside click
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                clearTimeout(autoCloseTimer);
                closeCareerSuccessPopup();
            }
        });
    }
}

function closeCareerSuccessPopup() {
    const successPopup = document.getElementById('careerSuccessPopup');
    if (successPopup) {
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
    }
}

// Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success popup
            showContactSuccessPopup();
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Contact page Success Popup functionality
function showContactSuccessPopup() {
    const successPopup = document.getElementById('contactSuccessPopup');
    const closeSuccessBtn = document.getElementById('closeContactSuccessPopup');
    
    if (successPopup) {
        // Show popup
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Auto-close after 5 seconds
        const autoCloseTimer = setTimeout(() => {
            closeContactSuccessPopup();
        }, 5000);
        
        // Close button handler
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                clearTimeout(autoCloseTimer);
                closeContactSuccessPopup();
            });
        }
        
        // Close on outside click
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                clearTimeout(autoCloseTimer);
                closeContactSuccessPopup();
            }
        });
    }
}

function closeContactSuccessPopup() {
    const successPopup = document.getElementById('contactSuccessPopup');
    if (successPopup) {
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
    }
}
