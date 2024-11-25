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
      const data = await response.json();
      console.log(`Data for player ID ${id}:`, data);
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
