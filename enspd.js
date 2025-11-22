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
        const photoWidth = 370;
        const photoHeight = 420;

        ctx.drawImage(photo, photoX, photoY, photoWidth, photoHeight);

        // 🎨 Nom de l'étudiant (couleur différente)
        ctx.font = "bold 60px Arial";
        ctx.fillStyle = "#d60000"; // ROUGE ENSPD
        ctx.textAlign = "center";

        // Position du texte "Noms et Prénoms" sur ton badge HD
        ctx.fillText(name, canvas.width / 2, 1040);

        // 🎨 Texte filière + année
        ctx.font = "45px Arial";
        ctx.fillStyle = "#000";

        ctx.fillText(`${filiere}`, canvas.width / 2, 1120);

        // Lien pour télécharger
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = canvas.toDataURL();
        downloadLink.style.display = "inline-block";
      };
    };

    reader.readAsDataURL(photoInput.files[0]);
  };
});
