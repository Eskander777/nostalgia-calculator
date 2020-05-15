(function () {
  const calcScreenEl = document.getElementById('calc-screen');
  const procBtn = document.getElementById('procent-btn');
  const cBtn = document.getElementById('c-btn');
  const commaBtn = document.getElementById('comma-btn');
  const zeroBtn = document.getElementById('zero-num-btn');
  const oneBtn = document.getElementById('one-num-btn');
  const twoBtn = document.getElementById('two-num-btn');
  const threeBtn = document.getElementById('three-num-btn');
  const fourBtn = document.getElementById('four-num-btn');
  const fiverBtn = document.getElementById('five-num-btn');
  const sixBtn = document.getElementById('six-num-btn');
  const sevenBtn = document.getElementById('seven-num-btn');
  const eightBtn = document.getElementById('eight-num-btn');
  const nineBtn = document.getElementById('nine-num-btn');

  const meansBtn = document.getElementById('means-btn');
  const plusBtn = document.getElementById('plus-btn');
  const minusBtn = document.getElementById('minus-btn');
  const multiplyBtn = document.getElementById('multiply-btn');
  const divisionBtn = document.getElementById('divide-btn');
  const switchOperatorBtn = document.getElementById('switch-operator-btn');

  let screenNumbers = '';
  let numToCalcOne = 0;
  let operatorToCalc = '';
  let numToCalcTwo = 0;
  let numToCalcTwoSecondUse = 0;
  let calcResult = 0;
  let operatorForSecondUse;
  let calculationLog = [];

  const addEntryToLog = (numOne, numTwo, operator, result) => {
    const logEntry = {
      numToCalcOne: numOne,
      operatorToCalc: operator,
      numToCalcTwo: numTwo,
      calcResult: result,
    };
    calculationLog.push(logEntry);
  };

  const checkAndFixScreenNumbers = (numbersToScreen) => {
    numbersToScreen =
      typeof numbersToScreen === 'number'
        ? numbersToScreen.toString().replace('.', ',')
        : numbersToScreen;
    if (numbersToScreen.length > 11) {
      screenNumbers = numbersToScreen.slice(0, 11);
    } else {
      screenNumbers = numbersToScreen;
    }
    calcScreenEl.textContent = screenNumbers;
  };

  const addNumberToScreen = (number) => {
    screenNumbers += number;
    calcScreenEl.textContent = screenNumbers;
  };

  const parseNumberFromScreen = (numberStr) =>
    parseFloat(numberStr.replace(',', '.'));

  const addNumberToScreenHandler = (num) => {
    if (calcScreenEl.textContent === calcResult.toString().replace('.', ',')) {
      screenNumbers = '';
      addNumberToScreen(num);
    } else if (screenNumbers.length >= 11) {
      console.log('Too long');
    } else {
      addNumberToScreen(num);
    }
  };

  const clearNumberFromScreen = () => {
    calcScreenEl.textContent = 0;
    screenNumbers = '';
    numToCalcOne = 0;
    operatorToCalc = '';
    numToCalcTwo = 0;
    calcResult = 0;
    calculationLog = [];
  };

  const calculation = (operator) => {
    switch (operator) {
      case '+':
        calcResult = numToCalcOne + numToCalcTwo;
        break;
      case '-':
        calcResult = numToCalcOne - numToCalcTwo;
        break;
      case '*':
        calcResult = numToCalcOne * numToCalcTwo;
        break;
      case '/':
        calcResult = numToCalcOne / numToCalcTwo;
        break;
    }
    addEntryToLog(numToCalcOne, numToCalcTwo, operatorToCalc, calcResult);
    numToCalcOne = calcResult;
    checkAndFixScreenNumbers(calcResult);
    numToCalcTwo = 0;
    operatorToCalc = '';
  };

  const calculationHandler = (operator) => {
    if (screenNumbers || operator !== operatorToCalc) {
      if (!numToCalcOne) {
        numToCalcOne = parseNumberFromScreen(screenNumbers);
        screenNumbers = '';
      } else if (numToCalcOne) {
        if (operatorToCalc) {
          numToCalcTwo = parseNumberFromScreen(screenNumbers);
          calculation(operatorToCalc);
        }
      }
      operatorToCalc = operator;
    }
  };

  const switchOperatorHandler = () => {
    if (screenNumbers || numToCalcOne) {
      if (!numToCalcOne) {
        numToCalcOne = parseNumberFromScreen(screenNumbers);
        numToCalcOne *= -1;
        checkAndFixScreenNumbers(numToCalcOne);
        numToCalcOne = 0;
      } else if (!numToCalcTwo) {
        numToCalcTwo = numToCalcOne
          ? numToCalcOne
          : parseNumberFromScreen(screenNumbers);
        numToCalcTwo *= -1;
        checkAndFixScreenNumbers(numToCalcTwo);
      }
    }
  };

  const showResult = () => {
    if (
      (screenNumbers && numToCalcOne && operatorToCalc) ||
      operatorForSecondUse
    ) {
      numToCalcTwo = parseNumberFromScreen(screenNumbers);
      if (calcResult) {
        if (!operatorToCalc) {
          operatorToCalc = operatorForSecondUse;
          numToCalcTwo =
            numToCalcTwo === calcResult ? numToCalcTwoSecondUse : numToCalcTwo;
        }
      }
    }
    numToCalcTwoSecondUse = numToCalcTwo;
    operatorForSecondUse = operatorToCalc;
    calculation(operatorToCalc);
    console.log(calculationLog);
  };

  const calcProcentHandler = () => {
    if (numToCalcOne) {
      if (calcScreenEl.textContent !== '0') {
        numToCalcTwo = parseNumberFromScreen(screenNumbers);
        numToCalcTwo = ((numToCalcOne / 100) * numToCalcTwo).toFixed(2);
        numToCalcTwo = parseFloat(numToCalcTwo);
        screenNumbers = numToCalcTwo.toString();
      }
      checkAndFixScreenNumbers(numToCalcTwo);
    }
  };

  const addCommaToNumber = () => {
    if (screenNumbers) {
      if (!screenNumbers.includes(',')) {
        screenNumbers += ',';
      }
      checkAndFixScreenNumbers(screenNumbers);
    }
  };

  cBtn.addEventListener('click', clearNumberFromScreen);
  procBtn.addEventListener('click', calcProcentHandler);

  zeroBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 0));
  oneBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 1));
  twoBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 2));
  threeBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 3));
  fourBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 4));
  fiverBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 5));
  sixBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 6));
  sevenBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 7));
  eightBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 8));
  nineBtn.addEventListener('click', addNumberToScreenHandler.bind(this, 9));

  plusBtn.addEventListener('click', calculationHandler.bind(this, '+'));
  minusBtn.addEventListener('click', calculationHandler.bind(this, '-'));
  multiplyBtn.addEventListener('click', calculationHandler.bind(this, '*'));
  divisionBtn.addEventListener('click', calculationHandler.bind(this, '/'));

  commaBtn.addEventListener('click', addCommaToNumber);
  meansBtn.addEventListener('click', showResult);
  switchOperatorBtn.addEventListener('click', switchOperatorHandler);
})();
