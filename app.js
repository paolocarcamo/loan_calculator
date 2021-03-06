/* Along the same lines as the use of inputs and logic in this program, I can build my program for
spitting out the acitivities I need to make for each event that I'm assigned. */

// Listen for submit button
document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResults);

// Calculate Results Function
function calculateResults(e) {
  console.log('Calculating...');

  // UI Variables
  const amount = document.getElementById('loan-amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years-to-pay');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute the monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Displays the output of the calculations in the disabled inputs
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    // Named funciton for showing the error in case inputs have incorrect values
    showError('Please check your numbers');
  }

  e.preventDefault();
}

// Show Error Function
function showError(error) {
  // Create div for the error
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error Function
function clearError() {
  document.querySelector('.alert').remove();
}
