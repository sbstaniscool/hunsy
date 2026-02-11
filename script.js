// --- Main elements ---
const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");
let allGames = [];

// --- Settings elements ---
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");
const showNamesToggle = document.getElementById("showNamesToggle");
const funButton = document.getElementById("funButton");
const themeSelect = document.getElementById("themeSelect");

// --- Theme definitions ---
const themes = {
  purpleBlack: { primary: "#b784ff", secondary: "#e0d7ff", glow: "rgba(183,132,255,0.6)" },
  blueBlack: { primary: "#7fd1ff", secondary: "#cceeff", glow: "rgba(127,209,255,0.6)" },
  redBlack: { primary: "#ff7f7f", secondary: "#ffcccc", glow: "rgba(255,127,127,0.6)" },
  greenBlack: { primary: "#7fff7f", secondary: "#ccffcc", glow: "rgba(127,255,127,0.6)" }
};

let currentTheme = "purpleBlack";

// --- Apply theme colors to all elements ---
function updateThemeColors() {
  const theme = themes[currentTheme];

  document.body.style.background = "#0b0b0b";
  document.body.style.color = theme.secondary;

  document.querySelector(".top h1").style.color = theme.primary;
  document.querySelector("#search").style.color = theme.secondary;
  settingsBtn.style.background = theme.primary;

  // Game cards
  document.querySelectorAll(".game").forEach(card => {
    const nameDiv = card.querySelector(".name");
    if (nameDiv) nameDiv.style.color = theme.secondary;

    card.onmouseover = () => card.style.boxShadow = `0 0 25px ${theme.glow}`;
    card.onmouseout = () => card.style.boxShadow = "none";
  });

  document.querySelector("#settingsPanel h2").style.color = theme.primary;
  document.querySelectorAll("#settingsPanel button").forEach(btn => btn.style.background = theme.primary);

  // If bear Easter egg is showing, update its color
  const bearMsg = document.querySelector("#gameGrid .bear-message");
  if (bearMsg) bearMsg.style.color = theme.primary;
}

// --- Fetch games ---
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data.games;
    render(allGames);
  });

// --- Render grid ---
function render(games) {
  grid.innerHTML = "";

  if (games.length === 0) {
    grid.innerHTML = "<p style='text-align:center;color:#888;'>No games found.</p>";
    return;
  }

  games.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <div class="name">${game.name}</div>
    `;
    div.onclick = () => window.location.href = `play.html?url=${encodeURIComponent(game.url)}`;
    grid.appendChild(div);
  });

  // Apply current theme to new cards
  updateThemeColors();
}

// --- Search + bear Easter egg ---
search.addEventListener("input", () => {
  const q = search.value.toLowerCase();

  if (q === "bear") {
    grid.innerHTML = `
      <div class="bear-message" style="display:flex;justify-content:center;align-items:center;flex-direction:column;">
        <img src="assets/bear.png" style="width:300px;height:auto;margin-top:20px;">
        <div style="font-size:24px;margin-top:10px;">🐻 You found the bear!</div>
      </div>
    `;
    updateThemeColors(); // apply theme color to bear message
    return;
  }

  render(allGames.filter(g => g.name.toLowerCase().includes(q)));
});

// --- Settings panel open/close ---
settingsBtn.addEventListener("click", () => settingsPanel.classList.add("show"));
closeSettings.addEventListener("click", () => settingsPanel.classList.remove("show"));

// --- Show/hide game names ---
showNamesToggle.addEventListener("change", () => {
  document.querySelectorAll(".game .name").forEach(nameDiv => {
    nameDiv.style.display = showNamesToggle.checked ? "block" : "none";
  });
});

// --- Fun Easter egg ---
funButton.addEventListener("click", () => {
  alert("🎉 You found a secret in settings!");
});

// --- Theme selection ---
themeSelect.addEventListener("change", () => {
  currentTheme = themeSelect.value;
  updateThemeColors();
});

// --- Initial theme ---
updateThemeColors();
