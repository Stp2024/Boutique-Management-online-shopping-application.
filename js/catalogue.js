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
          const AudioContext = window.AudioContext || window["webkitAudioContext"];
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
        const styleFilterEl = document.getElementById("styleFilter");
        if (styleFilterEl) styleFilterEl.value = selectedCatalogue;

        scrollToId("shop");

        renderProducts();
      }

      /* =====================================================
   PRODUCTS
===================================================== */

      function renderProducts() {
        const grid = document.getElementById("productGrid");
        if (!grid) return;

        const searchInput = document.getElementById("search");
        const genderInput = document.getElementById("gender");
        const styleInput = document.getElementById("styleFilter");
        const sortInput = document.getElementById("sort");

        let search = searchInput ? searchInput.value.toLowerCase() : "";
        let gender = genderInput ? genderInput.value : "all";
        let style = styleInput ? styleInput.value : "all";
        let sort = sortInput ? sortInput.value : "all";

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

      function toggleAutoSpin360(_productId) {
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

      function scrubOrbitAngle(degVal, _productId) {
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

      /* =====================================================
         MODULE 2: DEDICATED PRODUCT DETAILS & SELECTION CONTROLLER
      ===================================================== */

      let currentProductState = {
        product: null,
        fabric: "Pure Mulberry Silk",
        color: "Royal Noir",
        colorHex: "#1a1715",
        size: "M",
        fitType: "Standard Fit",
        qty: 1
      };

      const boutiqueFabrics = [
        { name: "Pure Mulberry Silk", desc: "100% Grade 6A natural silk with lustrous sheen & fluid drape" },
        { name: "Banarasi Brocade", desc: "Hand-loomed zari weave with artisanal heritage motifs" },
        { name: "Italian Merino Wool", desc: "Super 150s Australian wool tailored for structured elegance" },
        { name: "Chiffon Silk Crepe", desc: "Airy, semi-sheer drape with graceful movement & texture" },
        { name: "Organic Raw Linen", desc: "Breathable hand-spun weave with natural earthy feel" }
      ];

      const boutiqueColors = [
        { name: "Royal Noir", hex: "#1a1715", border: "#4a3d31" },
        { name: "Imperial Gold", hex: "#b89558", border: "#8c6e3b" },
        { name: "Midnight Navy", hex: "#16253b", border: "#284166" },
        { name: "Crimson Maroon", hex: "#5c1421", border: "#801d30" },
        { name: "Emerald Jade", hex: "#1b4d3e", border: "#28755e" },
        { name: "Ivory Pearl", hex: "#f4ede2", border: "#d4c8b6" }
      ];

      function selectProductFabric(name) {
        currentProductState.fabric = name;
        document.querySelectorAll(".fabric-chip").forEach(chip => {
          chip.classList.toggle("active", chip.dataset.fabric === name);
        });
        const descEl = document.getElementById("fabricDescText");
        const found = boutiqueFabrics.find(f => f.name === name);
        if (descEl && found) {
          descEl.textContent = found.desc;
        }
      }
      window.selectProductFabric = selectProductFabric;

      function selectProductColor(name, hex) {
        currentProductState.color = name;
        currentProductState.colorHex = hex;
        document.querySelectorAll(".pdetail-color-swatch").forEach(swatch => {
          swatch.classList.toggle("active", swatch.dataset.color === name);
        });
        const label = document.getElementById("pdetailSelectedColorLabel");
        if (label) label.textContent = name;
      }
      window.selectProductColor = selectProductColor;

      function selectProductSize(size) {
        currentProductState.size = size;
        document.querySelectorAll(".pdetail-size-btn").forEach(btn => {
          btn.classList.toggle("active", btn.dataset.size === size);
        });
      }
      window.selectProductSize = selectProductSize;

      function selectProductFitType(type) {
        currentProductState.fitType = type;
        const note = document.getElementById("bespokeFitNote");
        if (note) {
          note.style.display = type.includes("Bespoke") ? "block" : "none";
        }
      }
      window.selectProductFitType = selectProductFitType;

      function changeProductQty(delta) {
        let newQty = (currentProductState.qty || 1) + delta;
        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;
        currentProductState.qty = newQty;

        const qtyEl = document.getElementById("pdetailQtyDisplay");
        if (qtyEl) qtyEl.textContent = newQty;

        if (currentProductState.product) {
          const totalVal = currentProductState.product.price * newQty;
          const btnPriceEl = document.getElementById("pdetailAddBagPrice");
          if (btnPriceEl) btnPriceEl.textContent = `₹${totalVal.toLocaleString()}`;
        }
      }
      window.changeProductQty = changeProductQty;

      function checkDeliveryPincode() {
        const input = document.getElementById("pdetailPincodeInput");
        const resBox = document.getElementById("pdetailDeliveryResult");
        if (!input || !resBox) return;

        const pin = input.value.trim();
        if (!/^\d{6}$/.test(pin)) {
          resBox.innerHTML = `<span style="color:#d32f2f;">⚠ Please enter a valid 6-digit Indian PIN code.</span>`;
          return;
        }

        // Calculate arrival date (today + 4 to 6 business days)
        const d1 = new Date();
        d1.setDate(d1.getDate() + 4);
        const d2 = new Date();
        d2.setDate(d2.getDate() + 6);

        const d1Str = d1.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
        const d2Str = d2.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

        const isBlr = pin.startsWith("560");
        const zoneText = isBlr ? "Bengaluru Atelier Express Delivery" : "Insured Pan-India White-Glove Dispatch";

        resBox.innerHTML = `
          <div style="background:#f4fbf5; border:1px solid #c8e6c9; border-radius:6px; padding:10px 12px; margin-top:8px;">
            <div style="display:flex; align-items:center; gap:8px; color:#2e7d32; font-weight:600; font-size:12px;">
              <span>✓ Estimated Delivery to <b>${pin}</b> by <b>${d1Str} – ${d2Str}</b></span>
            </div>
            <div style="font-size:11px; color:#556b2f; margin-top:4px;">
              ${zoneText} · <b>FREE White-Glove Shipping</b> &amp; Doorstep Fitting Guarantee.
            </div>
          </div>
        `;
      }
      window.checkDeliveryPincode = checkDeliveryPincode;

      function addCurrentProductToBag() {
        if (!currentProductState.product) return;
        const p = currentProductState.product;

        if (typeof addCart === "function") {
          addCart(p.id, {
            size: currentProductState.size,
            color: currentProductState.color,
            colorHex: currentProductState.colorHex,
            fabric: currentProductState.fabric,
            fitType: currentProductState.fitType,
            qty: currentProductState.qty
          });
        }
        closeModal();
      }
      window.addCurrentProductToBag = addCurrentProductToBag;

      function toggleProductWishlist(id) {
        if (typeof toggleWishlist === "function") {
          toggleWishlist(id);
        }
        const btn = document.getElementById("pdetailWishlistBtn");
        if (btn) {
          const isWished = wishlist.includes(id);
          btn.classList.toggle("active", isWished);
          btn.innerHTML = isWished ? `♥ Saved in Wishlist` : `♡ Add to Wishlist`;
        }
      }
      window.toggleProductWishlist = toggleProductWishlist;

      function showSizeGuide() {
        const area = document.getElementById("sizeGuideModalContent");
        if (area) {
          area.style.display = area.style.display === "none" ? "block" : "none";
        }
      }
      window.showSizeGuide = showSizeGuide;

      function viewProduct(id) {
        const p = products.find((x) => x.id === id);
        if (!p) return;

        stopAutoSpin360();
        activeGalleryName = p.name;
        activeGalleryImages = productGallery(p);
        activeGalleryIndex = 0;

        // Reset current selection state
        currentProductState = {
          product: p,
          fabric: "Pure Mulberry Silk",
          color: "Royal Noir",
          colorHex: "#1a1715",
          size: "M",
          fitType: "Standard Fit",
          qty: 1
        };

        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        const defaultPin = cust && cust.addresses && cust.addresses[0] ? cust.addresses[0].pincode : "560001";
        const isWished = wishlist.includes(p.id);

        // Find 3 complementary pieces for the related section
        const related = products.filter(x => x.id !== p.id && (x.gender === p.gender || x.style === p.style)).slice(0, 3);
        const relatedList = related.length >= 3 ? related : products.filter(x => x.id !== p.id).slice(0, 3);

        // Stock count derived deterministically from ID
        const remainingStock = ((p.id * 3) % 4) + 2;

        document.getElementById("modalContent").innerHTML = `
<div class="product-detail-modal-wrap">

  <!-- Breadcrumbs -->
  <div class="pdetail-breadcrumbs">
    <span onclick="closeModal(); scrollToId('shop');">Storefront</span>
    <span class="sep">/</span>
    <span onclick="closeModal(); scrollToId('catalogue');">${p.gender.toUpperCase()}</span>
    <span class="sep">/</span>
    <span>${p.style.toUpperCase()}</span>
    <span class="sep">/</span>
    <strong style="color:var(--ink);">${p.name}</strong>
  </div>

  <div class="modal-product" style="margin-top:14px;">

    <!-- Left Column: Multi-Angle Turntable Gallery -->
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

        <div class="gallery-hint" style="margin-top:8px;">
          ✦ Multi-Angle 360° Studio: Scrub the orbit slider or click Auto-Spin to inspect 5 angles with turntable animation.
        </div>
      </div>

    </div>

    <!-- Right Column: Product Details & Purchase Workflow -->
    <div class="modal-info">

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="pdetail-tag">
          ${p.gender.toUpperCase()} · ${p.style.toUpperCase()} · ${p.type.toUpperCase()}
        </span>
        <span class="pdetail-stock-badge">
          <span class="stock-dot"></span> Only ${remainingStock} pieces left in Atelier
        </span>
      </div>

      <h2 style="font-family:'Playfair Display',serif; margin:8px 0 6px; font-size:26px; color:var(--ink);">${p.name}</h2>

      <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
        <span class="rating" style="color:var(--gold); font-size:15px;">${p.rating || "★★★★★"}</span>
        <span style="font-size:12px; color:var(--muted);">(4.9 · 118 Bespoke Reviews)</span>
        <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#f4ede2; color:var(--brown); font-weight:600;">VASTRAÉ SIGNATURE</span>
      </div>

      <div class="modal-price" style="display:flex; align-items:baseline; gap:12px; margin-bottom:14px;">
        <span style="font-size:26px; font-weight:700; color:var(--ink);" id="pdetailUnitPrice">₹${p.price.toLocaleString()}</span>
        <span style="font-size:15px; color:#aaa; text-decoration:line-through;">
          ₹${p.old.toLocaleString()}
        </span>
        <span style="font-size:12px; color:#2e7d32; font-weight:600; background:#e8f5e9; padding:2px 8px; border-radius:4px;">
          Save ${Math.round((1 - p.price / p.old) * 100)}% · Taxes &amp; GST Included
        </span>
      </div>

      <p style="font-size:13px; color:#665c51; line-height:1.6; margin-bottom:16px;">
        ${p.desc || 'Masterfully tailored bespoke creation with artisanal finishing, sculpted silhouettes, and premium drape.'}
      </p>

      <!-- 1. FABRIC SELECTION -->
      <div class="pdetail-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:13px; color:var(--ink);">Select Fabric Weave</strong>
          <small style="color:var(--muted); font-size:11px;">Artisanal Loom Tested</small>
        </div>
        <div class="fabric-chips-grid">
          ${boutiqueFabrics.map((f, i) => `
            <button
              type="button"
              class="fabric-chip ${i === 0 ? 'active' : ''}"
              data-fabric="${f.name}"
              onclick="selectProductFabric('${f.name}')">
              ${f.name}
            </button>
          `).join('')}
        </div>
        <div id="fabricDescText" class="fabric-desc-note">
          ${boutiqueFabrics[0].desc}
        </div>
      </div>

      <!-- 2. COLOUR SWATCHES -->
      <div class="pdetail-section" style="margin-top:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:13px; color:var(--ink);">
            Colour Shade: <span id="pdetailSelectedColorLabel" style="color:var(--gold); font-weight:600;">Royal Noir</span>
          </strong>
          <small style="color:var(--muted); font-size:11px;">6 Hand-Dyed Tones</small>
        </div>
        <div class="pdetail-swatches-grid">
          ${boutiqueColors.map((c, i) => `
            <button
              type="button"
              class="pdetail-color-swatch ${i === 0 ? 'active' : ''}"
              data-color="${c.name}"
              title="${c.name}"
              style="background:${c.hex}; border-color:${c.border};"
              onclick="selectProductColor('${c.name}', '${c.hex}')">
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 3. SIZE & FIT TYPE -->
      <div class="pdetail-section" style="margin-top:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:13px; color:var(--ink);">Select Size</strong>
          <button type="button" class="size-guide-btn" onclick="showSizeGuide()">📏 Size Guide &amp; Chart</button>
        </div>
        <div class="pdetail-sizes-grid">
          ${["XS", "S", "M", "L", "XL", "XXL"].map((s) => `
            <button
              type="button"
              class="pdetail-size-btn ${s === 'M' ? 'active' : ''}"
              data-size="${s}"
              onclick="selectProductSize('${s}')">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- Inline Size Guide Chart (Collapsible) -->
        <div id="sizeGuideModalContent" style="display:none; background:#faf8f3; border:1px solid var(--line); border-radius:8px; padding:12px; margin-top:10px; font-size:11px;">
          <div style="font-weight:600; color:var(--ink); margin-bottom:6px;">VASTRAÉ Standard Fit Guide (Inches)</div>
          <table style="width:100%; border-collapse:collapse; text-align:center;">
            <tr style="background:#eee5d8; font-weight:600;">
              <th style="padding:4px;">Size</th>
              <th style="padding:4px;">Chest/Bust</th>
              <th style="padding:4px;">Waist</th>
              <th style="padding:4px;">Hip</th>
            </tr>
            <tr><td style="padding:3px;">XS</td><td>32 - 34"</td><td>26 - 28"</td><td>34 - 36"</td></tr>
            <tr><td style="padding:3px;">S</td><td>34 - 36"</td><td>28 - 30"</td><td>36 - 38"</td></tr>
            <tr style="background:#fff7e6; font-weight:600;"><td style="padding:3px;">M</td><td>38 - 40"</td><td>32 - 34"</td><td>40 - 42"</td></tr>
            <tr><td style="padding:3px;">L</td><td>42 - 44"</td><td>36 - 38"</td><td>44 - 46"</td></tr>
            <tr><td style="padding:3px;">XL</td><td>46 - 48"</td><td>40 - 42"</td><td>48 - 50"</td></tr>
            <tr><td style="padding:3px;">XXL</td><td>50 - 52"</td><td>44 - 46"</td><td>52 - 54"</td></tr>
          </table>
        </div>

        <!-- Fit Option Selector -->
        <div style="margin-top:10px;">
          <select
            id="pdetailFitSelect"
            onchange="selectProductFitType(this.value)"
            style="width:100%; padding:10px 12px; border:1px solid var(--line); border-radius:6px; background:#fff; font-size:13px; color:var(--ink);">
            <option value="Standard Fit">Standard Atelier Fit (True to standard measurements)</option>
            <option value="Bespoke Custom Measurements">Bespoke Fit (Cut exactly to my saved Client Sanctuary measurements)</option>
          </select>
          <div id="bespokeFitNote" style="display:none; font-size:11px; color:#856404; background:#fff3cd; padding:8px 10px; border-radius:4px; margin-top:6px;">
            ✨ Master Artisan Vignesh will hand-draft this garment against your saved family measurement profiles.
          </div>
        </div>
      </div>

      <!-- 4. QUANTITY SELECTOR & LINE TOTAL -->
      <div class="pdetail-section" style="margin-top:14px; display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:#faf8f5; border-radius:8px; border:1px solid var(--line);">
        <div>
          <strong style="font-size:13px; color:var(--ink);">Quantity</strong>
          <div style="font-size:11px; color:var(--muted);">Adjust for group or bridal ensembles</div>
        </div>
        <div class="pdetail-qty-stepper">
          <button type="button" class="pdetail-qty-btn" onclick="changeProductQty(-1)">−</button>
          <span class="pdetail-qty-val" id="pdetailQtyDisplay">1</span>
          <button type="button" class="pdetail-qty-btn" onclick="changeProductQty(1)">+</button>
        </div>
      </div>

      <!-- 5. DELIVERY ESTIMATE INTERFACE -->
      <div class="pdetail-section" style="margin-top:14px;">
        <strong style="font-size:13px; color:var(--ink); display:block; margin-bottom:6px;">
          Check Atelier Delivery &amp; White-Glove Shipping
        </strong>
        <div style="display:flex; gap:8px;">
          <input
            type="text"
            id="pdetailPincodeInput"
            value="${defaultPin}"
            maxlength="6"
            placeholder="Enter 6-digit Pincode"
            style="flex:1; padding:9px 12px; border:1px solid var(--line); border-radius:6px; font-size:13px;"
            onkeypress="if(event.key==='Enter') checkDeliveryPincode()">
          <button
            type="button"
            class="btn btn-dark"
            style="padding:9px 16px; font-size:12px;"
            onclick="checkDeliveryPincode()">
            Check
          </button>
        </div>
        <div id="pdetailDeliveryResult">
          <div style="font-size:11px; color:var(--muted); margin-top:5px;">
            Enter your 6-digit delivery pincode to see estimated atelier dispatch dates and doorstep fitting availability.
          </div>
        </div>
      </div>

      <!-- 6. ACTION BUTTONS: ADD TO BAG & WISHLIST & MIRROR -->
      <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; gap:10px;">
          <button
            class="btn btn-dark"
            style="flex:2; padding:14px; font-size:14px; display:flex; justify-content:center; align-items:center; gap:8px;"
            onclick="addCurrentProductToBag()">
            <span>Add To Boutique Bag</span>
            <span>·</span>
            <span id="pdetailAddBagPrice">₹${p.price.toLocaleString()}</span>
          </button>
          <button
            type="button"
            id="pdetailWishlistBtn"
            class="btn btn-wishlist-toggle ${isWished ? 'active' : ''}"
            style="flex:1; padding:14px; font-size:13px;"
            onclick="toggleProductWishlist(${p.id})">
            ${isWished ? '♥ In Wishlist' : '♡ Add to Wishlist'}
          </button>
        </div>

        <div style="display:flex; gap:10px;">
          <button
            class="btn"
            style="flex:1; background:rgba(32,27,23,0.06); border:1px solid var(--line); color:var(--ink); font-size:12px; padding:10px;"
            onclick="openVirtualFittingRoom(${p.id}); closeModal();">
            🪞 Try in 3D Virtual Mirror
          </button>
          <button
            class="btn"
            style="flex:1; background:rgba(32,27,23,0.06); border:1px solid var(--line); color:var(--ink); font-size:12px; padding:10px;"
            onclick="closeModal(); scrollToId('designerConsultation');">
            ✂ Book Atelier Consultation
          </button>
        </div>
      </div>

      <!-- 7. ATELIER TRUST GUARANTEE -->
      <div class="pdetail-guarantees">
        <div class="guarantee-item">
          <span>✦</span>
          <span><b>100% Bespoke Fit Guarantee</b> with complimentary 7-day atelier adjustments.</span>
        </div>
        <div class="guarantee-item">
          <span>✦</span>
          <span><b>White-Glove Temperature-Controlled Courier</b> with presentation gift boxing.</span>
        </div>
      </div>

    </div>

  </div>

  <!-- 8. COMPLEMENTARY ATELIER ENSEMBLES (RELATED PRODUCTS) -->
  <div class="pdetail-related-section">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
      <div>
        <h3 style="font-family:'Playfair Display',serif; margin:0 0 2px; font-size:18px; color:var(--ink);">
          Complementary Atelier Creations
        </h3>
        <p style="margin:0; font-size:12px; color:var(--muted);">Curated pieces designed to pair seamlessly with the ${p.name}.</p>
      </div>
      <button class="btn btn-sm btn-ghost" onclick="closeModal(); scrollToId('catalogue');">
        Explore All ${p.gender.toUpperCase()} Looks →
      </button>
    </div>

    <div class="pdetail-related-grid">
      ${relatedList.map(rel => `
        <div class="pdetail-related-card" onclick="viewProduct(${rel.id})">
          <div class="rel-img-wrap">
            <img src="${(rel.views && rel.views.overview) || rel.img}" alt="${rel.name}" loading="lazy">
            <span class="rel-badge">${rel.style.toUpperCase()}</span>
          </div>
          <div class="rel-info">
            <div class="rel-title">${rel.name}</div>
            <div class="rel-price">₹${rel.price.toLocaleString()}</div>
            <button class="btn btn-sm" style="width:100%; margin-top:6px; font-size:11px; padding:5px 8px; border:1px solid var(--line); background:#fff;">
              🔍 Inspect Piece
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

</div>
`;

        openModal("modal-xl");
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
