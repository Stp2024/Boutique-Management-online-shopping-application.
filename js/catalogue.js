/* =====================================================
   VASTRAÉ COLLECTIONS & 360° ATELIER STUDIO MODULE
   - 13 Curated Styles, atmospheres & Web Audio soundscapes
   - Dynamic Collections Outfit Cards with multi-angle previews
   - 360° Atelier Studio Modal with Turntable Auto-Spin & Orbit Slider
===================================================== */

/* =====================================================
   NAVIGATION
===================================================== */

      function scrollToId(id) {
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
      }

      /* =====================================================
   CATALOGUE: 11 CURATED STYLES, RELATABLE ATMOSPHERES & SOUNDS
===================================================== */

      const catalogueInfo = {
        all: {
          0: "All Collections",
          1: "Explore every VASTRAÉ style in one place.",
          title: "All Collections",
          kicker: "THE DIGITAL WARDROBE",
          desc: "Explore every VASTRAÉ style curated around your personality, occasion and lifestyle.",
          img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
          soundName: "",
          toast: "Showing all wardrobe collections."
        },

        modern: {
          0: "Modern",
          1: "Contemporary silhouettes with timeless elegance.",
          title: "Modern",
          kicker: "GEN-Z CYBER COUTURE",
          desc: "Futuristic cyber-couture, deconstructed tailoring, Y2K aesthetic, and gender-fluid modern streetwear.",
          img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
          soundName: "Cyber Modern Riser",
          toast: "⚡ Gen-Z Cyber Modern Collection Activated"
        },

        traditional: {
          0: "Traditional",
          1: "Heritage-inspired clothing with classic craftsmanship.",
          title: "Traditional",
          kicker: "HERITAGE SANCTUM & LOOMS",
          desc: "Sacred handcrafted silks, pure gold zari weaves, and timeless sanctum artisanal tailoring.",
          img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
          soundName: "Sacred Temple Bell",
          toast: "🪔 Traditional Heritage Pavilion Activated"
        },

        formal: {
          0: "Formal",
          1: "Refined tailoring for professional occasions.",
          title: "Formal",
          kicker: "SARTORIAL BLACK-TIE & ATELIER",
          desc: "Masterfully tailored tuxedos, three-piece suits, and evening gowns cut with sculptural precision.",
          img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85",
          soundName: "Grand Gala Piano & Harp Chime",
          toast: "🎩 Formal Collection: Sartorial Navy & Gala Harp Chime"
        },

        "semi-formal": {
          0: "Semi-Formal",
          1: "Balanced looks between relaxed and refined.",
          title: "Semi-Formal",
          kicker: "TWILIGHT COCKTAIL & DUSK ELEGANCE",
          desc: "Effortless evening poise, textured blazers, cocktail dresses, and sophisticated twilight glamour.",
          img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85",
          soundName: "Twilight Rhodes 7th Chord",
          toast: "🍸 Semi-Formal Collection: Cocktail Dusk & Jazz Rhodes Chord"
        },

        "semi-modern": {
          0: "Semi-Modern",
          1: "A meeting point between classic and contemporary.",
          title: "Semi-Modern",
          kicker: "NORDIC ARCHITECTURAL MINIMALISM",
          desc: "Clean Scandinavian geometric silhouettes, relaxed draping, and contemporary utilitarian elegance.",
          img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
          soundName: "Harmonic Kalimba Pluck",
          toast: "🌿 Semi-Modern Collection: Nordic Slate & Harmonic Kalimba"
        },

        casual: {
          0: "Casual",
          1: "Effortless pieces for everyday sophistication.",
          title: "Casual",
          kicker: "GOLDEN-HOUR SUNLIT LINEN",
          desc: "Breezy washed linens, warm terracotta tones, sun-kissed textures, and relaxed everyday sophistication.",
          img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
          soundName: "Sunny Acoustic Guitar Strum",
          toast: "☀️ Casual Collection: Golden Linen & Acoustic Guitar Strum"
        },

        ethnic: {
          0: "Ethnic",
          1: "Rich cultural details reimagined for today.",
          title: "Ethnic",
          kicker: "HERITAGE LOOMS & AUTHENTIC MEEND",
          desc: "Sacred handcrafted silks, rich madder terracotta weaves, intricate jali motifs, and artisanal pride.",
          img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
          soundName: "Sitar Meend & Tanpura Drone",
          toast: "🪔 Ethnic Collection: Heritage Madder & Sitar Meend Drone"
        },

        festive: {
          0: "Festive",
          1: "Celebrate colour, texture and tradition.",
          title: "Festive",
          kicker: "ROYAL JUBILEE & CELEBRATION DANCING LIGHTS",
          desc: "Vibrant marigold golds, celebration vermillions, sparkling zardozi embellishments, and joyous splendour.",
          img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
          soundName: "Joyous Brass Fanfare & Cymbal",
          toast: "🎉 Festive Collection: Marigold Glow & Joyous Fanfare"
        },

        party: {
          0: "Party",
          1: "Statement pieces for memorable nights.",
          title: "Party",
          kicker: "VIP CLUB NOIR & HIGH-VOLTAGE LASERS",
          desc: "High-voltage metallic sequins, liquid satin, sculpted corsetry, and electric midnight statement pieces.",
          img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
          soundName: "808 Bass & Laser Drop",
          toast: "⚡ Party Collection: Club Noir & 808 Bass Laser Drop"
        },

        wedding: {
          0: "Wedding",
          1: "Elegant looks for your most important moments.",
          title: "Wedding",
          kicker: "GRAND ROYAL MATRIMONY & 24K ZARI",
          desc: "Heirloom bridal lehengas, pure raw silk sherwanis, real bullion gold zari, and sacred matrimonial glory.",
          img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
          soundName: "Royal Shehnai & Matrimonial Gong",
          toast: "💍 Wedding Collection: Royal Zari Velvet & Shehnai Matrimony"
        },

        luxury: {
          0: "Luxury",
          1: "Premium designs with elevated finishing.",
          title: "Luxury",
          kicker: "HAUTE COUTURE OBSIDIAN & CHAMPAGNE BULLION",
          desc: "Limited-edition salon masterpieces, hand-set crystal pavé, caviar noir silks, and gold bullion filigree.",
          img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
          soundName: "Crystal Flute Clink & Celestial Harp",
          toast: "👑 Luxury Collection: Obsidian Gold & Crystal Flute Clink"
        },

        office: {
          0: "Office",
          1: "Polished wardrobe essentials for work.",
          title: "Office",
          kicker: "METROPOLIS EXECUTIVE TITANIUM & GLASS",
          desc: "Sharp corporate tailoring, architectural trench coats, sleek wool trousers, and boardroom poise.",
          img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=85",
          soundName: "Executive Titanium Precision Chime",
          toast: "💼 Office Collection: Metropolis Titanium & Executive Tone"
        },

        designer: {
          0: "Designer",
          1: "Distinctive silhouettes created for individuality.",
          title: "Designer",
          kicker: "RUNWAY AVANT-GARDE & MONOCHROME FLASH",
          desc: "Bold deconstructed silhouettes, radical asymmetry, sharp architectural cuts, and high-fashion runway energy.",
          img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
          soundName: "Runway Camera Shutter Snap",
          toast: "✂️ Designer Collection: Runway Noir & Camera Shutter Snap"
        }
      };

      const ALL_STYLE_THEME_CLASSES = [
        "style-theme-formal",
        "style-theme-semi-formal",
        "style-theme-semi-modern",
        "style-theme-casual",
        "style-theme-ethnic",
        "style-theme-festive",
        "style-theme-party",
        "style-theme-wedding",
        "style-theme-luxury",
        "style-theme-office",
        "style-theme-designer",
        "genz-modern-active"
      ];

      let activeSectionThemeStyle = "all";

      /* Web Audio API Sound Generator for all sections */
      function playSectionStyleSound(style) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;
          const ctx = new AudioContext();
          if (ctx.state === "suspended") ctx.resume();
          const now = ctx.currentTime;

          switch (style) {
            case "formal": {
              // Grand Gala Piano & Harp Chime (C4, G4, C5, E5, G5, B5)
              const notes = [261.63, 392.00, 523.25, 659.25, 783.99, 987.77];
              notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + i * 0.07);
                gain.gain.setValueAtTime(0, now + i * 0.07);
                gain.gain.linearRampToValueAtTime(0.20 / (1 + i * 0.15), now + i * 0.07 + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 2.4);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.07);
                osc.stop(now + i * 0.07 + 2.4);
              });
              break;
            }

            case "semi-formal": {
              // Twilight Rhodes 7th chord (Eb3, G3, Bb3, D4, F4) with warm lowpass body
              const chord = [155.56, 196.00, 233.08, 293.66, 349.23];
              const filter = ctx.createBiquadFilter();
              filter.type = "lowpass";
              filter.frequency.setValueAtTime(1100, now);
              const masterGain = ctx.createGain();
              masterGain.gain.setValueAtTime(0, now);
              masterGain.gain.linearRampToValueAtTime(0.24, now + 0.04);
              masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
              filter.connect(masterGain);
              masterGain.connect(ctx.destination);

              chord.forEach((freq) => {
                const osc = ctx.createOscillator();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, now);
                osc.connect(filter);
                osc.start(now);
                osc.stop(now + 2.8);
              });
              break;
            }

            case "semi-modern": {
              // Crystalline marimba / kalimba harmonic wooden pluck (F#4, C#5, F#5, A#5)
              const notes = [369.99, 554.37, 739.99, 932.33];
              notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);
                gain.gain.setValueAtTime(0, now + idx * 0.06);
                gain.gain.linearRampToValueAtTime(0.24, now + idx * 0.06 + 0.008);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.5);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 1.5);
              });
              break;
            }

            case "casual": {
              // Warm sunny acoustic nylon guitar arpeggio (G-B-D-G-B-E)
              const guitarNotes = [196.00, 246.94, 293.66, 392.00, 493.88, 659.25];
              guitarNotes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0, now + i * 0.06);
                gain.gain.linearRampToValueAtTime(0.22, now + i * 0.06 + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 1.7);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 1.7);
              });
              break;
            }

            case "ethnic": {
              // Authentic Indian sitar strum & tanpura drone with meend pitch-glide
              // Tanpura Drone
              const drone = ctx.createOscillator();
              const droneGain = ctx.createGain();
              drone.type = "sawtooth";
              drone.frequency.setValueAtTime(130.81, now);
              const filter = ctx.createBiquadFilter();
              filter.type = "lowpass";
              filter.frequency.setValueAtTime(520, now);
              droneGain.gain.setValueAtTime(0, now);
              droneGain.gain.linearRampToValueAtTime(0.14, now + 0.05);
              droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
              drone.connect(filter);
              filter.connect(droneGain);
              droneGain.connect(ctx.destination);
              drone.start(now);
              drone.stop(now + 2.8);

              // Sitar Meend string with bend
              const sitar = ctx.createOscillator();
              const sitarGain = ctx.createGain();
              sitar.type = "sawtooth";
              sitar.frequency.setValueAtTime(261.63, now + 0.1);
              sitar.frequency.exponentialRampToValueAtTime(329.63, now + 0.35); // Glide to Ga
              sitar.frequency.linearRampToValueAtTime(392.00, now + 0.70); // Glide to Pa
              const sitarFilter = ctx.createBiquadFilter();
              sitarFilter.type = "bandpass";
              sitarFilter.frequency.setValueAtTime(1250, now);
              sitarFilter.Q.setValueAtTime(3.2, now);
              sitarGain.gain.setValueAtTime(0, now + 0.1);
              sitarGain.gain.linearRampToValueAtTime(0.24, now + 0.12);
              sitarGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
              sitar.connect(sitarFilter);
              sitarFilter.connect(sitarGain);
              sitarGain.connect(ctx.destination);
              sitar.start(now + 0.1);
              sitar.stop(now + 2.4);
              break;
            }

            case "festive": {
              // Joyous celebration brass fanfare & festive bell
              const brass = [293.66, 369.99, 440.00, 587.33, 739.99];
              brass.forEach((f, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(f, now + idx * 0.04);
                const ftr = ctx.createBiquadFilter();
                ftr.type = "lowpass";
                ftr.frequency.setValueAtTime(1500, now);
                gain.gain.setValueAtTime(0, now + idx * 0.04);
                gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.04 + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.9);
                osc.connect(ftr);
                ftr.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.04);
                osc.stop(now + idx * 0.04 + 1.9);
              });
              // High celebration chime
              const chime = ctx.createOscillator();
              const cGain = ctx.createGain();
              chime.type = "sine";
              chime.frequency.setValueAtTime(2093.00, now + 0.2);
              cGain.gain.setValueAtTime(0, now + 0.2);
              cGain.gain.linearRampToValueAtTime(0.15, now + 0.21);
              cGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
              chime.connect(cGain);
              cGain.connect(ctx.destination);
              chime.start(now + 0.2);
              chime.stop(now + 1.5);
              break;
            }

            case "party": {
              // Club 808 sub-bass kick drop + laser synth sweep
              const kick = ctx.createOscillator();
              const kickGain = ctx.createGain();
              kick.type = "sine";
              kick.frequency.setValueAtTime(150, now);
              kick.frequency.exponentialRampToValueAtTime(38, now + 0.45);
              kickGain.gain.setValueAtTime(0.42, now);
              kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
              kick.connect(kickGain);
              kickGain.connect(ctx.destination);
              kick.start(now);
              kick.stop(now + 0.9);

              const laser = ctx.createOscillator();
              const laserGain = ctx.createGain();
              laser.type = "sawtooth";
              laser.frequency.setValueAtTime(180, now + 0.08);
              laser.frequency.exponentialRampToValueAtTime(1600, now + 0.45);
              const lFilter = ctx.createBiquadFilter();
              lFilter.type = "bandpass";
              lFilter.frequency.setValueAtTime(950, now);
              laserGain.gain.setValueAtTime(0, now + 0.08);
              laserGain.gain.linearRampToValueAtTime(0.19, now + 0.12);
              laserGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
              laser.connect(lFilter);
              lFilter.connect(laserGain);
              laserGain.connect(ctx.destination);
              laser.start(now + 0.08);
              laser.stop(now + 0.65);
              break;
            }

            case "wedding": {
              // Royal Shehnai Matrimonial Flourish & Deep Temple Bronze Gong
              const gong = ctx.createOscillator();
              const gongGain = ctx.createGain();
              gong.type = "sine";
              gong.frequency.setValueAtTime(216, now);
              gongGain.gain.setValueAtTime(0, now);
              gongGain.gain.linearRampToValueAtTime(0.36, now + 0.02);
              gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
              gong.connect(gongGain);
              gongGain.connect(ctx.destination);
              gong.start(now);
              gong.stop(now + 3.2);

              const notes = [392.00, 493.88, 587.33, 783.99];
              notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.12);
                const ftr = ctx.createBiquadFilter();
                ftr.type = "bandpass";
                ftr.frequency.setValueAtTime(1800, now);
                ftr.Q.setValueAtTime(2.5, now);
                gain.gain.setValueAtTime(0, now + 0.15 + idx * 0.12);
                gain.gain.linearRampToValueAtTime(0.20, now + 0.15 + idx * 0.12 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15 + idx * 0.12 + 1.3);
                osc.connect(ftr);
                ftr.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + 0.15 + idx * 0.12);
                osc.stop(now + 0.15 + idx * 0.12 + 1.3);
              });
              break;
            }

            case "luxury": {
              // Crystal champagne flute clink & celestial gold harp
              [2637, 3136, 4186].forEach((f, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(f, now);
                gain.gain.setValueAtTime(0.30 / (idx + 1), now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.3);
              });
              [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + 0.15 + i * 0.08);
                gain.gain.setValueAtTime(0, now + 0.15 + i * 0.08);
                gain.gain.linearRampToValueAtTime(0.16, now + 0.15 + i * 0.08 + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15 + i * 0.08 + 1.9);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + 0.15 + i * 0.08);
                osc.stop(now + 0.15 + i * 0.08 + 1.9);
              });
              break;
            }

            case "office": {
              // Metropolis Executive Titanium precision chime (A4, E5, A5)
              const notes = [440.00, 659.25, 880.00];
              notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                gain.gain.setValueAtTime(0, now + idx * 0.1);
                gain.gain.linearRampToValueAtTime(0.24, now + idx * 0.1 + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 2.0);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 2.0);
              });
              break;
            }

            case "designer": {
              // Runway camera shutter snap & flash sub-drop
              const click1 = ctx.createOscillator();
              const cGain1 = ctx.createGain();
              click1.type = "square";
              click1.frequency.setValueAtTime(800, now);
              click1.frequency.exponentialRampToValueAtTime(120, now + 0.035);
              cGain1.gain.setValueAtTime(0.35, now);
              cGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
              click1.connect(cGain1);
              cGain1.connect(ctx.destination);
              click1.start(now);
              click1.stop(now + 0.035);

              const click2 = ctx.createOscillator();
              const cGain2 = ctx.createGain();
              click2.type = "square";
              click2.frequency.setValueAtTime(1400, now + 0.045);
              click2.frequency.exponentialRampToValueAtTime(200, now + 0.09);
              cGain2.gain.setValueAtTime(0.40, now + 0.045);
              cGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
              click2.connect(cGain2);
              cGain2.connect(ctx.destination);
              click2.start(now + 0.045);
              click2.stop(now + 0.09);

              const bass = ctx.createOscillator();
              const bGain = ctx.createGain();
              bass.type = "sawtooth";
              bass.frequency.setValueAtTime(120, now + 0.09);
              bass.frequency.exponentialRampToValueAtTime(50, now + 0.5);
              const bFilter = ctx.createBiquadFilter();
              bFilter.type = "lowpass";
              bFilter.frequency.setValueAtTime(320, now);
              bGain.gain.setValueAtTime(0, now + 0.09);
              bGain.gain.linearRampToValueAtTime(0.24, now + 0.12);
              bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
              bass.connect(bFilter);
              bFilter.connect(bGain);
              bGain.connect(ctx.destination);
              bass.start(now + 0.09);
              bass.stop(now + 0.85);
              break;
            }

            case "modern": {
              if (window.RCSound && RCSound.success) RCSound.success();
              break;
            }

            case "traditional": {
              if (typeof playTempleBellChime === "function") playTempleBellChime();
              break;
            }
          }
        } catch (err) {
          console.log("AudioContext section sound error:", err);
        }
      }

      function applyCatalogueTheme(style) {
        activeSectionThemeStyle = style;
        const catalogueSec = document.getElementById("catalogue");
        const pillWrap = document.getElementById("catSoundPillWrap");
        const soundLabel = document.getElementById("catSoundLabel");
        const kickerEl = document.getElementById("catalogueKicker");
        const titleEl = document.getElementById("catalogueTitle");
        const descEl = document.getElementById("catalogueDescription");
        const featImg = document.querySelector(".cat-feature img");

        // Clean up previous section theme classes on catalogue
        if (catalogueSec) {
          ALL_STYLE_THEME_CLASSES.forEach(cls => catalogueSec.classList.remove(cls));
        }

        const info = catalogueInfo[style] || catalogueInfo.all;

        if (titleEl) titleEl.innerText = info.title || style;
        if (descEl) descEl.innerText = info.desc || "";
        if (kickerEl) kickerEl.innerText = info.kicker || "THE DIGITAL WARDROBE";
        if (featImg && info.img) featImg.src = info.img;

        // Sound indicator badge update
        if (pillWrap && soundLabel) {
          if (info.soundName && style !== "all") {
            soundLabel.textContent = info.soundName;
            pillWrap.style.display = "flex";
          } else {
            pillWrap.style.display = "none";
          }
        }

        // Apply theme-specific background class
        const targetThemeClass = `style-theme-${style}`;
        if (catalogueSec && ALL_STYLE_THEME_CLASSES.includes(targetThemeClass)) {
          catalogueSec.classList.add(targetThemeClass);
        }

        // Play the distinctive audio synthesis for this style
        playSectionStyleSound(style);

        if (info.toast && typeof showToast === "function") {
          showToast(info.toast);
        }
      }

      function replayActiveThemeSound() {
        if (activeSectionThemeStyle) {
          playSectionStyleSound(activeSectionThemeStyle);
          const info = catalogueInfo[activeSectionThemeStyle];
          if (info && info.soundName && typeof showToast === "function") {
            showToast(`🔊 Playing ${info.soundName}`);
          }
        }
      }

      function catalogueFilter(style, button) {
        selectedCatalogue = style;

        document
          .querySelectorAll(".cat-btn")
          .forEach((b) => b.classList.remove("active"));

        if (!button) {
          button = document.querySelector(`.cat-btn[data-style="${style}"]`) ||
            Array.from(document.querySelectorAll(".cat-btn")).find(b => b.textContent.trim().toLowerCase() === style.toLowerCase());
        }
        if (button) button.classList.add("active");

        if (style === "traditional") {
          activateModernGenZTheme(false);
          const catalogueSec = document.getElementById("catalogue");
          if (catalogueSec) ALL_STYLE_THEME_CLASSES.forEach(cls => catalogueSec.classList.remove(cls));
          const featImg = document.querySelector(".cat-feature img");
          if (featImg) featImg.src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85";
          const titleEl = document.getElementById("catalogueTitle");
          const descEl = document.getElementById("catalogueDescription");
          if (titleEl) titleEl.innerText = "Traditional";
          if (descEl) descEl.innerText = "Heritage-inspired clothing with classic craftsmanship.";
          const pillWrap = document.getElementById("catSoundPillWrap");
          const soundLabel = document.getElementById("catSoundLabel");
          if (pillWrap && soundLabel) {
            soundLabel.textContent = "Sacred Temple Bell";
            pillWrap.style.display = "flex";
          }
          activeSectionThemeStyle = "traditional";
          window.scrollToId("traditionalSection");
          activateTempleTheme(true);
        } else if (style === "modern") {
          activateTempleTheme(false);
          const catalogueSec = document.getElementById("catalogue");
          if (catalogueSec) ALL_STYLE_THEME_CLASSES.forEach(cls => catalogueSec.classList.remove(cls));
          activeSectionThemeStyle = "modern";
          const pillWrap = document.getElementById("catSoundPillWrap");
          const soundLabel = document.getElementById("catSoundLabel");
          if (pillWrap && soundLabel) {
            soundLabel.textContent = "Cyber Modern Riser";
            pillWrap.style.display = "flex";
          }
          activateModernGenZTheme(true);
        } else if (style === "all") {
          activateTempleTheme(false);
          activateModernGenZTheme(false);
          applyCatalogueTheme("all");
        } else {
          // One of the 11 styled sections
          activateTempleTheme(false);
          activateModernGenZTheme(false);
          applyCatalogueTheme(style);
        }

        renderProducts();
        renderCatalogueOutfits(style);
      }

      function applyCatalogue() {
        document.getElementById("styleFilter").value = selectedCatalogue;

        scrollToId("shop");

        renderProducts();
      }

      /* =====================================================
   PRODUCTS
===================================================== */

      function renderProducts() {
        let search = document.getElementById("search").value.toLowerCase();

        let gender = document.getElementById("gender").value;

        let style = document.getElementById("styleFilter").value;

        let sort = document.getElementById("sort").value;

        let list = products.filter((p) => {
          return (
            p.name.toLowerCase().includes(search) &&
            (gender === "all" || p.gender === gender) &&
            (style === "all" || p.style === style)
          );
        });

        if (sort === "low") list.sort((a, b) => a.price - b.price);

        if (sort === "high") list.sort((a, b) => b.price - a.price);

        if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

        const grid = document.getElementById("productGrid");

        if (!list.length) {
          grid.innerHTML = `
<div class="no-results" style="grid-column:1/-1">
<h3>No styles found</h3>
<p>Try another catalogue or search term.</p>
</div>
`;

          return;
        }

        grid.innerHTML = list
          .map(
            (p) => `

<article class="product">

<div class="product-img">

<span class="badge">
${p.badge}
</span>

<button
class="wish ${wishlist.includes(p.id) ? "active" : ""}"
onclick="toggleWishlist(${p.id})">

${wishlist.includes(p.id) ? "♥" : "♡"}

</button>

<img
src="${p.img}"
alt="${p.name}"
loading="lazy"
>

<button
class="quick"
onclick="viewProduct(${p.id})">
QUICK VIEW
</button>

</div>


<div class="product-info">

<small>
${p.gender} · ${p.style} · ${p.type}
</small>

<h3>${p.name}</h3>

<div class="rating">
${p.rating}
</div>

<div class="price">

₹${p.price.toLocaleString()}

<span class="old">
₹${p.old.toLocaleString()}
</span>

</div>

</div>

</article>

`,
          )
          .join("");
      }

      /* =====================================================
   PRODUCT DETAILS
===================================================== */


      /* Product photography gallery.
         Each product keeps its main image and several angle/detail images.
         Replace the demo angle URLs with the boutique's real product photos
         when the production catalogue is connected. */

/* =====================================================
         MULTI-ANGLE 360° ATELIER STUDIO & GALLERY LOGIC
      ===================================================== */

      const demoGalleryImages = [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1100&q=88",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1100&q=88",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1100&q=88"
      ];

      function productGallery(p) {
        if (p.views) {
          return [
            { key: "overview", label: "360° Turntable Overview", badge: "🔄 360°", src: p.views.overview || p.img },
            { key: "front", label: "Front Silhouette View", badge: "Front", src: p.views.front || p.img },
            { key: "back", label: "Back Drape & Rear View", badge: "Back", src: p.views.back || p.img },
            { key: "side", label: "Profile Side View", badge: "Side", src: p.views.side || p.img },
            { key: "top", label: "Top Collar & Detail View", badge: "Top", src: p.views.top || p.img }
          ];
        }
        if (Array.isArray(p.gallery) && p.gallery.length) {
          const defaultLabels = ["Front View", "Back View", "Side View", "Detail View", "Overview"];
          return p.gallery.map((src, i) => ({
            key: `view-${i}`,
            label: defaultLabels[i] || `View ${i + 1}`,
            badge: (defaultLabels[i] || `V${i + 1}`).replace(" View", ""),
            src
          }));
        }
        return [
          { key: "overview", label: "360° Turntable Overview", badge: "🔄 360°", src: p.img },
          { key: "front", label: "Front Silhouette View", badge: "Front", src: p.img },
          { key: "back", label: "Back Drape & Rear View", badge: "Back", src: demoGalleryImages[0] || p.img },
          { key: "side", label: "Profile Side View", badge: "Side", src: demoGalleryImages[1] || p.img },
          { key: "top", label: "Top Collar & Detail View", badge: "Top", src: demoGalleryImages[2] || p.img }
        ];
      }

      let activeGalleryIndex = 0;
      let activeGalleryImages = [];
      let activeGalleryName = "";
      let autoSpinTimer = null;
      let currentSpinStep = 0;

      function setGalleryImage(index, skipAnim = false) {
        if (!activeGalleryImages.length) return;

        activeGalleryIndex =
          (index + activeGalleryImages.length) % activeGalleryImages.length;

        const main = document.getElementById("galleryMainImage");
        const label = document.getElementById("galleryViewLabel");
        const count = document.getElementById("galleryCount");
        const slider = document.getElementById("orbitSlider");
        const degLabel = document.getElementById("angleDegVal");
        const currentItem = activeGalleryImages[activeGalleryIndex];

        if (!main) return;

        const updateUI = () => {
          main.src = currentItem.src;
          main.alt = activeGalleryName + " — " + currentItem.label;
          main.style.opacity = "1";
          if (label) label.textContent = currentItem.label;
          if (count) count.textContent = `${activeGalleryIndex + 1} / ${activeGalleryImages.length}`;

          document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
            thumb.classList.toggle("active", i === activeGalleryIndex);
          });

          // Sync scrub slider and degree text
          if (slider && degLabel) {
            if (currentItem.key === "front") {
              slider.value = 0;
              degLabel.textContent = "0° (Front)";
            } else if (currentItem.key === "side") {
              slider.value = 90;
              degLabel.textContent = "90° (Profile Side)";
            } else if (currentItem.key === "back") {
              slider.value = 180;
              degLabel.textContent = "180° (Back Drape)";
            } else if (currentItem.key === "top") {
              slider.value = 45;
              degLabel.textContent = "Top / Detail";
            } else if (currentItem.key === "overview") {
              slider.value = 360;
              degLabel.textContent = "360° (Overview)";
              main.classList.remove("angle-spin-anim");
              void main.offsetWidth;
              main.classList.add("angle-spin-anim");
            }
          }
        };

        if (skipAnim) {
          updateUI();
        } else {
          main.style.opacity = "0.35";
          setTimeout(updateUI, 75);
        }
      }

      function changeGallery(direction) {
        setGalleryImage(activeGalleryIndex + direction);
      }

      function toggleAutoSpin360(productId) {
        const btn = document.getElementById("turntableSpinBtn");
        const label = document.getElementById("spinBtnLabel");

        if (autoSpinTimer) {
          stopAutoSpin360();
        } else {
          if (btn) btn.classList.add("spinning");
          if (label) label.textContent = "Stop Orbit ⏹";

          const spinSequence = [
            { key: "front", deg: 0, text: "0° (Front)" },
            { key: "side", deg: 90, text: "90° (Profile Side)" },
            { key: "back", deg: 180, text: "180° (Back Drape)" },
            { key: "side", deg: 270, text: "270° (Opposite Profile)" },
            { key: "overview", deg: 360, text: "360° (Turntable Overview)" }
          ];

          autoSpinTimer = setInterval(() => {
            currentSpinStep = (currentSpinStep + 1) % spinSequence.length;
            const step = spinSequence[currentSpinStep];
            const slider = document.getElementById("orbitSlider");
            const degLabel = document.getElementById("angleDegVal");
            if (slider) slider.value = step.deg;
            if (degLabel) degLabel.textContent = step.text;

            const targetIdx = activeGalleryImages.findIndex(x => x.key === step.key);
            if (targetIdx !== -1) {
              setGalleryImage(targetIdx, true);
              const main = document.getElementById("galleryMainImage");
              if (main) {
                main.classList.remove("angle-spin-anim");
                void main.offsetWidth;
                main.classList.add("angle-spin-anim");
              }
            }
          }, 1250);
        }
      }

      function stopAutoSpin360() {
        if (autoSpinTimer) {
          clearInterval(autoSpinTimer);
          autoSpinTimer = null;
        }
        const btn = document.getElementById("turntableSpinBtn");
        const label = document.getElementById("spinBtnLabel");
        if (btn) btn.classList.remove("spinning");
        if (label) label.textContent = "Auto-Spin 360°";
      }

      function scrubOrbitAngle(degVal, productId) {
        stopAutoSpin360();
        const deg = parseInt(degVal, 10);
        const degLabel = document.getElementById("angleDegVal");
        const main = document.getElementById("galleryMainImage");

        let targetKey = "overview";
        let desc = `${deg}° (Front)`;

        if ((deg >= 0 && deg <= 45) || (deg >= 315 && deg <= 360)) {
          targetKey = "front";
          desc = `${deg}° (Front Silhouette)`;
        } else if (deg > 45 && deg <= 135) {
          targetKey = "side";
          desc = `${deg}° (Profile Side)`;
        } else if (deg > 135 && deg <= 225) {
          targetKey = "back";
          desc = `${deg}° (Back Drape)`;
        } else {
          targetKey = "side";
          desc = `${deg}° (Opposite Profile)`;
        }

        if (degLabel) degLabel.textContent = desc;

        if (main) {
          const angleOffset = ((deg % 90) - 45) * 0.35;
          main.style.transform = `perspective(800px) rotateY(${angleOffset}deg)`;
        }

        const targetIdx = activeGalleryImages.findIndex(x => x.key === targetKey);
        if (targetIdx !== -1 && targetIdx !== activeGalleryIndex) {
          setGalleryImage(targetIdx, true);
        }
      }

      function viewProduct(id) {
        const p = products.find((x) => x.id === id);
        if (!p) return;

        stopAutoSpin360();
        activeGalleryName = p.name;
        activeGalleryImages = productGallery(p);
        activeGalleryIndex = 0;

        document.getElementById("modalContent").innerHTML = `
<div class="modal-product">

  <div class="product-gallery">

    <div class="gallery-thumbs">
      ${activeGalleryImages.map((item, index) => `
        <button
          class="gallery-thumb ${index === 0 ? "active" : ""}"
          onclick="setGalleryImage(${index})"
          aria-label="View ${item.label}">
          <img src="${item.src}" alt="${p.name} ${item.label}" loading="lazy">
          <span>${item.badge || item.label.replace(" View","")}</span>
        </button>
      `).join("")}
    </div>

    <div>
      <div class="gallery-main turntable-mode" id="galleryMainWrap">
        <!-- 3D Turntable Platform & Status HUD -->
        <div class="turntable-platform" id="turntableRing"></div>
        <div class="turntable-live-badge">
          <span class="live-dot"></span>
          <span>360° ATELIER STUDIO</span>
        </div>

        <img
          id="galleryMainImage"
          class="angle-spin-anim"
          src="${activeGalleryImages[0].src}"
          alt="${p.name} — ${activeGalleryImages[0].label}"
        >

        <div class="gallery-count" id="galleryCount">
          1 / ${activeGalleryImages.length}
        </div>

        <div class="gallery-view-label" id="galleryViewLabel">
          ${activeGalleryImages[0].label}
        </div>

        <div class="gallery-nav">
          <button
            class="gallery-arrow"
            onclick="changeGallery(-1)"
            aria-label="Previous product view">‹</button>

          <button
            class="gallery-arrow"
            onclick="changeGallery(1)"
            aria-label="Next product view">›</button>
        </div>

        <!-- Turntable HUD: Auto-Spin & Scrub Slider -->
        <div class="turntable-hud" id="turntableHud">
          <button class="turntable-spin-btn" id="turntableSpinBtn" onclick="toggleAutoSpin360(${p.id})">
            <span class="spin-icon">🔄</span> <span id="spinBtnLabel">Auto-Spin 360°</span>
          </button>
          <div class="scrub-slider-box">
            <span>Orbit:</span>
            <input type="range" id="orbitSlider" min="0" max="360" step="1" value="0" oninput="scrubOrbitAngle(this.value, ${p.id})">
            <span class="angle-val" id="angleDegVal">0° (Front)</span>
          </div>
        </div>
      </div>

      <div class="gallery-hint">
        ✦ Multi-Angle 360° Studio: Scrub the orbit slider or click Auto-Spin to inspect front, back, side & top views with turntable animation.
      </div>
    </div>

  </div>

  <div class="modal-info">

    <small style="color:#b89558">
      ${p.gender.toUpperCase()} · ${p.style.toUpperCase()} · ${p.type.toUpperCase()}
    </small>

    <h2>${p.name}</h2>

    <div class="rating">
      ${p.rating}
    </div>

    <div class="modal-price">
      ₹${p.price.toLocaleString()}
      <span style="font-size:12px;color:#aaa;text-decoration:line-through;margin-left:6px">
        ₹${p.old.toLocaleString()}
      </span>
    </div>

    <p>
      ${p.desc || 'Masterfully tailored bespoke creation with artisanal finishing, sculpted silhouettes, and premium drape.'}
    </p>

    <div class="product-view-note">
      <strong>✦ Multi-Angle 360° Studio</strong><br>
      Explore the garment from every perspective: 360° turntable overview, front drape, back silhouette, side profile, and top artisan detail.
    </div>

    <br>

    <strong>Select Size</strong>

    <div class="size-buttons">
      <button>S</button>
      <button>M</button>
      <button>L</button>
      <button>XL</button>
      <button>XXL</button>
    </div>

    <select
      style="width:100%;padding:12px;border:1px solid #ddd;margin-bottom:12px;border-radius:8px">
      <option>Standard Fit</option>
      <option>Custom Measurements (Bespoke Tailoring)</option>
    </select>

    <div style="display:flex;gap:10px;">
      <button
        class="btn btn-dark"
        style="flex:1;"
        onclick="addCart(${p.id});closeModal()">
        Add To Boutique Bag
      </button>
      <button
        class="btn"
        style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);color:#fff;"
        onclick="openVirtualFittingRoom(${p.id});closeModal()">
        🪞 Virtual Mirror
      </button>
    </div>

  </div>
</div>
`;

        openModal();
      }

      /* =====================================================
         COLLECTIONS DYNAMIC OUTFIT GRID & CARD ANGLE SWITCHER
      ===================================================== */

      function renderCatalogueOutfits(style) {
        const container = document.getElementById("catalogueOutfitsGrid");
        if (!container) return;

        let filtered = [];
        if (!style || style === "all") {
          // Curate 6 highlight pieces across different categories
          const featuredIds = [1, 2, 3, 6, 8, 11];
          filtered = products.filter(p => featuredIds.includes(p.id));
          if (filtered.length < 6) {
            filtered = products.slice(0, 6);
          }
        } else {
          filtered = products.filter(p => p.style === style);
          if (!filtered.length) {
            filtered = products.slice(0, 3);
          }
        }

        container.innerHTML = filtered.map(p => {
          const defaultImg = (p.views && p.views.overview) || p.img;
          const isWished = wishlist.includes(p.id);
          return `
            <div class="cat-outfit-card" id="cat-card-${p.id}">
              <div class="cat-outfit-media">
                <span class="cat-outfit-badge">${p.badge || 'EXCLUSIVE'}</span>
                <button class="cat-outfit-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist(${p.id}); updateCardWish(${p.id}, this);" title="Save to Wishlist">
                  ${isWished ? '♥' : '♡'}
                </button>
                
                <img class="cat-outfit-img" id="cat-img-${p.id}" src="${defaultImg}" alt="${p.name}" onclick="viewProduct(${p.id})" loading="lazy">
                
                <div class="cat-outfit-overlay">
                  <button class="cat-view-btn" onclick="viewProduct(${p.id})">🔍 360° Studio</button>
                  <button class="cat-mirror-btn" onclick="openVirtualFittingRoom(${p.id})">🪞 Virtual Mirror</button>
                </div>

                <div class="cat-outfit-angle-bar">
                  <button class="cat-angle-pill active" onclick="switchCardAngle(event, ${p.id}, 'overview')">🔄 360°</button>
                  <button class="cat-angle-pill" onclick="switchCardAngle(event, ${p.id}, 'front')">Front</button>
                  <button class="cat-angle-pill" onclick="switchCardAngle(event, ${p.id}, 'back')">Back</button>
                  <button class="cat-angle-pill" onclick="switchCardAngle(event, ${p.id}, 'side')">Side</button>
                  <button class="cat-angle-pill" onclick="switchCardAngle(event, ${p.id}, 'top')">Top</button>
                </div>
              </div>

              <div class="cat-outfit-body">
                <div class="cat-outfit-meta">
                  <span>${(p.style || '').toUpperCase()} · ${(p.type || '').toUpperCase()}</span>
                  <span>${p.rating || '★★★★★'}</span>
                </div>
                <div class="cat-outfit-title" onclick="viewProduct(${p.id})" title="${p.name}">${p.name}</div>
                <div class="cat-outfit-pricing">
                  <span class="cat-outfit-price">₹${p.price.toLocaleString()}</span>
                  ${p.old ? `<span class="cat-outfit-old">₹${p.old.toLocaleString()}</span>` : ''}
                  <button class="cat-outfit-add" onclick="addCart(${p.id})">+ Bag</button>
                </div>
              </div>
            </div>
          `;
        }).join("");
      }

      function switchCardAngle(event, productId, angleKey) {
        if (event) event.stopPropagation();

        const card = document.getElementById(`cat-card-${productId}`);
        const imgEl = document.getElementById(`cat-img-${productId}`);
        if (!card || !imgEl) return;

        card.querySelectorAll(".cat-angle-pill").forEach(pill => pill.classList.remove("active"));
        if (event && event.currentTarget) {
          event.currentTarget.classList.add("active");
        }

        const p = products.find(x => x.id === productId);
        if (!p || !p.views || !p.views[angleKey]) return;

        if (angleKey === "overview") {
          imgEl.classList.remove("angle-spin-anim");
          void imgEl.offsetWidth;
          imgEl.classList.add("angle-spin-anim");
        }

        imgEl.src = p.views[angleKey];
      }

      function updateCardWish(id, btn) {
        const isWished = wishlist.includes(id);
        if (btn) {
          btn.innerHTML = isWished ? '♥' : '♡';
          btn.classList.toggle('active', isWished);
        }
      }
