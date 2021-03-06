console.log("Client side javascript file is loaded!");

const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const gps = document.querySelector("#gps");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);

  messageOne.textContent = "Loading .....";
  messageTwo.textContent = "";

  const url = "/weather?address=" + search.value;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
gps.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("GPS not Supported in your browser!!");
  }
  navigator.geolocation.getCurrentPosition((posistion) => {
    fetch(
      `/w?lat=${posistion.coords.latitude}&long=${posistion.coords.longitude}`
    ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          console.log(data.location);
          console.log(data.forecast);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  });
});
