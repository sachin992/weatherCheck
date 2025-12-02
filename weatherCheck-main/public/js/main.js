// const cityName = document.getElementById('cityName');
// const submitBtn = document.getElementById('submitBtn');

// const city_name = document.getElementById('city_name');
// const temp_real_val = document.getElementById('temp_real_val');
// const temp_status = document.getElementById('temp_status');
// const datahide = document.querySelector('.middle_layer');

// const getInfo = async(event) => {
//     event.preventDefault(); //this will remove loading of page & redirecting when submit button is clicked

//     let cityVal = cityName.value;

//     //handles search without entering city_name
//     if(cityVal === ""){
//         city_name.innerText = `Please Enter City Name`;
//         datahide.classList.add("data_hide");
//     }else{

//             //handles different cases with city name
//         try{
           
//             //add your weather map api here
//             let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid= Enter your api key here`
//             const response = await fetch(url);

//             const data = await response.json();
//             const arrData = [data];

//             city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
//             temp_real_val.innerText = arrData[0].main.temp;
//             const tempMood = arrData[0].weather[0].main;
//             console.log(tempMood);

//             //condition to check sunny or cloudy
//             if (tempMood == "Clear") {
//             temp_status.innerHTML =
//                 "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
//             } else if (tempMood == "Clouds") {
//             temp_status.innerHTML =
//                 "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
//             } else if (tempMood == "Rain") {
//             temp_status.innerHTML =
//                 "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
//             } else {
//             temp_status.innerHTML =
//                 "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

//             }
//             datahide.classList.remove('data_hide');
//             cityVal = "";
           
       
//         }catch{
//             cityVal = " ";
//             datahide.classList.add("data_hide");
//             city_name.innerText =  `please enter correct city name! `;
//             console.log('please enter correct city name');
//         }
        
//     }
// }

// submitBtn.addEventListener('click', getInfo);


const cityName = document.getElementById('cityName');
const tempForm = document.querySelector('.temp_form');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault(); // prevents page reload

    let cityVal = cityName.value.trim();

    if(cityVal === ""){
        city_name.innerText = `❗ Please Enter City Name`;
        datahide.classList.add("data_hide");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=api_key`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.cod != 200){
            city_name.innerText = `🔍 City not found!`;
            datahide.classList.add("data_hide");
            return;
        }

        city_name.innerText = `${data.name}, ${data.sys.country}`;
        temp_real_val.innerText = data.main.temp;
        const tempMood = data.weather[0].main;

        if (tempMood === "Clear") temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        else if (tempMood === "Clouds") temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        else if (tempMood === "Rain") temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
        else temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";

        datahide.classList.remove("data_hide");
        cityName.value = ""; // clear input after search

    } catch(err){
        city_name.innerText = `⚠ API Error or No Internet!`;
        datahide.classList.add("data_hide");
        console.log(err);
    }
}

// Attach listener to form submit, NOT button click
tempForm.addEventListener('submit', getInfo);
