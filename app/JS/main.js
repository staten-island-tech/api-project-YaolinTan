import "../CSS/style.css";
console.log("Hello World");

const URL = "https://stats.nba.com/stats/allstarballotpredictor";

async function getData(URL) {
  console.log("Fetching data...");
  try {
    const response = await fetch(URL);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);

/*async function getData(URL) {
  //fetch returns a promise
  try {
    const response = await fetch(URL);
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
getData();*/
