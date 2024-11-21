import "../CSS/style.css";
console.log("Hello World");

const url =
  "https://basketball-data.p.rapidapi.com/tournament/info?tournamentId=89";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "b547fab545msh1e011958ac061d1p1962dcjsn97b955f29017",
    "x-rapidapi-host": "basketball-data.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
