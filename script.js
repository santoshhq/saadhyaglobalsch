// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

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

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
mobileMenuLinks?.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

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
        
        console.log('Popup Form Data:', data);
        
        // Show success message
        const successMessage = document.getElementById('popupSuccessMessage');
        successMessage.classList.remove('hidden');
        
        // Reset form
        popupAdmissionForm.reset();
        
        // Hide popup after 3 seconds
        setTimeout(() => {
            document.getElementById('admissionPopup').classList.add('hidden');
            document.getElementById('admissionPopup').classList.remove('flex');
        }, 3000);
    });
}

// Reviews Carousel
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
    let currentPosition = 0;
    const reviewCards = reviewsCarousel.children;
    const totalReviews = reviewCards.length;
    
    function moveCarousel() {
        currentPosition++;
        
        // Reset to start when reaching the end
        if (currentPosition >= totalReviews) {
            currentPosition = 0;
        }
        
        // Calculate translation based on card width
        const cardWidth = reviewCards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(currentPosition * (cardWidth + gap));
        
        reviewsCarousel.style.transform = `translateX(${translateX}px)`;
    }
    
    // Auto-scroll every 4 seconds
    setInterval(moveCarousel, 4000);
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
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            parentName: document.getElementById('parentName').value,
            address: document.getElementById('address').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };
        
        // Validate mobile number
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(formData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Validate email if provided
        if (formData.email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }
        }
        
        // In a real application, you would send this data to a server
        console.log('Admission Form Data:', formData);
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('hidden');
        
        // Reset form
        admissionForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 10000);
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
