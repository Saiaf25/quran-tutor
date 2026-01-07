// Language switching functionality
let currentLang = 'en';

function initLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        if (currentLang === 'ar') {
            switchLanguage();
        }
    }
}

function switchLanguage() {
    const html = document.documentElement;
    const body = document.body;

    if (currentLang === 'en') {
        currentLang = 'ar';
        html.setAttribute('lang', 'ar');
        body.setAttribute('dir', 'rtl');

        // Hide English content, show Arabic content
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.lang-ar').forEach(el => {
            el.style.display = '';
        });
    } else {
        currentLang = 'en';
        html.setAttribute('lang', 'en');
        body.setAttribute('dir', 'ltr');

        // Hide Arabic content, show English content
        document.querySelectorAll('.lang-ar').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = '';
        });
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', currentLang);
}

// Language toggle button event listener
document.getElementById('lang-btn').addEventListener('click', switchLanguage);

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // In a real implementation, you would send this data to a server
    // For now, we'll create a mailto link with the form data
    const subject = currentLang === 'en'
        ? `New Contact Form Submission from ${formData.name}`
        : `رسالة جديدة من ${formData.name}`;

    const body = currentLang === 'en'
        ? `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`
        : `الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
رقم الهاتف: ${formData.phone}

الرسالة:
${formData.message}`;

    // Create WhatsApp message
    const whatsappMessage = currentLang === 'en'
        ? `Hello Sheikh Gamal,\n\nMy name is ${formData.name}\nEmail: ${formData.email}\n${formData.phone ? `Phone: ${formData.phone}\n` : ''}\nMessage: ${formData.message}`
        : `السلام عليكم الشيخ جمال،\n\nاسمي ${formData.name}\nالبريد الإلكتروني: ${formData.email}\n${formData.phone ? `رقم الهاتف: ${formData.phone}\n` : ''}\nالرسالة: ${formData.message}`;

    const whatsappUrl = `https://wa.me/905524423135?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp with pre-filled message
    window.open(whatsappUrl, '_blank');

    // Show success message
    document.getElementById('form-success').style.display = 'block';
    document.getElementById('form-error').style.display = 'none';

    // Reset form
    document.getElementById('contact-form').reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
    }, 5000);
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', initLanguage);

// Smooth scrolling for anchor links (if any are added later)
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
