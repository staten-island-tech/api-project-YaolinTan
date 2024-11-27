import "../CSS/style.css";

console.log("Hello World");

const fetchPlayer = async (id) => {
  const url = `https://nba-api-free-data.p.rapidapi.com/nba-player-listing/v1/data?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b547fab545msh1e011958ac061d1p1962dcjsn97b955f29017",
      "x-rapidapi-host": "nba-api-free-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const athlete = await response.json();
      console.log(`Data for player ID ${id}:`, athlete);
    } else {
      console.error(
        `Failed to fetch data for ID ${id}. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
  }
};

for (let i = 1; i <= 30; i++) {
  fetchPlayer(i);
}

responses.forEach((response) => {
  const cardObject = createAthleteCard(response);
  injectCard(cardObject);
});

function createAthleteCard() {
  return {
    age: athlete.age,
    alternateIds: athlete.alternateIds,
    birthPlace: `${athlete.birthPlace.city}, ${athlete.birthPlace.state}, ${athlete.birthPlace.country}`,
    college: athlete.college?.name || "N/A",
    contract: athlete.contract,
    contracts: athlete.contracts,
    dateOfBirth: athlete.dateOfBirth,
    displayHeight: athlete.displayHeight,
    displayName: athlete.displayName,
    displayWeight: athlete.displayWeight,
    experience: athlete.experience?.years || 0,
    firstName: athlete.firstName,
    fullName: athlete.fullName,
    guid: athlete.guid,
    headshot: athlete.headshot?.href || "No Image Available",
    height: athlete.height,
    id: athlete.id,
    injuries: athlete.injuries,
    jersey: athlete.jersey,
    lastName: athlete.lastName,
    links: athlete.links,
    position: athlete.position?.displayName || "Unknown Position",
    shortName: athlete.shortName,
    slug: athlete.slug,
    status: athlete.status?.name || "Unknown Status",
    teams: athlete.teams?.map((team) => team.name).join(", ") || "No Teams",
    uid: athlete.uid,
    weight: athlete.weight,
  };
}

function injectCard(cardObject) {
  const allCards = document.querySelectorAll(".card-container .card");
  const totalCards = allCards.length;

  cardContainer.insertAdjacentHTML(
    "beforeend",
    ` <div class="card" style="border: 4px solid ${
      cardObject.contract?.color || "black"
    }; background-color: ${cardObject.contract?.backgroundColor || "white"};">
      <h2 class="card-header">${cardObject.displayName}</h2>
      <div class="stats" id="cardBirthPlace">
        <h3>Birthplace:</h3>
        <p class="stat">${cardObject.birthPlace}</p>
      </div>
      <div class="stats" id="cardDateOfBirth">
        <h3>Date of Birth:</h3>
        <p class="stat">${cardObject.dateOfBirth}</p>
      </div>
      <div class="stats" id="cardHeight">
        <h3>Height:</h3>
        <p class="stat">${cardObject.displayHeight}</p>
      </div>
      <div class="stats" id="cardWeight">
        <h3>Weight:</h3>
        <p class="stat">${cardObject.displayWeight}</p>
      </div>
      <div class="stats" id="cardCollege">
        <h3>College:</h3>
        <p class="stat">${cardObject.college}</p>
      </div>
      <div class="stats" id="cardExperience">
        <h3>Experience:</h3>
        <p class="stat">${cardObject.experience} years</p>
      </div>
      <div class="stats" id="cardPosition">
        <h3>Position:</h3>
        <p class="stat">${cardObject.position}</p>
      </div>
      <div class="stats" id="cardTeam">
        <h3>Team:</h3>
        <p class="stat">${cardObject.teams}</p>
      </div>
      <div class="stats" id="cardStatus">
        <h3>Status:</h3>
        <p class="stat">${cardObject.status}</p>
      </div>
      ${
        cardObject.headshot !== "No Image Available"
          ? `<img src="${cardObject.headshot}" alt="${cardObject.displayName}" class="img">`
          : ""
      }
    </div>`
  );
  console.log("Number of cards:", totalCards + 1);
}
