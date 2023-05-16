// let allEpisodes;

// function setup() {
//   //  allEpisodes = fetchLink();
//   // const allEpisodes = getAllEpisodes();
//   // makePageForEpisodes(allEpisodes);
// }

// window.onload = setup;

//===== ** fetch for level 400 **
// create all showList in the select bar level 400

let movesList = document.getElementById("moves-bar");
movesList.innerHTML = `<option value="all-show">Please choose Show</option>`;

let allMoves = getAllShows();

// sort all shows from A to Z 

allMoves.sort(function (y, z) {
  return y.name.localeCompare(z.name);
});


function allMovesShow() {
  allMoves.forEach((ele) => {
    let moveOption = document.createElement("option");
    moveOption.innerText = ele.name;

    movesList.appendChild(moveOption);
  });
}
allMovesShow();

movesList.addEventListener("change", selectMoves)

function selectMoves() {
  let moveSelector = movesList.value;
  let selectedMove = allMoves.filter(
    (oneShow) => moveSelector === oneShow.name);
  
  let selectedShowId = selectedMove[0].id;

  fetch(`https://api.tvmaze.com/shows/${selectedShowId}/episodes`)
      .then((res) => res.json())
      .then((data) => {
        makePageForEpisodes(data);
        episodeSelector(data);
      })
      .catch((error) => console.log(`some thing wrong:`, error));
  
};

// create all episodes level 100

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s) All this data is from TVMaze.com`;

  //my code

  // create container div to hold all episodes
  let allEp = document.getElementById("allEp");

  episodeList.map((el) => {
    // create div for each episode and give class div
    let episodeDiv = document.createElement("div");
    episodeDiv.classList.add("newDiv");

    // create elements h2, img and span for episodes article
    episodeDiv.innerHTML = `
    <h2> S${el.season.toString().padStart(2, "0")}E${el.number
      .toString()
      .padStart(2, "0")} - ${el.name} </h2>
    <img src="${el.image.medium}">
    <span>${el.summary}</span>
    `;
    // add episodes as card to container div
    allEp.appendChild(episodeDiv);
    rootElem.appendChild(allEp);
  });
}

// create search bar level 200

function episodesSearch() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let cardElements = document.getElementsByClassName("newDiv");

  let hasResults = false;
  let searchCount = 0;

  for (let i = 0; i < cardElements.length; i++) {
    let cardElement = cardElements[i];

    let h2Element = cardElement.querySelector("h2");
    let pElement = cardElement.querySelector("span");

    // if (
    //   h2Element.innerHTML.toLowerCase().indexOf(searchInput) > -1 ||
    //   pElement.innerHTML.toLowerCase().indexOf(searchInput) > -1
    // )

    if (
      h2Element.innerHTML.toLowerCase().includes(searchInput) ||
      pElement.innerHTML.toLowerCase().includes(searchInput)
    ) {
      cardElement.classList.remove("hide");
      hasResults = true;
      searchCount += 1;
    } else {
      cardElement.classList.add("hide");
    }
  }

  let searchDiv = document.getElementById("search-count");
  searchDiv.innerText = `Display ${searchCount} / 73 episodes`;

  if (!hasResults) {
    document.getElementById("no-result").style.display = "block";
  } else {
    document.getElementById("no-result").style.display = "none";
  }
}

// create Episode Selector level 300

function episodeSelector(allEpisodes) {
  let selector = document.getElementById("select");
  selector.innerHTML = `<option value="All">Please choose episode</option>`;

  allEpisodes.forEach((el) => {
    console.log(el);
    let options = document.createElement("option");
    options.value = el.name;
    options.text = `S${el.season.toString().padStart(2, "0")}E${el.number
      .toString()
      .padStart(2, "0")} - ${el.name}`;

    selector.appendChild(options);
  });

  selector.addEventListener("change", function () {
    let selected = selector.value;
    let episodes = Array.from(document.getElementsByClassName("newDiv"));

    episodes.filter((episode) => {
      let h2Element = episode.querySelector("h2");

      if (selected === "All" || h2Element.innerHTML.includes(selected)) {
        episode.classList.remove("hide");
      } else {
        episode.classList.add("hide");
      }
    });
  });
}


episodeSelector();

