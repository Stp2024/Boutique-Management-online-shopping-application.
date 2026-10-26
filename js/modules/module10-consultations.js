/* ==========================================================================
   MODULE 10: CONSULTATION BOOKING MANAGEMENT
   ========================================================================== */

(function () {
  const stylists = [
    {
      id: "styl-1",
      name: "Meenakshi Sundaram",
      role: "Chief Bridal Couture Director",
      experience: "16+ Years Experience",
      specialty: "Bridal Trousseau & Muhurtham Kanjeevarams",
      img: "images/products/women/emerald-pakistani-suit-front.jpg"
    },
    {
      id: "styl-2",
      name: "Savitha Devi",
      role: "Master Aari & Zardozi Needlework Curator",
      experience: "20+ Years Experience",
      specialty: "Bespoke Blouse Necklines & Peacock Motifs",
      img: "images/products/women/emerald-pakistani-suit-front.jpg"
    },
    {
      id: "styl-3",
      name: "Aarav Singhania",
      role: "Contemporary Silhouette & Draping Stylist",
      experience: "9+ Years Experience",
      specialty: "Modern Indo-Western Corsets & Gala Evening Wear",
      img: "images/products/women/emerald-pakistani-suit-front.jpg"
    },
    {
      id: "styl-4",
      name: "Priya Nambiar",
      role: "Little Princess & Family Twinning Designer",
      experience: "12+ Years Experience",
      specialty: "Handloom Cotton Frocks & Mother-Daughter Pairs",
      img: "images/products/women/emerald-pakistani-suit-front.jpg"
    }
  ];

  window.openBookConsultationModal = function (preferredService = "Bridal Trousseau Comprehensive Styling") {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.1em; text-transform:uppercase;">PRIVATE ATELIER APPOINTMENT</span>
        <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:4px 0 6px;">Book Virtual or In-Salon Consultation</h2>
        <p style="font-size:13px; color:#665c51; margin:0 0 20px;">
          Meet 1-on-1 with VASTRAÉ Boutique's master stylists to review your wedding motifs, blouses, and fabric selections.
        </p>

        <!-- Stylist selector -->
        <div style="margin-bottom:18px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:8px;">Select Stylist / Expert</label>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
            ${stylists.map((s, idx) => `
              <label style="border:1px solid #eedecb; background:${idx === 0 ? '#faf8f3' : '#fff'}; border-radius:8px; padding:10px; display:flex; align-items:center; gap:10px; cursor:pointer;">
                <input type="radio" name="stylistSelect" value="${s.name}" ${idx === 0 ? 'checked' : ''}>
                <img src="${s.img}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                <div>
                  <strong style="font-size:12.5px; color:#4a0d17; display:block;">${s.name}</strong>
                  <span style="font-size:11px; color:#7c6f62;">${s.specialty}</span>
                </div>
              </label>
            `).join('')}
          </div>
        </div>

        <form onsubmit="window.saveNewConsultationBooking(event)" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Consultation Service</label>
            <select id="consultService" class="nak-form-control">
              <option value="Bridal Trousseau Comprehensive Styling" ${preferredService.includes('Bridal') ? 'selected' : ''}>Bridal Trousseau Comprehensive Styling (60 Mins)</option>
              <option value="Bespoke Blouse &amp; Aari Embroidery Design" ${preferredService.includes('Blouse') ? 'selected' : ''}>Bespoke Blouse &amp; Aari Embroidery Design (30 Mins)</option>
              <option value="Virtual Fabric Drape &amp; Silhouette Walkthrough">Virtual Fabric Drape &amp; Silhouette Walkthrough (45 Mins)</option>
              <option value="In-Salon Fitting &amp; Measurement Session (RR Nagar)">In-Salon Fitting Session at RR Nagar Salon (45 Mins)</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Appointment Format</label>
            <select id="consultFormat" class="nak-form-control">
              <option value="Virtual Google Meet HD">Virtual HD Video Session (Google Meet)</option>
              <option value="In-Salon Atelier (RR Nagar)">In-Person at RR Nagar Boutique (No. 10 KK Arcade)</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Preferred Date</label>
            <input id="consultDate" type="date" value="${tomorrow}" min="${tomorrow}" required class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Time Slot</label>
            <select id="consultTime" class="nak-form-control">
              <option>10:30 AM &ndash; 11:30 AM (Morning Slot)</option>
              <option>12:00 PM &ndash; 01:00 PM</option>
              <option selected>02:30 PM &ndash; 03:30 PM (Afternoon Slot)</option>
              <option>04:30 PM &ndash; 05:30 PM</option>
              <option>06:00 PM &ndash; 07:00 PM (Evening Slot)</option>
            </select>
          </div>
          <div style="grid-column:1 / -1;">
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Occasion / Wardrobe Requirements Notes</label>
            <textarea id="consultNotes" rows="2" placeholder="e.g. November Wedding, need matching bridal blouse for maroon Kanjeevaram and daughter twinning frock" class="nak-form-control"></textarea>
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Confirm Atelier Appointment</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveNewConsultationBooking = function (e) {
    if (e) e.preventDefault();
    const cust = window.getActiveCustomer ? window.getActiveCustomer() : { name: "Ananya Sharma", email: "ananya.sharma@vastrae.com" };
    const selStylist = document.querySelector('input[name="stylistSelect"]:checked')?.value || "Meenakshi Sundaram";
    const refCode = "#CONS-2026-" + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
      id: refCode,
      stylist: selStylist,
      service: document.getElementById("consultService")?.value || "Bridal Trousseau Styling",
      format: document.getElementById("consultFormat")?.value || "Virtual Google Meet",
      date: document.getElementById("consultDate")?.value || "Tomorrow",
      time: document.getElementById("consultTime")?.value || "02:30 PM",
      notes: document.getElementById("consultNotes")?.value || "",
      status: "Confirmed",
      meetLink: "https://meet.google.com/nak-vast-styl"
    };

    if (!cust.consultations) cust.consultations = [];
    cust.consultations.unshift(newBooking);
    if (window.saveActiveCustomer) window.saveActiveCustomer(cust);

    window.closeModal();
    window.showToast(`✓ Consultation booked with ${selStylist} (${refCode})!`);
    if (window.customerWorkspacePage) window.customerWorkspacePage("consultations");
  };

  window.rescheduleConsultation = function (consultId) {
    window.openBookConsultationModal();
  };

  window.stylists = stylists;
})();
