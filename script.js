// Retrieving the element with the id 
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");

// Retrieve the first element that matches the CSS selector ".list"
let listContainer = document.querySelector(".list");

let date = new Date();
//console.log(date.getTime());// Output the timestamp in milliseconds to the console

//Destructure an array into three variables: timestamp, apiKey, and hashValue
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) { // Function to display words
  input.value = value;// Set the input value to the given value
  removeElements();// Call the removeElements function
}

// Function to remove elements from the list container
function removeElements() {
  listContainer.innerHTML = "";
}

// Add an event listener for keyup event on the input element
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {// If the input value length is less than 4, return false
    return false;
  }

// Construct the URL for the Marvel API request
const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

// Fetch data from the constructed URL
const response = await fetch(url);
const jsonData = await response.json();

// Iterate over the results and create HTML elements for each result
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

// Add a click event listener to the button element
button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {// Check if the input value is blank and show an alert
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";

    // Construct the URL for the Marvel API request
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    // Fetch data from the constructed URL
    const response = await fetch(url);
    const jsonData = await response.json();

    // Iterate over the results and display the character information
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);
window.onload = () => {
  getRsult();
};
