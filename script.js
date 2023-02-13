//todo: exception handling for decimal numbers when entering 'Number of people' input.
//todo: exception handling for when 0 is entered for 'Number of people' input. Add indication 'Can't be zero' and change border color of input field to red. 
const reset = document.getElementById("reset-button");
const customTip = document.getElementById("custom-tip");
const billInput = document.getElementById("price-amount");
const tipButton5 = document.getElementById("tip-button5");
const tipButton10 = document.getElementById("tip-button10");
const tipButton15 = document.getElementById("tip-button15");
const tipButton25 = document.getElementById("tip-button25");
const tipButton50 = document.getElementById("tip-button50");
const peopleAmount = document.getElementById("people-amount");
var tipAmount = document.getElementById("tip-per-person");
var totalAmount = document.getElementById("total-per-person");
const htmlElementArray = [tipButton5, tipButton10, tipButton15, tipButton25, tipButton50];
//* innerHTML --> String numbers --> Integers
const percent5 = parseInt(tipButton5.innerHTML.replace("%", ''))/100;
const percent10 = parseInt(tipButton10.innerHTML.replace("%", ''))/100;
const percent15 = parseInt(tipButton15.innerHTML.replace("%", ''))/100;
const percent25 = parseInt(tipButton25.innerHTML.replace("%", ''))/100;
const percent50 = parseInt(tipButton50.innerHTML.replace("%", ''))/100;

function gettingBillInput(){    
    var userPrice = parseFloat(billInput.value); 
    return userPrice
}
//* gets the amount of people in attendance. rounds down decimal numbers because you cannot have portions of a person. 
//* ex: 1.9 people is inaccurate but 1 person is 
function gettingPeopleAmount(){
    var numOfPPL = Math.floor(parseInt(peopleAmount.value));
    return numOfPPL
}
//* Takes in percentage value and returns the amount each person should pay for the tip
function calcTip(percentage){
   var calculatedTip = ((gettingBillInput() * percentage)/gettingPeopleAmount()).toFixed(2);
   return calculatedTip
}
//* Takes in percentage value and returns the total amount for each person to pay (including tip)
function calcTotal(percentage){
   var calculatedTotal = ((gettingBillInput()/gettingPeopleAmount()) + ((gettingBillInput() * percentage)/gettingPeopleAmount())).toFixed(2);
   return calculatedTotal 
}
//* displays the amount for the tip/person and total/person paragraph fields
function display(percentage){
    tipAmount.innerHTML = "$" + calcTip(percentage);
    totalAmount.innerHTML = "$" + calcTotal(percentage);
}

//* resetButton
reset.addEventListener('click', () => {
    tipAmount.innerHTML = "$0.00";
    totalAmount.innerHTML = "$0.00";
    customTip.value = '';
    billInput.value = '';
    peopleAmount.value = '';
});
//* custom%
customTip.addEventListener('keydown', e => {
   if(e.keyCode === 13){
        parseInt(customTip);
        var userTip = (parseInt(customTip.value)/100);
        display(userTip);
   } 
});
//* tip% buttons 5-50
htmlElementArray.map((element) => {
    element.addEventListener('click', () => {
        switch(element.innerHTML.replace('%', '')){
            case '5': display(percent5); break;
            case '10': display(percent10); break;
            case '15': display(percent15); break;
            case '25': display(percent25); break;
            case '50': display(percent50); break;
        }
    })
});