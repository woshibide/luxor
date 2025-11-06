gsap.registerPlugin(ScrollTrigger);

// hero section animations
gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".hero .btn-primary", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// about brand section animations with parallax
gsap.from(".about-brand-text h2", {
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about-brand",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".about-brand-text p", {
    x: -50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about-brand",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// parallax scrolling for each column
document.querySelectorAll('.parallax-column').forEach((column) => {
    const speed = parseFloat(column.getAttribute('data-speed'));
    
    gsap.to(column, {
        y: () => (column.offsetHeight * speed * -0.3),
        ease: "none",
        scrollTrigger: {
            trigger: "#about-brand",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// collection section animations
gsap.from("#collection .section-title", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#collection",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".collection-item", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#collection",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// exclusive qualities section animations
gsap.from("#exclusive-qualities .section-title", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#exclusive-qualities",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".quality-item", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#exclusive-qualities",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// cta section animations
gsap.from("#cta .section-title", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#cta",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".cta-subtitle", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#cta",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".cta-form", {
    y: 60,
    opacity: 0,
    duration: 1.5,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#cta",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// ===== micro-animations: hover effects =====

// button hover effects - elegant shine and lift
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            y: -4,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });
        gsap.to(btn.querySelector('::before'), {
            left: '100%',
            duration: 0.6,
            ease: "power2.inOut"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

// hero title - subtle letter spacing expansion
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        gsap.to(heroTitle, {
            letterSpacing: '0.15em',
            duration: 0.6,
            ease: "power2.out"
        });
    });
    
    heroTitle.addEventListener('mouseleave', () => {
        gsap.to(heroTitle, {
            letterSpacing: '0.1em',
            duration: 0.6,
            ease: "power2.out"
        });
    });
}

// collection items - elegant zoom and lift effect
document.querySelectorAll('.collection-item').forEach(item => {
    const img = item.querySelector('.collection-item-img');
    const title = item.querySelector('.collection-item-title');
    const desc = item.querySelector('.collection-item-description');
    
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -12,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(img, {
            scale: 1.05,
            duration: 0.7,
            ease: "power2.out"
        });
        gsap.to(title, {
            y: -5,
            opacity: 0.9,
            duration: 0.4,
            ease: "power2.out"
        });
        gsap.to(desc, {
            y: -3,
            opacity: 0.8,
            duration: 0.4,
            delay: 0.05,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(img, {
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
        });
        gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        gsap.to(desc, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

// quality items - icon rotation and scale
document.querySelectorAll('.quality-item').forEach(item => {
    const icon = item.querySelector('.quality-icon');
    
    item.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            scale: 1.15,
            rotation: 180,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
        gsap.to(item, {
            y: -8,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out"
        });
        gsap.to(item, {
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// parallax images - subtle zoom and overlay on hover
document.querySelectorAll('.parallax-image').forEach(image => {
    image.addEventListener('mouseenter', () => {
        gsap.to(image, {
            scale: 1.08,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    image.addEventListener('mouseleave', () => {
        gsap.to(image, {
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    });
});

// form inputs - elegant focus animation
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// footer columns - subtle highlight effect
document.querySelectorAll('.footer-column').forEach(column => {
    column.addEventListener('mouseenter', () => {
        gsap.to(column, {
            x: 5,
            duration: 0.4,
            ease: "power2.out"
        });
        gsap.to(column.querySelector('.footer-title'), {
            opacity: 0.9,
            letterSpacing: '0.05em',
            duration: 0.4,
            ease: "power2.out"
        });
    });
    
    column.addEventListener('mouseleave', () => {
        gsap.to(column, {
            x: 0,
            duration: 0.4,
            ease: "power2.out"
        });
        gsap.to(column.querySelector('.footer-title'), {
            opacity: 1,
            letterSpacing: '0',
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

// smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 0
                },
                ease: "power2.inOut"
            });
        }
    });
});
