const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");
let allGames = [];

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data.games;
    render(allGames);
  });

function render(games) {
  grid.innerHTML = "";
  games.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `
      <img src="${game.image}">
      <div class="name">${game.name}</div>
    `;
    div.onclick = () => {
      window.location.href =
        `play.html?url=${encodeURIComponent(game.url)}`;
    };
    grid.appendChild(div);
  });
}

search.addEventListener("input", () => {
  const q = search.value.toLowerCase();
  render(allGames.filter(g => g.name.toLowerCase().includes(q)));
});

