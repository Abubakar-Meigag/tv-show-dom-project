//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

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

// create search bar

function mySearch() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let cardElements = document.getElementsByClassName("newDiv"); 

  let hasResults = false;
  let searchCount = 0;
  
  for (let i = 0; i < cardElements.length; i++) {
    let cardElement = cardElements[i];
      
    let h2Element = cardElement.querySelector("h2");
    let pElement = cardElement.querySelector("span");

    if (
      h2Element.innerHTML.toLowerCase().indexOf(searchInput) > -1 ||
      pElement.innerHTML.toLowerCase().indexOf(searchInput) > -1
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

window.onload = setup;
