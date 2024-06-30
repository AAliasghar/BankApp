'use strict';

// DATA
const account1 = {
  owner: 'Ali Asgharinia',
  movements: [1200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-29T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-02-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2024-01-27T17:01:17.194Z',
    '2024-02-01T23:36:17.929Z',
    '2024-02-03T10:51:36.790Z',
  ],
  locale: 'de-DE',
  currency: 'EUR',
};

const account2 = {
  owner: 'Nazi Pergi',
  movements: [7000, 340, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-24T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-07-25T18:49:59.371Z',
    '2023-08-26T12:01:20.894Z',
  ],
  locale: 'de-DE',
  currency: 'EUR',
};

const account3 = {
  owner: 'Sam Rio',
  movements: [2000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  locale: 'pt-PT',
  currency: 'EUR',
};

const account4 = {
  owner: 'Anna Demis',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-10-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-03-05T16:33:06.386Z',
    '2023-07-10T14:43:26.374Z',
    '2023-08-25T18:49:59.371Z',
    '2023-09-26T12:01:20.894Z',
  ],
  locale: 'en-US',
  currency: 'USD',
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

// Calculate current date and Movement Date
const calcMovementsDate = function (date, locale) {
  const calcPassedDays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcPassedDays(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// Format Currency
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

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

    // Dates
    const date = new Date(account.movementsDates[i]);

    const displayDate = calcMovementsDate(date, account.locale);
    // Currency format
    const formatCurrencyMovemenets = formatCurrency(
      mov,
      account.locale,
      account.currency
    );

    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCurrencyMovemenets}</div>
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
  const formattedBalance = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
  labelBalance.textContent = `${formattedBalance}`;
};

// -----Display Summary--------
const calcDisplaySummary = function (account) {
  // Sum_In
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, crr) => acc + crr);
  const formattedIncome = formatCurrency(
    income,
    account.locale,
    account.currency
  );
  labelSumIn.textContent = `${formattedIncome}`;

  // Sum_Out
  const withdrawal = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, crr) => acc + crr);
  labelSumOut.textContent = formatCurrency(
    withdrawal,
    account.locale,
    account.currency
  );

  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 0.015) // 1.5% Interest on Deposits
    .reduce((acc, crr) => acc + crr);
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
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

// ----LOGIN_LOGOUT_IMPLEMENTATION------

// Account which login will set as current account
let currentAccount, timer;

// startLogOutTIme
const startLogOutTimer = function () {
  const tick = () => {
    // changing seoncds to Min:Sec
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // when time o, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };
  let time = 120;
  // call immediately
  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);

  // we need it return to be used in call back in login
  return timer;
  // },1000)
};

// LOGIN
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

    // create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      mintute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Update UI
    updateUI(currentAccount);
    // Empty Inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    // Whenever user login previous timer stops and new one start
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  } else {
    inputLoginPin.value = 'Invalid PIN';
    inputLoginUsername.value = 'Invalid USERNAME';
  }
});

// LOGOUT

btnLogout.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  containerNav.style.opacity = 0;
  containerApp.style.opacity = 0;
  // Add existing conatinerLogin
  document.body.insertBefore(conatinerLogin, document.body.firstChild);
});

// IMPLEMENT TRANSFER
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Math.floor(inputTransferAmount.value);

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

    // Add Date Transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    // user new action make timer reset
    clearInterval(timer);
    timer = startLogOutTimer();
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
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.2)) {
    // It takes few seconds to approve the loan
    setTimeout(function () {
      // Add Positive movement to UI
      currentAccount.movements.push(amount);
      const html = `<div class ="balance"><p class="loan_approved">${amount}€ Loan Approved</p></div>`;
      containerBalance.insertAdjacentHTML('afterend', html);

      // Add Date Loan
      currentAccount.movementsDates.push(new Date().toISOString());

      // UPDATE UI
      updateUI(currentAccount);
      // user new action make timer reset
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
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

// --------------------------------- PAGE_INTRO ------------------------------------------

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

//
// Modal window

//NodeList-> Two btns to open an account one on top of page one bottom
//NodeList objects are collections of nodes, usually returned by properties
console.log(btnsOpenModal); //[a.nav__link.nav__link--btn.btn--show-modal, button.btn.btn--show-modal]

const openModal = function (e) {
  e.preventDefault(); // Prevent defalut nehavior of # //
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// looping through all elements with btnsOpenModal and add 'addEventListener'

btnsOpenModal.forEach(function (btnsOpenModal) {
  // here is not an array so there is no index 'i' but it loops through all
  btnsOpenModal.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

