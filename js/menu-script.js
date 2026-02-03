document.addEventListener('DOMContentLoaded', function () {
    // Get current page path and normalize it
    let pathname = window.location.pathname;
    let currentPage = '';
    
    // Extract the page name from pathname
    if (pathname === '/' || pathname === '' || pathname === '/index' || pathname === '/index.html') {
        currentPage = 'index.html';
    } else {
        // Get the last part of the path
        currentPage = pathname.split('/').pop();
        // If it doesn't have .html, add it (for Cloudflare Pages)
        if (currentPage && !currentPage.includes('.')) {
            currentPage = currentPage + '.html';
        }
        // If still empty, default to index
        if (!currentPage || currentPage === '.html') {
            currentPage = 'index.html';
        }
    }

    // Helper function to check if link matches current page
    function isActivePage(linkHref) {
        if (!linkHref || linkHref === '#') return false;

        // Extract filename from link
        let linkPage = linkHref.split('/').pop().split('?')[0].split('#')[0];

        // Handle empty or root links
        if (!linkPage || linkPage === '' || linkPage === '/') {
            linkPage = 'index.html';
        }

        // Normalize both pages for comparison
        let normalizedCurrent = currentPage.toLowerCase().trim();
        let normalizedLink = linkPage.toLowerCase().trim();
        
        // Also check without .html extension (for Cloudflare)
        let currentWithoutExt = normalizedCurrent.replace('.html', '');
        let linkWithoutExt = normalizedLink.replace('.html', '');
        
        return normalizedLink === normalizedCurrent || 
               linkWithoutExt === currentWithoutExt ||
               normalizedLink === currentWithoutExt ||
               linkWithoutExt === normalizedCurrent;
    }

    // Desktop navigation - nav-links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (isActivePage(link.getAttribute('href'))) {
            link.classList.add('active');
            // Force inline styles to ensure visibility
            link.style.backgroundColor = '#F5C542';
            link.style.color = '#8B0A1A';
            link.style.padding = '8px 16px';
            link.style.borderRadius = '6px';
            link.style.fontWeight = '600';
        }
    });

    // Desktop navigation - Admission button (select by href but exclude footer links)
    const admissionLinks = document.querySelectorAll('header a[href="admission.html"], header a[href*="admission.html"], header a[href="admission"], #mobile-menu a[href="admission.html"], #mobile-menu a[href="admission"]');
    admissionLinks.forEach(link => {
        if (isActivePage(link.getAttribute('href'))) {
            link.classList.add('active');
            // Force style update for browsers that might cache
            link.style.backgroundColor = '#F5C542';
            link.style.color = '#8B0A1A';
            link.style.fontWeight = '600';
        }
    });

    // Desktop navigation - Dropdown items (About Us submenu)
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        if (isActivePage(link.getAttribute('href'))) {
            link.classList.add('active');
            // Force inline styles
            link.style.backgroundColor = '#F5C542';
            link.style.color = '#8B0A1A';
            link.style.fontWeight = '600';
        }
    });

    // Mobile navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a[href]');
        mobileLinks.forEach(link => {
            if (isActivePage(link.getAttribute('href'))) {
                link.classList.add('active');
                // Force inline styles for mobile menu
                link.style.backgroundColor = '#F5C542';
                link.style.color = '#8B0A1A';
                link.style.padding = '8px 12px';
                link.style.borderRadius = '6px';
                link.style.fontWeight = '600';
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
        toggleBtn.addEventListener('click', function (e) {
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

    // Close mobile menu when clicking on a link (but not the About Us toggle)
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Don't close menu if clicking the About Us toggle
                if (link.getAttribute('href') === '#') return;

                mobileMenu.classList.remove('active');
            });
        });
    }

    // Admission Page - Inquiry Process Accordion
    const inquiryToggle = document.getElementById('inquiryToggle');
    const inquiryContent = document.getElementById('inquiryContent');
    const inquiryIcon = document.getElementById('inquiryIcon');

    if (inquiryToggle && inquiryContent) {
        inquiryToggle.addEventListener('click', function () {
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
        admissionToggle.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
                popup.style.display = 'flex';
                popup.classList.remove('hidden');
                sessionStorage.setItem('admissionPopupShown', 'true');
            }, 10000);
        }
    }

    // Close popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            if (popup) {
                popup.style.display = 'none';
                popup.classList.add('hidden');
            }
        });
    }

    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                popup.classList.add('hidden');
            }
        });
    }

    // Handle popup admission form submission (index.html)
    const popupAdmissionForm = document.getElementById('popupAdmissionForm');
    if (popupAdmissionForm) {
        popupAdmissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const payload = {
                formName: "AdmissionForm",
                formType: "Popup",
                studentName: popupAdmissionForm.querySelector('[name="popupStudentName"]')?.value.trim() || "",
                grade: popupAdmissionForm.querySelector('[name="popupGrade"]')?.value || "",
                parentName: popupAdmissionForm.querySelector('[name="popupParentName"]')?.value.trim() || "",
                mobile: popupAdmissionForm.querySelector('[name="popupMobile"]')?.value.trim() || "",
                email: popupAdmissionForm.querySelector('[name="popupEmail"]')?.value.trim() || "",
                additionalInfo: ""
            };

            // Show loading state
            const submitBtn = popupAdmissionForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn?.innerHTML;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
            }

            // Submit to Google Apps Script
            fetch("https://script.google.com/macros/s/AKfycbzi2o2AkHQtidCbTXjJY4wDNkrXoTWZ9fQQmPFD6WW5NDccm-1zH4EhnHibzihZ-13A5g/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(() => {
                    // Close the admission popup
                    if (popup) popup.classList.add('hidden');

                    // Show success popup (index.html uses 'successPopup' ID)
                    showIndexSuccessPopup();

                    // Reset form
                    popupAdmissionForm.reset();

                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                })
                .catch(err => {
                    console.error("Popup form submission error:", err);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                    alert("Submission failed. Please try again.");
                });
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
        successPopup.style.display = 'flex';
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
        successPopup.style.display = 'none';
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
    if (successPopup) {        successPopup.style.display = 'none';        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
    }
}

// Career Form Submission Handler with Resume Upload
document.addEventListener('DOMContentLoaded', function () {
    const careerForm = document.getElementById('careerForm');

    if (careerForm) {
        careerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = careerForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn?.innerHTML;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Uploading & Submitting...';
            }

            // Get file
            const fileInput = document.getElementById('resume');
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a resume file");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
                return;
            }

            // Convert file to base64
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64File = e.target.result.split(',')[1];

                const payload = {
                    firstName: document.getElementById('firstName')?.value.trim() || "",
                    lastName: document.getElementById('lastName')?.value.trim() || "",
                    email: document.getElementById('email')?.value.trim() || "",
                    phone: document.getElementById('phone')?.value.trim() || "",
                    address: document.getElementById('address')?.value.trim() || "",
                    position: document.getElementById('position')?.value || "",
                    qualification: document.getElementById('qualification')?.value || "",
                    experience: document.getElementById('experience')?.value || "",
                    coverLetter: document.getElementById('coverLetter')?.value.trim() || "",
                    resume: base64File,
                    resumeName: file.name,
                    resumeType: file.type
                };

                // Submit to Google Apps Script
                fetch("https://script.google.com/macros/s/AKfycbwZ297qpbhKLMdGLq6tJHbbNuMAD4q-XVc5kqJwIF8ouTOdbCRrPbJAz0vGGoIiDzSf/exec", {
                    method: "POST",
                    redirect: "follow",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(payload)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "success") {
                            showCareerSuccessPopup();
                            careerForm.reset();
                            document.getElementById('fileName').innerHTML = '';
                        } else {
                            alert("Submission failed: " + (data.message || "Unknown error"));
                        }
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnHTML;
                        }
                    })
                    .catch(err => {
                        console.error("Submission error:", err);
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnHTML;
                        }
                        alert("Submission failed: " + err.message);
                    });
            };

            reader.readAsDataURL(file);
        });
    }
});

// Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const payload = {
                formName: "ContactForm",
                name: document.getElementById("name")?.value.trim() || "",
                mobile: document.getElementById("contactMobile")?.value.trim() || "",
                email: document.getElementById("contactEmail")?.value.trim() || "",
                subject: document.getElementById("subject")?.value.trim() || "",
                message: document.getElementById("message")?.value.trim() || ""
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn?.innerHTML;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            }

            // Submit to Google Apps Script
            fetch("https://script.google.com/macros/s/AKfycbw7GGedLVzZiwhDtbVOePxWUNdpkHp_s7O7Cz4PoSgCTOzp5vtiqcq1xzC1bEsJGgos/exec", {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        // Show custom success popup (no browser alert)
                        showContactSuccessPopup();
                        contactForm.reset();
                    } else {
                        alert("Submission failed: " + (data.message || "Unknown error"));
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHTML;
                    }
                })
                .catch(err => {
                    console.error("Submission error:", err);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHTML;
                    }
                    alert("Submission failed: " + err.message + "\n\nPlease check:\n1. Google Apps Script is deployed as web app\n2. Sheet named 'ContactForm' exists in spreadsheet\n3. Script has proper permissions");
                });
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

document.addEventListener("DOMContentLoaded", function () {
    const admissionFormMain = document.getElementById("admissionForm");

    if (!admissionFormMain) return; // safety check

    admissionFormMain.addEventListener("submit", function (e) {
        e.preventDefault();

        const payload = {
            formName: "AdmissionForm",
            formType: "Main",
            studentName: document.getElementById("studentName")?.value.trim() || "",
            grade: document.getElementById("grade")?.value || "",
            parentName: document.getElementById("parentName")?.value.trim() || "",
            mobile: document.getElementById("mobile")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            additionalInfo: document.getElementById("additionalInfo")?.value.trim() || ""
        };

        // Show loading state
        const submitBtn = admissionFormMain.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn?.textContent;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }

        // Using no-cors mode to avoid CORS issues with Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbzi2o2AkHQtidCbTXjJY4wDNkrXoTWZ9fQQmPFD6WW5NDccm-1zH4EhnHibzihZ-13A5g/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(() => {
                // With no-cors, we can't read the response, but if no error thrown, assume success
                showAdmissionSuccessPopup();
                admissionFormMain.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            })
            .catch(err => {
                console.error("Submission error:", err);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
                alert("Submission failed: " + err.message + "\n\nPlease check:\n1. Google Apps Script is deployed as web app\n2. Sheet named 'AdmissionForm' exists in spreadsheet\n3. Script has proper permissions");
            });
    });
});

