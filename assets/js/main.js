document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form && submitBtn) {
        (function() {
            emailjs.init("aTjg_QIZnKVwhKDox");
        })();

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_j3w3pbo', 'template_p4rlzf5', templateParams)
                .then(function() {
                    submitBtn.textContent = 'Message envoyé !';
                    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                    form.reset();
                    setTimeout(() => {
                        submitBtn.textContent = 'Envoyer le message';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-green-600', 'hover:bg-green-700');
                    }, 3000);
                }, function(error) {
                    submitBtn.textContent = 'Erreur, réessayez';
                    submitBtn.classList.add('bg-red-600', 'hover:bg-red-700');
                    console.error('EmailJS Error:', error);
                    setTimeout(() => {
                        submitBtn.textContent = 'Envoyer le message';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-red-600', 'hover:bg-red-700');
                    }, 3000);
                });
        });
    }
});