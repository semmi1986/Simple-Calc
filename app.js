let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let decBtn = document.getElementById('decimal');
let clearNumberBtn = document.getElementById('c');
let clearAllBtn = document.getElementById('ce');
let display = document.getElementById('display');
//Переменные памяти
let memoryCurrentNumber = '0';
let memoryNewNumber = false;
let memoryPendingOperation = '';

//Нахождения значения числа по клику и вызов функции
for (let number of numbers) {
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent)
  })
}

// Нахождение операции по клику и вызов функции
for (let operator of operators) {
  operator.addEventListener('click', function (e) {
    operation(e.target.textContent)
  })
}

// вызов функции по клику для очистки последнего элемента
clearNumberBtn.addEventListener('click', clearNumber);
// вызов функции по клику для очистки поля и удаления переменных из памяти
clearAllBtn.addEventListener('click', clearAll);
//вызов функции по клику для десячитных чисел
decBtn.addEventListener('click', decimal);

// функция добавления числа в поле input
function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

// функция вычесления в зависисмости от оператора
function operation(op) {
  // переменная для сокранения числа в момент нажатия кнопку с операцией
  let localOperationMemory = display.value
  if (memoryNewNumber && memoryPendingOperation !== "=") {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === '+') {
      memoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (memoryPendingOperation === '-') {
      memoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (memoryPendingOperation === 'x') {
      memoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (memoryPendingOperation === '/') {
      memoryCurrentNumber /= parseFloat(localOperationMemory);
    } else {
      memoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = memoryCurrentNumber;
    memoryPendingOperation = op
  }
}

//функция очистки последнего значения
function clearNumber() {
  let num = display.value;
  display.value = num.substring(0, num.length - 1);
  if (display.value === '0') {
    display.value = '0';
  }
}
//функция очистки значения из поля input  и  памяти
function clearAll() {
  display.value = '0';
  memoryCurrentNumber = '0';
  memoryNewNumber = true;
  memoryPendingOperation = '';

}
// функция добавления десятичного значения
function decimal() {
  let localDecimalMemory = display.value

  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}


