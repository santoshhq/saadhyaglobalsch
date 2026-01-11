// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile About Us Submenu Toggle
const mobileAboutBtn = document.getElementById('mobile-about-btn');
const mobileSubmenu = document.getElementById('mobile-submenu');
const mobileAboutIcon = document.getElementById('mobile-about-icon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        
        // Always auto-expand About Us submenu when mobile menu opens
        if (mobileSubmenu && mobileAboutIcon) {
            mobileSubmenu.classList.add('active');
            mobileAboutIcon.classList.add('rotate-180');
        }
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

if (mobileAboutBtn && mobileSubmenu) {
    mobileAboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileSubmenu.classList.toggle('active');
        mobileAboutIcon.classList.toggle('rotate-180');
    });
}

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
mobileMenuLinks?.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Dropdown Menu for About Us - Click/Tap Support
const aboutDropdown = document.getElementById('aboutDropdown');
const aboutDropdownContent = document.getElementById('aboutDropdownContent');

if (aboutDropdown && aboutDropdownContent) {
    // Toggle dropdown on click
    aboutDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        aboutDropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!aboutDropdown.contains(e.target) && !aboutDropdownContent.contains(e.target)) {
            aboutDropdownContent.classList.remove('show');
        }
    });
    
    // Allow navigation to dropdown items
    const dropdownLinks = aboutDropdownContent.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the link navigate normally
            aboutDropdownContent.classList.remove('show');
        });
    });
}

// Hero Banner Carousel
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function nextHeroSlide() {
    if (heroSlides.length > 0) {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }
}

// Auto-advance hero carousel every 4 seconds
if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, 4000);
}

// Admission Popup - Show on first visit
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('admissionPopup');
    const closePopupBtn = document.getElementById('closePopup');
    
    // Check if user has visited before
    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            if (popup) {
                popup.classList.remove('hidden');
                popup.classList.add('flex');
                sessionStorage.setItem('popupShown', 'true');
            }
        }, 5000); // Show after 5 seconds
    }
    
    // Close popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
            popup.classList.remove('flex');
        });
    }
    
    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.add('hidden');
                popup.classList.remove('flex');
            }
        });
    }
});

// Popup Admission Form
const popupAdmissionForm = document.getElementById('popupAdmissionForm');
if (popupAdmissionForm) {
    popupAdmissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate mobile
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(data.popupMobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.popupEmail)) {
            alert('Please enter a valid email address');
            return;
        }
        
        console.log('Popup Form Data:', data);
         
        // Hide the admission popup
        const admissionPopup = document.getElementById('admissionPopup');
        admissionPopup.classList.add('hidden');
        admissionPopup.classList.remove('flex');
        
        // Show success popup
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Add scale animation
        setTimeout(() => {
            successPopup.querySelector('.transform').classList.remove('scale-95');
            successPopup.querySelector('.transform').classList.add('scale-100');
        }, 10);
        
        // Reset form
        popupAdmissionForm.reset();
        
        // Auto-close success popup after 5 seconds
        setTimeout(() => {
            successPopup.classList.add('hidden');
            successPopup.classList.remove('flex');
            successPopup.querySelector('.transform').classList.remove('scale-100');
            successPopup.querySelector('.transform').classList.add('scale-95');
        }, 5000);
    });
}

// Close button for popup success modal
const closeSuccessPopupBtn = document.getElementById('closeSuccessPopup');
if (closeSuccessPopupBtn) {
    closeSuccessPopupBtn.addEventListener('click', () => {
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
        successPopup.querySelector('.transform').classList.remove('scale-100');
        successPopup.querySelector('.transform').classList.add('scale-95');
    });
}

// Reviews Carousel - Infinite Loop
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
    const reviewCards = Array.from(reviewsCarousel.children);
    const totalReviews = reviewCards.length;
    
    // Clone first 3 cards and append to end for seamless loop
    reviewCards.slice(0, 3).forEach(card => {
        const clone = card.cloneNode(true);
        reviewsCarousel.appendChild(clone);
    });
    
    let currentPosition = 0;
    let isTransitioning = false;
    
    function moveCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentPosition++;
        
        const allCards = reviewsCarousel.children;
        const cardWidth = allCards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(currentPosition * (cardWidth + gap));
        
        reviewsCarousel.style.transition = 'transform 0.5s ease-in-out';
        reviewsCarousel.style.transform = `translateX(${translateX}px)`;
        
        // Reset to beginning seamlessly when reaching cloned cards
        if (currentPosition >= totalReviews) {
            setTimeout(() => {
                reviewsCarousel.style.transition = 'none';
                currentPosition = 0;
                reviewsCarousel.style.transform = 'translateX(0)';
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    // Auto-scroll every 3 seconds
    setInterval(moveCarousel, 3000);
}

// Admission Form Validation and Submission
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            studentName: document.getElementById('studentName').value,
            grade: document.getElementById('grade').value,
            parentName: document.getElementById('parentName').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };
        
        // Validate mobile number
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(formData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Admission Form Data:', formData);
        
        // Reset form
        admissionForm.reset();
        
        // Show success popup
        const successPopup = document.getElementById('admissionSuccessPopup');
        successPopup.classList.remove('hidden');
        successPopup.classList.add('flex');
        
        // Add scale animation
        setTimeout(() => {
            successPopup.querySelector('.transform').classList.remove('scale-95');
            successPopup.querySelector('.transform').classList.add('scale-100');
        }, 10);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Auto-close popup after 5 seconds
        setTimeout(() => {
            successPopup.classList.add('hidden');
            successPopup.classList.remove('flex');
            successPopup.querySelector('.transform').classList.remove('scale-100');
            successPopup.querySelector('.transform').classList.add('scale-95');
        }, 5000);
    });
}

// Close button for admission success popup
const closeAdmissionSuccessBtn = document.getElementById('closeAdmissionSuccessPopup');
if (closeAdmissionSuccessBtn) {
    closeAdmissionSuccessBtn.addEventListener('click', () => {
        const successPopup = document.getElementById('admissionSuccessPopup');
        successPopup.classList.add('hidden');
        successPopup.classList.remove('flex');
        successPopup.querySelector('.transform').classList.remove('scale-100');
        successPopup.querySelector('.transform').classList.add('scale-95');
    });
}

// Inquiry Process Accordion
const inquiryToggle = document.getElementById('inquiryToggle');
const inquiryContent = document.getElementById('inquiryContent');
const inquiryIcon = document.getElementById('inquiryIcon');

if (inquiryToggle) {
    inquiryToggle.addEventListener('click', function() {
        inquiryContent.classList.toggle('hidden');
        inquiryIcon.classList.toggle('rotate-180');
    });
}

// Admission Process Accordion
const admissionToggle = document.getElementById('admissionToggle');
const admissionContent = document.getElementById('admissionContent');
const admissionIcon = document.getElementById('admissionIcon');

if (admissionToggle) {
    admissionToggle.addEventListener('click', function() {
        admissionContent.classList.toggle('hidden');
        admissionIcon.classList.toggle('rotate-180');
    });
}

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            contactMobile: document.getElementById('contactMobile').value,
            contactEmail: document.getElementById('contactEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate mobile number
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(formData.contactMobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Validate email if provided
        if (formData.contactEmail) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.contactEmail)) {
                alert('Please enter a valid email address');
                return;
            }
        }
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Data:', formData);
        
        // Show success message
        const successMessage = document.getElementById('contactSuccessMessage');
        successMessage.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 10000);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Input Animation
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Check if image is already loaded (cached)
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Fallback: show image after 1 second even if load event doesn't fire
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    img.style.opacity = '1';
                }
            }, 1000);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class (you can add this class to elements you want to animate)
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
