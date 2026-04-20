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

    // Lógica para el Lightbox (Modal de Imágenes a Pantalla Completa)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const spanClose = document.getElementsByClassName("modal-close")[0];
    
    if (modal && modalImg && spanClose) {
        // Seleccionar todas las imágenes dentro de las galerías
        const galleryImages = document.querySelectorAll('.mockup-window img, .prototype-gallery img, .wireframe-gallery img, .brand-posters img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                // Pequeño timeout para que se aplique la clase con transición
                setTimeout(() => {
                    modal.classList.add("show");
                }, 10);
            });
        });

        // Cerrar modal al hacer click en la X
        spanClose.onclick = function() {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // Esperar que termine la transición css
        }

        // Cerrar modal al hacer click fuera de la imagen
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        }
        
        // Cerrar modal al presionar la tecla Esc
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && modal.style.display === "block") {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        });
    }
});
