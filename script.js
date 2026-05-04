// ============================================
// Datos de Habilidades (perfil técnico SMR)
// ============================================
const skillsData = [
    {
        category: "Redes",
        details: [
            { name: "Rastreador de paquetes (Packet Tracer)", level: 90 },
            { name: "Dirección IP", level: 80 },
            { name: "VLANs", level: 70 },
            { name: "Ping, tracert y diagnóstico", level: 95 },
            { name: "Configuración básica de enrutadores", level: 95 },
            { name: "Configuración básica de switches", level: 95 },
            { name: "Resolución de fallos de red", level: 85 },
            { name: "Comandos de red (ipconfig, nmap)", level: 85 }
        ]
    },
    {
        category: "Mantenimiento",
        details: [
            { name: "Montaje y desmontaje de PC", level: 100 },
            { name: "Limpieza interna de equipos", level: 100 },
            { name: "Cambio de pasta térmica", level: 100 },
            { name: "Instalación de RAM", level: 100 },
            { name: "Cambio de SSD/HDD", level: 100 },
            { name: "Diagnóstico básico de fallos", level: 95 },
            { name: "Mantenimiento preventivo", level: 95 },
            { name: "Sustitución de componentes hardware", level: 100 }
        ]
    },
    {
        category: "Sistemas Operativos",
        details: [
            { name: "Windows 10/11", level: 90 },
            { name: "Ubuntu/Linux", level: 95 },
            { name: "Instalación de sistemas operativos", level: 95 },
            { name: "Gestión de usuarios y permisos", level: 80 },
            { name: "Configuración básica del sistema", level: 85 },
            { name: "Terminal/CMD", level: 85 },
            { name: "Resolución de problemas del sistema", level: 75 }
        ]
    },
    {
        category: "Edición de Video",
        details: [
            { name: "Efectos visuales y transiciones", level: 80 },
            { name: "Efectos de sonido y mezcla", level: 75 },
            { name: "Cortes y sincronización", level: 85 },
            { name: "Animaciones y motion graphics", level: 70 },
            { name: "Corrección de color", level: 75 },
            { name: "Edición de audio", level: 80 },
            { name: "Exportación y renderizado", level: 85 }
        ]
    },
    {
        category: "Software y Herramientas",
        details: [
            { name: "Packet Tracer", level: 90 },
            { name: "Terminal Bash/CMD", level: 80 },
            { name: "Herramientas ofimáticas (Office, Google Workspace)", level: 90 },
            { name: "OpenOffice", level: 80 },
            { name: "Software de diagnóstico", level: 80 },
            { name: "VirtualBox/VMware", level: 75 },
            { name: "Excel (inventario y control)", level: 85 }
        ]
    }
];

// Media de nivel por categoría
skillsData.forEach(skill => {
    const sum = skill.details.reduce((acc, item) => acc + item.level, 0);
    skill.level = Math.round(sum / skill.details.length);
});

// ============================================
// DOM refs
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link');
const skillsGrid = document.getElementById('skillsGrid');
const themeToggle = document.getElementById('themeToggle');

// ============================================
// Menú móvil
// ============================================
menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// ============================================
// Scroll suave
// ============================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const section = link.getAttribute('data-section');
        scrollToSection(section);
    });
});

// ============================================
// Sección activa en navegación
// ============================================
function updateActiveNav() {
    const sections = ['inicio', 'sobre-mi', 'habilidades', 'experiencia', 'proyectos', 'formacion', 'certificados', 'contacto'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }
    });
}

// ============================================
// Generar tarjetas de habilidades
// ============================================
function generateSkillsCards() {
    skillsData.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'card skill-card';
        card.setAttribute('data-skill-index', index);

        const detailsId = `skill-details-${index}`;

        card.innerHTML = `
            <div class="skill-header">
                <h3 class="skill-category">${skill.category}</h3>
                <span class="skill-toggle">Ver detalles</span>
            </div>
            <div class="progress-container">
                <div class="progress-header">
                    <span class="progress-label">Nivel de competencia</span>
                    <span class="progress-value">${skill.level}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-progress="${skill.level}"></div>
                </div>
            </div>
            <div class="skill-details" id="${detailsId}">
                <div class="skill-items">
                    ${skill.details.map(detail => `
                        <div class="skill-item">
                            <span class="skill-item-name">${detail.name}</span>
                            <span class="skill-item-level">${detail.level}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        skillsGrid.appendChild(card);

        card.addEventListener('click', () => toggleSkillDetails(index));

        // Animar barra al entrar en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    const progress = progressFill.getAttribute('data-progress');
                    setTimeout(() => {
                        progressFill.style.width = progress + '%';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(card);
    });
}

function toggleSkillDetails(index) {
    const detailsElement = document.getElementById(`skill-details-${index}`);
    const card = document.querySelector(`[data-skill-index="${index}"]`);
    const toggleText = card.querySelector('.skill-toggle');

    if (detailsElement.classList.contains('active')) {
        detailsElement.classList.remove('active');
        toggleText.textContent = 'Ver detalles';
    } else {
        document.querySelectorAll('.skill-details').forEach(detail => detail.classList.remove('active'));
        document.querySelectorAll('.skill-toggle').forEach(t => t.textContent = 'Ver detalles');

        detailsElement.classList.add('active');
        toggleText.textContent = 'Ocultar detalles';
    }
}

// ============================================
// Animaciones al hacer scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

// ============================================
// Header con auto-ocultar al scroll (conservado)
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
    updateActiveNav();
});

// ============================================
// Certificados - datos y modal
// ============================================
const certificatesData = [
    {
        title: "Calidad en la Atención al Cliente con SENATI",
        issuer: "Cursa",
        date: "24/03/2023",
        imageUrl: "https://customer-assets.emergentagent.com/job_dev-profile-193/artifacts/mrgrts3y_certificate_1775761175935.png",
        verifyUrl: "https://cursa.app/es/verificar-certificado"
    }
];

let currentZoom = 1;

function openCertificateModal(index) {
    const cert = certificatesData[index];
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertImage');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalIssuer = document.getElementById('modalCertIssuer');
    const modalDate = document.getElementById('modalCertDate');
    const modalVerify = document.getElementById('modalCertVerify');

    modalImage.src = cert.imageUrl;
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = `Emitido por: ${cert.issuer}`;
    modalDate.textContent = `Fecha: ${cert.date}`;
    modalVerify.href = cert.verifyUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentZoom = 1;
    modalImage.style.transform = 'scale(1)';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function zoomCertificate(action) {
    const modalImage = document.getElementById('modalCertImage');

    if (action === 'in') {
        currentZoom = Math.min(currentZoom + 0.25, 3);
    } else if (action === 'out') {
        currentZoom = Math.max(currentZoom - 0.25, 0.5);
    } else if (action === 'reset') {
        currentZoom = 1;
    }

    modalImage.style.transform = `scale(${currentZoom})`;
}

document.getElementById('certificateModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'certificateModal') closeCertificateModal();
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertificateModal();
});

// ============================================
// Filtro de proyectos - NUEVO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Actualizar botones activos
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar proyectos
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
});

// ============================================
// Modo oscuro (con persistencia en localStorage)
// ============================================
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Tema inicial: localStorage > preferencia del sistema > claro
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }
})();

themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    generateSkillsCards();
    updateActiveNav();

    document.querySelectorAll('.progress-fill').forEach(fill => {
        if (!fill.style.width) fill.style.width = '0%';
    });
});

// Exponer funciones al scope global para onclick inline
window.scrollToSection = scrollToSection;
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
window.zoomCertificate = zoomCertificate;

// ============================================
// PARTICLES - Fondo animado premium
// ============================================
const tsParticlesScript = document.createElement('script');
tsParticlesScript.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
tsParticlesScript.onload = () => {
    initParticles();
};
document.head.appendChild(tsParticlesScript);

function initParticles() {
    const isDark = !document.documentElement.hasAttribute('data-theme') || document.documentElement.getAttribute('data-theme') === 'dark';
    
    const config = isDark ? {
        background: { color: { value: '#0d0d0d' } },
        particles: {
            color: { value: '#ffffff' },
            links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.35, width: 1 },
            move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 5 } }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'repulse' },
                onClick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { quantity: 4 }
            }
        }
    } : {
        background: { color: { value: '#f0f4f8' } },
        particles: {
            color: { value: '#0099cc' },
            links: { color: '#0099cc', distance: 150, enable: true, opacity: 0.3, width: 1 },
            move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.55 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 5 } }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'repulse' },
                onClick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { quantity: 4 }
            }
        }
    };
    
    tsParticles.load('particles-js', config);
}

// Escuchar cambio de tema para actualizar partículas
window.addEventListener('storage', e => {
    if (e.key === 'theme' && typeof tsParticles !== 'undefined') {
        setTimeout(initParticles, 100);
    }
});
