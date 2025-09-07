
// this just goes to another page when you click stuff
function navigateTo(page) {
    window.location.href = page;
}

// this opens your email to send an email to colef@msoe.edu
function sendEmail() {
    window.location.href = "mailto:colef@msoe.edu";
}

// carousel stuff (the big slider thing at the top)
let currentSlideIndex = 0;
let slides;
let indicators;
let totalSlides;

// this shows the slide you want and makes it look active
function showSlide(index) {
    // take off the "active" thing from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // put the "active" thing on the one you want
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// this changes the slide when you click arrows or whatever
function changeSlide(direction) {
    currentSlideIndex += direction;

    // if you go past the last slide, go back to the first one
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        // if you go before the first slide, go to the last one
        currentSlideIndex = totalSlides - 1;
    }

    showSlide(currentSlideIndex);
}

// this is for when you click the little dots under the carousel
function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// this just goes to the next slide automatically
function autoAdvance() {
    changeSlide(1);
}

// this is for the thing that makes the carousel move by itself
let autoAdvanceInterval;

// this makes the carousel the right height so it doesn't look weird
function setCarouselHeight() {
    const carousel = document.querySelector('.hero-carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelector('.carousel-slides');
    const navbar = document.querySelector('#nav-bar');

    if (carousel && carouselContainer && carouselSlides) {
        // get the navbar height (I think so the carousel doesn't go under it)
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        // Force height calculation before images load
        if (window.innerWidth <= 480) {
            carousel.style.height = '500px';
            carousel.style.minHeight = '500px';
            carouselContainer.style.minHeight = '500px';
            carouselSlides.style.minHeight = '500px';
        } else if (window.innerWidth <= 768) {
            carousel.style.height = '600px';
            carousel.style.minHeight = '600px';
            carouselContainer.style.minHeight = '600px';
            carouselSlides.style.minHeight = '600px';
        } else {
            carousel.style.height = '550px';
            carousel.style.minHeight = '550px';
            carouselContainer.style.minHeight = '550px';
            carouselSlides.style.minHeight = '550px';
        }
    }
}

// Add fade-in animation to elements as they come into view
function initializeFadeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing this element once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // this makes all the fade-in-up things start invisible and then fade in
    document.querySelectorAll('.fade-in-up').forEach(el => {
        // Only set initial state if not already set
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// this is for the FAQ section, so you can open and close questions
function toggleFAQ(index) {
    const faqItem = document.querySelectorAll('.faq-item')[index];
    const isActive = faqItem.classList.contains('active');

    // close all the FAQ things first
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // open the one you clicked if it wasn't already open
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// this is for the hamburger menu (mobile menu) on mobile
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

// this closes the mobile menu if you click outside of it or resize the window
function initializeMobileMenu() {
    document.addEventListener('click', function (event) {
        const mobileNav = document.getElementById('mobile-nav');
        const hamburger = document.querySelector('.hamburger');

        if (mobileNav && mobileNav.classList.contains('active') &&
            !mobileNav.contains(event.target) &&
            !hamburger.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // if you make the window big again, close the mobile menu
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            const mobileNav = document.getElementById('mobile-nav');
            const hamburger = document.querySelector('.hamburger');

            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}

// this sets up the carousel and makes it move by itself and stuff
function initializeCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;

    // Set up auto-advance every 5 seconds
    autoAdvanceInterval = setInterval(autoAdvance, 5000);

    // if you put your mouse on the carousel, it stops moving
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(autoAdvance, 5000);
        });
    }
}

// this runs when the page loads and sets up everything
document.addEventListener('DOMContentLoaded', function () {
    initializeCarousel();
    setCarouselHeight();
    initializeFadeAnimations();
    initializeMobileMenu();
});

// this makes the carousel resize if you change the window size
window.addEventListener('resize', setCarouselHeight);