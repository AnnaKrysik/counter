let submitButton = document.querySelector('#submit');
let clearFields = document.querySelector('#clear-fields');
let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age = document.querySelector('#age');
let activityMinimal = document.querySelector('#activity-minimal');
let activityLow = document.querySelector('#activity-low');
let activityMedium = document.querySelector('#activity-medium');
let activityHigh = document.querySelector('#activity-high');
let activityMaximal = document.querySelector('#activity-maximal');
let genderMale = document.querySelector('#gender-male');
let genderFemale = document.querySelector('#gender-female');
let caloriesNorm = document.querySelector('#calories-norm');
let caloriesMinimal = document.querySelector('#calories-minimal');
let caloriesMaximal = document.querySelector('#calories-maximal');

let radioGroup = document.querySelectorAll('.activity');
let caloryInfoBlock = document.querySelector('.counter__result');
let inputFields = Array.from(document.querySelectorAll('.input-fields'));

inputFields.forEach(function(elem) {
    elem.addEventListener('input', function() {
        if (inputFields.some(elem => elem.value !== "")) {
            clearFields.disabled = false;
        } else {
            clearFields.disabled = true;
        }
        if (inputFields.every(elem => elem.value !== "")) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });
});

clearFields.addEventListener('click', function() {
    radioGroup.forEach(e => { 
        e.checked = false 
    })
    radioGroup[0].checked = true
    clearFields.disabled = true;
    submitButton.disabled = true;
    genderMale.checked = true;
    genderFemale.checked = false;
    inputFields.forEach(elem => {
        elem.value = "";
    })
    caloryInfoBlock.classList.add('counter__result--hidden')
})

submitButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    let caloriesMen = ((10 * weight.value) + (6,25 * height.value) - (5 * age.value) + 5);
    let caloriesWomen = ((10 * weight.value) + (6,25 * height.value) - (5 * age.value) - 161);
    
    let activityCoefficients = 1;

    if (activityMinimal.checked = true){
        activityCoefficients = 1.2;
    } else if (activityLow.checked = true){
        activityCoefficients = 1.375;
    } else if (activityMedium.checked = true){
        activityCoefficients = 1.55;
    } else if (activityHigh.checked = true){
        activityCoefficients = 1.725;
    } else if (activityMaximal.checked = true){
        activityCoefficients = 1.9;
    }

    if (genderMale.checked) {
        caloriesNorm.textContent = caloriesMen * activityCoefficients
    } else {
        caloriesNorm.textContent = caloriesWomen * activityCoefficients
    }
    
    caloriesMinimal.textContent = Math.round(caloriesNorm.textContent * 0.85) 
    caloriesMaximal.textContent = Math.round(caloriesNorm.textContent * 1.15) 
   
    if (caloryInfoBlock.classList.contains('counter__result--hidden')) {
        caloryInfoBlock.classList.remove('counter__result--hidden')
    }
})