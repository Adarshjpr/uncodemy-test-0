document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    const particleContainer = document.getElementById('uncodemyParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('uncodemy-particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particleContainer.appendChild(particle);
    }
    
    // Modal functionality
    // const modalTriggers = document.querySelectorAll('[href^="#"]');
    // const modals = document.querySelectorAll('.uncodemy-modal');
    // const closeButtons = document.querySelectorAll('.uncodemy-modal-close');
    
    // modalTriggers.forEach(trigger => {
    //     if (trigger.getAttribute('href').startsWith('#request-call') || 
    //         trigger.getAttribute('href').startsWith('#schedule-demo')) {
            
    //         trigger.addEventListener('click', function(e) {
    //             e.preventDefault();
    //             const target = this.getAttribute('href');
    //             document.querySelector(target).classList.add('active');
    //             document.body.style.overflow = 'hidden';
    //         });
    //     }
    // });
    
    // closeButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         this.closest('.uncodemy-modal').classList.remove('active');
    //         document.body.style.overflow = '';
    //     });
    // });
    
    // modals.forEach(modal => {
    //     modal.addEventListener('click', function(e) {
    //         if (e.target === this) {
    //             this.classList.remove('active');
    //             document.body.style.overflow = '';
    //         }
    //     });
    // });
    
    // Back to top button
    const backToTopButton = document.querySelector('.uncodemy-back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.uncodemy-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardPosition < windowHeight - cardVisible) {
                card.style.animation = `uncodemyFadeInUp 0.6s ${index * 0.2 + 0.8}s forwards`;
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.getAttribute('href').startsWith('#request-call') && 
            !anchor.getAttribute('href').startsWith('#schedule-demo')) {
            
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
   
});