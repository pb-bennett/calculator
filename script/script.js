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
  if (currentNumString.length >= 120) {
    currentNumString = "Oh stop it!  You're just trying to break me :-<";
    setTimeout(() => {
      init();
      updateScreen();
      return;
    }, 3000);
  }
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

  if (!previousNumString && !currentNumString) {
    evaluate();
    updateScreen();
  }
  updateScreen();
  console.log('btnOpClick');
  test();
};
const updateScreen = function () {
  if (currentNumString.length < 15) mainDisplay.style.fontSize = '50px';
  if (currentNumString.length >= 15 && currentNumString.length < 25)
    mainDisplay.style.fontSize = '30px';
  if (currentNumString.length >= 25) mainDisplay.style.fontSize = '20px';
  if (upperDisplayText.length < 25) upperDisplay.style.fontSize = '30px';
  if (upperDisplayText.length >= 25) upperDisplay.style.fontSize = '20px';

  mainDisplay.textContent = currentNumString;
  upperDisplay.textContent = upperDisplayText;
  console.log('updateScreen');
  test();
};

const evaluate = function (operator) {
  if (previousNumString === '' || evaluated === true) return;
  firstNum = Number(previousNumString);
  secondNum = Number(currentNumString);
  if (operator === '/') {
    if (secondNum === 0) {
      currentNumString = "Please don't try it!  You'll break the world! ";
      upperDisplayText = '😱';
      updateScreen();
      setTimeout(() => {
        init();
        updateScreen();
        return;
      }, 3000);
      return;
    }
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

const backspace = function () {
  if (evaluated === true || currentNumString === '0') return;
  currentNumString = currentNumString.slice(0, -1);
  console.log('backspace');
  test();
  updateScreen();
};

const point = function () {
  if (evaluated === true) {
    console.log('this should clear the screen');
    init();
    updateScreen();
  }
  if (currentNumString.includes('.')) return;
  if (currentNumString === '0' || currentNumString === '')
    currentNumString = '0.';
  else {
    currentNumString = currentNumString.concat('.');
  }
  console.log('point function');
  test();
  updateScreen();
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
    if (e.target.closest('.btn').classList.contains('btn-sign-change')) {
      console.log('Sign-change');
      currentNumString = (currentNumString * -1).toString();
      updateScreen();
    }
    if (e.target.closest('.btn').classList.contains('btn-backspace')) {
      console.log('backspace');
      backspace();
      updateScreen();
    }
    if (e.target.closest('.btn').classList.contains('btn-point')) {
      console.log('point');
      point();
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
