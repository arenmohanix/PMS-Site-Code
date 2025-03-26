// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.smooth-scroll'),
        smooth: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Preloader animation
    const preloader = document.querySelector('.preloader');
    const preloaderCircle = document.querySelector('.preloader-circle');
    
    gsap.to(preloaderCircle, {
        scale: 1.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
    // Hide preloader after everything is loaded
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
                initAnimations();
            }
        });
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Initialize animations after preloader
    function initAnimations() {
        // Hero section animations
        gsap.to('.hero-title', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4
        });
        
        gsap.to('.hero-image', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6
        });
        
        // Section header animations
        gsap.to('.section-header h2', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.section-header h2',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Work item animations
        gsap.to('.work-item', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.work-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // ScrollTrigger for parallax effects
        gsap.utils.toArray('[data-scroll]').forEach(element => {
            const speed = element.getAttribute('data-scroll-speed') || 1;
            
            ScrollTrigger.create({
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const y = self.getVelocity() / 100 * speed;
                    gsap.to(element, {
                        y: y,
                        duration: 0.5,
                        ease: 'power1.out'
                    });
                }
            });
        });
    }
    
    // Navigation scroll behavior
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            scroll.scrollTo(targetElement, {
                offset: -100,
                duration: 1.2,
                easing: [0.25, 0.0, 0.35, 1.0]
            });
        });
    });
});
// ========== PRELOADER & INITIAL SETUP ========== //
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll (Smooth Scrolling)
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.smooth-scroll'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    gsap.to('.preloader-circle', {
        scale: 1.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Hide preloader when everything loads
    window.addEventListener('load', async () => {
        await gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
                initAnimations();
                initThreeJS();       // Initialize 3D
                initParticles();     // Initialize particles
            }
        });
    });

    // ========== CUSTOM CURSOR ========== //
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Cursor hover effects
    document.querySelectorAll('a, button, .work-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // ========== THREE.JS (3D HERO ELEMENT) ========== //
    function initThreeJS() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;

        // Setup Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, heroImage.clientWidth / heroImage.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(heroImage.clientWidth, heroImage.clientHeight);
        heroImage.appendChild(renderer.domElement);
        
        // Add a 3D object (e.g., rotating wireframe sphere)
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xff4d4d, 
            wireframe: true 
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = heroImage.clientWidth / heroImage.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(heroImage.clientWidth, heroImage.clientHeight);
        });
    }

    // ========== PARTICLES.JS (DYNAMIC BACKGROUND) ========== //
    function initParticles() {
        tsParticles.load("tsparticles", {
            particles: {
                number: { value: 80 },
                color: { value: "#ff4d4d" },
                move: { speed: 1 },
                size: { value: 3 },
                opacity: { value: 0.5 },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#ff4d4d",
                    opacity: 0.4
                }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" }
                }
            }
        });
    }

    // ========== PAGE TRANSITIONS (GSAP) ========== //
    document.querySelectorAll('a').forEach(link => {
        if (link.href.includes(window.location.origin)) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                gsap.to("body", {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => window.location.href = link.href
                });
            });
        }
    });

    // ========== SCROLL ANIMATIONS ========== //
    function initAnimations() {
        // Hero section
        gsap.to('.hero-title', { y: 0, opacity: 1, duration: 1, delay: 0.2 });
        gsap.to('.hero-subtitle', { y: 0, opacity: 1, duration: 1, delay: 0.4 });
        
        // Section headers
        gsap.to('.section-header h2', {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '.section-header h2',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Work items
        gsap.to('.work-item', {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.work-grid',
                start: 'top 80%'
            }
        });
    }
});
