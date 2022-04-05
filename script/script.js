'use strict';

const mainDisplay = document.getElementById('main-display');
const upperDisplay = document.getElementById('upper-display');
const btnNumberAll = document.querySelectorAll('btn-num');
const btnAll = document.querySelectorAll('.btn');

let currentNumString;
let firstNum;
let secondNum;
let currentOperator;

const init = function () {
  currentNumString = '0';
  firstNum = secondNum = currentOperator = null;
  console.log('init');
};
init();

const btnNumClick = function (num) {
  console.log(num);
  if (currentNumString === '0') {
    currentNumString = num;
  } else {
    currentNumString = currentNumString.concat(num);
  }
  updateScreen();
  console.log('btnNumClick');
  test();
};

const updateScreen = function () {
  if (currentNumString.length < 12) mainDisplay.style.fontSize = '50px';
  if (currentNumString.length > 12 && currentNumString.length < 22)
    mainDisplay.style.fontSize = '30px';
  mainDisplay.textContent = currentNumString;
  test();
};

const btnOpClick = function (op) {
  console.log(op);
  if (currentOperator === null) {
    firstNum = currentNumString;
    currentOperator = op;
  } else {
    secondNum = currentNumString;
    currentOperator = op;
    evaluate(op);
  }
  console.log('btnOpClick');
  test();
};

const evaluate = function (operator) {
  if (operator === '/') {
    currentNumString = firstNum / secondNum;
  }
  if (operator === 'x') {
    currentNumString = firstNum * secondNum;
  }
  if (operator === '+') {
    currentNumString = firstNum + secondNum;
  }
  if (operator === '-') {
    currentNumString = firstNum - secondNum;
  }
  currentOperator = null;
  currentNumString = Number(
    Number(currentNumString).toFixed(9).toString()
  ).toString();
  updateScreen();
  console.log('evaluate');
  test();
};

// const divide = function (firstNum, secondNum) {
//   return firstNum / secondNum;
// };
// const multiply = function (firstNum, secondNum) {
//   return firstNum * secondNum;
// };
// const add = function (firstNum, secondNum) {
//   return firstNum + secondNum;
// };
// const subtract = function (firstNum, secondNum) {
//   return firstNum - secondNum;
// };

// evaluate(currentOperator);

const test = function () {
  console.log(
    'currentNumString:' + currentNumString,
    'firstNum:' + firstNum,
    'secondNum:' + secondNum,
    'currentOperator:' + currentOperator
  );
};

btnAll.forEach(el => {
  el.addEventListener('mousedown', function (e) {
    // console.log(e.target.dataset.btn);
    e.target.closest('.btn').style.color = 'white';
    setTimeout(() => (e.target.closest('.btn').style.color = 'black'), 300);
    //
    if (e.target.closest('.btn').classList.contains('btn-num')) {
      const clicked = e.target.closest('.btn-num');
      btnNumClick(clicked.dataset.btn);
    }
    //
    if (e.target.closest('.btn').classList.contains('btn-op')) {
      const clicked = e.target.closest('.btn-op');
      btnOpClick(clicked.dataset.btn);
    }
    if (e.target.closest('.btn').classList.contains('btn-clear')) {
      console.log('resetting');
      init();
      updateScreen();
    }
  });
  el.addEventListener('mouseover', function (e) {
    btnAll.forEach(el => el.classList.remove('btn-mouseover'));
    e.target.closest('.btn').classList.add('btn-mouseover');
  });
  el.addEventListener('mouseout', function (e) {
    btnAll.forEach(el => el.classList.remove('btn-mouseover'));
  });
});
test();
updateScreen();
