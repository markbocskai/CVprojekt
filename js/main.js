
(function() {
    emailjs.init("TE_EMAILJS_PUBLIC_KEY");
})();
const contactForm = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    grecaptcha.execute();
});
function onSubmit(token) {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = "Küldés folyamatban...";
    submitBtn.disabled = true;
    emailjs.sendForm('TE_SERVICE_ID', 'TE_TEMPLATE_ID', '#contact-form')
        .then(function() {
            statusDiv.innerText = "Az üzenetet sikeresen elküldtük!";
            statusDiv.style.color = "#10b981"; 
            contactForm.reset();
            grecaptcha.reset();
        }, function(error) {
            statusDiv.innerText = "Hiba történt a küldés során. Kérjük, próbálja újra.";
            statusDiv.style.color = "#ef4444"; 
            grecaptcha.reset();
        })
        .finally(function() {
            submitBtn.innerText = "Üzenet küldése";
            submitBtn.disabled = false;
        });
}
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);
fadeElements.forEach(el => {
    appearOnScroll.observe(el);
});