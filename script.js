//Global variable
let countries = [];
let stringCountries = '';
let baseUrl = 'https://restcountries.eu/rest/v2/';//countries url
let count = 0;
let divContainer='';
//First load
window.addEventListener('load', () => {
    getDataFromApi(baseUrl + 'all');
})


//Serach all fuction
document.querySelector('.display-all-btn').addEventListener("click", () => {
    getDataFromApi(baseUrl + 'all');
})
//Serach by filter
document.querySelector('.search-btn').addEventListener('click', () => {
    let value = document.getElementById('search-input').value;
    getCountriesByName(value.toLowerCase());
})


//Using dynamic api @return JSON format
getDataFromApi = (url)=> {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            countries = data;
            count = countries.length;
            printCountriesToHtml(countries);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//print HTML elements
 printCountriesToHtml = (countries)=> {
    stringCountries = '';
    let div=document.querySelector('.display__countries--wrapper');
    //clean doem element of countries before show new result search
    var child = div.lastElementChild; 
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }
    //fill with new result set
    for (let i = 0; i < countries.length; i++) {
        addSingleCountry(countries[i]);
        div.appendChild(divContainer);
    }

    //document.querySelector('.display__countries--wrapper').innerHTML = stringCountries;
 
}


addSingleCountry=(country)=> {
    let name, flagImg, currencies, numberOfCitizens;
    let  divDisplayCard,divflagimg,imgFlag,divCountry,header5,divCountries,para1,para2;
    name = country.name;
    flagImg = country.flag;
    numberOfCitizens = country.population;
    currencies = getCurrencies(country);
 
 //build the main country card by element
    divContainer = document.createElement("div");
    divContainer.className = "col-md-6 col-12 ";
    divDisplayCard = document.createElement("div");
    divDisplayCard.className = "displayCard ";
    divflagimg = document.createElement("div");
    divflagimg.className = "flag-img";
    imgFlag = document.createElement("img");
    imgFlag.className = "countrys-flag-image";
    imgFlag.alt = "country's flag image";
    imgFlag.src = flagImg;
    divflagimg.appendChild(imgFlag);
    divCountry = document.createElement("div");
    divCountry.className = "description";
    header5 = document.createElement("h5");
    header5.className = "country-name";
    header5.textContent= name;
    divCountries = document.createElement("div");
    divCountries.className = "country-description";
    para1 = document.createElement("p");
    para1.textContent = currencies;
    para2 = document.createElement("p");
    para2.textContent = "Number of citizens:" +numberOfCitizens.toLocaleString();
    divCountries.appendChild(para1);
    divCountries.appendChild(para2);
    divCountry.appendChild(header5);
    divCountry.appendChild(divCountries);
    divDisplayCard.appendChild(divflagimg);
    divDisplayCard.appendChild(divCountry);
    divContainer.appendChild(divDisplayCard);

  /*  stringCountries +=
        `   
            <div col-md-6 col-12 p-3>
                <div class="displayCard">
                <div class="flag-img">
                    <img src="${flagImg}" alt="country's flag image" class="countrys-flag-image">
                </div>
                <div class="description">
                    <h5 class="country-name">${name}</h5>
                    <div class="country-description">
                    <p>${currencies}<p>
                    <p>Number of citizens: ${numberOfCitizens.toLocaleString()}</p>
                    </div>
                </div>
                </div>
            </div>

        `
*/

}
//Get currency by city
getCurrencies=(countries)=> {
    return (`Currency: ${countries.currencies[0].code} `);
}
//Search by name
getCountriesByName=(value)=> {
    let searchUrl = '';
    if (value !== '') {
        searchUrl = baseUrl + 'name/' + value;
    }
    else {
        searchUrl = baseUrl + 'all';
    }
   
    getDataFromApi(searchUrl);
}



