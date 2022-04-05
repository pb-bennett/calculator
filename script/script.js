'use strict';

const mainDisplay = document.getElementById('main-display');
const upperDisplay = document.getElementById('upper-display');
const btnNumberAll = document.querySelectorAll('btn-num');
const btnAll = document.querySelectorAll('.btn');

btnAll.forEach(el =>
  el.addEventListener('click', function () {
    console.log(el.dataset.btn);
  })
);
