import "../CSS/style.css";

console.log("Hello World");

document.addEventListener("DOMContentLoaded", async () => {
  async function fetchLebron() {
    const url =
      "https://nba-api-free-data.p.rapidapi.com/nba-player-info/v1/data?id=1966";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b547fab545msh1e011958ac061d1p1962dcjsn97b955f29017",
        "x-rapidapi-host": "nba-api-free-data.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result); // Check the structure of the result
      return [result]; // Return as an array to match card processing expectations
    } catch (error) {
      console.error(error);
      return []; // Return an empty array if there's an error
    }
  }
  const lebronData = await fetchLebron();
  removeCards();
  lebronData.forEach((player) => {
    const cardObject = createAthleteCard(player);
    injectCard(cardObject);
  });
});

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
  <div class="card border-[0.4rem] border-silver bg-black flex flex-col justify-center items-center box-border text-white m-8 p-4 rounded-[1.5rem] w-[17vw] h-[40rem] hover:scale-[1.2] hover:translate-y-[-3rem] transition-transform duration-500">
    <h2 class="font-bold text-2xl mb-4">${cardObject.displayName}</h2>
   <div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Birthplace:</h3>
  <p class="ml-4">${cardObject.birthPlace}</p>
  </div>
  <div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Date of Birth:</h3>
  <p class="ml-4">${cardObject.dateOfBirth}</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Height:</h3>
  <p class="ml-4">${cardObject.displayHeight}</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Weight:</h3>
  <p class="ml-4">${cardObject.displayWeight}</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">College:</h3>
  <p class="ml-4">${cardObject.college}</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Experience:</h3>
  <p class="ml-4">${cardObject.experience} years</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Position:</h3>
  <p class="ml-4">${cardObject.position}</p>
</div>
<div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Team:</h3>
  <p class="ml-4">${cardObject.teams}</p>
</div>
  <div class="stats mb-2 flex flex-row justify-start items-center">
  <h3 class="font-bold mr-2">Status:</h3>
  <p class="ml-4">${cardObject.status}</p>
</div>
    ${
      cardObject.headshot !== "No Image Available"
        ? `<img src="${cardObject.headshot}" alt="${cardObject.displayName}" class="max-h-[20rem] max-w-[80%] bg-white bg-clip-padding border-[0.1rem] border-red-500 p-4 mt-4 rounded-md">`
        : ""
    }
  </div>
`
  );
}

function removeCards() {
  const cardContainers = document.querySelectorAll(".card-container");
  cardContainers.forEach((container) => (container.innerHTML = ""));
  console.log("Cards removed");
}

const allCards = document.querySelectorAll(".card-container .card");
if (allCards.length === 0) {
  (async () => {
    const allPlayers = await fetchAllPlayers();
    allPlayers.forEach((player) => {
      const cardObject = createAthleteCard(player);
      injectCard(cardObject);
    });
  })();
}

// Update the function to process the returned LeBron object and create a card
