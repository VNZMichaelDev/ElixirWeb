// --- MODAL DE COMPRA ---

const buyModal = document.getElementById('buy-modal');
const buyModalTitle = document.getElementById('buy-modal-title');
const buyModalDesc = document.getElementById('buy-modal-desc');
const buyModalQR = document.getElementById('buy-modal-qr');
let currentPlan = null;

const BINANCE_QR = {
  basico: 'https://i.postimg.cc/CdXGc1Q4/binance49.jpg', // Reemplaza por tu QR real
  estandar: 'https://i.postimg.cc/rK4S3T62/binance89.jpg',
  premium: 'https://i.postimg.cc/kDBNN8f4/binance129.jpg',
};

const PLAN_NAMES = {
  basico: 'Plan Básico',
  estandar: 'Plan Estándar',
  premium: 'Plan Premium',
};


function openBuyModal(plan) {
  if (!buyModal) return;
  currentPlan = plan;
  buyModal.classList.add('active');
  buyModalTitle.textContent = `Comprar ${PLAN_NAMES[plan] || ''}`;
  buyModalDesc.textContent = 'Escanea el código QR para pagar con Binance Pay:';
  buyModalQR.src = BINANCE_QR[plan] || '';
  // Limpiar campos
  const orderIdInput = document.getElementById('buy-modal-orderid');
  const msgInput = document.getElementById('buy-modal-message');
  const emailInput = document.getElementById('buy-modal-email');
  if (orderIdInput) orderIdInput.value = '';
  if (msgInput) msgInput.value = '';
  if (emailInput) emailInput.value = '';
}

function closeBuyModal() {
  if (!buyModal) return;
  buyModal.classList.remove('active');
}



// Reemplaza la función confirmPayment por una versión con EmailJS y feedback visual
async function confirmPayment() {
  const msgInput = document.getElementById('buy-modal-message');
  const orderIdInput = document.getElementById('buy-modal-orderid');
  const emailInput = document.getElementById('buy-modal-email');
  const paidBtn = document.getElementById('buy-modal-paid-btn');
  let msg = msgInput && msgInput.value.trim() ? msgInput.value.trim() : '';
  let userEmail = emailInput && emailInput.value.trim() ? emailInput.value.trim() : '';
  let orderId = orderIdInput && orderIdInput.value.trim().toUpperCase();
  const planText = PLAN_NAMES[currentPlan] || '';
  const fullMsg = `¡Hola! Realicé el pago del ${planText}.\n\nMensaje del cliente: ${msg ? msg : '(sin mensaje)'}\nID de orden: ${orderId}`;

  // Validación básica de email
  if (!userEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userEmail)) {
    emailInput.classList.add('input-error');
    paidBtn.textContent = 'Ingresa un correo válido';
    paidBtn.classList.add('btn-error');
    setTimeout(() => {
      paidBtn.textContent = 'Ya pagué / Pago exitoso';
      paidBtn.classList.remove('btn-error');
      emailInput.classList.remove('input-error');
    }, 2000);
    return;
  }
  // Validación de ID de orden
  if (!orderId || orderId.length !== 8) {
    orderIdInput.classList.add('input-error');
    paidBtn.textContent = 'ID de orden inválida';
    paidBtn.classList.add('btn-error');
    setTimeout(() => {
      paidBtn.textContent = 'Ya pagué / Pago exitoso';
      paidBtn.classList.remove('btn-error');
      orderIdInput.classList.remove('input-error');
    }, 2000);
    return;
  }

  paidBtn.disabled = true;
  paidBtn.textContent = 'Enviando...';

  // Configuración EmailJS
  const config = window.ElixirEmailJSConfig || {};
  if (window.emailjs && config.serviceID && config.templateID && config.publicKey) {
    try {
      await window.emailjs.send(config.serviceID, config.templateID, {
        plan: planText,
        message: msg,
        orderid: orderId,
        user_email: userEmail
      });
      paidBtn.textContent = '¡Pago enviado! Revisa tu correo.';
      paidBtn.classList.add('btn-success');
      setTimeout(() => {
        paidBtn.textContent = 'Ya pagué / Pago exitoso';
        paidBtn.classList.remove('btn-success');
        closeBuyModal();
      }, 2500);
    } catch (err) {
      paidBtn.textContent = 'Error al enviar. Intenta de nuevo.';
      paidBtn.classList.add('btn-error');
      setTimeout(() => {
        paidBtn.textContent = 'Ya pagué / Pago exitoso';
        paidBtn.classList.remove('btn-error');
      }, 2500);
      return;
    }
  } else {
    paidBtn.textContent = 'Error de configuración EmailJS';
    paidBtn.classList.add('btn-error');
    setTimeout(() => {
      paidBtn.textContent = 'Ya pagué / Pago exitoso';
      paidBtn.classList.remove('btn-error');
    }, 2500);
    return;
  }

  // 2. Abrir Tawk.to con mensaje prellenado
  if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
    Tawk_API.maximize();
    setTimeout(() => {
      if (typeof Tawk_API.setAttributes === 'function') {
        Tawk_API.setAttributes({ 'Mensaje de compra': fullMsg }, function(error){ });
      }
    }, 500);
    alert('Por favor, comparte la ID de orden en el chat que se abrirá.');
  } else {
    // 3. Si no está cargado, abrir WhatsApp con mensaje y sugerir enviar la ID
    const phoneNumber = "3225880160";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMsg + '\n(ID de orden incluida)')}`;
    window.open(whatsappUrl, "_blank");
  }
}


/*
  EmailJS TEMPLATE SUGERIDO (HTML):
  Puedes usar este HTML en tu template de EmailJS para que el cliente reciba un correo bonito y moderno, acorde al estilo de tu web.
  Personalízalo en https://dashboard.emailjs.com/templates
*/

/*
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Pago Exitoso - ElixirWeb Studio</title>
  <style>
    body { background: #181c2f; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 0; margin: 0; }
    .container { max-width: 420px; margin: 2rem auto; background: #201c35; border-radius: 1.5rem; box-shadow: 0 8px 32px #a855f733; padding: 2rem; text-align: center; }
    .logo { width: 60px; height: 60px; border-radius: 50%; background: #fff; margin-bottom: 1rem; }
    .title { font-size: 1.5rem; font-weight: 700; background: linear-gradient(to right, #a855f7, #3b82f6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
    .desc { color: #c7d2fe; margin-bottom: 1.5rem; }
    .plan { font-size: 1.1rem; color: #a855f7; font-weight: 600; margin-bottom: 1rem; }
    .msg { background: #181c2f; color: #fff; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; border: 1px solid #a855f7; }
    .capture { margin: 1.5rem 0; }
    .capture img { max-width: 220px; border-radius: 0.7rem; box-shadow: 0 2px 8px #a855f71a; }
    .footer { color: #93c5fd; font-size: 0.95rem; margin-top: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://i.postimg.cc/W3CsCG95/logo.png" class="logo" alt="ElixirWeb Studio" />
    <div class="title">¡Pago Exitoso!</div>
    <div class="desc">Gracias por tu compra en <b>ElixirWeb Studio</b>. Hemos recibido tu pago y comenzaremos a procesar tu servicio.</div>
    <div class="plan">Plan/Servicio: <b>${plan}</b></div>
    <div class="msg">Mensaje del cliente:<br>${message}</div>
    <div class="capture">
      <b>Capture de pago:</b><br>
      <img src="${image}" alt="Capture de pago" />
    </div>
    <div class="footer">
      Si tienes dudas, responde este correo o contáctanos por WhatsApp.<br>
      <b>ElixirWeb Studio</b> | elixirwebstudio@gmail.com
    </div>
  </div>
</body>
</html>
*/

// Cerrar modal con ESC o click fuera
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeBuyModal();
});
window.addEventListener('click', function(e) {
  if (buyModal && buyModal.classList.contains('active')) {
    if (e.target === buyModal) closeBuyModal();
  }
});

// Preview de imagen
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('buy-modal-capture');
  const preview = document.getElementById('buy-modal-capture-preview');
  if (fileInput && preview) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          preview.src = ev.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
        preview.style.display = 'none';
      }
    });
  }
});

// Global variables
let isMobileMenuOpen = false

// WhatsApp function - General
function openWhatsApp() {
  const phoneNumber = "3225880160"
  const message = "¡Hola! Me interesa conocer más sobre los servicios de ElixirWeb Studio. ¿Podrían ayudarme?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// WhatsApp functions - Cursos específicos
function openWhatsAppHTMLCSS() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesa el curso de HTML & CSS Fundamentals por $20 USD (50% OFF). ¿Podrían darme más información sobre el contenido, duración y cómo inscribirme?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppDesign() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesa el curso de Diseño Web & Mockups por $18 USD (40% OFF). ¿Podrían darme más información sobre el programa, proyectos incluidos y proceso de inscripción?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppCursos() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesan sus cursos de Elixir Class. ¿Podrían darme información sobre todos los cursos disponibles, precios y métodos de pago?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// WhatsApp functions - Eventos específicos
function openWhatsAppProgramming() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesa participar en el Elixir Event - Competencia de Programación. La inscripción es de $2 USD. ¿Podrían darme más detalles sobre las fechas, requisitos y cómo inscribirme?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppDesignEvent() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesa participar en la Competición de Diseño. La inscripción es de $2 USD. ¿Podrían darme información sobre las fechas, herramientas permitidas y proceso de inscripción?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function openWhatsAppEventos() {
  const phoneNumber = "3225880160"
  const message =
    "¡Hola! Me interesan sus eventos de Elixir Event. ¿Podrían darme información sobre próximas fechas, métodos de pago para la inscripción y todos los eventos disponibles?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Social Media Functions
function openFacebook() {
  window.open("https://www.facebook.com/profile.php?id=61577714213330", "_blank")
}

function openInstagram() {
  window.open("https://www.instagram.com/elixirwebstudio/", "_blank")
}

function openTikTok() {
  window.open("https://www.tiktok.com/@elixirdevone?is_from_webapp=1&sender_device=pc", "_blank")
}

function openSecondPhone() {
  const phoneNumber = "584245851434"
  const message = "¡Hola! Me interesa conocer más sobre los servicios de ElixirWeb Studio. ¿Podrían ayudarme?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function openEmail() {
  window.open("mailto:ElixirWebStudio@gmail.com", "_blank")
}

// Smooth scroll function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 100
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
  closeMobileMenu()
}

// Mobile menu functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")

  isMobileMenuOpen = !isMobileMenuOpen

  if (isMobileMenuOpen) {
    mobileMenu.classList.add("active")
    menuIcon.className = "fas fa-times"
  } else {
    mobileMenu.classList.remove("active")
    menuIcon.className = "fas fa-bars"
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")

  isMobileMenuOpen = false
  mobileMenu.classList.remove("active")
  menuIcon.className = "fas fa-bars"
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar")
  const navContent = navbar.querySelector(".nav-content")
  const scrollY = window.scrollY

  if (scrollY > 100) {
    navContent.style.background = "rgba(0,0,0,0.85)"
  } else {
    navContent.style.background = "rgba(0,0,0,0.55)"
  }
}

// OPTIMIZED Intersection Observer for animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target) // Stop observing once animated
      }
    })
  }, observerOptions)

  // Only animate cards and headers
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .pricing-card, .testimonial-card, .section-header, .social-card, .project-card",
  )

  elementsToAnimate.forEach((el) => {
    observer.observe(el)
  })
}

// OPTIMIZED Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter, index) => {
    const target = counter.textContent
    const isPercentage = target.includes("%")
    const isStars = target.includes("★")
    const isTime = target.includes("/")

    if (isPercentage || isStars || isTime) return

    const numericValue = Number.parseInt(target.replace("+", ""))
    let current = 0
    const increment = numericValue / 40 // Faster animation
    const delay = index * 100 // Reduced delay

    setTimeout(() => {
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          counter.textContent = target
          clearInterval(timer)
        } else {
          counter.textContent = Math.floor(current) + "+"
        }
      }, 25) // Faster updates
    }, delay)
  })
}

// OPTIMIZED Service animations
function setupServiceAnimations() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card, index) => {
    // Reduced animation delay
    card.style.animationDelay = `${index * 0.1}s`
  })
}

// OPTIMIZED Image lazy loading
function setupOptimizedLazyLoading() {
  const images = document.querySelectorAll("img[loading='lazy']")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target

            // Preload the image
            const imageLoader = new Image()
            imageLoader.onload = () => {
              img.style.opacity = "1"
            }
            imageLoader.src = img.src

            imageObserver.unobserve(img)
          }
        })
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
      },
    )

    images.forEach((img) => {
      img.style.opacity = "0"
      img.style.transition = "opacity 0.3s ease"
      imageObserver.observe(img)
    })
  }
}

// PERFORMANCE: Debounced scroll handler
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Event listeners - OPTIMIZED
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  setupScrollAnimations()
  setupServiceAnimations()
  setupOptimizedLazyLoading()

  // Animate counters when hero section is visible
  const heroSection = document.getElementById("inicio")
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateCounters, 500) // Reduced delay
            heroObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }, // Reduced threshold
    )

    heroObserver.observe(heroSection)
  }

  // OPTIMIZED background image handling
  const backgroundImage = document.querySelector(".bg-image")
  if (backgroundImage) {
    backgroundImage.style.opacity = "1"
    backgroundImage.style.display = "block"
    backgroundImage.style.visibility = "visible"
    backgroundImage.style.position = "fixed"
    backgroundImage.style.transform = "none"
  }

  const contactBgImage = document.querySelector(".contact-bg-image")
  if (contactBgImage) {
    contactBgImage.style.opacity = "1"
    contactBgImage.style.display = "block"
    contactBgImage.style.visibility = "visible"
    contactBgImage.style.transform = "none"
  }
})

// OPTIMIZED scroll event listener with debouncing
window.addEventListener("scroll", debounce(handleNavbarScroll, 10))

// Resize event listener
window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      closeMobileMenu()
    }
  }, 250),
)

// OPTIMIZED click outside handler
document.addEventListener("click", (event) => {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (isMobileMenuOpen && !mobileMenu?.contains(event.target) && !menuBtn?.contains(event.target)) {
    closeMobileMenu()
  }
})

// PERFORMANCE: Preload critical resources
function preloadCriticalResources() {
  const criticalImages = ["https://i.postimg.cc/mk9TsPJB/fondo.jpg", "https://i.postimg.cc/W3CsCG95/logo.png"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", preloadCriticalResources)

// PERFORMANCE: Reduce paint operations
function optimizeAnimations() {
  const cards = document.querySelectorAll(".project-card, .service-card")

  cards.forEach((card) => {
    card.style.willChange = "transform"

    card.addEventListener("mouseenter", () => {
      card.style.willChange = "transform"
    })

    card.addEventListener("mouseleave", () => {
      card.style.willChange = "auto"
    })
  })
}

document.addEventListener("DOMContentLoaded", optimizeAnimations)


var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/684e78b14aea20190b635e6c/1itp8etlj';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})();
// End of Tawk.to Script
