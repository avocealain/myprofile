const translations = {
    fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_contact: "Contact",
        hero_greeting: "Bonjour, je suis",
        hero_desc_start: "Je suis passionné par",
        hero_btn_projects: "Voir mes projets",
        hero_btn_cv: "Télécharger mon CV",
        about_title: "À propos de moi",
        about_text1: "Je suis un professionnel dévoué avec une passion pour la création de solutions numériques innovantes. J'aime transformer des idées complexes en expériences utilisateur simples et élégantes.",
        about_text2: "Toujours à l'affût des dernières technologies, je m'efforce d'écrire un code propre et performant.",
        skills_title: "Mes Compétences",
        skill_db: "Base de données",
        skill_security: "Sécurité Informatique",
        projects_title: "Mes Projets",
        proj_1_title: "Expert en développement web",
        proj_1_desc: "Objectif : Atteindre un niveau avancé en développement web avec la decoverte de nouvelles frameworks et technologies.",
        proj_2_title: "Tômer C2 sunum",
        proj_2_desc: "YTB - SCU - Tômer",
        proj_3_title: "Site ENSPD Parakou",
        proj_3_desc: "Développement d'un site pour les étudiants de l'ENSPD (Bénin).",
        proj_4_title: "Sécurité informatique",
        proj_4_desc: "Renforcement du système de sécurité d'une entreprise de vente au Bénin.",
        proj_5_title: "ENSPD-2025",
        proj_5_desc: "RENTREE SOLENNELLE",
        project_view: "Voir le projet",
        contact_title: "Me Contacter",
        contact_placeholder_name: "Votre Nom",
        contact_placeholder_email: "Votre Email",
        contact_placeholder_msg: "Votre Message",
        contact_btn_send: "Envoyer",
        footer_rights: "&copy; 2025 Alain Gounou Avoce – Tous droits réservés"
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: "Hello, I am",
        hero_desc_start: "I am passionate about",
        hero_btn_projects: "View my projects",
        hero_btn_cv: "Download my CV",
        about_title: "About Me",
        about_text1: "I am a dedicated professional with a passion for creating innovative digital solutions. I enjoy turning complex ideas into simple and elegant user experiences.",
        about_text2: "Always on the lookout for the latest technologies, I strive to write clean and efficient code.",
        skills_title: "My Skills",
        skill_db: "Databases",
        skill_security: "Cybersecurity",
        projects_title: "My Projects",
        proj_1_title: "Web Development Expert",
        proj_1_desc: "Goal: Reach an advanced level in web development by discovering new frameworks and technologies.",
        proj_2_title: "Tômer C2 Presentation",
        proj_2_desc: "YTB - SCU - Tômer",
        proj_3_title: "ENSPD Parakou Website",
        proj_3_desc: "Development of a website for ENSPD students (Benin).",
        proj_4_title: "Cybersecurity",
        proj_4_desc: "Strengthening the security system of a sales company in Benin.",
        proj_5_title: "ENSPD-2025",
        proj_5_desc: "FORMAL REOPENING",
        project_view: "View Project",
        contact_title: "Contact Me",
        contact_placeholder_name: "Your Name",
        contact_placeholder_email: "Your Email",
        contact_placeholder_msg: "Your Message",
        contact_btn_send: "Send",
        footer_rights: "&copy; 2025 Alain Gounou Avoce – All rights reserved"
    },
    tr: {
        nav_home: "Anasayfa",
        nav_about: "Hakkımda",
        nav_skills: "Beceriler",
        nav_projects: "Projeler",
        nav_contact: "İletişim",
        hero_greeting: "Merhaba, ben",
        hero_desc_start: "Tutkulu olduğum alanlar",
        hero_btn_projects: "Projelerimi Gör",
        hero_btn_cv: "CV İndir",
        about_title: "Hakkımda",
        about_text1: "Yenilikçi dijital çözümler yaratma tutkusuna sahip, kendini işine adamış bir profesyonelem. Karmaşık fikirleri basit ve zarif kullanıcı deneyimlerine dönüştürmekten keyif alıyorum.",
        about_text2: "Her zaman en son teknolojileri takip ederek, temiz ve yüksek performanslı kod yazmaya gayret ediyorum.",
        skills_title: "Becerilerim",
        skill_db: "Veritabanları",
        skill_security: "Siber Güvenlik",
        projects_title: "Projelerim",
        proj_1_title: "Web Geliştirme Uzmanı",
        proj_1_desc: "Hedef: Yeni çerçeveler ve teknolojiler keşfederek web geliştirmede ileri bir seviyeye ulaşmak.",
        proj_2_title: "Tömer C2 Sunumu",
        proj_2_desc: "YTB - SCU - Tömer",
        proj_3_title: "ENSPD Parakou Web Sitesi",
        proj_3_desc: "ENSPD (Benin) öğrencileri için bir web sitesi geliştirilmesi.",
        proj_4_title: "Siber Güvenlik",
        proj_4_desc: "Benin'deki bir satış şirketinin güvenlik sisteminin güçlendirilmesi.",
        proj_5_title: "ENSPD-2025",
        proj_5_desc: "RESMİ AÇILIŞ",
        project_view: "Projeyi Gör",
        contact_title: "Bana Ulaşın",
        contact_placeholder_name: "Adınız",
        contact_placeholder_email: "E-postanız",
        contact_placeholder_msg: "Mesajınız",
        contact_btn_send: "Gönder",
        footer_rights: "&copy; 2025 Alain Gounou Avoce – Tüm hakları saklıdır"
    }
};

function changeLanguage(lang) {
    if (!translations[lang]) return;

    // Update text content
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-key-placeholder]').forEach(element => {
        const key = element.getAttribute('data-key-placeholder');
        if (translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        // Simple check, or usage data-lang attribute if added
         if (btn.getAttribute('onclick').includes(`'${lang}'`)) {
            btn.classList.add('active');
        }
    });

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    changeLanguage(savedLang);

    // Contact Form Handling (AJAX)

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const status = document.getElementById('form-status');
            const data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Merci ! Votre message a été envoyé avec succès.";
                    status.style.color = "#27ae60"; // Green
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oups! Il y a eu un problème lors de l'envoi.";
                        }
                    });
                     status.style.color = "#e74c3c"; // Red
                }
            }).catch(error => {
                status.innerHTML = "Oups! Il y a eu un problème lors de l'envoi.";
                 status.style.color = "#e74c3c";
            });
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect (optional: add shadow on scroll)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Typing Effect ---
    const textElement = document.querySelector('.typing-text');
    const phrases = ["l'Analyse de Données", "la Cybersécurité", "le Développement Web"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; 
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing
    type();

    // --- Canvas Particle Animation ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Mouse position
    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height/100) * (canvas.width/100)
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null; 
    });

    // Create Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color, type) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.type = type;
            
            // Assign symbol based on domain (Data, Cyber, Web)
            if (this.type === 'data') {
                // Binaires et stats pour Data
                const symbols = ['1', '0', '10', '01', '|'];
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
            } else if (this.type === 'cyber') {
                // Caractères spéciaux et hachage pour Cyber
                const symbols = ['*', '#', '$_', '0x', '::'];
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
            } else {
                // Syntaxe code pour Web
                const symbols = ['{ }', '< >', '</>', '();', '[]'];
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }

        // Method to draw individual particle
        draw() {
            ctx.font = 'bold ' + (10 + this.size * 5) + 'px "Courier New", monospace';
            
            // Glow Effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
            
            // Reset shadow
            ctx.shadowBlur = 0; 
        }

        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Check collision detection - mouse position / particle position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size){
                // Reactivity
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2; 
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            // Draw particle
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5; // Taille fine
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2; // Mouvement flottant
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Choix du type et couleur associée
            let typeRandom = Math.random();
            let type, color;
            
            if (typeRandom < 0.33) {
                type = 'data';
                color = '#00f3ff'; // Cyan (Data)
            } else if (typeRandom < 0.66) {
                type = 'cyber';
                color = '#00ff41'; // Matrix Green (Cyber)
            } else {
                type = 'web';
                color = '#bd00ff'; // Purple/Violet (Web)
            }
            
            // Randomly insert white for sparkle
            if (Math.random() < 0.1) color = '#ffffff';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color, type));
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Connect particles with lines if close enough
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/9) * (canvas.height/9)) {
                    opacityValue = 1 - (distance/15000);
                    // Dynamic gradient lines
                    ctx.strokeStyle = 'rgba(100, 200, 255,' + (opacityValue * 0.15) + ')'; 
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    init();
    animate();
});
