const searchBar = document.querySelector("#searchBar");
const submitButton= document.querySelector("#submitButton");
const jsonFile = 'js/cities.json';
import { City } from './model.js';
import axios from 'axios';
//----------------------------------------------------------------------------------------------------------
// LOAD ALL THE POSSIBLE CITY VALUES FOR AUTOCOMPLETE-------------------------------------------------------
fetch(jsonFile)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonFile}`);
    }
    return response.json(); 
  })
  .then(data => {
    
    loadOptions(data);
  })
  .catch(error => {
    console.error(error);
  });

 function loadOptions(data){
  for (let key in data){
    const optionList = document.getElementById('cityList');
  
        
            let option = document.createElement('option');
            option.value = key;
                        optionList.appendChild(option);
          
 }
}

function validateCity(data, cityname){
 if (cityname in data) return true;
 document.querySelector(".alertmessage").classList.remove("invisible");
 return false

}
//----------------------------------------------------------------------------------------------------------
//ADJUST THE VALUE OF THE SEARCHBAR EACH TIME THAT IS CHANGED ----------------------------------------------
searchBar.addEventListener('input', validateInput);
//searchBar.addEventListener('blur', validateInput);

function validateInput(){
  
  const alertbox=document.querySelector(".alertmessage");
  alertbox.classList.add("invisible");
  alertbox.innerHTML="INVALID CITY NAME";
  if (searchBar.value=='') return;
  //CAPITALIZE THE CONTENT OF THE SEARCH BAR TO MATCH THE JSON PROPERTIES
  searchBar.value= searchBar.value[0].toUpperCase() + searchBar.value.substr(1,searchBar.value.length-1)
  for (let i = 1; i < searchBar.value.length; i++) searchBar.value= searchBar.value.substr(0,i)+ searchBar.value[i].toLowerCase() + searchBar.value.substr(i+1,searchBar.value.length-i-1);
    for (let i = 1; i < searchBar.value.length-1; i++){
        //CAPITALIZE ALL FIRST LETTERS IN MULTIPLE-WORD CITIES
        if(searchBar.value[i]==' ' || searchBar.value[i]=='-') searchBar.value=searchBar.value.substr(0,i+1) + searchBar.value[i+1].toUpperCase() + searchBar.value.substr(i+2,searchBar.value.length-2);
        
        }
}
//-------------------------------------------------------------------------------------------------------------

submitButton.addEventListener('click', ()=>{
  fetch(jsonFile)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonFile}`);
    }
    return response.json(); 
  })
  .then(data => {
    
    if(validateCity(data,searchBar.value)) Buffering(data[searchBar.value],searchBar.value);
  })
  .catch(error => {
    console.error(error);
  });
});

//FUNCTION TO ADD SPINNING CIRCLE ANIMATION DURING DATA LOADING
function Buffering(cityname, prettyname){
  document.querySelector(".flexcardcontainer").innerHTML='';
  document.querySelector(".descriptioncontainer").innerHTML='';
  setTimeout(() => {
    
    requestCity(cityname, prettyname);
    document.querySelector("#bufferanimation").classList.add("hidden");
    
  }, 1500);
  document.querySelector("#bufferanimation").classList.remove("hidden");
}

// FUNCTION TO SEND THE REQUEST OF A SPECIFIC CITY AND VISUALIZE THE DATA RECEIVED--------------------------

function requestCity(cityname,prettyname){
  const requesturl=`https://api.teleport.org/api/urban_areas/slug:${cityname}/scores/ `
  document.querySelector(".spacer").classList.add("hidden");
  axios.get(requesturl)
  .then((res)=> {       
    let myCity = new City(prettyname,res.data.teleport_city_score,res.data.summary);
    for (let category of res.data.categories) {
            myCity.addCategory(category.name, category.color, category.score_out_of_10)
          }
    myCity.visualizeCityData();
  })
  .catch((err)=> {
    document.querySelector(".alertmessage").innerHTML=`REQUEST FAILED WITH ERROR ${err}`;
    document.querySelector(".alertmessage").classList.remove("invisible");
  })
}