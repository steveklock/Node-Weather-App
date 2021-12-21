// console.log("client side javascript file is loaded");

//using fetch to get data from endpoint and parse it into jason data.
// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  //stops form from refreshing the browser
  e.preventDefault();

  //the loading message
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //get the value from the search input
  const location = search.value;

  const url = "/weather?address=" + location;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = "Error";
        messageTwo.textContent = data.error;
      } else {
        //   console.log(data);
        // console.log(data.location);
        // console.log(data.forcast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });

  //log the input value
  console.log(location);
});
