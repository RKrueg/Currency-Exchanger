import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConversionService from './conversion-service';

// Business Logic

function getCurrency(userAmount) {
  let promise = ConversionService.getCurrency(userAmount);
  promise.then(function(currencyDataArray) {
    printElements(currencyDataArray);
  }, function(errorArray) {
    console.log(errorArray);
    printError(errorArray);
  });
}

// UI Logic

function printElements(data) {
  let userSelection = document.querySelector("#selection").value;
  const calcAmount = data[1] * data[0].conversion_rates[userSelection];
  document.querySelector('#showResponse').innerText = `The converted amount from ${data[1]} USD is equal to ${calcAmount} ${userSelection}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const userAmount = document.querySelector('#currency').value;
  document.querySelector('#currency').value = null;
  getCurrency(userAmount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});