//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  //my code

  let allEp = document.getElementById("allEp");

  for (let list of episodeList) {
    let episodeDiv = document.createElement("div");
    episodeDiv.classList.add("newDiv");
    // let title = document.createElement("h2");
    // let img = document.createElement("img");
    // let p = document.createElement("p");

    episodeDiv.innerHTML = `
      <h2>${list.name} - S${list.season
      .toString()
      .padStart(2, "0")}E${list.number.toString().padStart(2, "0")}</h2>
      <img src="${list.image.medium}">
      <p>${list.summary}</p>
    `;

    // let title = episodeDiv.querySelector('h2');
    // let img = episodeDiv.querySelector('img');
    // let p = episodeDiv.querySelector('p');

    // title.innerHTML = `${list.name} - S${list.season
    //   .toString()
    //   .padStart(2, "0")}E${list.number.toString().padStart(2, "0")}`;
    // img.src = list.image.medium;
    // p = list.summary;

    allEp.appendChild(episodeDiv);
  }
}

window.onload = setup;
