let choise;

const
btnPlus = document.getElementById('plus'),
btnMinus = document.getElementById('minus'),
btnTimes = document.getElementById('times'),
btnDevide = document.getElementById('devide'),
result = document.getElementById('result');

function num(){choise='+'}
btnPlus.addEventListener('click',num())
btnMinus.addEventListener('click', choise='-')
btnTimes.addEventListener('click', choise='*')
btnDevide.addEventListener('click', choise='/')

function calc() {
  let result

  let num1 = Number(document.getElementById('num1').value)
  let num2 = Number(document.getElementById('num2').value)

  switch (choise) {
    case '+':
      result= num1 + num2;
    break;
    case '-':
      result= num1 - num2;
    break;
    case '*':
      result= num1 * num2;
    break;
    case '/':
      result= num1 / num2;
    break;
  }

  if(result.addEventListener('click', result())) {
    result.innerHTML = result
  }
}

