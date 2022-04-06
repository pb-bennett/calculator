'use strict';

const mainDisplay = document.getElementById('main-display');
const upperDisplay = document.getElementById('upper-display');
const btnNumberAll = document.querySelectorAll('btn-num');
const btnAll = document.querySelectorAll('.btn');

let currentNumString;
let previousNumString;
// let current2Num;
let currentOperator;
let evaluated = false;
let firstNum;
let secondNum;
let upperDisplayText = '';

const init = function () {
  currentNumString = '0';
  previousNumString = currentOperator = '';
  evaluated = false;
  upperDisplayText = '';
  console.log('init');
};
init();

const btnNumClick = function (num) {
  if (evaluated === true) {
    console.log('this should clear the screen');
    init();
    updateScreen();
  }
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

const btnOpClick = function (op) {
  if (evaluated) {
    evaluate();
    evaluated = false;
  }
  console.log(op);
  previousNumString = currentNumString;
  currentNumString = '';
  currentOperator = op;
  upperDisplayText = `${previousNumString} ${currentOperator}`;

  updateScreen();
  console.log('btnOpClick');
  test();
};
const updateScreen = function () {
  if (currentNumString.length < 15) mainDisplay.style.fontSize = '50px';
  if (currentNumString.length >= 15 && currentNumString.length < 22)
    mainDisplay.style.fontSize = '30px';
  if (currentNumString.length > 21 && currentNumString.length < 32)
    mainDisplay.style.fontSize = '20px';

  mainDisplay.textContent = currentNumString;
  upperDisplay.textContent = upperDisplayText;
  console.log('updateScreen');
  test();
};

const evaluate = function (operator) {
  firstNum = Number(previousNumString);
  secondNum = Number(currentNumString);
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
  // currentOperator = '';
  currentNumString = currentNumString.toString();
  previousNumString = previousNumString.toString();
  upperDisplayText = `${firstNum} ${currentOperator} ${secondNum} =   `;
  evaluated = true;
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
    'previousNumString:' + previousNumString,
    'evaluated:' + evaluated,
    'currentOperator:' + currentOperator,
    'firstNum:' + firstNum + 'secondNum:' + secondNum,
    'upperDisplayText:' + upperDisplayText
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
    if (e.target.closest('.btn').classList.contains('btn-evaluate')) {
      console.log('evaluating');
      evaluate(currentOperator);
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

// currentNumString = Number(
//   Number(currentNumString).toFixed(9).toString()
// ).toString();
