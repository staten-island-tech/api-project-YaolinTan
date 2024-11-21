import "./style.css";

async function getData() {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://rapidapi.com/api-sports/api/api-nba"
      )}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function getData() {
  //fetch returns a promise
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://rapidapi.com/api-sports/api/api-nba"
      )}`
    );
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector("h1").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    alert("sorry");
  }
}
getData();
