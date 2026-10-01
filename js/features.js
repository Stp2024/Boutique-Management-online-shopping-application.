/* =====================================================
   VASTRAÉ BOUTIQUE - FEATURES & NAVIGATION EXTENSIONS
   - Luxury Bell Sound Experience & Skin-Tone Palette
   - Boutique Feature Hub Modal Interactions
   - Interaction Safety Net & Accessibility
   - Page-Like Section Navigation
   - Application Startup & Pavilion Initializations
===================================================== */

/* V&C LUXURY BELL SOUND EXPERIENCE */
      (function () {
        let audioCtx = null;
        let master = null;
        let soundEnabled = true;

        function getAudio() {
          try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            if (!audioCtx) {
              audioCtx = new AC();
              master = audioCtx.createGain();
              master.gain.value = 0.55;
              master.connect(audioCtx.destination);
            }
            if (audioCtx.state === "suspended")
              audioCtx.resume().catch(() => {});
            return audioCtx;
          } catch (e) {
            return null;
          }
        }

        function bell(freq, delay, duration, volume) {
          if (!soundEnabled) return;
          const ctx = getAudio();
          if (!ctx || !master) return;
          const play = () => {
            const now = ctx.currentTime + delay;
            // Fundamental + gentle upper partials creates a warm luxury bell.
            [
              [freq, volume, "sine"],
              [freq * 2.01, volume * 0.28, "sine"],
              [freq * 3.02, volume * 0.12, "triangle"],
            ].forEach(([f, v, type]) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              const filter = ctx.createBiquadFilter();
              osc.type = type;
              osc.frequency.setValueAtTime(f, now);
              filter.type = "lowpass";
              filter.frequency.setValueAtTime(3200, now);
              gain.gain.setValueAtTime(0.0001, now);
              gain.gain.exponentialRampToValueAtTime(v, now + 0.012);
              gain.gain.exponentialRampToValueAtTime(
                v * 0.42,
                now + duration * 0.28,
              );
              gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
              osc.connect(filter);
              filter.connect(gain);
              gain.connect(master);
              osc.start(now);
              osc.stop(now + duration + 0.05);
            });
          };
          if (ctx.state === "running") play();
          else
            ctx
              .resume()
              .then(play)
              .catch(() => {});
        }

        function loginSound() {
          if (!soundEnabled) return;
          getAudio();
          // Luxury Bell: soft struck bell followed by a bright champagne resonance.
          bell(523.25, 0.0, 1.35, 0.08);
          bell(659.25, 0.16, 1.2, 0.06);
          bell(783.99, 0.34, 1.55, 0.045);
        }

        function tabSound() {
          if (!soundEnabled) return;
          getAudio();
          bell(659.25, 0.0, 0.48, 0.035);
        }

        function errorSound() {
          if (!soundEnabled) return;
          getAudio();
          bell(246.94, 0.0, 0.34, 0.045);
          bell(196.0, 0.1, 0.42, 0.032);
        }

        ["pointerdown", "touchstart", "keydown"].forEach((evt) => {
          document.addEventListener(
            evt,
            () => {
              getAudio();
            },
            { once: true, passive: true },
          );
        });

        window.RCSound = (() => {
          let enabled = true,
            ctx = null;
          function init() {
            try {
              if (!ctx)
                ctx = new (window.AudioContext || window.webkitAudioContext)();
              if (ctx.state === "suspended") ctx.resume();
            } catch (e) {}
          }
          function tone(
            freq,
            delay,
            duration,
            gain = 0.055,
            type = "sine",
            detune = 0,
          ) {
            if (!enabled) return;
            init();
            if (!ctx) return;
            const o = ctx.createOscillator(),
              g = ctx.createGain();
            o.type = type;
            o.frequency.value = freq;
            o.detune.value = detune;
            const t = ctx.currentTime + delay;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
            g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t);
            o.stop(t + duration + 0.03);
          }
          function atelierDoor() {
            // Atelier Door: a refined couture-studio arrival cue — soft door chime,
            // warm low resonance, and a delicate high-end shimmer.
            tone(392.0, 0.0, 1.2, 0.045, "sine");
            tone(523.25, 0.055, 1.35, 0.052, "sine");
            tone(659.25, 0.145, 1.55, 0.045, "triangle", 4);
            tone(783.99, 0.285, 1.7, 0.03, "sine", -3);
            tone(1046.5, 0.48, 1.45, 0.018, "triangle", 6);
            tone(261.63, 0.0, 1.85, 0.018, "sine");
          }
          function role() {
            tone(523.25, 0.0, 0.55, 0.035, "sine");
            tone(659.25, 0.07, 0.72, 0.04, "sine");
            tone(783.99, 0.16, 0.95, 0.028, "triangle");
          }
          function error() {
            tone(220, 0, 0.22, 0.04, "sine");
            tone(174.61, 0.12, 0.38, 0.03, "sine");
          }
          function unlock() {
            init();
          }
          window.addEventListener("pointerdown", unlock, { once: true });
          window.addEventListener("keydown", unlock, { once: true });
          return {
            enable() {
              enabled = true;
              init();
            },
            disable() {
              enabled = false;
            },
            login: atelierDoor,
            tab: role,
            error,
            isEnabled: () => enabled,
          };
        })();
      })();
  
      /* =====================================================
         NEW REAL-WORLD WEBSITE FEATURES
      ===================================================== */
      const styleDirections = {
        Wedding: "Your direction: elegant occasion dressing — rich textures, refined silhouettes and statement details. Explore Wedding, Festive and Designer collections.",
        Work: "Your direction: polished everyday tailoring — clean lines, comfortable fabrics and understated colours. Explore Formal, Semi-Formal and Modern collections.",
        Weekend: "Your direction: relaxed contemporary style — easy layers, versatile separates and smart-casual pieces. Explore Modern, Casual and Semi-Modern collections."
      };

      function chooseStyle(button, mood) {
        document.querySelectorAll(".style-choice button").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        const box = document.getElementById("styleResult");
        if (box) box.textContent = styleDirections[mood];
        if (window.RCSound && RCSound.tab) RCSound.tab();
      }

      function copyCoupon(code) {
        navigator.clipboard?.writeText(code).catch(() => {});
        showToast("Coupon " + code + " copied.");
      }

      function openPhoto(src) {
        const box = document.getElementById("photoLightbox");
        const img = document.getElementById("lightboxImage");
        if (!box || !img) return;
        img.src = src;
        box.classList.add("show");
        document.body.classList.add("no-scroll");
      }

      function closePhoto(event) {
        if (event && event.target && event.target.id !== "photoLightbox" && !event.target.classList.contains("lightbox-close")) return;
        const box = document.getElementById("photoLightbox");
        if (box) box.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }

      function toggleFaq(button) {
        const item = button.closest(".faq-item");
        if (!item) return;
        item.classList.toggle("open");
      }

      function submitReview(event) {
        event.preventDefault();
        const name = document.getElementById("reviewName").value.trim();
        const rating = Number(document.getElementById("reviewRating").value);
        const review = document.getElementById("reviewText").value.trim();
        if (!name || !review) return;

        const safe = (value) => value.replace(/[&<>"']/g, char => ({
          "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
        }[char]));

        const card = document.createElement("article");
        card.className = "review-card";
        card.innerHTML = `
          <div class="review-stars">${"★".repeat(rating)}${"☆".repeat(5-rating)}</div>
          <p>${safe(review)}</p>
          <strong>${safe(name)}</strong>
          <small>Verified demo review · VASTRAÉ</small>
        `;
        document.getElementById("reviewGrid").prepend(card);
        event.target.reset();
        showToast("Thank you — your review has been added.");
      }

      function subscribeFooter(event) {
        event.preventDefault();
        const email = document.getElementById("footerEmail").value.trim();
        if (!email) return;
        event.target.reset();
        showToast("Welcome to the VASTRAÉ edit.");
      }



      /* =====================================================
         DESIGNER CONSULTATION + TREND LAB
      ===================================================== */
      let selectedDesigner = {name:"Aarav Rao", fee:"₹999"};
      let selectedSkinTone = "Medium";

      function selectDesigner(card){
        document.querySelectorAll('.designer-card').forEach(c=>c.classList.remove('active'));
        card.classList.add('active');
        selectedDesigner={name:card.dataset.designer,fee:card.dataset.fee};
        const title=document.getElementById('selectedDesignerTitle');
        if(title) title.textContent='Design Conversation · '+selectedDesigner.name;
        const status=document.getElementById('consultStatus');
        if(status) status.textContent='Consultation not booked · '+selectedDesigner.fee;
        if(window.RCSound?.tab) RCSound.tab();
      }

      function bookDesignerConsultation(){
        const status=document.getElementById('consultStatus');
        if(status) status.textContent='Booking request created · '+selectedDesigner.fee+' separate fee';
        addDesignerMessage('client','I would like to book a paid design consultation with '+selectedDesigner.name+'.');
        showToast('Consultation request created. Designer fee: '+selectedDesigner.fee+' (separate from shopping/tailoring).');
      }

      function addDesignerMessage(type,text){
        const box=document.getElementById('designerChat'); if(!box) return;
        const div=document.createElement('div'); div.className='chat-msg '+type; div.textContent=text; box.appendChild(div); box.scrollTop=box.scrollHeight;
      }

      function sendDesignerMessage(){
        const input=document.getElementById('designerMessage'); if(!input) return;
        const text=input.value.trim(); if(!text) return;
        addDesignerMessage('client',text); input.value='';
        setTimeout(()=>addDesignerMessage('designer','I have noted that direction. We can refine the silhouette, fabric, colour and detailing into your VASTRAÉ trend concept.'),450);
      }

      function createTrendConcept(){
        const name=selectedDesigner.name;
        const concept='VASTRAÉ Heritage Fusion · '+name+' · '+selectedSkinTone+' tone palette · Custom silhouette';
        localStorage.setItem('vastraeTrendConcept',concept);
        showToast('Trend concept saved: '+concept);
        addDesignerMessage('designer','Your Trend Concept has been saved. Next, we can turn it into a custom design request.');
      }

      /* =====================================================
         SKIN TONE COLOUR PERSONALIZATION
      ===================================================== */
      const skinPalettes={
        Porcelain:{warm:['#B76E4B',' #A67B5B','#C78B5B','#6E4B3A'],cool:['#7D5A6D','#536A8A','#8E4A5B','#4E5A64'],neutral:['#8B6B5A','#7B6A58','#6A6F73','#8B5E5E']},
        Light:{warm:['#B86B4A','#7A8B4A','#B08A3C','#7C4D3A'],cool:['#5C668F','#7D4B6B','#4E777A','#6B587A'],neutral:['#8B6B55','#65735D','#776B83','#8A5E4B']},
        Medium:{warm:['#C56D4E','#8B6F3D','#1F5B55','#8A4F36'],cool:['#4D5D8A','#6C496B','#356D70','#713F56'],neutral:['#7A5C48','#5F6B55','#6D5B78','#80584A']},
        Tan:{warm:['#A94F35','#6C6B32','#9A6A2F','#1F5A50'],cool:['#3E547A','#6D3F63','#2E6C70','#68445A'],neutral:['#6F5648','#536451','#63566E','#7B5140']},
        Deep:{warm:['#C05A3A','#B38A36','#2D6657','#8B3E2F'],cool:['#475B86','#704263','#2F7073','#6B3E57'],neutral:['#7A5B48','#4D6655','#665776','#804B3B']},
        'Rich Deep':{warm:['#D16A45','#B18A2E','#2B6A57','#963D2F'],cool:['#526A9B','#7C466F','#347A7B','#713F60'],neutral:['#87614D','#55705C','#6C5B7C','#8A5140']}
      };
      const paletteNames=['Signature','Accent','Heritage','Evening'];
      function selectSkinTone(button,tone){
        document.querySelectorAll('.tone-option').forEach(b=>b.classList.remove('active'));
        button.classList.add('active'); selectedSkinTone=tone; updateSkinPalette();
      }
      function updateSkinPalette(){
        const undertone=document.getElementById('undertoneSelect')?.value||'warm';
        const occasion=document.getElementById('skinOccasion')?.value||'Everyday';
        const colors=skinPalettes[selectedSkinTone][undertone];
        const palette=document.getElementById('skinPalette'); if(!palette) return;
        palette.innerHTML=colors.map((c,i)=>`<div class="palette-chip" style="background:${c.trim()}">${paletteNames[i]}</div>`).join('');
        const title=document.getElementById('designRecommendation');
        const desc=document.getElementById('fabricRecommendation');
        if(title) title.textContent=selectedSkinTone+' · '+undertone.charAt(0).toUpperCase()+undertone.slice(1)+' · '+occasion;
        if(desc) desc.textContent='Suggested starting palette for '+occasion.toLowerCase()+': '+colors.map(c=>c.trim()).join(', ')+'. Pair these colours with your preferred silhouette, fabric and cultural style. Personal preference and lighting matter, so treat this as styling guidance rather than a rule.';
      }
      function applySkinPaletteToDesign(){
        const undertone=document.getElementById('undertoneSelect')?.value||'warm';
        const occasion=document.getElementById('skinOccasion')?.value||'Everyday';
        const concept='Skin-tone palette: '+selectedSkinTone+' / '+undertone+' · Occasion: '+occasion;
        localStorage.setItem('vastraeSkinDesign',concept);
        showToast('Colour palette applied to your design brief.');
      }
      document.addEventListener('DOMContentLoaded',()=>updateSkinPalette());

/* =====================================================
   BOUTIQUE FEATURE HUB INTERACTIONS
===================================================== */
const boutiqueFeatureData = {
  handwork: {
    kicker:"CRAFT 01",
    title:"Hand Work",
    text:"Choose artisan hand-finishing for pieces that need a personal, handcrafted character.",
    body:`<div class="feature-pills"><span class="feature-pill">Zari Work</span><span class="feature-pill">Aari Work</span><span class="feature-pill">Bead Work</span><span class="feature-pill">Hand Finishing</span></div>
      <div class="feature-info">Select this service when submitting a Bespoke request and describe the motif, colour and placement you prefer.</div>`
  },
  machinework: {
    kicker:"CRAFT 02",
    title:"Machine Work",
    text:"Precision machine work for clean seams, structured garments and repeatable finishing.",
    body:`<div class="feature-pills"><span class="feature-pill">Precision Stitching</span><span class="feature-pill">Edge Finishing</span><span class="feature-pill">Pattern Work</span><span class="feature-pill">Production Finish</span></div>
      <div class="feature-info">You can combine machine work with hand work or embroidery for a hybrid couture finish.</div>`
  },
  embroidery: {
    kicker:"CRAFT 03",
    title:"Embroidery",
    text:"Choose embroidery styles for bridal, festive, traditional and contemporary garments.",
    body:`<div class="feature-pills"><span class="feature-pill">Floral</span><span class="feature-pill">Bridal</span><span class="feature-pill">Traditional</span><span class="feature-pill">Contemporary</span></div>
      <div class="feature-info">Upload a reference image in the Photo Reference service to discuss an embroidery direction.</div>`
  },
  computerEmbroidery: {
    kicker:"CRAFT 04",
    title:"Computer Embroidery",
    text:"Digital embroidery enables detailed patterns and consistent reproduction across garments.",
    body:`<div class="feature-info">Choose your garment type, upload a motif reference and mention the preferred placement. Final pricing can depend on design complexity and stitch density.</div>
      <form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Computer embroidery request')">
        <label>Garment</label><select required><option>Blouse</option><option>Kurta</option><option>Dress</option><option>Jacket</option><option>Saree</option></select>
        <label>Design notes</label><textarea required placeholder="Describe your embroidery idea..."></textarea>
        <button class="btn btn-dark" type="submit">Send Request</button>
      </form>`
  },
  iotMeasurement: {
    kicker:"SMART FIT",
    title:"IoT Free Measurement",
    text:"A smart measurement workflow designed to make fitting simpler. This front-end demo prepares the measurement request; hardware/API integration can be connected later.",
    body:`<form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Smart measurement request')">
        <label>Name</label><input required placeholder="Your name">
        <label>Height</label><input type="number" min="1" placeholder="cm">
        <label>Garment</label><select required><option>Blouse</option><option>Dress</option><option>Kurta</option><option>Suit</option><option>Custom</option></select>
        <label>Measurement notes</label><textarea placeholder="Any fitting requirements..."></textarea>
        <button class="btn btn-gold" type="submit">Start Free Measurement</button>
      </form>`
  },
  clothTypes: {
    kicker:"FABRIC LIBRARY",
    title:"Types of Cloth",
    text:"Explore fabric choices before you customise a garment.",
    body:`<div class="feature-pills"><span class="feature-pill">Silk</span><span class="feature-pill">Cotton</span><span class="feature-pill">Linen</span><span class="feature-pill">Chiffon</span><span class="feature-pill">Georgette</span><span class="feature-pill">Velvet</span><span class="feature-pill">Satin</span><span class="feature-pill">Organza</span></div>
      <div class="feature-info">Fabric suitability can depend on the garment, occasion, season and desired fall. Use the Customise area for a detailed request.</div>`
  },
  stitching: {
    kicker:"TAILORING MENU",
    title:"Types of Stitching",
    text:"Choose a stitching direction for your custom garment.",
    body:`<div class="feature-pills"><span class="feature-pill">A-Line</span><span class="feature-pill">Princess Cut</span><span class="feature-pill">Straight Cut</span><span class="feature-pill">Flared</span><span class="feature-pill">Tailored Fit</span><span class="feature-pill">Custom Fit</span></div>
      <div class="feature-info">Tell the tailor your preferred neckline, sleeve, fit and finishing details through the Bespoke form.</div>`
  },
  reference: {
    kicker:"DESIGN LIBRARY",
    title:"Reference Library",
    text:"Collect inspiration before beginning a new design. Save ideas for silhouettes, embroidery, fabrics and finishing.",
    body:`<div class="feature-info">Tip: combine multiple references into one design brief and discuss the final direction with your tailor or costume designer.</div>
      <button class="btn btn-dark" style="margin-top:18px" onclick="closeBoutiqueFeature();scrollToId('custom')">Create Design Brief</button>`
  },
  photoReference: {
    kicker:"VISUAL REFERENCE",
    title:"Photo Reference",
    text:"Upload a photo reference so your tailor or designer can understand the look you want.",
    body:`<form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Photo reference')">
        <label>Reference photo</label><input type="file" accept="image/*" required>
        <label>What should we recreate?</label><textarea required placeholder="Describe the outfit, details, fabric or fit you like..."></textarea>
        <button class="btn btn-gold" type="submit">Save Reference</button>
      </form>`
  },
  readySaree: {
    kicker:"SAREE EDIT",
    title:"Ready-Made Saree",
    text:"Ready-to-wear sarees designed for convenient styling with less preparation time.",
    body:`<div class="feature-pills"><span class="feature-pill">Pre-Finished</span><span class="feature-pill">Easy Drape</span><span class="feature-pill">Festive</span><span class="feature-pill">Occasion Wear</span></div>
      <button class="btn btn-dark" style="margin-top:18px" onclick="closeBoutiqueFeature();scrollToId('shop')">View Saree Collection</button>`
  },
  wasteToBest: {
    kicker:"SUSTAINABLE COUTURE",
    title:"Waste to Best",
    text:"Give leftover fabric a second life by converting it into thoughtful return gifts and useful accessories.",
    body:`<div class="feature-pills"><span class="feature-pill">Potli Bags</span><span class="feature-pill">Pouches</span><span class="feature-pill">Scrunchies</span><span class="feature-pill">Gift Covers</span><span class="feature-pill">Small Keepsakes</span></div>
      <div class="feature-info">Ideal for weddings, celebrations and boutique events where fabric waste can become a personalised return gift.</div>`
  },
  prePleating: {
    kicker:"SAREE SERVICE",
    title:"Saree Pre-Pleating",
    text:"Get your saree pleated and prepared before your event for a neat, convenient drape.",
    body:`<form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Saree pre-pleating booking')">
        <label>Event date</label><input type="date" required>
        <label>Saree type</label><select required><option>Silk</option><option>Georgette</option><option>Chiffon</option><option>Organza</option><option>Other</option></select>
        <label>Notes</label><textarea placeholder="Mention fall/pico, belt, pins or other preferences..."></textarea>
        <button class="btn btn-gold" type="submit">Book Pre-Pleating</button>
      </form>`
  },
  accessories: {
    kicker:"STYLE FINISH",
    title:"Accessories",
    text:"Complete the look with carefully selected styling accessories.",
    body:`<div class="feature-pills"><span class="feature-pill">Jewellery</span><span class="feature-pill">Bags</span><span class="feature-pill">Belts</span><span class="feature-pill">Hair Accessories</span><span class="feature-pill">Brooches</span><span class="feature-pill">Dupattas</span></div>
      <button class="btn btn-dark" style="margin-top:18px" onclick="closeBoutiqueFeature();scrollToId('shop')">Explore Shop</button>`
  },
  rentals: {
    kicker:"OCCASION RENTALS",
    title:"Rentals",
    text:"Rent selected outfits and accessories instead of purchasing them for one-time occasions.",
    body:`<form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Rental enquiry')">
        <label>Occasion</label><select required><option>Wedding</option><option>Reception</option><option>Party</option><option>College Event</option><option>Photoshoot</option></select>
        <label>Rental dates</label><input type="text" required placeholder="Example: 12–14 Oct">
        <label>What are you looking for?</label><textarea required placeholder="Outfit, saree, accessories, family package..."></textarea>
        <button class="btn btn-gold" type="submit">Send Rental Enquiry</button>
      </form>`
  },
  designerConnect: {
    kicker:"PAID DESIGN CONSULTATION",
    title:"Designer Connect",
    text:"Customers can contact a costume designer separately for a paid consultation, discuss ideas and collaborate on a new trend or custom design.",
    body:`<div class="feature-info">Designer consultation is a separate service. The client and designer can discuss the reference, fabric, silhouette, embroidery, measurements and final design direction.</div>
      <form class="feature-modal-form" onsubmit="submitBoutiqueFeature(event,'Designer consultation')">
        <label>Design idea</label><textarea required placeholder="Tell the designer what you want to create..."></textarea>
        <button class="btn btn-dark" type="submit">Request Designer</button>
      </form>`
  },
  skinTone: {
    kicker:"STYLE INTELLIGENCE",
    title:"Skin-Tone Styling",
    text:"Use colour guidance to explore shades that may complement your chosen garment and occasion.",
    body:`<div class="feature-pills"><span class="feature-pill">Warm Palette</span><span class="feature-pill">Cool Palette</span><span class="feature-pill">Neutral Palette</span><span class="feature-pill">Festive Colours</span></div>
      <div class="feature-info">This is a styling guide rather than a medical or scientific assessment. Final colour choice remains personal and can be influenced by lighting, fabric and occasion.</div>`
  }
};

function openBoutiqueFeature(key){
  const item=boutiqueFeatureData[key];
  if(!item) return;
  document.getElementById("boutiqueModalKicker").textContent=item.kicker;
  document.getElementById("boutiqueModalTitle").textContent=item.title;
  document.getElementById("boutiqueModalText").textContent=item.text;
  document.getElementById("boutiqueModalBody").innerHTML=item.body;
  const modal=document.getElementById("boutiqueFeatureModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}
function closeBoutiqueFeature(){
  const modal=document.getElementById("boutiqueFeatureModal");
  if(!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}
function submitBoutiqueFeature(event,label){
  event.preventDefault();
  closeBoutiqueFeature();
  if(typeof showToast==="function"){
    showToast(label+" saved successfully. This demo is ready for backend/API integration.");
  }else{
    alert(label+" saved successfully.");
  }
}
document.addEventListener("keydown",function(e){
  if(e.key==="Escape") closeBoutiqueFeature();
});

/* ===== INTERACTION SAFETY NET & ACCESSIBILITY ===== */
(function(){
  // Keep tab selection visually and accessibly synchronized.
  document.querySelectorAll('.login-switch [role="tab"]').forEach(function(tab){
    tab.addEventListener('keydown',function(e){
      if(!['ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const tabs=[...document.querySelectorAll('.login-switch [role="tab"]')];
      const i=tabs.indexOf(tab), next=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];
      next.focus(); next.click();
    });
  });
  // Add a clear active state to navigation links as the visitor moves through sections.
  const navLinks=[...document.querySelectorAll('header .nav a[href^="#"]')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window && sections.length){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          navLinks.forEach(a=>a.classList.toggle('nav-current',a.getAttribute('href')==='#'+entry.target.id));
        }
      });
    },{rootMargin:'-25% 0px -65% 0px'});
    sections.forEach(section=>observer.observe(section));
  }
  // Improve keyboard and touch affordance for clickable feature cards.
  document.querySelectorAll('.hub-card[onclick]').forEach(card=>{
    card.setAttribute('tabindex','0'); card.setAttribute('role','button');
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}
    });
  });
  // Escape closes any open feature overlay.
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && typeof window.closeBoutiqueFeature==='function') window.closeBoutiqueFeature();
  });
})();

/* Section navigation: show the selected destination as its own page-like view. */
(function () {
  const app = document.getElementById('app');
  if (!app) return;

  const pageIds = new Set([
    'home','homeRunway','atelierProcess','craftsmanshipHallmarks','profile','about','offers',
    'catalogue','capsuleBuilder','collectionFabrics','collectionMoods','traditionalSection','shop',
    'aiMirror','lookbook','experience','services','events','custom','fabric','tryon','measurements',
    'moodboard','tracking','reviews','boutiqueFeatures','faq'
  ]);

  const collectionIds = new Set(['catalogue', 'capsuleBuilder', 'collectionFabrics', 'collectionMoods', 'traditionalSection', 'traditional', 'shop']);
  const homeSectionIds = new Set(['home', 'homeRunway', 'atelierProcess', 'craftsmanshipHallmarks', 'homeFeature', 'profile', 'about', 'offers']);

  function activateSection(id, updateHash = true) {
    if (id === 'craftStudio') id = 'experience';
    if (id === 'traditional') id = 'traditionalSection';

    const isHome = id === 'home' || homeSectionIds.has(id);
    const isCollection = collectionIds.has(id);
    const targetId = isCollection ? 'catalogue' : (isHome ? 'home' : id);
    const target = document.getElementById(targetId);
    if (!target || !pageIds.has(id) || target.tagName.toLowerCase() !== 'section') return false;

    app.classList.add('section-mode');
    app.querySelectorAll(':scope > section').forEach(section => {
      let active = false;
      if (isCollection) {
        active = collectionIds.has(section.id) || section.id === 'catalogue';
      } else if (isHome) {
        active = homeSectionIds.has(section.id) || section.classList.contains('home-feature');
      } else {
        active = (section === target);
      }
      section.dataset.pageActive = active ? 'true' : 'false';
      section.dataset.pageHidden = active ? 'false' : 'true';
      section.hidden = !active;
    });

    document.querySelectorAll('header .nav a').forEach(link => {
      const href = link.getAttribute('href');
      const active = isCollection
        ? (href === '#catalogue')
        : (href === '#' + id || (id === 'experience' && link.textContent.trim().toLowerCase() === 'craft studio'));
      link.classList.toggle('nav-current', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (id === 'traditionalSection') {
      activateTempleTheme(true);
      const tradSec = document.getElementById('traditionalSection');
      if (tradSec) {
        setTimeout(() => {
          tradSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    } else if (id === 'shop') {
      activateTempleTheme(false);
      const shopSec = document.getElementById('shop');
      if (shopSec) {
        setTimeout(() => {
          shopSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    } else {
      activateTempleTheme(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (updateHash) history.replaceState(null, '', '#' + id);
    return true;
  }

  // Keep existing calls such as scrollToId() working with the new page-like navigation.
  window.scrollToId = function (id) {
    if (id === 'traditional') id = 'traditionalSection';
    if (collectionIds.has(id)) {
      activateSection(id);
      return;
    }
    if (!activateSection(id)) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  document.querySelectorAll('header .nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
      const id = this.getAttribute('href').slice(1);
      if (activateSection(id)) event.preventDefault();
    });
  });

  const logo = document.querySelector('header .logo');
  if (logo) logo.addEventListener('click', function (event) {
    event.preventDefault();
    activateSection('home');
  });

  // Start on the home landing view after the app becomes visible.
  const observer = new MutationObserver(() => {
    if (app.style.display !== 'none' && !app.dataset.pageInitialized) {
      app.dataset.pageInitialized = 'true';
      const initial = location.hash.slice(1);
      activateSection(pageIds.has(initial) ? initial : 'home', false);
    }
  });
  observer.observe(app, { attributes: true, attributeFilter: ['style'] });
  if (app.style.display !== 'none') {
    app.dataset.pageInitialized = 'true';
    activateSection('home', false);
  }
})();

// Initialize on page readiness & setup scroll observation
function initTraditionalPavilion() {
  renderCatalogueOutfits('all');
  renderTraditionalOutfits();
  const tradSec = document.getElementById("traditionalSection");
  if (tradSec && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !tradSec.hidden) {
          activateTempleTheme(true);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(tradSec);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTraditionalPavilion);
} else {
  initTraditionalPavilion();
}
