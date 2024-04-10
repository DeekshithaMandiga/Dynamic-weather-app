const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const clearWeatherData = () => {
    city_name.innerText = '';
    temp_real_val.innerText = '';
    temp_status.innerHTML = '';
    datahide.classList.add('data_hide');
};

const getInfo = async(event) => {
    event.preventDefault();
    
    // Clear previous weather data
    clearWeatherData();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=24113daa624461015278199cf8c9f4ae`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (response.ok) {
                city_name.innerText = `${data.name}, ${data.sys.country}`;
                temp_real_val.innerText = data.main.temp;
                const tempMood = data.weather[0].main;

                // Condition to check sunny or cloudy
                if (tempMood == "Clear") {
                    temp_status.innerHTML =
                        "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                } else if (tempMood == "Clouds") {
                    temp_status.innerHTML =
                        "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (tempMood == "Rain") {
                    temp_status.innerHTML =
                        "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                    temp_status.innerHTML =
                        "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
                }

                datahide.classList.remove('data_hide');
                cityVal = "";
            } else {
                // Handle non-successful response (e.g., invalid city)
                city_name.innerText =  `Please enter a valid city name`;
                datahide.classList.add("data_hide");
            }
        } catch (error) {
            // Handle errors
            city_name.innerText =  `An error occurred. Please try again later.`;
            console.error('Error:', error);
        }
    }
}

submitBtn.addEventListener('click', getInfo);
