const searchButton = document.querySelector("[data-search-button]");
const searchInput = document.querySelector("[data-search-input]");
const temperature = document.querySelector("[data-weather-temperature]");
const weatherImage = document.querySelector("[data-weather-image]");
const extraInfo = document.querySelector("[data-extrainfo]");
const weatherBox = document.querySelector("[data-weather-box]");

const APIkey = "0d4239f9b73244fdb58103759242306"; // Replace with your actual API key

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city.toLowerCase()}&days=1&aqi=no&alerts=no`
    );
    const data = await response.json();
    console.log(data);
    temperature.innerHTML = `${parseInt(data.current.temp_c)}<span class="text-2xl inline-block align-top">°</span>`;

    weatherBox.classList.remove("rounded-full");
    weatherBox.classList.add("rounded-lg");

    let newSrc = "";
    switch (data.current.condition.text) {
      case "Sunny":
        newSrc = "images/sunny.png";
        break;
      case "Partly cloudy":
        newSrc = "images/partiallycloudy.png";
        break;
      case "Rain":
        newSrc = "images/rain.png";
        break;
      // Add more cases as needed
      default:
        newSrc = "images/cloudy.png";
    }

    // Hide the image and extra info before loading the new ones
    weatherImage.classList.add("scale-0", "opacity-0");
    weatherImage.classList.remove("scale-100", "opacity-100");
    extraInfo.classList.remove("opacity-100");
    extraInfo.classList.add("opacity-0");

    // Delay the image load to ensure transitions apply
    setTimeout(async () => {
      // Load new image if different from current
      if (weatherImage.src !== newSrc) {
        weatherImage.src = newSrc;

        await new Promise((resolve) => {
          weatherImage.onload = resolve;
        });
      }

      // Show the image with transition
      weatherImage.classList.remove("hidden");
      extraInfo.classList.remove("hidden");

      // Use a timeout to ensure the image is rendered before applying the transition
      setTimeout(() => {
        weatherImage.classList.remove("scale-0", "opacity-0");
        weatherImage.classList.add("scale-100", "opacity-100");
        extraInfo.classList.add("opacity-100");
        extraInfo.classList.remove("opacity-0");
      }, 50);
    }, 200); // Adjust this delay as needed to ensure smooth transitions
  } catch (err) {
    console.log(err);

    weatherBox.classList.remove("rounded-full");
    weatherBox.classList.add("rounded-lg");
    weatherImage.src = "images/error.png";
    temperature.innerHTML = "404 error";
    weatherImage.classList.remove("hidden");
    weatherImage.classList.add("scale-100", "opacity-100");
  }
}

function handleInput() {
  const city = searchInput.value.trim();

  if (city === "") {
    searchButton.disabled = true; // Disable the button
  } else {
    searchButton.disabled = false; // Enable the button
  }
}

// Initial check to disable the button if input is empty on page load
if (searchInput.value.trim() === "") {
  searchButton.disabled = true;
}

// Listen for input event on the search input
searchInput.addEventListener("input", handleInput);

// Handle search button click
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();

  if (city !== "") {
    fetchWeatherData(city);
  }
});

// Handle Enter key press in search input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();

    if (city !== "") {
      fetchWeatherData(city);
    }
  }
});
