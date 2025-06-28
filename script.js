// Global variables
let isMobileMenuOpen = false

// WhatsApp function
function openWhatsApp() {
  const phoneNumber = "3225880160"
  const message = "¡Hola! Me interesa conocer más sobre los servicios de ElixirWeb Studio. ¿Podrían ayudarme?"
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
