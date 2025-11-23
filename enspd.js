document.getElementById('badgeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const canvas = document.getElementById('badgeCanvas');
  const ctx = canvas.getContext('2d');
  

  // Taille réelle du badge = qualité parfaite
  canvas.width = 1080;
  canvas.height = 1620;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const name = document.getElementById('name').value;
  const filiere = document.getElementById('filiere').value;
  // const annee = document.getElementById('annee').value;
  const photoInput = document.getElementById('photo');

  const background = new Image();
  background.src = "badgeSample.webp";

  background.onload = function () {
    // Dessin du badge original à taille réelle
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Chargement de la photo
    const reader = new FileReader();
    reader.onload = function (event) {
      const photo = new Image();
      photo.src = event.target.result;

      photo.onload = function () {

        // 📌 Position exacte du cadre photo dans ton badge HD
        const photoX = 355;  // centré sur badge 1080px
        const photoY = 510;
        const photoWidth = 390;
        const photoHeight = 480;

        ctx.drawImage(photo, photoX, photoY , photoWidth, photoHeight);

        // 🎨 Nom de l'étudiant (couleur différente)
        ctx.font = "bold 70px Times New Roman";
        ctx.fillStyle = "#0420efff"; // ROUGE ENSPD
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        const yInitial = 1040;


        ctx.fillText(name.toUpperCase(), 540, yInitial + (55 / 2));
        // 🎨 Texte filière 
        ctx.font = "45px Times New Roman";
        ctx.fillStyle = "#000";

        ctx.fillText(`${filiere}`, canvas.width / 2, 1120);

        // Lien pour télécharger
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.style.display = "inline-block";
      };
    };

    reader.readAsDataURL(photoInput.files[0]);
  };
});
