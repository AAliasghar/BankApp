'use strict';

// DATA
const account1 = {
  owner: 'Ali Asgharinia',
  movements: [1200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Nazi Pergi',
  movements: [7000, 340, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Sam Rio',
  movements: [2000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Anna Demis',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcomeLogin = document.querySelector('.welcome__login');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const containerNav = document.querySelector('.navbar');
const conatinerLogin = document.querySelector('.login__area');
const containerBalance = document.querySelector('.balance_div');

const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.logout__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnDetails = document.querySelector('.btn_details');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ---Create userNames-----------
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    // looping throught accounts and each account userName is...
    account.userName = account.owner // adding new property useName to object of each account element
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// --- function to display Movements Deposit/Witdraw

const displayMovements = function (account, sort = false) {
  // Empty existing movements
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? account.movements.slice().sort((a, b) => b - a)
    : account.movements;

  // Loop through array of Data received and Display the content in movements class in HTML
  sortedMovements.forEach(function (mov, i) {
    // -Setting type of movement
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
      </div>
      `;
    // Inserting in html class after element tag start so any child element will display after previous one therefore latest stay all top
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(currentAccount)

// Calculating balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, currentBalance) {
    return acc + currentBalance;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// -----Display Summary--------
const calcDisplaySummary = function (account) {
  // Sum_In
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, crr) => acc + crr);
  labelSumIn.textContent = `${income}€`;

  // Sum_Out
  const withdrawal = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, crr) => acc + crr);
  labelSumOut.textContent = `${withdrawal}€`;

  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 0.015) // 1.5% Interest on Deposits
    .reduce((acc, crr) => acc + crr);
  labelSumInterest.textContent = `${interest}€`;
};

// Update UI
const updateUI = function (account) {
  // Display Movements
  displayMovements(account);

  // Display Balance
  calcDisplayBalance(account);

  //Display Summary
  calcDisplaySummary(account);
};

// ----LOGIN_IMPLEMENTATION------

// Account which login will set as current account
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Empty existing conatinerLogin
    conatinerLogin.parentNode.removeChild(conatinerLogin);
    // conatinerLogin.innerHTML = '';
    containerNav.style.opacity = 100;
    containerApp.style.opacity = 100;

    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Update UI
    updateUI(currentAccount);
    // Empty Inputs
    inputLoginUsername.value = inputLoginPin.value = '';
  } else {
    inputLoginPin.value = 'Invalid PIN';
    inputLoginUsername.value = 'Invalid USERNAME';
  }
});

// IMPLEMENT TRANSFER
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  // TO make fileds empty
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log('Transfer Valid');
    console.log(receiverAcc);

    // Update UI
    updateUI(currentAccount);
  }
});

// Close Account

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // find index of userName
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    //  delete account
    // accounts.splice(index, 1);

    inputCloseUsername.value = inputClosePin.value = '';

    //
    // Empty existing conatinerLogin
    document.body.appendChild(conatinerLogin);
    containerApp.parentNode.removeChild(containerApp);
    containerNav.parentNode.removeChild(containerNav);

    console.log(accounts);
  }
});

// REQUEST LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // Loan approval Condition -> If there is at least of deposit with 20% of Loan request amount then
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.2)) {
    // Add Positive movement to UI
    currentAccount.movements.push(amount);
    const html = `<div class ="balance"><p class="loan_approved">${amount}€ Loan Approved</p></div>`;
    containerBalance.insertAdjacentHTML('afterend', html);
    // UPDATE UI
    updateUI(currentAccount);

    // Clear Input Field
    inputLoanAmount.value = '';
  } else {
    const html = `<div class ="balance"><p class="loan_not_approved">Loan Not Approved</p></div>`;
    containerBalance.insertAdjacentHTML('afterend', html);
    inputLoanAmount.value = '';
    updateUI(currentAccount);
  }
});

// SORTING

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
