// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Test Drive Modal
function openTestDriveModal(carModel = '') {
    const modal = document.getElementById('testDriveModal');
    const select = document.getElementById('carModel');
    
    if (carModel && select) {
        select.value = carModel;
    }
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// EMI Calculator Modal
function openEMICalculator() {
    const modal = document.getElementById('emiModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        calculateEMI(); // Calculate initial values
    }
}

// EMI Calculation
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 500000;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 8.5;
    const loanTenure = parseFloat(document.getElementById('loanTenure').value) || 5;
    
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTenure * 12;
    
    const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalAmount = emi * numPayments;
    const totalInterest = totalAmount - loanAmount;
    
    // Update display
    document.getElementById('emiAmount').textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    document.getElementById('principalAmount').textContent = `₹${loanAmount.toLocaleString('en-IN')}`;
    document.getElementById('totalInterest').textContent = `₹${Math.round(totalInterest).toLocaleString('en-IN')}`;
    document.getElementById('totalAmount').textContent = `₹${Math.round(totalAmount).toLocaleString('en-IN')}`;
}

// Slider Updates
function updateLoanAmount() {
    const slider = document.getElementById('loanSlider');
    const input = document.getElementById('loanAmount');
    input.value = slider.value;
    calculateEMI();
}

function updateInterestRate() {
    const slider = document.getElementById('rateSlider');
    const input = document.getElementById('interestRate');
    input.value = slider.value;
    calculateEMI();
}

function updateTenure() {
    const slider = document.getElementById('tenureSlider');
    const input = document.getElementById('loanTenure');
    input.value = slider.value;
    calculateEMI();
}

// Sync input changes with sliders
document.addEventListener('DOMContentLoaded', function() {
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTenure = document.getElementById('loanTenure');
    
    if (loanAmount) {
        loanAmount.addEventListener('input', function() {
            document.getElementById('loanSlider').value = this.value;
            calculateEMI();
        });
    }
    
    if (interestRate) {
        interestRate.addEventListener('input', function() {
            document.getElementById('rateSlider').value = this.value;
            calculateEMI();
        });
    }
    
    if (loanTenure) {
        loanTenure.addEventListener('input', function() {
            document.getElementById('tenureSlider').value = this.value;
            calculateEMI();
        });
    }
});

// Form Submissions
function handleTestDriveForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    alert('Thank you for booking a test drive! We will contact you soon to confirm your appointment.');
    
    // Close modal and reset form
    closeModal('testDriveModal');
    event.target.reset();
    
    // In a real application, you would send this data to your server
    console.log('Test Drive Booking:', data);
}

function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send this data to your server
    console.log('Contact Form:', data);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Car Comparison (Placeholder)
function compareCars() {
    alert('Car comparison feature coming soon! Call us at +91 353 250 5000 for detailed comparisons.');
}

// Service Booking (Placeholder)
function bookService() {
    alert('Service booking feature coming soon! Call us at +91 353 250 5000 to book your service.');
}

// Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.car-card, .feature-card, .service-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track WhatsApp clicks for analytics
        console.log('WhatsApp link clicked');
    });
});

// Phone Click Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track phone clicks for analytics
        console.log('Phone link clicked');
    });
});