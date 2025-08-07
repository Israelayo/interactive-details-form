"use strict";
const cardholderInput = document.getElementById("cardholder");
const cardNumberInput = document.getElementById("cardnumber");
const expMonthInput = document.getElementById("exp-month");
const expYearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");

const cardNameDisplay = document.querySelector(".card-name");
const cardNumberDisplay = document.querySelector(".card-number");
const cardExpiryDisplay = document.querySelector(".card-expiry");
const cardCvcDisplay = document.querySelector(".card-cvc");

// Helper for card number formatting
function formatCardNumber(number) {
  // Remove all non-digits, then add spaces every 4 digits
  return number
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// Cardholder Name
cardholderInput.addEventListener("input", function () {
  cardNameDisplay.textContent = cardholderInput.value || "Jane Appleseed";
});

// Card Number
cardNumberInput.addEventListener("input", function () {
  let formatted = formatCardNumber(cardNumberInput.value);
  cardNumberInput.value = formatted; // update input in real time
  cardNumberDisplay.textContent = formatted || "0000 0000 0000 0000";
});

// Expiry Date
function updateExpiry() {
  let mm = expMonthInput.value.padEnd(2, "0");
  let yy = expYearInput.value.padEnd(2, "0");
  if (!expMonthInput.value && !expYearInput.value) {
    cardExpiryDisplay.textContent = "00/00";
  } else {
    cardExpiryDisplay.textContent = `${mm}/${yy}`;
  }
}
expMonthInput.addEventListener("input", updateExpiry);
expYearInput.addEventListener("input", updateExpiry);

// CVC
cvcInput.addEventListener("input", function () {
  cardCvcDisplay.textContent = cvcInput.value || "000";
});

const form = document.getElementById("card-form");
const nameError = cardholderInput.nextElementSibling;
const numberError = cardNumberInput.nextElementSibling;
const expMonthError = expMonthInput.parentElement.nextElementSibling;
const expYearError = expYearInput.parentElement.nextElementSibling;
const cvcError = cvcInput.nextElementSibling;

// Helper: add error styling and message
function showError(input, message) {
  input.classList.add("input-error");
  const error = input.nextElementSibling;
  if (error) error.textContent = message;
}
function clearError(input) {
  input.classList.remove("input-error");
  const error = input.nextElementSibling;
  if (error) error.textContent = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  // Validate Name
  const nameVal = cardholderInput.value.trim();
  if (!nameVal) {
    showError(cardholderInput, "Can't be blank");
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(nameVal)) {
    showError(cardholderInput, "Letters and spaces only");
    valid = false;
  } else {
    clearError(cardholderInput);
  }

  // Validate Number
  const numberVal = cardNumberInput.value.replace(/\s/g, "");
  if (!numberVal) {
    showError(cardNumberInput, "Can't be blank");
    valid = false;
  } else if (!/^\d{16}$/.test(numberVal)) {
    showError(cardNumberInput, "Must be 16 digits");
    valid = false;
  } else {
    clearError(cardNumberInput);
  }

  // Validate Expiry
  const mm = expMonthInput.value;
  const yy = expYearInput.value;
  if (!mm || !yy) {
    showError(expMonthInput, "Can't be blank");
    showError(expYearInput, "Can't be blank");
    valid = false;
  } else if (!/^\d{2}$/.test(mm) || Number(mm) < 1 || Number(mm) > 12) {
    showError(expMonthInput, "Invalid month");
    valid = false;
  } else if (!/^\d{2}$/.test(yy)) {
    showError(expYearInput, "Invalid year");
    valid = false;
  } else {
    clearError(expMonthInput);
    clearError(expYearInput);
  }

  // Validate CVC
  const cvcVal = cvcInput.value;
  if (!cvcVal) {
    showError(cvcInput, "Can't be blank");
    valid = false;
  } else if (!/^\d{3}$/.test(cvcVal)) {
    showError(cvcInput, "Must be 3 digits");
    valid = false;
  } else {
    clearError(cvcInput);
  }

  // If all valid, show thank you state
  if (valid) {
    form.classList.add("hidden");
    document.getElementById("thank-you").classList.remove("hidden");
  }
});

const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", function () {
  // Reset form fields
  form.reset();

  // Reset card preview to defaults
  cardNameDisplay.textContent = "Jane Appleseed";
  cardNumberDisplay.textContent = "0000 0000 0000 0000";
  cardExpiryDisplay.textContent = "00/00";
  cardCvcDisplay.textContent = "000";

  // Hide thank you, show form
  document.getElementById("thank-you").classList.add("hidden");
  form.classList.remove("hidden");
});
