import "../CSS/style.css";

console.log("Hello World");

document.querySelector(".button").addEventListener("click", (event) => {
  event.preventDefault();
  removeCards();
  (async () => {
    const allLebrons = await fetchAllLebron();
    console.log("Lebron:", allLebrons);

    if (Array.isArray(allLebrons)) {
      allLebrons.forEach((lebron) => {
        const cardObject = createLebronCard(lebron);
        injectCard(cardObject);
      });
    } else {
      console.error("allLebrons is not an array", allLebrons);
    }
  })();
});

function createLebronCard(athlete) {
  return {
    playerID: athlete.id,
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
    position: "Forward",
    teams: "Los Angles Lakers",
    status: athlete.status?.name || "Unknown Status",
    headshot: "https://a.espncdn.com/i/headshots/nba/players/full/1966.png",
  };
}
const fetchAllLebron = async () => {
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
    if (!response.ok) {
      console.error(
        `Failed to fetch data for Player ID. Status: ${response.status}. Please try again later`
      );
      return null;
    }
    const data = await response.json();
    console.log("Data from API:", data);
    return [data];
  } catch (error) {
    console.error(
      `Error fetching data for Player ID:`,
      error`. Please try again later`
    );
    return null;
  }
};

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
        `Failed to fetch data for ID ${id}. Status: ${response.status}. Please try again later`
      );
      return null;
    }

    const data = await response.json();
    console.log(`Data for Team ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(
      `Error fetching data for ID ${id}:`,
      error`. Please try again later`
    );
    return null;
  }
};

const fetchAllPlayers = async () => {
  const playerPromises = [];

  for (let i = 1; i <= 30; i++) {
    playerPromises.push(fetchPlayer(i));
  }

  const responses = await Promise.all(playerPromises);
  return responses
    .filter((response) => response)
    .flatMap((response) => response.athletes || []);
};

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

function createAthleteCard(athlete) {
  return {
    playerID: athlete.id,
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

function injectCard(cardObject) {
  const cardContainer = document.querySelector(".card-container");

  cardContainer.insertAdjacentHTML(
    "beforeend",
    `
  <div class="theCard border-[0.4rem] border-silver bg-black flex flex-col justify-center items-center box-border text-white m-[3.2rem] p-[.4rem] rounded-[1.5rem] w-[17vw] h-[40rem] hover:scale-[1.2] hover:translate-y-[-3rem] transition-transform duration-500">
    <h2 class="font-bold text-2xl mb-[.4rem]">${cardObject.displayName}</h2>
   <div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Birthplace:</h3>
  <p class="border-none">${cardObject.birthPlace}</p>
  </div>
  <div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Date of Birth:</h3>
  <p class="border-none">${cardObject.dateOfBirth}</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Height:</h3>
  <p class="border-none">${cardObject.displayHeight}</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Weight:</h3>
  <p class="border-none">${cardObject.displayWeight}</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">College:</h3>
  <p class="border-none">${cardObject.college}</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Experience:</h3>
  <p class="border-none">${cardObject.experience} years</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Position:</h3>
  <p class="border-none">${cardObject.position}</p>
</div>
<div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Team:</h3>
  <p class="border-none">${cardObject.teams}</p>
</div>
  <div class="bg-gray-500 flex flex-row justify-center items-center box-content w-[80%]">
  <h3 class="font-bold mr-[.8rem]">Status:</h3>
  <p class="border-none">${cardObject.status}</p>
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
    console.log("All athletes:", allPlayers);
    allPlayers.forEach((player) => {
      const cardObject = createAthleteCard(player);
      injectCard(cardObject);
    });
  })();
}
