document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer automáticamente
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Efecto sutil de aparición (fade in) para los proyectos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Inicializar estado para animación
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        
        observer.observe(card);
    });
});
