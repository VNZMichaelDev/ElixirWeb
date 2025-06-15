// Global variables
let isMobileMenuOpen = false

// WhatsApp function
function openWhatsApp() {
  const phoneNumber = "3225880160"
  const message = "¡Hola! Me interesa conocer más sobre los servicios de ElixirWeb Studio. ¿Podrían ayudarme?"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
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

// Intersection Observer for animations MEJORADO
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Solo animar tarjetas y headers
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .pricing-card, .testimonial-card, .section-header"
  )

  elementsToAnimate.forEach((el) => {
    el.classList.remove("fade-in")
    observer.observe(el)
  })
}

// Counter animation for stats MEJORADO
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
    const increment = numericValue / 60
    const delay = index * 200

    setTimeout(() => {
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          counter.textContent = target
          clearInterval(timer)
        } else {
          counter.textContent = Math.floor(current) + "+"
        }
      }, 30)
    }, delay)
  })
}

// ANIMACIÓN MEJORADA PARA SERVICIOS
function setupServiceAnimations() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card, index) => {
    // Animación de entrada escalonada
    card.style.animationDelay = `${index * 0.2}s`

    // Efecto hover mejorado
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
      this.style.boxShadow = "0 25px 50px rgba(147, 51, 234, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
    })
  })
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  setupScrollAnimations()
  setupServiceAnimations()

  // Animate counters when hero section is visible
  const heroSection = document.getElementById("inicio")
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 1000)
          heroObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  heroObserver.observe(heroSection)

  // ARREGLO PARA EL FONDO - Asegurar que la imagen de fondo se mantenga visible y FIJA
  const backgroundImage = document.querySelector(".bg-image")
  if (backgroundImage) {
    backgroundImage.style.opacity = "1"
    backgroundImage.style.display = "block"
    backgroundImage.style.visibility = "visible"
    backgroundImage.style.position = "fixed"
    backgroundImage.style.transform = "none"

    // Prevenir que se oculte
    backgroundImage.onload = function () {
      this.style.opacity = "1"
      this.style.display = "block"
      this.style.visibility = "visible"
      this.style.position = "fixed"
      this.style.transform = "none"
    }

    // Si hay error, no ocultar
    backgroundImage.onerror = function () {
      console.log("Error loading background image, but keeping visible")
      this.style.opacity = "1"
      this.style.display = "block"
    }
  }

  // Asegurar que el fondo de contacto también se mantenga visible y fijo
  const contactBgImage = document.querySelector(".contact-bg-image")
  if (contactBgImage) {
    contactBgImage.style.opacity = "1"
    contactBgImage.style.display = "block"
    contactBgImage.style.visibility = "visible"
    contactBgImage.style.transform = "none"
  }

  // Ajustar visibilidad de la imagen del menú
  const menuBgImage = document.querySelector(".bg-image");

  if (menuBgImage) {
    // Solo aseguramos que la imagen esté visible al cargar
    menuBgImage.style.opacity = "1";
    menuBgImage.style.display = "block";
    menuBgImage.style.visibility = "visible";
  }
})

// Scroll event listeners SIMPLIFICADO (SIN PARALLAX)
window.addEventListener("scroll", () => {
  handleNavbarScroll()
})

// Resize event listener
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isMobileMenuOpen) {
    closeMobileMenu()
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (isMobileMenuOpen && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
    closeMobileMenu()
  }
})

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = (target) => {
    const element = document.getElementById(target)
    if (element) {
      const offsetTop = element.offsetTop - 100
      const startPosition = window.pageYOffset
      const distance = offsetTop - startPosition
      const duration = 1000
      let start = null

      function step(timestamp) {
        if (!start) start = timestamp
        const progress = timestamp - start
        const progressPercentage = Math.min(progress / duration, 1)

        // Easing function
        const ease =
          progressPercentage < 0.5
            ? 2 * progressPercentage * progressPercentage
            : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < duration) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }
  }

  // Override scrollToSection for older browsers
  window.scrollToSection = (sectionId) => {
    smoothScrollPolyfill(sectionId)
    closeMobileMenu()
  }
}

// Performance optimization: Lazy load images (SOLO PARA IMÁGENES QUE NO SEAN EL FONDO)
function setupLazyLoading() {
  const images = document.querySelectorAll("img[src]:not(.bg-image):not(.contact-bg-image)")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.style.opacity = "0"
          img.style.transition = "opacity 0.3s ease"

          img.onload = () => {
            img.style.opacity = "1"
          }

          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", setupLazyLoading)

// Add loading state for buttons
function addButtonLoadingState() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.onclick && this.onclick.toString().includes("openWhatsApp")) {
        this.style.opacity = "0.7"
        this.style.pointerEvents = "none"

        setTimeout(() => {
          this.style.opacity = "1"
          this.style.pointerEvents = "auto"
        }, 1000)
      }
    })
  })
}

// Initialize button loading states
document.addEventListener("DOMContentLoaded", addButtonLoadingState)

// FUNCIÓN MEJORADA PARA MANEJAR IMÁGENES (EXCLUYENDO LOS FONDOS)
function fixImageLoading() {
  const images = document.querySelectorAll("img:not(.bg-image):not(.contact-bg-image)")

  images.forEach((img) => {
    if (!img.dataset.listenerAdded) {
      img.addEventListener("error", function handler() {
        // Evita bucles infinitos
        if (this.dataset.triedExtensions) return

        const baseSrc = this.src.split(".")[0]
        const extensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"]
        let found = false

        let tryIndex = 0
        const tryNext = () => {
          if (tryIndex >= extensions.length) {
            // Si ninguna funciona, oculta la imagen
            this.style.display = "none"
            return
          }
          const testImg = new window.Image()
          testImg.src = baseSrc + extensions[tryIndex]
          testImg.onload = () => {
            this.src = testImg.src
            found = true
          }
          testImg.onerror = () => {
            tryIndex++
            tryNext()
          }
        }
        tryNext()

        this.dataset.triedExtensions = "1"
      })
      img.dataset.listenerAdded = "1"
    }
  })
}

// Ejecuta la función cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  fixImageLoading()
  setTimeout(fixImageLoading, 1000)
})
