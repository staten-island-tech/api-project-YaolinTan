console.log("Hello World");

const fetchPlayer = async (id) => {
  const url = `https://nba-api-free-data.p.rapidapi.com/nba-team-info/v1/data?id=${id}`;
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
