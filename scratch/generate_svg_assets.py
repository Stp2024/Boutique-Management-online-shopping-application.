import os

base_dir = r"c:\Users\USMANIYA\boutique-project\images\customizer_v2"

# 1. Girls Fairytale Tulle Frock
svg_girls_frock = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="70%" stop-color="#4a2a17"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <linearGradient id="frock_skirt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fce7f3"/>
      <stop offset="50%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
    <linearGradient id="gold_accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background Atelier -->
  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>

  <!-- Mannequin Wooden Stand -->
  <g id="stand">
    <!-- Base -->
    <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
    <ellipse cx="300" cy="725" rx="75" ry="12" fill="url(#wood_stand)"/>
    <!-- Pole -->
    <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
    <!-- Brass Connector ring -->
    <rect x="291" y="460" width="18" height="8" rx="2" fill="url(#gold_accent)"/>
    <!-- Finial Neck Top -->
    <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
    <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>
    <rect x="296" y="160" width="8" height="15" fill="url(#gold_accent)"/>
  </g>

  <!-- Mannequin Form (Child Proportions) -->
  <g id="mannequin_torso" filter="url(#shadow)">
    <!-- Neck -->
    <path d="M 282 175 L 318 175 L 316 205 L 284 205 Z" fill="url(#mannequin_body)"/>
    <!-- Torso -->
    <path d="M 284 205 Q 230 220 220 250 Q 240 330 255 420 L 345 420 Q 360 330 380 250 Q 370 220 316 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Girls Fairytale Tulle Floral Party Frock -->
  <g id="dress_frock" filter="url(#shadow)">
    <!-- Bodice -->
    <path d="M 240 235 Q 300 248 360 235 L 350 330 Q 300 338 250 330 Z" fill="#f472b6"/>
    <!-- Satin Waistband & Big Bow -->
    <rect x="246" y="325" width="108" height="18" rx="4" fill="#db2777"/>
    <!-- Bow center -->
    <circle cx="300" cy="334" r="8" fill="#be185d"/>
    <path d="M 300 334 Q 275 320 270 334 Q 275 348 300 334 Z" fill="#db2777"/>
    <path d="M 300 334 Q 325 320 330 334 Q 325 348 300 334 Z" fill="#db2777"/>
    <path d="M 295 338 L 280 375 L 295 365 L 300 338 Z" fill="#be185d"/>
    <path d="M 305 338 L 320 375 L 305 365 L 300 338 Z" fill="#be185d"/>
    
    <!-- Sleeves: Puff Ruffle Sleeves -->
    <path d="M 242 235 Q 215 230 215 260 Q 230 275 248 265 Z" fill="#fbcfe8"/>
    <path d="M 358 235 Q 385 230 385 260 Q 370 275 352 265 Z" fill="#fbcfe8"/>

    <!-- Flared Layered Tulle Skirt -->
    <!-- Under layer -->
    <path d="M 246 342 Q 300 348 354 342 L 415 540 Q 300 575 185 540 Z" fill="url(#frock_skirt)" opacity="0.9"/>
    <!-- Mid Tulle frills -->
    <path d="M 235 375 Q 300 385 365 375 L 400 480 Q 300 510 200 480 Z" fill="#fce7f3" opacity="0.6"/>
    <!-- Floral lace overlay accents -->
    <g fill="#ffffff" opacity="0.8">
      <circle cx="280" cy="270" r="4"/><circle cx="320" cy="270" r="4"/>
      <circle cx="300" cy="290" r="5"/><circle cx="265" cy="305" r="4"/>
      <circle cx="335" cy="305" r="4"/>
      <!-- Skirt Sparkles -->
      <path d="M 250 420 Q 255 425 250 430 Q 245 425 250 420 Z"/>
      <path d="M 350 440 Q 355 445 350 450 Q 345 445 350 440 Z"/>
      <path d="M 300 470 Q 305 475 300 480 Q 295 475 300 470 Z"/>
      <path d="M 220 500 Q 225 505 220 510 Q 215 505 220 500 Z"/>
      <path d="M 380 510 Q 385 515 380 520 Q 375 515 380 510 Z"/>
    </g>
    <!-- Scalloped Hem Ruffle -->
    <path d="M 185 540 Q 220 560 260 550 Q 300 570 340 550 Q 380 560 415 540 Q 300 575 185 540 Z" fill="#ffffff" opacity="0.85"/>
  </g>

  <!-- Tag / Watermark -->
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · JUNIOR COUTURE</text>
</svg>'''

# 2. Girls Junior Brocade Lehenga
svg_girls_lehenga = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="70%" stop-color="#4a2a17"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <linearGradient id="gold_accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <linearGradient id="lehenga_silk" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#831843"/>
      <stop offset="50%" stop-color="#be185d"/>
      <stop offset="100%" stop-color="#701a75"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>

  <!-- Stand -->
  <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
  <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
  <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
  <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>

  <!-- Mannequin Form -->
  <g filter="url(#shadow)">
    <path d="M 282 175 L 318 175 L 316 205 L 284 205 Z" fill="url(#mannequin_body)"/>
    <path d="M 284 205 Q 230 220 220 250 Q 240 330 255 420 L 345 420 Q 360 330 380 250 Q 370 220 316 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Junior Brocade Festive Lehenga Choli -->
  <g filter="url(#shadow)">
    <!-- Choli Blouse (Teal Raw Silk) -->
    <path d="M 240 230 Q 300 242 360 230 L 350 310 Q 300 318 250 310 Z" fill="#0f766e"/>
    <!-- Gold Zari Neckline border -->
    <path d="M 270 234 Q 300 262 330 234" stroke="url(#gold_accent)" stroke-width="6" fill="none"/>
    <!-- Choli sleeves -->
    <path d="M 240 230 L 225 280 L 245 285 L 252 260 Z" fill="#0f766e"/>
    <path d="M 360 230 L 375 280 L 355 285 L 348 260 Z" fill="#0f766e"/>
    <line x1="225" y1="280" x2="245" y2="285" stroke="url(#gold_accent)" stroke-width="4"/>
    <line x1="375" y1="280" x2="355" y2="285" stroke="url(#gold_accent)" stroke-width="4"/>

    <!-- Midriff gap showing mannequin fabric -->

    <!-- Flared Lehenga Skirt (Rich Magenta Brocade) -->
    <path d="M 248 335 Q 300 342 352 335 L 430 575 Q 300 610 170 575 Z" fill="url(#lehenga_silk)"/>
    <!-- Waistband with dori tassels -->
    <rect x="248" y="330" width="104" height="12" rx="3" fill="url(#gold_accent)"/>
    <circle cx="270" cy="350" r="5" fill="url(#gold_accent)"/>
    <path d="M 268 355 L 265 375 L 272 375 Z" fill="#d97706"/>

    <!-- Gold Brocade Booti Pattern -->
    <g fill="url(#gold_accent)" opacity="0.85">
      <circle cx="260" cy="380" r="3"/><circle cx="300" cy="380" r="3"/><circle cx="340" cy="380" r="3"/>
      <circle cx="240" cy="420" r="3.5"/><circle cx="280" cy="420" r="3.5"/><circle cx="320" cy="420" r="3.5"/><circle cx="360" cy="420" r="3.5"/>
      <circle cx="220" cy="460" r="4"/><circle cx="265" cy="460" r="4"/><circle cx="310" cy="460" r="4"/><circle cx="355" cy="460" r="4"/><circle cx="385" cy="460" r="4"/>
      <circle cx="205" cy="500" r="4"/><circle cx="250" cy="500" r="4"/><circle cx="300" cy="500" r="4"/><circle cx="350" cy="500" r="4"/><circle cx="395" cy="500" r="4"/>
    </g>

    <!-- Heavy Gold Zari Hem Border -->
    <path d="M 170 575 Q 300 610 430 575 L 424 545 Q 300 580 176 545 Z" fill="url(#gold_accent)"/>
    <!-- Dupatta Drape across shoulder -->
    <path d="M 242 230 Q 230 300 240 370 Q 250 420 230 480 L 210 475 Q 225 390 220 300 L 230 230 Z" fill="#fde047" opacity="0.75"/>
    <path d="M 242 230 Q 280 270 330 335 L 340 330 Q 285 260 250 225 Z" fill="#fde047" opacity="0.6"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · FESTIVE GIRLS</text>
</svg>'''

# 3. Girls Peplum Kurti & Sharara
svg_girls_kurti = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <linearGradient id="gold_accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>
  <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
  <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
  <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
  <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>

  <!-- Mannequin -->
  <g filter="url(#shadow)">
    <path d="M 282 175 L 318 175 L 316 205 L 284 205 Z" fill="url(#mannequin_body)"/>
    <path d="M 284 205 Q 230 220 220 250 Q 240 330 255 420 L 345 420 Q 360 330 380 250 Q 370 220 316 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Mustard Yellow Peplum Kurti & Sharara -->
  <g filter="url(#shadow)">
    <!-- Sharara Pants Flare (Teal/Emerald) -->
    <path d="M 250 430 L 210 590 L 285 595 L 295 440 Z" fill="#0d9488"/>
    <path d="M 350 430 L 390 590 L 315 595 L 305 440 Z" fill="#0d9488"/>
    <!-- Sharara Gota Patti Rings -->
    <path d="M 225 530 Q 250 535 280 532" stroke="url(#gold_accent)" stroke-width="4" fill="none"/>
    <path d="M 375 530 Q 350 535 320 532" stroke="url(#gold_accent)" stroke-width="4" fill="none"/>
    <path d="M 215 570 Q 250 575 282 572" stroke="url(#gold_accent)" stroke-width="4" fill="none"/>
    <path d="M 385 570 Q 350 575 318 572" stroke="url(#gold_accent)" stroke-width="4" fill="none"/>

    <!-- Peplum Kurti Top (Mustard Gold) -->
    <path d="M 240 230 Q 300 240 360 230 L 350 330 Q 300 338 250 330 Z" fill="#eab308"/>
    <!-- Flared Peplum Hem -->
    <path d="M 250 330 Q 300 338 350 330 L 380 435 Q 300 455 220 435 Z" fill="#ca8a04"/>
    <path d="M 220 435 Q 300 455 380 435" stroke="url(#gold_accent)" stroke-width="5" fill="none"/>

    <!-- Neckline & Placket Work -->
    <path d="M 275 235 Q 300 258 325 235" stroke="url(#gold_accent)" stroke-width="5" fill="none"/>
    <line x1="300" y1="258" x2="300" y2="330" stroke="url(#gold_accent)" stroke-width="3"/>
    <circle cx="300" cy="275" r="3" fill="#ffffff"/>
    <circle cx="300" cy="295" r="3" fill="#ffffff"/>
    <circle cx="300" cy="315" r="3" fill="#ffffff"/>

    <!-- Three-quarter sleeves with gota patti cuffs -->
    <path d="M 240 230 L 210 320 L 230 325 L 250 260 Z" fill="#eab308"/>
    <path d="M 360 230 L 390 320 L 370 325 L 350 260 Z" fill="#eab308"/>
    <line x1="210" y1="320" x2="230" y2="325" stroke="url(#gold_accent)" stroke-width="4"/>
    <line x1="390" y1="320" x2="370" y2="325" stroke="url(#gold_accent)" stroke-width="4"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · PEPLUM SHARARA</text>
</svg>'''

# 4. Boys Junior Brocade Royal Sherwani
svg_boys_sherwani = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <linearGradient id="gold_brocade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="40%" stop-color="#fde047"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>
  <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
  <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
  <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
  <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>

  <!-- Mannequin -->
  <g filter="url(#shadow)">
    <path d="M 280 175 L 320 175 L 318 205 L 282 205 Z" fill="url(#mannequin_body)"/>
    <path d="M 282 205 Q 220 220 210 250 Q 230 340 248 440 L 352 440 Q 370 340 390 250 Q 380 220 318 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Boys Junior Brocade Sherwani & Maroon Dhoti -->
  <g filter="url(#shadow)">
    <!-- Maroon Dhoti / Churidar Pants -->
    <path d="M 250 450 L 225 610 L 285 615 L 295 480 Z" fill="#7f1d1d"/>
    <path d="M 350 450 L 375 610 L 315 615 L 305 480 Z" fill="#7f1d1d"/>
    <!-- Dhoti Pleat Drape center -->
    <path d="M 285 450 Q 300 540 290 610 L 310 610 Q 300 540 315 450 Z" fill="#991b1b"/>

    <!-- Royal Gold Brocade Sherwani Coat -->
    <path d="M 230 225 Q 300 235 370 225 L 360 480 Q 300 495 240 480 Z" fill="url(#gold_brocade)"/>
    
    <!-- Mandarin Stand Collar (Ruby Velvet with Gold Border) -->
    <path d="M 275 220 Q 300 216 325 220 L 325 200 Q 300 196 275 200 Z" fill="#7f1d1d"/>
    <path d="M 275 220 Q 300 216 325 220" stroke="#fbbf24" stroke-width="3" fill="none"/>

    <!-- Front Placket & Metallic Buttons -->
    <line x1="300" y1="220" x2="300" y2="480" stroke="#7f1d1d" stroke-width="4"/>
    <circle cx="300" cy="245" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="300" cy="275" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="300" cy="305" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="300" cy="335" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="300" cy="365" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>
    <circle cx="300" cy="395" r="4" fill="#ffffff" stroke="#92400e" stroke-width="1.5"/>

    <!-- Velvet Pocket Square -->
    <rect x="250" y="275" width="28" height="6" rx="2" fill="#7f1d1d"/>
    <path d="M 256 275 L 264 260 L 272 275 Z" fill="#b91c1c"/>

    <!-- Full Sleeves with Velvet Cuffs -->
    <path d="M 230 225 L 200 370 L 225 375 L 245 270 Z" fill="url(#gold_brocade)"/>
    <path d="M 370 225 L 400 370 L 375 375 L 355 270 Z" fill="url(#gold_brocade)"/>
    <rect x="198" y="360" width="28" height="15" rx="3" fill="#7f1d1d"/>
    <rect x="374" y="360" width="28" height="15" rx="3" fill="#7f1d1d"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · JUNIOR SHERWANI</text>
</svg>'''

# 5. Boys Handloom Kurta Pajama Set
svg_boys_kurta = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>
  <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
  <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
  <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
  <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>

  <!-- Mannequin -->
  <g filter="url(#shadow)">
    <path d="M 280 175 L 320 175 L 318 205 L 282 205 Z" fill="url(#mannequin_body)"/>
    <path d="M 282 205 Q 220 220 210 250 Q 230 340 248 440 L 352 440 Q 370 340 390 250 Q 380 220 318 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Boys Royal Blue Silk Kurta & White Pajama -->
  <g filter="url(#shadow)">
    <!-- White Churidar Pajama -->
    <path d="M 252 450 L 230 620 L 285 625 L 295 470 Z" fill="#f8fafc"/>
    <path d="M 348 450 L 370 620 L 315 625 L 305 470 Z" fill="#f8fafc"/>

    <!-- Royal Blue Silk Kurta -->
    <path d="M 230 225 Q 300 235 370 225 L 355 450 Q 300 460 245 450 Z" fill="#1e40af"/>
    <!-- Side Slits -->
    <line x1="250" y1="360" x2="245" y2="450" stroke="#172554" stroke-width="2"/>
    <line x1="350" y1="360" x2="355" y2="450" stroke="#172554" stroke-width="2"/>

    <!-- Mandarin Collar with Threadwork -->
    <path d="M 276 222 Q 300 218 324 222 L 324 204 Q 300 200 276 204 Z" fill="#1d4ed8"/>
    <!-- Threadwork Placket -->
    <rect x="294" y="222" width="12" height="95" rx="2" fill="#3b82f6"/>
    <circle cx="300" cy="240" r="3" fill="#fbbf24"/>
    <circle cx="300" cy="265" r="3" fill="#fbbf24"/>
    <circle cx="300" cy="290" r="3" fill="#fbbf24"/>

    <!-- Full Sleeves -->
    <path d="M 230 225 L 195 365 L 220 370 L 245 270 Z" fill="#1e40af"/>
    <path d="M 370 225 L 405 365 L 380 370 L 355 270 Z" fill="#1e40af"/>
    <line x1="195" y1="365" x2="220" y2="370" stroke="#3b82f6" stroke-width="3"/>
    <line x1="405" y1="365" x2="380" y2="370" stroke="#3b82f6" stroke-width="3"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · FESTIVE KURTA</text>
</svg>'''

# 6. Boys Junior Modern Tailored Blazer
svg_boys_blazer = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="65%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="wood_stand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3d2314"/>
      <stop offset="40%" stop-color="#6e3f22"/>
      <stop offset="100%" stop-color="#24140a"/>
    </linearGradient>
    <linearGradient id="mannequin_body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ded4c5"/>
      <stop offset="50%" stop-color="#faf5ec"/>
      <stop offset="100%" stop-color="#c9bead"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3a2518" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <ellipse cx="300" cy="740" rx="160" ry="24" fill="#000000" opacity="0.12"/>
  <ellipse cx="300" cy="730" rx="90" ry="18" fill="url(#wood_stand)" filter="url(#shadow)"/>
  <rect x="294" y="440" width="12" height="286" fill="url(#wood_stand)"/>
  <path d="M 293 160 Q 300 135 307 160 Z" fill="url(#wood_stand)"/>
  <ellipse cx="300" cy="135" rx="9" ry="9" fill="url(#wood_stand)"/>

  <!-- Mannequin -->
  <g filter="url(#shadow)">
    <path d="M 280 175 L 320 175 L 318 205 L 282 205 Z" fill="url(#mannequin_body)"/>
    <path d="M 282 205 Q 220 220 210 250 Q 230 340 248 440 L 352 440 Q 370 340 390 250 Q 380 220 318 205 Z" fill="url(#mannequin_body)"/>
  </g>

  <!-- Garment: Modern Junior Navy Blazer & Crisp White Shirt & Bowtie -->
  <g filter="url(#shadow)">
    <!-- Grey Trousers -->
    <path d="M 252 430 L 235 620 L 285 625 L 295 450 Z" fill="#334155"/>
    <path d="M 348 430 L 365 620 L 315 625 L 305 450 Z" fill="#334155"/>

    <!-- Inner Crisp White Shirt -->
    <path d="M 275 220 L 325 220 L 315 350 L 285 350 Z" fill="#ffffff"/>
    <!-- Red Bowtie -->
    <path d="M 300 232 L 285 222 L 285 242 Z" fill="#dc2626"/>
    <path d="M 300 232 L 315 222 L 315 242 Z" fill="#dc2626"/>
    <circle cx="300" cy="232" r="4" fill="#991b1b"/>

    <!-- Navy Tailored Blazer Jacket -->
    <!-- Left panel -->
    <path d="M 230 225 L 275 220 L 285 320 L 245 420 L 225 410 Z" fill="#0f172a"/>
    <!-- Right panel -->
    <path d="M 370 225 L 325 220 L 315 320 L 355 420 L 375 410 Z" fill="#0f172a"/>
    <!-- Back body -->
    <path d="M 245 420 Q 300 435 355 420 L 355 350 Q 300 365 245 350 Z" fill="#0f172a"/>

    <!-- Peak Lapels -->
    <path d="M 275 220 L 292 270 L 275 285 L 282 320 Z" fill="#1e293b"/>
    <path d="M 325 220 L 308 270 L 325 285 L 318 320 Z" fill="#1e293b"/>

    <!-- Pocket with white pocket square -->
    <rect x="245" y="295" width="26" height="5" rx="1" fill="#1e293b"/>
    <path d="M 252 295 L 258 285 L 264 295 Z" fill="#ffffff"/>

    <!-- Brass Buttons -->
    <circle cx="295" cy="335" r="4" fill="#f59e0b"/>
    <circle cx="295" cy="365" r="4" fill="#f59e0b"/>

    <!-- Sleeves with cuff buttons -->
    <path d="M 230 225 L 195 365 L 225 370 L 245 270 Z" fill="#0f172a"/>
    <path d="M 370 225 L 405 365 L 375 370 L 355 270 Z" fill="#0f172a"/>
    <circle cx="205" cy="358" r="2" fill="#f59e0b"/>
    <circle cx="212" cy="360" r="2" fill="#f59e0b"/>
    <circle cx="395" cy="358" r="2" fill="#f59e0b"/>
    <circle cx="388" cy="360" r="2" fill="#f59e0b"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · JUNIOR BLAZER</text>
</svg>'''

# 7. Accessories: Bridal Zardozi Potli Bag
svg_acc_potli = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="70%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="potli_velvet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#831843"/>
      <stop offset="50%" stop-color="#be185d"/>
      <stop offset="100%" stop-color="#500724"/>
    </linearGradient>
    <linearGradient id="gold_accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#3a2518" flood-opacity="0.22"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <!-- Marble Plinth -->
  <polygon points="120,680 480,680 520,740 80,740" fill="#e2d8cc"/>
  <rect x="80" y="740" width="440" height="30" fill="#c4b5a3"/>

  <!-- Pearl Beaded Handle -->
  <path d="M 230 320 Q 300 140 370 320" stroke="none" fill="none" id="handle_path"/>
  <g filter="url(#shadow)">
    <!-- Pearl Strand -->
    <path d="M 230 320 Q 300 150 370 320" stroke="#fef08a" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M 230 320 Q 300 150 370 320" stroke="#ffffff" stroke-width="8" stroke-dasharray="10,6" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Main Potli Pouch -->
  <g filter="url(#shadow)">
    <!-- Ruffled Scallop Neck -->
    <path d="M 220 310 Q 300 325 380 310 Q 390 280 300 285 Q 210 280 220 310 Z" fill="url(#potli_velvet)"/>
    <path d="M 215 305 Q 300 320 385 305" stroke="url(#gold_accent)" stroke-width="4" fill="none"/>

    <!-- Gold Drawstring & Tassels -->
    <path d="M 220 325 Q 300 340 380 325" stroke="url(#gold_accent)" stroke-width="6" fill="none"/>
    <path d="M 250 330 Q 230 400 215 470" stroke="url(#gold_accent)" stroke-width="3" fill="none"/>
    <path d="M 350 330 Q 370 400 385 470" stroke="url(#gold_accent)" stroke-width="3" fill="none"/>
    <!-- Tassel Latkans -->
    <circle cx="215" cy="470" r="10" fill="url(#gold_accent)"/>
    <path d="M 205 478 L 225 478 L 220 520 L 210 520 Z" fill="#fde047"/>
    <circle cx="385" cy="470" r="10" fill="url(#gold_accent)"/>
    <path d="M 375 478 L 395 478 L 390 520 L 380 520 Z" fill="#fde047"/>

    <!-- Pouch Body -->
    <path d="M 230 330 Q 140 440 220 590 Q 300 660 380 590 Q 460 440 370 330 Q 300 345 230 330 Z" fill="url(#potli_velvet)"/>

    <!-- Intricate Gold Zardozi Embroidery Mandala -->
    <circle cx="300" cy="480" r="60" fill="none" stroke="url(#gold_accent)" stroke-width="4"/>
    <circle cx="300" cy="480" r="42" fill="none" stroke="url(#gold_accent)" stroke-width="2" stroke-dasharray="6,4"/>
    <circle cx="300" cy="480" r="12" fill="url(#gold_accent)"/>
    <!-- Petals -->
    <path d="M 300 420 Q 320 450 300 480 Q 280 450 300 420 Z" fill="url(#gold_accent)"/>
    <path d="M 300 540 Q 320 510 300 480 Q 280 510 300 540 Z" fill="url(#gold_accent)"/>
    <path d="M 240 480 Q 270 500 300 480 Q 270 460 240 480 Z" fill="url(#gold_accent)"/>
    <path d="M 360 480 Q 330 500 300 480 Q 330 460 360 480 Z" fill="url(#gold_accent)"/>

    <!-- Pearl Tassels along bottom contour -->
    <g fill="#ffffff" stroke="#d4af37" stroke-width="1">
      <circle cx="210" cy="570" r="5"/><circle cx="210" cy="582" r="3"/>
      <circle cx="240" cy="610" r="5"/><circle cx="240" cy="622" r="3"/>
      <circle cx="270" cy="635" r="5"/><circle cx="270" cy="647" r="3"/>
      <circle cx="300" cy="645" r="6"/><circle cx="300" cy="658" r="4"/>
      <circle cx="330" cy="635" r="5"/><circle cx="330" cy="647" r="3"/>
      <circle cx="360" cy="610" r="5"/><circle cx="360" cy="622" r="3"/>
      <circle cx="390" cy="570" r="5"/><circle cx="390" cy="582" r="3"/>
    </g>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · ARTISANAL POTLI</text>
</svg>'''

# 8. Accessories: Luxury Leather Handbag
svg_acc_handbag = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="70%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="tan_leather" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="35%" stop-color="#b45309"/>
      <stop offset="70%" stop-color="#92400e"/>
      <stop offset="100%" stop-color="#582106"/>
    </linearGradient>
    <linearGradient id="gold_hw" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#3a2518" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <!-- Display Pedestal -->
  <polygon points="120,680 480,680 520,740 80,740" fill="#e2d8cc"/>
  <rect x="80" y="740" width="440" height="30" fill="#c4b5a3"/>

  <!-- Top Handle -->
  <g filter="url(#shadow)">
    <path d="M 230 380 Q 230 200 300 200 Q 370 200 370 380" stroke="url(#tan_leather)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M 230 380 Q 230 200 300 200 Q 370 200 370 380" stroke="#fde68a" stroke-width="2" stroke-dasharray="6,4" fill="none"/>
    <!-- Handle Brass Loops -->
    <rect x="222" y="370" width="16" height="24" rx="4" fill="url(#gold_hw)"/>
    <rect x="362" y="370" width="16" height="24" rx="4" fill="url(#gold_hw)"/>
  </g>

  <!-- Structured Handbag Body -->
  <g filter="url(#shadow)">
    <!-- Trapezoid Body -->
    <path d="M 200 380 L 400 380 L 440 640 L 160 640 Z" fill="url(#tan_leather)"/>
    <!-- Perimeter Tailored Stitching -->
    <path d="M 206 388 L 394 388 L 432 632 L 168 632 Z" stroke="#fde68a" stroke-width="2" stroke-dasharray="5,4" fill="none"/>

    <!-- Front Flap -->
    <path d="M 205 380 L 395 380 L 375 510 L 225 510 Z" fill="#92400e"/>
    <path d="M 212 386 L 388 386 L 370 504 L 230 504 Z" stroke="#fde68a" stroke-width="2" stroke-dasharray="5,4" fill="none"/>

    <!-- Luxury Gold Turn-lock Clasp -->
    <rect x="280" y="490" width="40" height="32" rx="6" fill="url(#gold_hw)"/>
    <ellipse cx="300" cy="506" rx="8" ry="12" fill="#78350f"/>
    <rect x="296" y="498" width="8" height="16" rx="2" fill="url(#gold_hw)"/>

    <!-- Key Bell Clochette Charm Hanging from Handle -->
    <path d="M 238 390 L 245 460" stroke="#78350f" stroke-width="4"/>
    <path d="M 240 460 L 254 460 L 258 480 L 236 480 Z" fill="#78350f"/>
    <circle cx="247" cy="470" r="3" fill="url(#gold_hw)"/>

    <!-- Protective Brass Bottom Studs -->
    <ellipse cx="180" cy="640" rx="8" ry="3" fill="url(#gold_hw)"/>
    <ellipse cx="420" cy="640" rx="8" ry="3" fill="url(#gold_hw)"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · BESPOKE LEATHER</text>
</svg>'''

# 9. Accessories: Kundan Polki Choker Necklace
svg_acc_jewellery = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="70%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="velvet_bust" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="50%" stop-color="#27272a"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="gold_hw" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#3a2518" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <!-- Velvet Jewellery Display Bust -->
  <g filter="url(#shadow)">
    <!-- Base -->
    <ellipse cx="300" cy="710" rx="140" ry="24" fill="#18181b"/>
    <!-- Bust -->
    <path d="M 285 240 L 315 240 L 325 320 Q 420 370 450 680 L 150 680 Q 180 370 275 320 Z" fill="url(#velvet_bust)"/>
  </g>

  <!-- Kundan Polki Choker & Emerald Drops -->
  <g filter="url(#shadow)">
    <!-- Choker Collar Band -->
    <path d="M 240 330 Q 300 370 360 330 Q 370 365 300 405 Q 230 365 240 330 Z" fill="url(#gold_hw)"/>

    <!-- Polki Gemstone Grid -->
    <g fill="#ffffff" stroke="#d4af37" stroke-width="2">
      <circle cx="260" cy="350" r="7"/><circle cx="280" cy="360" r="8"/><circle cx="300" cy="365" r="9"/>
      <circle cx="320" cy="360" r="8"/><circle cx="340" cy="350" r="7"/>
      <circle cx="250" cy="340" r="6"/><circle cx="350" cy="340" r="6"/>
      <circle cx="270" cy="378" r="7"/><circle cx="290" cy="385" r="8"/><circle cx="310" cy="385" r="8"/><circle cx="330" cy="378" r="7"/>
    </g>

    <!-- Emerald Gem Drops -->
    <g fill="#059669" stroke="url(#gold_hw)" stroke-width="2">
      <ellipse cx="260" cy="405" rx="6" ry="12"/>
      <ellipse cx="280" cy="420" rx="7" ry="14"/>
      <ellipse cx="300" cy="430" rx="8" ry="16"/>
      <ellipse cx="320" cy="420" rx="7" ry="14"/>
      <ellipse cx="340" cy="405" rx="6" ry="12"/>
    </g>
    <!-- Pearl Seed Accents -->
    <g fill="#ffffff">
      <circle cx="260" cy="420" r="3"/><circle cx="280" cy="438" r="3.5"/><circle cx="300" cy="450" r="4"/><circle cx="320" cy="438" r="3.5"/><circle cx="340" cy="420" r="3"/>
    </g>

    <!-- Matching Jhumka Earrings -->
    <!-- Left Earring -->
    <circle cx="210" cy="280" r="8" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
    <path d="M 195 320 Q 210 295 225 320 Z" fill="url(#gold_hw)"/>
    <ellipse cx="210" cy="335" rx="5" ry="10" fill="#059669"/>
    <!-- Right Earring -->
    <circle cx="390" cy="280" r="8" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
    <path d="M 375 320 Q 390 295 405 320 Z" fill="url(#gold_hw)"/>
    <ellipse cx="390" cy="335" rx="5" ry="10" fill="#059669"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · HERITAGE JEWELLERY</text>
</svg>'''

# 10. Accessories: Artisanal Raw Silk Mojari Jutti
svg_acc_footwear = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="70%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dec8"/>
    </linearGradient>
    <linearGradient id="jutti_velvet" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#831843"/>
      <stop offset="50%" stop-color="#be185d"/>
      <stop offset="100%" stop-color="#701a75"/>
    </linearGradient>
    <linearGradient id="gold_hw" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#fff0aa"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#3a2518" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg_grad)"/>
  <!-- Velvet Display Base -->
  <ellipse cx="300" cy="650" rx="200" ry="60" fill="#18181b" opacity="0.18"/>
  <ellipse cx="300" cy="640" rx="180" ry="50" fill="#27272a"/>

  <!-- Left Jutti -->
  <g filter="url(#shadow)">
    <!-- Sole -->
    <path d="M 180 500 Q 140 420 180 340 Q 220 300 240 310 Q 240 400 220 520 Q 200 550 180 500 Z" fill="#b45309"/>
    <!-- Upper Velvet -->
    <path d="M 190 490 Q 150 420 190 350 Q 225 315 240 325 Q 235 410 220 510 Q 205 530 190 490 Z" fill="url(#jutti_velvet)"/>
    <!-- Pointed Curled Toe (Nok) -->
    <path d="M 240 325 Q 260 290 250 280 Q 235 290 240 325 Z" fill="url(#gold_hw)"/>
    <!-- Gold Zari Embroidery -->
    <path d="M 195 440 Q 220 400 235 340" stroke="url(#gold_hw)" stroke-width="4" stroke-dasharray="6,3" fill="none"/>
    <circle cx="215" cy="410" r="5" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
    <circle cx="225" cy="370" r="4" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
  </g>

  <!-- Right Jutti (Slightly Angled) -->
  <g filter="url(#shadow)">
    <!-- Sole -->
    <path d="M 360 480 Q 420 400 390 320 Q 350 280 330 290 Q 330 380 340 500 Q 355 530 360 480 Z" fill="#b45309"/>
    <!-- Upper Velvet -->
    <path d="M 355 470 Q 410 400 385 330 Q 345 295 330 305 Q 335 390 345 490 Q 352 510 355 470 Z" fill="url(#jutti_velvet)"/>
    <!-- Pointed Curled Toe -->
    <path d="M 330 305 Q 310 270 320 260 Q 335 270 330 305 Z" fill="url(#gold_hw)"/>
    <!-- Gold Zari Embroidery -->
    <path d="M 365 420 Q 350 380 335 320" stroke="url(#gold_hw)" stroke-width="4" stroke-dasharray="6,3" fill="none"/>
    <circle cx="355" cy="390" r="5" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
    <circle cx="345" cy="350" r="4" fill="#ffffff" stroke="url(#gold_hw)" stroke-width="2"/>
  </g>
  <text x="300" y="780" font-family="'Playfair Display', serif" font-size="12" fill="#8c786a" text-anchor="middle" letter-spacing="3">VASTRAÉ ATELIER · EMBROIDERED JUTTIS</text>
</svg>'''

files = {
    os.path.join(base_dir, "kids_girls", "frock_fairytale_tulle.svg"): svg_girls_frock,
    os.path.join(base_dir, "kids_girls", "lehenga_junior_silk.svg"): svg_girls_lehenga,
    os.path.join(base_dir, "kids_girls", "kurti_peplum_sharara.svg"): svg_girls_kurti,
    os.path.join(base_dir, "kids_boys", "sherwani_junior_brocade.svg"): svg_boys_sherwani,
    os.path.join(base_dir, "kids_boys", "kurta_handloom_silk.svg"): svg_boys_kurta,
    os.path.join(base_dir, "kids_boys", "blazer_junior_tailored.svg"): svg_boys_blazer,
    os.path.join(base_dir, "accessories", "potli_bridal_zardozi.svg"): svg_acc_potli,
    os.path.join(base_dir, "accessories", "handbag_italian_leather.svg"): svg_acc_handbag,
    os.path.join(base_dir, "accessories", "jewellery_kundan_choker.svg"): svg_acc_jewellery,
    os.path.join(base_dir, "accessories", "footwear_embroidered_jutti.svg"): svg_acc_footwear,
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"Generated: {path}")

print("All 10 Kids & Accessories SVGs successfully created.")
