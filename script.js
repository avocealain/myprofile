document.addEventListener('DOMContentLoaded', () => {
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