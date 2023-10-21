const searchBar = document.querySelector("#searchBar");
const submitButton= document.querySelector("#submitButton");
const jsonFile = 'js/cities.json';

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
  for (key in data){
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
searchBar.addEventListener('input',()=>{
  document.querySelector(".alertmessage").classList.add("invisible");
  if (searchBar.value=='') return;
  //CAPITALIZE THE CONTENT OF THE SEARCH BAR TO MATCH THE JSON PROPERTIES
  searchBar.value= searchBar.value[0].toUpperCase() + searchBar.value.substr(1,searchBar.value.length-1)
  if (searchBar.value.includes(' ') || searchBar.value.includes('-')){
    for (let i = 0; i < searchBar.value.length-1; i++){
        //CAPITALIZE ALL FIRST LETTERS IN MULTIPLE-WORD CITIES
        if(searchBar.value[i]==' ' || searchBar.value[i]=='-') searchBar.value=searchBar.value.substr(0,i+1) + searchBar.value[i+1].toUpperCase() + searchBar.value.substr(i+2,searchBar.value.length-2);

        }
      
  }

});
submitButton.addEventListener('click', ()=>{
  fetch(jsonFile)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonFile}`);
    }
    return response.json(); 
  })
  .then(data => {
    
    validateCity(data,searchBar.value);
  })
  .catch(error => {
    console.error(error);
  });
});