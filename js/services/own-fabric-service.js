/* ==========================================================================
   VASTRAÉ — OWN FABRIC SERVICE (PHYSICAL INSPECTION FIRST ENGINE)
   Strict 9-Stage Workflow:
   1. Request Submitted (Reference photo only)
   2. Awaiting Fabric (Shipping / Drop-off instructions)
   3. Fabric Received (Arrival confirmed at boutique)
   4. Physical Inspection (Condition, length, weave, suitability)
   5. Inspection Decision (Suitable, Needs Material, Unsuitable)
   6. Design & Price Confirmation (Feasible design, charges, ETA)
   7. Client Approval (Client approves or requests return)
   8. Tailor Assignment (Admin assigns approved work to Master Tailor)
   9. Stitching, Quality Check and Delivery
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_own_fabric";

  const STATUSES = {
    REQUEST_SUBMITTED: "Request Submitted",
    AWAITING_FABRIC: "Awaiting Fabric",
    FABRIC_RECEIVED: "Fabric Received",
    UNDER_INSPECTION: "Under Physical Inspection",
    INSPECTION_SUITABLE: "Inspection: Suitable",
    INSPECTION_NEEDS_MATERIAL: "Inspection: Needs Additional Material",
    INSPECTION_UNSUITABLE: "Inspection: Unsuitable (Return Options Available)",
    PROPOSAL_PENDING_APPROVAL: "Design & Price Proposed (Awaiting Client Approval)",
    CLIENT_APPROVED: "Client Approved (Ready for Tailor Assignment)",
    CLIENT_DECLINED: "Client Declined (Return Requested)",
    ASSIGNED_TO_TAILOR: "Assigned to Master Tailor",
    IN_STITCHING: "In Stitching & Production",
    QUALITY_CHECK: "Quality Audit & Fit Test",
    READY_DISPATCH: "Dispatched / Ready for Pickup",
    COMPLETED: "Completed"
  };

  const STAGES = [
    { stage: 1, title: "Request Submitted", desc: "Client submitted outfit preferences, measurements & reference photos." },
    { stage: 2, title: "Awaiting Fabric", desc: "Admin provided shipping or drop-off instructions to client." },
    { stage: 3, title: "Fabric Received", desc: "Physical fabric confirmed arrived at Indiranagar Atelier." },
    { stage: 4, title: "Physical Inspection", desc: "Staff physically examining length, weave integrity and fabric grain." },
    { stage: 5, title: "Inspection Decision", desc: "Recorded suitability (Suitable / Needs Material / Unsuitable)." },
    { stage: 6, title: "Design & Price Proposed", desc: "Feasible design, charges & estimated delivery date formulated." },
    { stage: 7, title: "Client Approval", desc: "Client reviewed and approved final specifications & stitching fee." },
    { stage: 8, title: "Tailor Assignment", desc: "Allocated to Master Tailor for precision pattern cutting." },
    { stage: 9, title: "Stitching, QC & Delivery", desc: "Bespoke production, master inspector audit & insured delivery." }
  ];

  const RETURN_OPTIONS = [
    { id: "courier", title: "Insured Courier Return", fee: 250, desc: "Insured courier return to client's address (Standard ₹250 shipping & handling fee applies)." },
    { id: "desk_pickup", title: "Atelier Desk Pickup", fee: 0, desc: "Complimentary pickup from Flagship Boutique desk (Indiranagar, Bengaluru within 14 days)." },
    { id: "vault_storage", title: "Atelier Vault Hold", fee: 0, desc: "Complimentary storage in Atelier Fabric Vault for up to 30 days for an alternative project." }
  ];

  const vastraeOwnFabricService = {
    STATUSES: STATUSES,
    STAGES: STAGES,
    RETURN_OPTIONS: RETURN_OPTIONS,

    // Initial requests (strictly empty for genuine patron data)
    getInitialRequests: function () {
      return [];
    },

    getAllRequests: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
      }

      if (!stored || !Array.isArray(stored)) {
        return [];
      }

      // Clean orders list
      const cleaned = stored.filter(function (r) {
        return r && r.id !== "VST-OF-DEMO-01";
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, cleaned);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    getCustomerRequests: function (userId, customerName) {
      const all = this.getAllRequests();
      if (!userId && !customerName) return [];
      const uLower = (userId || "").toString().toLowerCase();
      const cLower = (customerName || "").toString().toLowerCase();
      return all.filter(function (r) {
        const rUser = (r.userId || r.customerId || "").toString().toLowerCase();
        const rName = (r.customerName || r.clientName || "").toString().toLowerCase();
        return (uLower && (rUser === uLower || rUser.indexOf(uLower) !== -1)) ||
               (cLower && (rName === cLower || rName.indexOf(cLower) !== -1 || cLower.indexOf(rName) !== -1));
      });
    },

    // Tailor can ONLY see Own Fabric tasks that have been approved by the client AND assigned by Admin (Stage 8+)
    getTailorRequests: function (tailorId, tailorName) {
      const all = this.getAllRequests();
      if (!tailorId && !tailorName) return [];
      return all.filter(function (r) {
        const isAssigned = (tailorId && r.assignedTailorId === tailorId) ||
                           (tailorName && (r.assignedTailorName || "").toLowerCase() === tailorName.toLowerCase());
        const isApprovedForProduction = r.currentStage >= 8 && r.status !== STATUSES.CLIENT_DECLINED;
        return isAssigned && isApprovedForProduction;
      });
    },

    getRequestById: function (id) {
      const all = this.getAllRequests();
      return all.find(function (r) { return r.id === id || r.ref === id; }) || null;
    },

    saveAll: function (requests) {
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, requests);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(requests)); } catch (e) {}
    },

    // 1. Stage 1: Client Submits Request
    // MANDATORY RULE: Fabric photo is reference only; online photos do NOT determine suitability.
    createRequest: function (data) {
      const all = this.getAllRequests();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-OF") : "VST-OF-" + Date.now().toString().slice(-5);

      const newReq = {
        id: id,
        ref: id,
        userId: data.userId || "GUEST",
        customerName: data.customerName || "Customer",
        customerPhone: data.customerPhone || "",
        customerEmail: data.customerEmail || "",
        outfitType: data.outfitType || data.garment || "Designer Blouse",
        fabricType: data.fabricType || "Pure Silk / Handloom",
        yardageMeters: data.yardageMeters || data.meters || 2.5,
        liningPreference: data.liningPreference || data.lining || "Pure Cotton Voile (Breathable)",
        designPreferences: data.designPreferences || data.notes || "Standard Tailoring",
        measurementsSummary: data.measurementsSummary || "22-Point Standard Fit",
        measurementProfileId: data.measurementProfileId || null,
        // Mandatory rule: Photos are strictly for reference only
        fabricPhotos: data.fabricPhotos || (data.photoUrl ? [data.photoUrl] : []),
        photoDisclaimer: "Uploaded photos are for visual reference only. Physical examination at our atelier is mandatory before suitability is determined.",
        pickupMethod: data.pickupMethod || "Doorstep Courier Pickup",
        pickupAddress: data.pickupAddress || data.address || "Bengaluru",
        pickupDate: data.pickupDate || new Date().toISOString().split("T")[0],
        pickupSlot: data.pickupSlot || "Morning (10:00 AM – 01:00 PM)",

        status: STATUSES.REQUEST_SUBMITTED,
        currentStage: 1,

        shippingInstructions: null,
        fabricReceivedDate: null,
        receivedNotes: null,

        physicalInspection: {
          inspected: false,
          inspectedBy: null,
          inspectionDate: null,
          actualLengthMeters: null,
          weaveCondition: null,
          suitability: null, // "Suitable" | "Needs Additional Material" | "Unsuitable"
          findings: null,
          returnOptionsDisclosed: null
        },

        proposal: {
          confirmedDesign: null,
          stitchingCharge: null,
          liningCost: null,
          totalCharges: null,
          estimatedDeliveryDate: null,
          proposedAt: null
        },

        clientApproval: {
          status: null, // "Approved" | "Declined"
          approvedAt: null,
          clientNotes: null,
          selectedReturnOption: null
        },

        assignedTailorId: null,
        assignedTailorName: "Unassigned",
        assignedAt: null,

        tailorNotes: null,
        qcInspector: null,
        qcDate: null,
        dispatchTrackingNo: null,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      all.unshift(newReq);
      this.saveAll(all);
      if (window.vastraeNotificationService) {
        window.vastraeNotificationService.addNotification(
          "Own Fabric Request Logged",
          `Fabric pickup request #${newReq.id} for '${newReq.outfitType}' recorded. Doorstep courier assigned.`,
          "ownfabric",
          "📦",
          { actionTab: "ownfabric" }
        );
      }
      return newReq;
    },

    // 2. Stage 2: Admin reviews & provides shipping or drop-off instructions
    provideShippingInstructions: function (id, instructions) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      req.shippingInstructions = instructions || "Please pack your fabric in a secure waterproof bag. Our BlueDart courier will collect it from your address with pre-printed barcode label.";
      req.status = STATUSES.AWAITING_FABRIC;
      req.currentStage = 2;
      req.updatedAt = new Date().toISOString();

      this.saveAll(all);
      return { success: true, request: req, message: "Shipping & drop-off instructions sent to client." };
    },

    // 3. Stage 3: Admin confirms physical fabric has arrived at boutique
    confirmFabricArrival: function (id, receivedNotes, trackingNo) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      req.fabricReceivedDate = new Date().toISOString();
      req.receivedNotes = receivedNotes || "Parcel safely arrived at Indiranagar Boutique intake counter.";
      req.dispatchTrackingNo = trackingNo || req.dispatchTrackingNo || ("IN-INTAKE-" + Date.now().toString().slice(-5));
      req.status = STATUSES.FABRIC_RECEIVED;
      req.currentStage = 3;
      req.updatedAt = new Date().toISOString();

      this.saveAll(all);
      return { success: true, request: req, message: "Fabric arrival confirmed at boutique." };
    },

    // 4 & 5. Stage 4 & 5: Physical Inspection & Inspection Decision
    // MANDATORY RULE: Never automatically mark fabric as suitable before physical inspection.
    recordPhysicalInspection: function (id, inspectionData) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      const suitability = inspectionData.suitability; // "Suitable" | "Needs Additional Material" | "Unsuitable"
      if (!suitability || !["Suitable", "Needs Additional Material", "Unsuitable"].includes(suitability)) {
        return { success: false, message: "Please record valid inspection suitability (Suitable, Needs Additional Material, or Unsuitable)." };
      }

      req.physicalInspection = {
        inspected: true,
        inspectedBy: inspectionData.inspectedBy || "Atelier Master Examiner",
        inspectionDate: new Date().toISOString(),
        actualLengthMeters: inspectionData.actualLengthMeters || req.yardageMeters,
        weaveCondition: inspectionData.weaveCondition || "Examined for warp/weft stability and defects.",
        suitability: suitability,
        findings: inspectionData.findings || "Physical examination complete.",
        returnOptionsDisclosed: (suitability === "Unsuitable") ? RETURN_OPTIONS : null
      };

      if (suitability === "Suitable") {
        req.status = STATUSES.INSPECTION_SUITABLE;
        req.currentStage = 5;
      } else if (suitability === "Needs Additional Material") {
        req.status = STATUSES.INSPECTION_NEEDS_MATERIAL;
        req.currentStage = 5;
      } else {
        req.status = STATUSES.INSPECTION_UNSUITABLE;
        req.currentStage = 5;
      }

      req.updatedAt = new Date().toISOString();
      this.saveAll(all);

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          `Own Fabric Inspection: ${suitability}`,
          `Inspection verdict for #${req.id} (${req.outfitType}): ${suitability}. ${req.physicalInspection.findings}`,
          "ownfabric",
          suitability === "Suitable" ? "✅" : "⚠️",
          { actionTab: "ownfabric" }
        );
      }

      return { success: true, request: req, message: `Physical inspection recorded: ${suitability}` };
    },

    // 6. Stage 6: Design & Price Confirmation (Admin proposes feasible design, charges, ETA)
    // MANDATORY RULE: Only available after physical inspection has been recorded!
    submitDesignPriceProposal: function (id, proposalData) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      if (!req.physicalInspection || !req.physicalInspection.inspected) {
        return { success: false, message: "Physical inspection must be completed before formulating design & charges." };
      }

      if (req.physicalInspection.suitability === "Unsuitable") {
        return { success: false, message: "Fabric was marked unsuitable. Proposing stitching is disallowed until return is processed." };
      }

      const stitching = parseInt(proposalData.stitchingCharge || 1800, 10);
      const lining = parseInt(proposalData.liningCost || 400, 10);
      const total = stitching + lining;

      req.proposal = {
        confirmedDesign: proposalData.confirmedDesign || req.outfitType + " (Princess Cut with 2\" Margins)",
        stitchingCharge: stitching,
        liningCost: lining,
        totalCharges: total,
        estimatedDeliveryDate: proposalData.estimatedDeliveryDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        proposedAt: new Date().toISOString()
      };

      req.status = STATUSES.PROPOSAL_PENDING_APPROVAL;
      req.currentStage = 6;
      req.updatedAt = new Date().toISOString();

      this.saveAll(all);

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          "Own Fabric Proposal Ready",
          `Atelier formulated feasible design '${req.proposal.confirmedDesign}' for ₹${total}. Please review and approve in your dashboard.`,
          "ownfabric",
          "📐",
          { actionTab: "ownfabric" }
        );
      }

      return { success: true, request: req, message: "Design & price proposal sent to client for approval." };
    },

    // 7. Stage 7: Client Approval
    // Client approves design and charges, OR declines and selects return option.
    recordClientApproval: function (id, approved, clientNotes, selectedReturnOption) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      if (approved) {
        req.clientApproval = {
          status: "Approved",
          approvedAt: new Date().toISOString(),
          clientNotes: clientNotes || "Client approved feasible design & charges.",
          selectedReturnOption: null
        };
        req.status = STATUSES.CLIENT_APPROVED;
        req.currentStage = 7;
      } else {
        const retOpt = selectedReturnOption || RETURN_OPTIONS[0];
        req.clientApproval = {
          status: "Declined",
          approvedAt: new Date().toISOString(),
          clientNotes: clientNotes || "Client declined proposal / requested return.",
          selectedReturnOption: retOpt
        };
        req.status = STATUSES.CLIENT_DECLINED;
        req.currentStage = 7;
      }

      req.updatedAt = new Date().toISOString();
      this.saveAll(all);
      return { success: true, request: req, message: approved ? "Proposal approved! Ready for tailor assignment." : "Proposal declined. Return registered." };
    },

    // 8. Stage 8: Tailor Assignment
    // MANDATORY RULE: Never start stitching or assign final production task before inspection and client approval.
    assignTailor: function (id, tailorId, tailorName) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      if (!req.physicalInspection || !req.physicalInspection.inspected) {
        return { success: false, message: "Forbidden: Fabric must undergo physical inspection before tailor assignment." };
      }

      if (!req.clientApproval || req.clientApproval.status !== "Approved") {
        return { success: false, message: "Forbidden: Tailor cannot be assigned before client approves design & stitching charges." };
      }

      req.assignedTailorId = tailorId;
      req.assignedTailorName = tailorName;
      req.assignedAt = new Date().toISOString();
      req.status = STATUSES.ASSIGNED_TO_TAILOR;
      req.currentStage = 8;
      req.updatedAt = new Date().toISOString();

      this.saveAll(all);

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          "Master Tailor Allocated",
          `Your fabric #${req.id} is allocated to Master Couturier ${tailorName}. Production commencing on atelier loom.`,
          "tailor",
          "🪡",
          { actionTab: "ownfabric" }
        );
      }

      return { success: true, request: req, message: `Own Fabric work assigned to Master Tailor ${tailorName}.` };
    },

    // 9. Stage 9: Tailor/Admin Production Updates
    advanceProductionStage: function (id, nextStatus, notes) {
      const all = this.getAllRequests();
      const req = all.find((r) => r.id === id || r.ref === id);
      if (!req) return { success: false, message: "Request not found." };

      if (req.currentStage < 8) {
        return { success: false, message: "Cannot advance production before tailor assignment." };
      }

      req.status = nextStatus || STATUSES.IN_STITCHING;
      req.tailorNotes = notes || req.tailorNotes;
      req.currentStage = 9;
      req.updatedAt = new Date().toISOString();

      this.saveAll(all);

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          `Own Fabric Milestone: ${req.status}`,
          `Master Couturier updated #${req.id}: ${notes || req.status}`,
          "tailor",
          "🪡",
          { actionTab: "ownfabric" }
        );
      }

      return { success: true, request: req, message: `Production stage updated to: ${req.status}` };
    }
  };

  window.vastraeOwnFabricService = vastraeOwnFabricService;
})(typeof window !== "undefined" ? window : this);
