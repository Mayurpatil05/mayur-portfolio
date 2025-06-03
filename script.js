document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    const icon = document.getElementById('toggle-icon');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            icon.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Animate skill bars when section is visible
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Update your existing Intersection Observer callback
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}
      // Observe all sections
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize tilt effect on project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.elements[0].value;
            const email = this.elements[1].value;
            const message = this.elements[2].value;
            
            // Here you would typically send the data to a server
            console.log({ name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});