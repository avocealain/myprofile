
document.getElementById('badgeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const filiere = document.getElementById('filiere').value;
    const annee = document.getElementById('annee').value;
    const photoInput = document.getElementById('photo');
    const canvas = document.getElementById('badgeCanvas');
    const ctx = canvas.getContext('2d');

    const W = canvas.width = 400;
    const H = canvas.height = 600;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Draw rounded white card background with subtle border
    drawRoundedRect(ctx, 8, 8, W-16, H-16, 18, '#ffffff', 'rgba(0,0,0,0.06)');

    // Header gradient
    const headerH = 100;
    const headerGradient = ctx.createLinearGradient(0, 8, 0, headerH + 8);
    headerGradient.addColorStop(0, '#0b5fb8');
    headerGradient.addColorStop(1, '#00508a');
    drawTopRoundedRect(ctx, 8, 8, W-16, headerH, 18, headerGradient);

    // Title in header (centered)
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px Arial';
    ctx.fillText('ENSPD-UP', W/2, 40);
    ctx.font = '14px Arial';
    ctx.fillText('Rentrée solennelle 2025-2026', W/2, 68);

    // Photo area (display full photo, not cropped)
    const headerBottom = 8 + headerH; // where header ends
    const photoTopBase = headerBottom + 12; // we'll place the photo area starting here
    const photoAreaW = W - 80; // leave side margins
    const photoAreaH = 260; // max height for photo area
    const photoX = W/2; // center X

    // track actual photo area used so we can position text under it
    let photoTop = 0;
    let photoHeightUsed = 0;

    function afterImageDraw() {
        // Name and details positioned relative to the bottom of the photo area
        const baseY = photoTop + photoHeightUsed;

        ctx.textAlign = 'center';
        ctx.fillStyle = '#0b2d4a';
        ctx.font = 'bold 20px Arial';
        const displayName = name || 'Nom Prénom';
        ctx.fillText(displayName, W/2, baseY + 36);

        ctx.font = '16px Arial';
        ctx.fillStyle = '#23445a';
        ctx.fillText(filiere, W/2, baseY + 66);
        ctx.fillText(annee, W/2, baseY + 92);

        // Divider
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, baseY + 120);
        ctx.lineTo(W-40, baseY + 120);
        ctx.stroke();

        // Sponsors at bottom
        ctx.font = '13px Arial';
        ctx.fillStyle = '#546b78';
        ctx.fillText('BUE-ENSPD | CRİSTAL', W/2, H - 40);

        // Show download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = canvas.toDataURL();
        downloadLink.style.display = 'inline-block';
    }

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const img = new Image();
            img.onload = function() {
                // improve interpolation quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // compute scale to fit whole image within photoAreaW x photoAreaH
                const maxW = photoAreaW;
                const maxH = photoAreaH;
                const scale = Math.min(maxW / img.width, maxH / img.height, 1); // don't upscale beyond original
                const dw = img.width * scale;
                const dh = img.height * scale;
                const dx = photoX - dw / 2;
                const dy = photoTopBase;

                // record actual photo area for text positioning
                photoTop = dy;
                photoHeightUsed = dh;

                // draw a subtle rounded rect background for the photo
                const pad = 6;
                const bgX = dx - pad;
                const bgY = dy - pad;
                const bgW = dw + pad * 2;
                const bgH = dh + pad * 2;
                drawRoundedRect(ctx, bgX, bgY, bgW, bgH, 10, '#f7fbff', 'rgba(0,0,0,0.04)');

                // draw the full image (no cropping)
                ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dw, dh);

                // optional thin white inner border
                // draw white inner border
                roundRectStroke(ctx, bgX, bgY, bgW, bgH, 10, 'rgba(255,255,255,0.9)', 3);

                afterImageDraw();
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // Placeholder rectangular area
    const phW = Math.min(photoAreaW, 220);
    const phH = Math.min(photoAreaH, 180);
    const phX = photoX - phW/2;
    const phY = photoTopBase;
        drawRoundedRect(ctx, phX, phY, phW, phH, 10, '#eef6ff', 'rgba(0,0,0,0.04)');

    // record placeholder area so texts position correctly
    photoTop = phY;
    photoHeightUsed = phH;

    const initials = getInitials(name) || '';
    ctx.fillStyle = '#0b5fb8';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    // center initials vertically in placeholder
    ctx.fillText(initials, photoX, photoTop + photoHeightUsed/2 + 8);

        afterImageDraw();
    }
});

function drawRoundedRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
    ctx.restore();
}

function drawTopRoundedRect(ctx, x, y, w, h, r, fillStyle) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.restore();
}

function roundRectStroke(ctx, x, y, w, h, r, color, lineWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.lineWidth = lineWidth || 1;
    ctx.strokeStyle = color || 'rgba(0,0,0,0.06)';
    ctx.stroke();
    ctx.restore();
}

function getInitials(name) {
    if (!name) return '';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length-1].charAt(0)).toUpperCase();
}
