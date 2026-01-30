import './style.css'

// Smooth scroll and active state management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Mobile Menu Logic
const menuButton = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuButton = document.getElementById('close-menu-btn');

if (menuButton && mobileMenu && closeMenuButton) {
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;

    // Loading state
    button.disabled = true;
    button.innerText = "Envoi en cours...";

    const data = {
        entreprise: form.entreprise.value,
        nom: form.nom.value,
        email: form.email.value,
        telephone: form.telephone.value,
        participants: form.participants.value,
        message: form.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbx6i9fxsQxAFtU6KHxt1nrbWzi9VVB4M93lC3LRTr7q2uYQD4cSnOIbNt3pQsXCBax7zQ/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
    })
        .then(res => res.text()) // Get the text response
        .then(text => {
            if (text.includes("Success")) {
                alert("Message envoyé avec succès !");
                form.reset();
            } else {
                alert("Erreur lors de l'envoi : " + text);
            }
        })
        .catch(err => {
            alert("Erreur technique : " + err);
        })
        .finally(() => {
            button.disabled = false;
            button.innerText = originalText;
        });
});
