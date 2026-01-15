// On attend que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTION DU DÉFILEMENT DOUX (SMOOTH SCROLL)
    // On récupère tous les liens qui pointent vers une ancre (commençant par #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // On empêche le saut brusque par défaut

            const targetId = this.getAttribute('href'); // On récupère l'ID (ex: #portfolio)
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // On calcule la position en tenant compte de la hauteur du menu (header)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // On déclenche le défilement fluide
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. EFFET AU SCROLL SUR LE HEADER
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)"; // Ombre légère au scroll
        } else {
            header.style.boxShadow = "none";
        }
    });

});

// GESTION DU MENU MOBILE
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Optionnel : changer l'icône burger en X (nécessite Lucide)
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons(); // On demande à Lucide de rafraîchir l'icône
    });
}

// Fermer le menu quand on clique sur un lien (très important !)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. GESTION DES MODALES DU PORTFOLIO
const projects = {
    "Projet 01": {
        title: "Nom du Projet 01",
        contexte: "Ici, explique le problème de départ.",
        solution: "Ce que tu as codé ou créé.",
        resultat: "Le succès final ou ce que tu as appris."
    },
    "Projet 02": {
        title: "Nom du Projet 02",
        contexte: "Description du contexte pour le projet 2...",
        solution: "Ma solution technique...",
        resultat: "Lien vers la démo ou chiffres clés."
    }
};

const modal = document.getElementById("project-modal");
const modalData = document.getElementById("modal-data");
const closeBtn = document.querySelector(".close-modal");

// Ouvrir la modale au clic sur une carte
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const info = projects[title] || { title: title, contexte: "À remplir...", solution: "À remplir...", resultat: "À remplir..." };

        modalData.innerHTML = `
            <h2>${info.title}</h2>
            <div class="modal-section"><h4>Le Contexte</h4><p>${info.contexte}</p></div>
            <div class="modal-section"><h4>Ma Solution</h4><p>${info.solution}</p></div>
            <div class="modal-section"><h4>Le Résultat</h4><p>${info.resultat}</p></div>
        `;
        modal.style.display = "block";
    });
});

// Fermer la modale
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };
lucide.createIcons();
// 4. ANIMATION AU SCROLL (REVEAL EFFECT)
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Distance avant déclenchement

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);
// On l'appelle une fois au chargement pour les éléments déjà visibles
revealElements();
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});
// BARRE DE PROGRESSION
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const bar = document.getElementById("progress-bar");
    if (bar) {
        bar.style.width = scrolled + "%";
    }
});



function generateDots() {
    const dotContainers = document.querySelectorAll('.level-dots');
    
    dotContainers.forEach(container => {
        const level = parseInt(container.getAttribute('data-level'));
        container.innerHTML = ''; // Vide le conteneur
        
        for (let i = 1; i <= 5; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i <= level) {
                // On ajoute un petit délai pour l'effet "chenille"
                setTimeout(() => {
                    dot.classList.add('active');
                }, i * 150);
            }
            container.appendChild(dot);
        }
    });
}

// Appelle la fonction dans ton IntersectionObserver ou ton scroll
// Par exemple, à la fin de ton script :
generateDots();
