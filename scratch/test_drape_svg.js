// Test drape SVG rendering
const state = {
  previewAngle: "front",
  category: "women",
  components: {
    neckline: "sweetheart",
    sleeves: "full",
    length: "midi",
    fit: "tailored",
    backDesign: "tie_dori"
  },
  fabric: "silk",
  colorHex: "#d95874",
  embroidery: "zari"
};

function renderMannequinLiveDrapeSvg(state) {
  const isBack = state.previewAngle === "back";
  const isSide = state.previewAngle === "side";
  const neck = state.components.neckline || "round";
  const sleeves = state.components.sleeves || "short";
  const length = state.components.length || "midi";
  const emb = state.embroidery || "none";
  const color = state.colorHex || "#d95874";
  
  let svgContent = "";
  if (neck === "sweetheart") {
    svgContent += '<path d="M165 175 C180 195 192 205 200 220 C208 205 220 195 235 175" fill="none" stroke="' + color + '"/>';
  }
  return svgContent;
}

const res = renderMannequinLiveDrapeSvg(state);
console.log("Drape SVG generated successfully, length:", res.length);
