/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("const searchBar = document.querySelector(\"#searchBar\");\r\nconst submitButton= document.querySelector(\"#submitButton\");\r\nconst jsonFile = 'js/cities.json';\r\n\r\n\r\n//----------------------------------------------------------------------------------------------------------\r\n// LOAD ALL THE POSSIBLE CITY VALUES FOR AUTOCOMPLETE-------------------------------------------------------\r\nfetch(jsonFile)\r\n  .then(response => {\r\n    if (!response.ok) {\r\n      throw new Error(`Failed to fetch ${jsonFile}`);\r\n    }\r\n    return response.json(); \r\n  })\r\n  .then(data => {\r\n    \r\n    loadOptions(data);\r\n  })\r\n  .catch(error => {\r\n    console.error(error);\r\n  });\r\n\r\n function loadOptions(data){\r\n  for (key in data){\r\n    const optionList = document.getElementById('cityList');\r\n  \r\n        \r\n            let option = document.createElement('option');\r\n            option.value = key;\r\n                        optionList.appendChild(option);\r\n          \r\n }\r\n}\r\n\r\nfunction validateCity(data, cityname){\r\n if (cityname in data) return true;\r\n document.querySelector(\".alertmessage\").classList.remove(\"invisible\");\r\n return false\r\n\r\n}\r\n//----------------------------------------------------------------------------------------------------------\r\n//ADJUST THE VALUE OF THE SEARCHBAR EACH TIME THAT IS CHANGED ----------------------------------------------\r\nsearchBar.addEventListener('input', validateInput);\r\n//searchBar.addEventListener('blur', validateInput);\r\n\r\nfunction validateInput(){\r\n  \r\n  const alertbox=document.querySelector(\".alertmessage\");\r\n  alertbox.classList.add(\"invisible\");\r\n  alertbox.innerHTML=\"INVALID CITY NAME\";\r\n  if (searchBar.value=='') return;\r\n  //CAPITALIZE THE CONTENT OF THE SEARCH BAR TO MATCH THE JSON PROPERTIES\r\n  searchBar.value= searchBar.value[0].toUpperCase() + searchBar.value.substr(1,searchBar.value.length-1)\r\n  for (let i = 1; i < searchBar.value.length; i++) searchBar.value= searchBar.value.substr(0,i)+ searchBar.value[i].toLowerCase() + searchBar.value.substr(i+1,searchBar.value.length-i-1);\r\n    for (let i = 1; i < searchBar.value.length-1; i++){\r\n        //CAPITALIZE ALL FIRST LETTERS IN MULTIPLE-WORD CITIES\r\n        if(searchBar.value[i]==' ' || searchBar.value[i]=='-') searchBar.value=searchBar.value.substr(0,i+1) + searchBar.value[i+1].toUpperCase() + searchBar.value.substr(i+2,searchBar.value.length-2);\r\n        \r\n        }\r\n}\r\n//-------------------------------------------------------------------------------------------------------------\r\n\r\nsubmitButton.addEventListener('click', ()=>{\r\n  fetch(jsonFile)\r\n  .then(response => {\r\n    if (!response.ok) {\r\n      throw new Error(`Failed to fetch ${jsonFile}`);\r\n    }\r\n    return response.json(); \r\n  })\r\n  .then(data => {\r\n    \r\n    if(validateCity(data,searchBar.value)) Buffering(data[searchBar.value],searchBar.value);\r\n  })\r\n  .catch(error => {\r\n    console.error(error);\r\n  });\r\n});\r\n\r\n//FUNCTION TO ADD SPINNING CIRCLE ANIMATION DURING DATA LOADING\r\nfunction Buffering(cityname, prettyname){\r\n  document.querySelector(\".flexcardcontainer\").innerHTML='';\r\n  document.querySelector(\".descriptioncontainer\").innerHTML='';\r\n  setTimeout(() => {\r\n    \r\n    requestCity(cityname, prettyname);\r\n    document.querySelector(\"#bufferanimation\").classList.add(\"hidden\");\r\n    \r\n  }, 1500);\r\n  document.querySelector(\"#bufferanimation\").classList.remove(\"hidden\");\r\n}\r\n\r\n// FUNCTION TO SEND THE REQUEST OF A SPECIFIC CITY AND VISUALIZE THE DATA RECEIVED--------------------------\r\n\r\nfunction requestCity(cityname,prettyname){\r\n  const requesturl=`https://api.teleport.org/api/urban_areas/slug:${cityname}/scores/ `\r\n  document.querySelector(\".spacer\").classList.add(\"hidden\");\r\n  let xhr = new XMLHttpRequest();\r\n  xhr.open(\"GET\", requesturl, true);\r\n  xhr.onreadystatechange = function () {\r\n    if (xhr.readyState === 4 && xhr.status === 200) {\r\n          let jsonResponse = JSON.parse(xhr.responseText);  \r\n             \r\n          let myCity = new City(prettyname,jsonResponse.teleport_city_score,jsonResponse.summary);\r\n          for (let category of jsonResponse.categories) {\r\n            myCity.addCategory(category.name, category.color, category.score_out_of_10)\r\n          }\r\n          myCity.visualizeCityData();\r\n          \r\n          \r\n          \r\n\r\n\r\n\r\n\r\n\r\n    } else if (xhr.readyState === 4) {\r\n      document.querySelector(\".alertmessage\").innerHTML=`REQUEST FAILED WITH STATUS ${xhr.status}`\r\n      \r\n    }\r\n};\r\nxhr.send();\r\n\r\n}\n\n//# sourceURL=webpack://city_score/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"]();
/******/ 	
/******/ })()
;