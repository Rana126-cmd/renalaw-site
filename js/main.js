/**
 * RENA LAW - Main JavaScript
 * Handles: Mobile Menu, Smooth Scroll, Header Scroll Effect, Form Validation
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on nav links
    const navLinkItems = document.querySelectorAll('.nav-links a:not(.language-switcher a)');
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================
    const header = document.querySelector('header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Run on page load

    // =====================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =====================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // ACTIVE NAV LINK ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // =====================================================
    // CONTACT FORM HANDLING
    // =====================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            const formMessage = document.querySelector('.form-message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, getErrorMessage('name_required'));
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, getErrorMessage('name_short'));
                isValid = false;
            }
            
            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, getErrorMessage('email_required'));
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, getErrorMessage('email_invalid'));
                isValid = false;
            }
            
            // Phone validation (optional, but if provided should be valid)
            if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
                showError(phoneInput, getErrorMessage('phone_invalid'));
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, getErrorMessage('message_required'));
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, getErrorMessage('message_short'));
                isValid = false;
            }
            
            if (isValid) {
                // Disable submit button
                submitBtn.disabled = true;
                submitBtn.textContent = getSubmitText('sending');
                
                // Simulate form submission (replace with actual backend integration)
                setTimeout(() => {
                    // Show success message
                    formMessage.className = 'form-message success';
                    formMessage.textContent = getSuccessMessage();
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = getSubmitText('default');
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    // =====================================================
    // FORM HELPER FUNCTIONS
    // =====================================================
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (!existingError) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            formGroup.appendChild(errorDiv);
        }
        
        input.style.borderColor = '#dc3545';
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
    }

    // =====================================================
    // MULTILINGUAL MESSAGES
    // =====================================================
    function getCurrentLanguage() {
        const path = window.location.pathname;
        if (path.includes('/tr/')) return 'tr';
        if (path.includes('/fr/')) return 'fr';
        return 'en';
    }

    function getErrorMessage(key) {
        const lang = getCurrentLanguage();
        const messages = {
            tr: {
                name_required: 'Lütfen adınızı giriniz.',
                name_short: 'Ad en az 2 karakter olmalıdır.',
                email_required: 'Lütfen e-posta adresinizi giriniz.',
                email_invalid: 'Lütfen geçerli bir e-posta adresi giriniz.',
                phone_invalid: 'Lütfen geçerli bir telefon numarası giriniz.',
                message_required: 'Lütfen mesajınızı yazınız.',
                message_short: 'Mesaj en az 10 karakter olmalıdır.'
            },
            en: {
                name_required: 'Please enter your name.',
                name_short: 'Name must be at least 2 characters.',
                email_required: 'Please enter your email address.',
                email_invalid: 'Please enter a valid email address.',
                phone_invalid: 'Please enter a valid phone number.',
                message_required: 'Please enter your message.',
                message_short: 'Message must be at least 10 characters.'
            },
            fr: {
                name_required: 'Veuillez entrer votre nom.',
                name_short: 'Le nom doit contenir au moins 2 caractères.',
                email_required: 'Veuillez entrer votre adresse email.',
                email_invalid: 'Veuillez entrer une adresse email valide.',
                phone_invalid: 'Veuillez entrer un numéro de téléphone valide.',
                message_required: 'Veuillez entrer votre message.',
                message_short: 'Le message doit contenir au moins 10 caractères.'
            }
        };
        return messages[lang][key] || messages['en'][key];
    }

    function getSuccessMessage() {
        const lang = getCurrentLanguage();
        const messages = {
            tr: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
            en: 'Your message has been sent successfully. We will get back to you as soon as possible.',
            fr: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        };
        return messages[lang] || messages['en'];
    }

    function getSubmitText(type) {
        const lang = getCurrentLanguage();
        const messages = {
            tr: {
                default: 'Gönder',
                sending: 'Gönderiliyor...'
            },
            en: {
                default: 'Send Message',
                sending: 'Sending...'
            },
            fr: {
                default: 'Envoyer',
                sending: 'Envoi en cours...'
            }
        };
        return messages[lang][type] || messages['en'][type];
    }

    // =====================================================
    // SCROLL REVEAL ANIMATION (Simple)
    // =====================================================
    function revealOnScroll() {
        const elements = document.querySelectorAll('.practice-card, .team-card, .feature-item, .contact-item');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize reveal styles
    const revealElements = document.querySelectorAll('.practice-card, .team-card, .feature-item, .contact-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on page load

    // =====================================================
    // KEYBOARD ACCESSIBILITY
    // =====================================================
    // Handle Enter key on menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        menuToggle.setAttribute('tabindex', '0');
        menuToggle.setAttribute('role', 'button');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }

    // =====================================================
    // ESCAPE KEY TO CLOSE MENU
    // =====================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

});
