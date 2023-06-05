let allEpisodes = getAllEpisodes();

function setup() {}

window.onload = setup;

// create all showList in the select bar level 400

let allMoves = getAllShows();
// console.log(typeof allEpisodes);

let movesList = document.getElementById("moves-bar");
movesList.innerHTML = `<option value="all-show">Please choose Show</option>`;

// sort all shows from A to Z
allMoves.sort(function (y, z) {
  return y.name.localeCompare(z.name);
});

// create all episodes level 100

let allEp = document.getElementById("allEp");

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s) All this data is from TVMaze.com`;

  //my code

  // create container div to hold all episodes

  episodeList.map((el) => {
    // create div for each episode and give class div
    let episodeDiv = document.createElement("div");
    episodeDiv.classList.add("newDiv");

    if (el.image) {
      episodeDiv.innerHTML = `
    <h2> S${el.season.toString().padStart(2, "0")}E${el.number
        .toString()
        .padStart(2, "0")} - ${el.name} </h2>
    <img src="${el.image.medium}">
    <span>${el.summary}</span>
    `;
    } else {
      episodeDiv.innerHTML = `
    <h2> S${el.season.toString().padStart(2, "0")}E${el.number
        .toString()
        .padStart(2, "0")} - ${el.name} </h2>
    <span>${el.summary}</span>
    `;
    }

    allEp.appendChild(episodeDiv);
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

function episodeSelector() {
  let selector = document.getElementById("select");
  selector.innerHTML = `<option value="All">Please choose episode</option>`;

  allEpisodes.forEach((episode) => {
    let opt = document.createElement("option");
    opt.value = episode.name;
    opt.text = `S${episode.season.toString().padStart(2, "0")}E${episode.number
      .toString()
      .padStart(2, "0")} - ${episode.name}`;

    selector.appendChild(opt);
  });

  selector.addEventListener("change", selectCreator);

  function selectCreator() {
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
  }
}

episodeSelector();

// level 400

//===== ** fetch for level 400 **

function allMovesShow() {
  allMoves.forEach((element) => {
    let moveOption = document.createElement("option");
    moveOption.innerText = element.name;

    movesList.appendChild(moveOption);
  });
}
allMovesShow();

// let allMyData;

movesList.addEventListener("change", function () {
  let moveSelector = movesList.value;
  let selectedMove = allMoves.filter((Show) => moveSelector == Show.name);
  allEp.innerHTML = "";
  let ShowId = selectedMove[0].id;
  allEp.classList.add("allEp");

  fetch(`https://api.tvmaze.com/shows/${ShowId}/episodes`)
    .then((res) => {
      if (res && res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      // console.log("here is are", data);
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      episodeSelector(allEpisodes);
    })
    .catch((error) => {
      console.log(`some thing wrong:`, error);
      throw error;
    });
});

// level 500

// let allMakeAllShow = document.getElementById("all-shows");

function makeAllShows() {
  allMoves.map((el) => {
    let showsDiv = document.createElement("div");
    showsDiv.classList.add("div-shows");
    allEp.classList.remove("allEp");

    if (el.image) {
      showsDiv.innerHTML = `
    <h2 class="h2Click" data-show-id="${el.id}">${el.name}</h2>
    <div class="inside-div">
    <img src="${el.image.medium}" id="img-click" data-show-id="${el.id}"/>
    <span>${el.summary}</span>
    <div class="rating">
    <ul>
    <li>Rated: ${el.rating.average}</>
    <li>Genres: ${el.genres}</>
    <li>Status: ${el.status}</>
    <li>Runtime: ${el.runtime}</>
    </ul>
    </div>
    </div>
    `;
    } else {
      showsDiv.innerHTML = `
    <h2 class="h2Click" data-show-id="${el.id}">${el.name}</h2>
    <div class="inside-div">
    <span>${el.summary}</span>
    <div class="rating">
    <ul>
    <li>Rated: ${el.rating.average}</>
    <li>Genres: ${el.genres}</>
    <li>Status: ${el.status}</>
    <li>Runtime: ${el.runtime}</>
    </ul>
    </div>
    </div>
    `;
    }

    allEp.appendChild(showsDiv);
  });
}

makeAllShows();

// img and title  clickable 

const img = document.querySelectorAll("#img-click");

img.forEach((ele) => {
  ele.addEventListener("click", function (event) {
    console.log(event.target.getAttribute("data-show-id"));
    console.log();
    let imgTarget = event.target.getAttribute("data-show-id");

    let selectedImg = allMoves.filter((Show) => imgTarget == Show.id);
    allEp.innerHTML = "";
    let ShowId = selectedImg[0].id;
    allEp.classList.add("allEp");

    fetch(`https://api.tvmaze.com/shows/${ShowId}/episodes`)
      .then((res) => {
        if (res && res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
        episodeSelector(allEpisodes);
        // episodesSearch(allEpisodes);
      })
      .catch((error) => {
        console.log(`some thing wrong:`, error);
        throw error;
      });
  });
});

const h2Target = document.querySelectorAll(".h2Click");

h2Target.forEach((el) => {
  el.addEventListener("click", function (event) {
    let h2Clicked = event.target.getAttribute("data-show-id");

    let selectedH2 = allMoves.filter((show) => h2Clicked == show.id);
    allEp.innerHTML = "";
    let showId = selectedH2[0].id;
    allEp.classList.add("allEp");

    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((res) => {
        if (res && res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
        episodeSelector(allEpisodes);
        // episodesSearch(allEpisodes);
      })
      .catch((error) => {
        console.log(`some thing wrong:`, error);
        throw error;
      });
  });
});

// all show button

const btnAllShow = document.getElementById("shows-btn");

btnAllShow.addEventListener("click", function () {
  allEp.innerHTML=""
  return makeAllShows();
});

// searchForShow

// function searchForShow(){
//     let searchInput = document.getElementById("forShow").value.toLowerCase();
//     console.log(searchInput, ' hi');
//     let cardElements = document.getElementsByClassName("div-shows");

//     let hasResults = false;
//     let searchCount = 0;

//     for (let i = 0; i < cardElements.length; i++) {
//       let cardElement = cardElements[i];

//       let h2Element = cardElement.querySelector("h2");
//       // let pElement = cardElement.querySelector("span");

//       // if (
//       //   h2Element.innerHTML.toLowerCase().indexOf(searchInput) > -1 ||
//       //   pElement.innerHTML.toLowerCase().indexOf(searchInput) > -1
//       // )

//       if (
//         h2Element.innerHTML.toLowerCase().includes(searchInput)
//         // || pElement.innerHTML.toLowerCase().includes(searchInput)
//       ) {
//         cardElement.classList.remove("hide");
//         hasResults = true;
//         searchCount += 1;
//       } else {
//         cardElement.classList.add("hide");
//       }
//     }

//     let searchDiv = document.getElementById("search-count");
//     searchDiv.innerText = `Display ${searchCount} / 73 episodes`;

//     if (!hasResults) {
//       document.getElementById("no-result").style.display = "block";
//     } else {
//       document.getElementById("no-result").style.display = "none";
//     }
// }
