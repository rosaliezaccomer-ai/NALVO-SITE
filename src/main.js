import './style.css'

// Smooth scroll and active state management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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
        participants: form.participants.value,
        message: form.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbx6i9fxsQxAFtU6KHxt1nrbWzi9VVB4M93lC3LRTr7q2uYQD4cSnOIbNt3pQsXCBax7zQ/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
    })
        .then(() => {
            alert("Message envoyé !");
            form.reset();
        })
        .catch(() => {
            alert("Erreur d’envoi. Veuillez réessayer.");
        })
        .finally(() => {
            button.disabled = false;
            button.innerText = originalText;
        });
});
