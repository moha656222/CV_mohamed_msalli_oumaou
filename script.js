// Skills Data - Organizadas por perfil técnico SMR real
const skillsData = [
    {
        category: "Redes",
        icon: "network",
        details: [
            { name: "Packet Tracer", level: 85 },
            { name: "Direccionamiento IP", level: 80 },
            { name: "Subnetting y cálculo de subredes", level: 75 },
            { name: "VLANs", level: 70 },
            { name: "Ping, tracert y diagnóstico", level: 85 },
            { name: "Configuración básica de routers", level: 70 },
            { name: "Configuración básica de switches", level: 75 },
            { name: "Resolución de fallos de red", level: 75 },
            { name: "Comandos de red (ipconfig, netstat)", level: 80 }
        ]
    },
    {
        category: "Mantenimiento",
        icon: "wrench",
        details: [
            { name: "Montaje y desmontaje de PC", level: 90 },
            { name: "Limpieza interna de equipos", level: 85 },
            { name: "Cambio de pasta térmica", level: 80 },
            { name: "Instalación de RAM", level: 90 },
            { name: "Cambio de SSD/HDD", level: 85 },
            { name: "Diagnóstico básico de fallos", level: 80 },
            { name: "Mantenimiento preventivo", level: 85 },
            { name: "Sustitución de componentes hardware", level: 85 }
        ]
    },
    {
        category: "Sistemas Operativos",
        icon: "monitor",
        details: [
            { name: "Windows 10/11", level: 85 },
            { name: "Ubuntu/Linux", level: 75 },
            { name: "Instalación de sistemas operativos", level: 85 },
            { name: "Gestión de usuarios y permisos", level: 80 },
            { name: "Configuración básica del sistema", level: 80 },
            { name: "Terminal/CMD", level: 75 },
            { name: "Resolución de problemas del sistema", level: 75 }
        ]
    },
    {
        category: "Programación",
        icon: "code",
        details: [
            { name: "Python básico", level: 70 },
            { name: "Arduino C/C++", level: 65 },
            { name: "Scripts de automatización", level: 70 },
            { name: "Lógica de programación", level: 75 },
            { name: "Git y GitHub básico", level: 60 },
            { name: "Depuración de código", level: 65 }
        ]
    },
    {
        category: "Ciberseguridad",
        icon: "shield",
        details: [
            { name: "Conceptos básicos de seguridad", level: 75 },
            { name: "Buenas prácticas de seguridad", level: 80 },
            { name: "Configuración de firewall básico", level: 65 },
            { name: "Antivirus y antimalware", level: 75 },
            { name: "Backup y recuperación de datos", level: 70 },
            { name: "Gestión segura de contraseñas", level: 85 },
            { name: "Detección de phishing", level: 80 },
            { name: "Políticas de seguridad básicas", level: 65 }
        ]
    },
    {
        category: "Software y Herramientas",
        icon: "tools",
        details: [
            { name: "Packet Tracer", level: 85 },
            { name: "VS Code", level: 80 },
            { name: "Terminal Bash/CMD", level: 80 },
            { name: "Herramientas ofimáticas", level: 85 },
            { name: "GitHub Desktop", level: 65 },
            { name: "Software de diagnóstico", level: 75 },
            { name: "VirtualBox/VMware", level: 70 }
        ]
    }
];

// Calculate average level for each category
skillsData.forEach(skill => {
    const sum = skill.details.reduce((acc, item) => acc + item.level, 0);
    skill.level = Math.round(sum / skill.details.length);
});

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link');
const skillsGrid = document.getElementById('skillsGrid');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    }
}

// Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const section = link.getAttribute('data-section');
        scrollToSection(section);
    });
});

// Active Section Detection
function updateActiveNav() {
    const sections = ['inicio', 'sobre-mi', 'habilidades', 'proyectos', 'formacion', 'contacto'];
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

window.addEventListener('scroll', updateActiveNav);

// Generate Skills Cards
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
        
        // Add click event for expand/collapse
        card.addEventListener('click', () => toggleSkillDetails(index));
        
        // Animate progress bar on scroll
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

// Toggle Skill Details
function toggleSkillDetails(index) {
    const detailsElement = document.getElementById(`skill-details-${index}`);
    const card = document.querySelector(`[data-skill-index="${index}"]`);
    const toggleText = card.querySelector('.skill-toggle');
    
    if (detailsElement.classList.contains('active')) {
        detailsElement.classList.remove('active');
        toggleText.textContent = 'Ver detalles';
    } else {
        // Close all other details
        document.querySelectorAll('.skill-details').forEach(detail => {
            detail.classList.remove('active');
        });
        document.querySelectorAll('.skill-toggle').forEach(toggle => {
            toggle.textContent = 'Ver detalles';
        });
        
        // Open current detail
        detailsElement.classList.add('active');
        toggleText.textContent = 'Ocultar detalles';
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe cards for staggered animation
setTimeout(() => {
    document.querySelectorAll('.card, .project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}, 100);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateSkillsCards();
    updateActiveNav();
    
    // Set initial progress bars to 0
    document.querySelectorAll('.progress-fill').forEach(fill => {
        fill.style.width = '0%';
    });
});

// Header scroll effect
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
});

// Certificate card interaction
document.querySelectorAll('.certificate-card').forEach(card => {
    let isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        card.addEventListener('click', () => {
            card.classList.toggle('show-details');
        });
    }
});

// Parallax effect on scroll (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Certificate data
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

// Open Certificate Modal
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

// Close Certificate Modal
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Zoom Certificate
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

// Close modal when clicking outside
document.getElementById('certificateModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'certificateModal') {
        closeCertificateModal();
    }
});

// Project Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.classList.add('hidden'), 300);
                }
            }
        });
    });
});

// Add window to global scope for inline onclick handlers
window.scrollToSection = scrollToSection;
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
window.zoomCertificate = zoomCertificate;

