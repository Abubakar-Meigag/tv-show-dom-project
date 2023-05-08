//You can edit ALL of the code here
let allEpisodes = getAllEpisodes();

function setup() {
  // call API fetch store respones in allEpisodes array 
  // remove line 7 
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// create all episodes level 100

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s) All this data is from TVMaze.com`;

  //my code

  // create all div episodes

  let allEp = document.getElementById("allEp");

  episodeList.map((el) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.classList.add("newDiv");

    episodeDiv.innerHTML = `
    <h2>${el.name} - S${el.season.toString().padStart(2, "0")}E${el.number
      .toString()
      .padStart(2, "0")}</h2>
    <img src="${el.image.medium}">
    <span>${el.summary}</span>
    `;

    allEp.appendChild(episodeDiv);
  });
}

window.onload = setup;


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
  selector.innerHTML = `<option value="Please choose episode">Please choose episode</option>`;

  allEpisodes.forEach((el) => {
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

    episodes.forEach((episode) => {
      let h2Element = episode.querySelector("h2");

      // if (h2Element.innerHTML.indexOf(selected) > -1)

        if (h2Element.innerHTML.includes(selected)) {
          episode.style.display = "block";
        } else {
          episode.style.display = "none";
        }
    });
  });
}

episodeSelector();

