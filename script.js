// ================================================
// CONFIGURACIÓN GLOBAL Y VARIABLES
// ================================================

// CAMBIAR: Tu número de WhatsApp real (sin + ni espacios)
const WHATSAPP_NUMBER = '1234567890';
const OWNER_NAME = 'Luis Romero';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? The Print - Website loaded successfully');
    
    // Inicializar todas las funcionalidades
    initializeAnimations();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeParallaxEffects();
    initializeCounters();
    
    // Agregar efectos especiales
    initializeSpecialEffects();
});

// ================================================
// ANIMACIONES CON AOS
// ================================================

function initializeAnimations() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Animación de entrada para las letras del logo
    animateLogoLetters();
}

function animateLogoLetters() {
    const letters = document.querySelectorAll('.logo .letter');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                letter.style.transition = 'all 0.6s ease-out';
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
}

// ================================================
// SCROLL SUAVE
// ================================================

function initializeSmoothScrolling() {
    // Smooth scroll para enlaces internos
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
    
    // Header background en scroll
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleHeaderScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.hero');
    
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Mostrar/ocultar botón flotante de WhatsApp
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        if (scrolled > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }
    }
}

// ================================================
// FORMULARIO DE CONTACTO
// ================================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[placeholder*="nombre"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Validación básica
    if (!name || !email || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `Hola ${OWNER_NAME},%0A%0ANombre: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMensaje: ${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp con el mensaje pre-llenado
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');
    
    // Mostrar notificación de éxito
    showNotification('¡Mensaje preparado en WhatsApp!', 'success');
    
    // Limpiar formulario
    e.target.reset();
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        maxWidth: '300px'
    });
    
    // Colores según el tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ================================================
// EFECTOS DE PARALLAX Y INTERACTIVIDAD
// ================================================

function initializeParallaxEffects() {
    window.addEventListener('scroll', handleParallax);
    
    // Efectos hover mejorados
    initializeHoverEffects();
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.splash');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

function initializeHoverEffects() {
    // Efecto 3D en las tarjetas
    const cards = document.querySelectorAll('.service-card, .benefit-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Efecto de texto que sigue el mouse
    const logo = document.querySelector('.logo');
    if (logo) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const letters = logo.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                const moveX = (mouseX - 0.5) * (index + 1) * 2;
                const moveY = (mouseY - 0.5) * (index + 1) * 2;
                
                letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

// ================================================
// CONTADORES Y EFECTOS ESPECIALES
// ================================================

function initializeCounters() {
    // Animación de números en estadísticas (si las agregas)
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

function initializeSpecialEffects() {
    // Partículas flotantes (opcional)
    createFloatingParticles();
    
    // Efecto de escritura en el subtítulo
    typewriterEffect();
    
    // Efectos de sonido (opcional)
    initializeSoundEffects();
}

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    Object.assign(particlesContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '1'
    });
    
    document.body.appendChild(particlesContainer);
    
    // Crear partículas de colores CMYK
    const colors = ['#00BCD4', '#E91E63', '#FFEB3B', '#212121'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: Math.random() * 0.6 + 0.2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`
        });
        
        particlesContainer.appendChild(particle);
    }
}

function typewriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #00BCD4';
        
        let i = 0;
        const timer = setInterval(() => {
            subtitle.textContent += originalText.charAt(i);
            i++;
            
            if (i >= originalText.length) {
                clearInterval(timer);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
}

function initializeSoundEffects() {
    // Sonido sutil al hacer hover en botones (opcional)
    const buttons = document.querySelectorAll('.whatsapp-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Aquí puedes agregar un sonido sutil si lo deseas
            // new Audio('hover-sound.mp3').play();
        });
    });
}

// ================================================
// UTILIDADES Y HELPERS
// ================================================

// Función para actualizar número de WhatsApp dinámicamente
function updateWhatsAppNumber(newNumber) {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const url = new URL(link.href);
        url.pathname = `/${newNumber}`;
        link.href = url.toString();
    });
}

// Función para agregar nuevas secciones dinámicamente
function addSection(sectionData) {
    const container = document.querySelector('.container');
    const newSection = document.createElement('section');
    newSection.className = 'dynamic-section';
    
    newSection.innerHTML = `
        <h2>${sectionData.title}</h2>
        <div class="content">${sectionData.content}</div>
    `;
    
    container.appendChild(newSection);
}

// Función para lazy loading de imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================================
// EVENTOS DE VENTANA
// ================================================

// Optimización de rendimiento en scroll
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    handleParallax();
    handleHeaderScroll();
    ticking = false;
}

// Throttle para eventos de scroll y resize
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Event listeners optimizados
window.addEventListener('scroll', requestTick);
window.addEventListener('resize', throttle(() => {
    // Recalcular posiciones en resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// ================================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ================================================

// Hacer funciones disponibles globalmente si es necesario
window.ThePrint = {
    updateWhatsAppNumber,
    addSection,
    showNotification,
    initializeLazyLoading
};