document.getElementById('badgeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const canvas = document.getElementById('badgeCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const name = document.getElementById('name').value.trim();
  const filiere = document.getElementById('filiere').value;
  const photoInput = document.getElementById('photo');

  const background = new Image();
  background.src = 'badgeSample.webp'; // ← ton flyer ENSPD 699x697

  background.onload = function () {
    canvas.width = 699;
    canvas.height = 697;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const reader = new FileReader();
    reader.onload = function (event) {
      const photo = new Image();
      photo.src = event.target.result;

      photo.onload = function () {
        // 📸 Dessiner la photo avec bords arrondis
        const photoX = 200;
        const photoY = 223;
        const photoWidth = 299;
        const photoHeight = 207;
        const radius = 20;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(photoX + radius, photoY);
        ctx.lineTo(photoX + photoWidth - radius, photoY);
        ctx.quadraticCurveTo(photoX + photoWidth, photoY, photoX + photoWidth, photoY + radius);
        ctx.lineTo(photoX + photoWidth, photoY + photoHeight - radius);
        ctx.quadraticCurveTo(photoX + photoWidth, photoY + photoHeight, photoX + photoWidth - radius, photoY + photoHeight);
        ctx.lineTo(photoX + radius, photoY + photoHeight);
        ctx.quadraticCurveTo(photoX, photoY + photoHeight, photoX, photoY + photoHeight - radius);
        ctx.lineTo(photoX, photoY + radius);
        ctx.quadraticCurveTo(photoX, photoY, photoX + radius, photoY);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(photo, photoX, photoY, photoWidth, photoHeight);
        ctx.restore();

        // ✍️ Nom complet (une seule ligne, étendu sur les bords)
        let fontSize = 36; // taille de départ
        ctx.font = `bold ${fontSize}px Times New Roman`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // 🔧 Réduire la taille si le texte dépasse la largeur max du badge
        while (ctx.measureText(name.toUpperCase()).width > 650 && fontSize > 12) {
          fontSize -= 1;
          ctx.font = `bold ${fontSize}px Times New Roman`;
        }

        ctx.fillText(name.toUpperCase(), canvas.width / 2, 466);

        // 📚 Filière (reste inchangée, juste en dessous du nom)
        ctx.font = 'bold 20px Times New Roman';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(filiere, canvas.width / 2, 485);

        // 📥 Activer le lien de téléchargement
        const link = document.getElementById('downloadLink');
        link.href = canvas.toDataURL('image/png');
        link.style.display = 'inline-block';
      };
    };

    reader.readAsDataURL(photoInput.files[0]);
  };
});
