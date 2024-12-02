import "../CSS/style.css";

console.log("Hello World");

// Team ID to Name Mapping
const teamNames = {
  1: "Atlanta Hawks",
  2: "Boston Celtics",
  3: "New Orleans Pelicans",
  4: "Chicago Bulls",
  5: "Cleveland Cavaliers",
  6: "Dallas Mavericks",
  7: "Denver Nuggets",
  8: "Detroit Pistons",
  9: "Golden State Warriors",
  10: "Houston Rockets",
  11: "Indiana Pacers",
  12: "LA Clippers",
  13: "Los Angeles Lakers",
  14: "Miami Heat",
  15: "Milwaukee Bucks",
  16: "Minnesota Timberwolves",
  17: "Brooklyn Nets",
  18: "New York Knicks",
  19: "Orlando Magic",
  20: "Philadelphia 76ers",
  21: "Phoenix Suns",
  22: "Portland Trail Blazers",
  23: "Sacramento Kings",
  24: "San Antonio Spurs",
  25: "Oklahoma City Thunder",
  26: "Utah Jazz",
  27: "Washington Wizards",
  28: "Toronto Raptors",
  29: "Memphis Grizzlies",
  30: "Charlotte Hornets",
};

// Function to fetch player data for a specific team ID
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
    if (!response.ok) {
      console.error(
        `Failed to fetch data for ID ${id}. Status: ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    console.log(`Data for Team ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
    return null;
  }
};

// Function to fetch all players from all teams
const fetchAllPlayers = async () => {
  const playerPromises = Array.from({ length: 30 }, (_, i) =>
    fetchPlayer(i + 1)
  );
  const responses = await Promise.all(playerPromises);

  return responses
    .filter((response) => response) // Remove null responses
    .flatMap((response) => response.athletes || []); // Extract and flatten athlete arrays
};

// Function to extract and map team IDs to their names
function extractTeamName(teamsArray) {
  if (!Array.isArray(teamsArray) || teamsArray.length === 0) return "No Team";

  return teamsArray
    .map((team) => {
      const ref = team.$ref || "";
      const match = ref.match(/teams\/(\d+)/);
      const teamId = match ? parseInt(match[1], 10) : null;
      return teamId
        ? teamNames[teamId] || `Unknown Team (ID: ${teamId})`
        : "Unknown Team";
    })
    .join(", ");
}

// Function to create a card object for each athlete
function createAthleteCard(athlete) {
  return {
    displayName: athlete.displayName || "Unknown Player",
    birthPlace: athlete.birthPlace
      ? [
          athlete.birthPlace.city,
          athlete.birthPlace.state,
          athlete.birthPlace.country,
        ]
          .filter(Boolean)
          .join(", ") || "Unavailable"
      : "Unavailable",
    dateOfBirth: athlete.dateOfBirth || "N/A",
    displayHeight: athlete.displayHeight || "N/A",
    displayWeight: athlete.displayWeight || "N/A",
    college: athlete.college?.name || "N/A",
    experience: athlete.experience?.years || 0,
    position: athlete.position?.displayName || "Unknown Position",
    teams: extractTeamName(athlete.teams),
    status: athlete.status?.name || "Unknown Status",
    headshot: athlete.headshot?.href || "No Image Available",
  };
}

// Function to render the athlete card into the DOM
function injectCard(cardObject) {
  const cardContainer = document.querySelector(".card-container");
  if (!cardContainer) {
    console.error("Card container not found! Check your HTML structure.");
    return;
  }

  cardContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card" style="border: 4px solid black; background-color: white;">
      <h2 class="card-header">${cardObject.displayName}</h2>
      <div class="stats">
        <h3>Birthplace:</h3>
        <p>${cardObject.birthPlace}</p>
      </div>
      <div class="stats">
        <h3>Date of Birth:</h3>
        <p>${cardObject.dateOfBirth}</p>
      </div>
      <div class="stats">
        <h3>Height:</h3>
        <p>${cardObject.displayHeight}</p>
      </div>
      <div class="stats">
        <h3>Weight:</h3>
        <p>${cardObject.displayWeight}</p>
      </div>
      <div class="stats">
        <h3>College:</h3>
        <p>${cardObject.college}</p>
      </div>
      <div class="stats">
        <h3>Experience:</h3>
        <p>${cardObject.experience} years</p>
      </div>
      <div class="stats">
        <h3>Position:</h3>
        <p>${cardObject.position}</p>
      </div>
      <div class="stats">
        <h3>Team:</h3>
        <p>${cardObject.teams}</p>
      </div>
      <div class="stats">
        <h3>Status:</h3>
        <p>${cardObject.status}</p>
      </div>
      ${
        cardObject.headshot !== "No Image Available"
          ? `<img src="${cardObject.headshot}" alt="${cardObject.displayName}" class="img">`
          : ""
      }
    </div>`
  );
}

// Main execution function
(async () => {
  const allPlayers = await fetchAllPlayers();
  allPlayers.forEach((athlete) => {
    const cardObject = createAthleteCard(athlete);
    injectCard(cardObject);
  });
})();
