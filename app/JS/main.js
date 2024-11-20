import "../CSS/style.css";
console.log("Hello World");

async function getData(URL) {
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
getData("https://api-nba-v1.p.rapidapi.com/seasons/");
