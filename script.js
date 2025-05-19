document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Download Resume Button
    const downloadBtn = document.getElementById('download-resume');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        //alert('Resume download will start shortly.');
        // In a real implementation, you would link to your actual resume file
         window.location.href = 'https://drive.google.com/file/d/1o6t5CRSW33x5q9f6RBBE0wD0Jvf2j4fe/view?usp=sharing';
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});// Certificate Viewing Functionality
document.querySelectorAll('.view-certificate-btn').forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Array of your certificate URLs - replace with your actual links
        const certificateUrls = [
            'https://coursera.org/verify/specialization/879ZL4C2BF98', // Advanced Data Structures
            'https://coursera.org/verify/BEAR7SEZHFMG', // Web Development
            'https://coursera.org/verify/E2J9BMPJCA3N'  // Cloud Computing
        ];
        
        // Open certificate in new tab
        window.open(certificateUrls[index], '_blank');
        
        // Alternatively, you could show a modal with the certificate image:
        // showCertificateModal(certificateUrls[index]);
    });
});

// Optional: Function to show certificate in modal
function showCertificateModal(certificateUrl) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'certificate-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'certificate-close-btn';
    closeBtn.innerHTML = '&times;';
    
    const certificateImg = document.createElement('img');
    certificateImg.src = certificateUrl;
    certificateImg.alt = 'Certificate';
    
    // Build modal structure
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(certificateImg);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    });
}



const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'btn-icon';
document.querySelector('.user-actions').prepend(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
document.body.classList.toggle('dark-mode');
const icon = this.querySelector('i');
if (document.body.classList.contains('dark-mode')) {
icon.classList.replace('fa-moon', 'fa-sun');
} else {
icon.classList.replace('fa-sun', 'fa-moon');
}
});