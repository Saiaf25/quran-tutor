// Language switching functionality
let currentLang = 'ar'; // Default to Arabic

function initLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }

    // Set the dropdown to the current language
    document.getElementById('lang-select').value = currentLang;

    // Apply the language
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    const html = document.documentElement;
    const body = document.body;

    // Update HTML attributes
    html.setAttribute('lang', lang);

    // Set direction based on language
    if (lang === 'ar') {
        body.setAttribute('dir', 'rtl');
    } else {
        body.setAttribute('dir', 'ltr');
    }

    // Hide all language content first
    document.querySelectorAll('.lang-en, .lang-ar, .lang-tr').forEach(el => {
        el.style.display = 'none';
    });

    // Show content for selected language
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = '';
    });

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    currentLang = lang;
}

// Language dropdown event listener
document.getElementById('lang-select').addEventListener('change', function(e) {
    applyLanguage(e.target.value);
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Create WhatsApp message based on current language
    let whatsappMessage;

    if (currentLang === 'ar') {
        whatsappMessage = `السلام عليكم الشيخ جمال،\n\nاسمي ${formData.name}\nالبريد الإلكتروني: ${formData.email}\n${formData.phone ? `رقم الهاتف: ${formData.phone}\n` : ''}\nالرسالة: ${formData.message}`;
    } else if (currentLang === 'tr') {
        whatsappMessage = `Merhaba Şeyh Cemal,\n\nAdım ${formData.name}\nE-posta: ${formData.email}\n${formData.phone ? `Telefon: ${formData.phone}\n` : ''}\nMesaj: ${formData.message}`;
    } else {
        whatsappMessage = `Hello Sheikh Gamal,\n\nMy name is ${formData.name}\nEmail: ${formData.email}\n${formData.phone ? `Phone: ${formData.phone}\n` : ''}\nMessage: ${formData.message}`;
    }

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
