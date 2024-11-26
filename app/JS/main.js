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
      const atheletes = await response.json();
      console.log(`Data for player ID ${id}:`, atheletes);
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

atheletes.forEach(athelete);

function createAthleteCard(athlete) {
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
