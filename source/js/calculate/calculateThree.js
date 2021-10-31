const input = document.querySelector('.input');

let result = "";

function insert(num) {
  if(input.textContent == 0) {
    input.textContent = "";
    input.textContent +=  num;
  } else
      input.textContent += num;
}

function clean() {
  input.textContent = "0";
  result = ""
}

function back() {
  let exp = input.textContent;
  input.textContent = exp.substring(0, exp.length - 1);
  if(input.textContent == 0) {
    input.textContent = "0";
  }
}

function equal() {
  let exp = input.textContent;
  if (input.textContent.includes('^')) {
    let power = input.textContent.split('^');
    let num = eval(power);
    let pow = +power[1];
    input.textContent = eval(exp);
    input.textContent = Math.pow(num,pow);
    result = "";
  }

  if (exp) {
    input.textContent = eval(exp);
  }
}

function percent() {
  input.textContent = eval(input.textContent)/100;
}

function constant(name) {
  if(input.textContent == 0) {
    input.textContent = "0";
  }
  if(name == "pi")
    input.textContent +=  Math.PI.toFixed(8);
  if(name == "e")
    input.textContent += Math.E.toFixed(8);
 }

 function operation(name) {
  if(name == "sqrt")
    input.textContent = Math.sqrt(eval(input.textContent));
  if(name == "pow")
    input.textContent = Math.pow(eval(input.textContent), 2);
  if(name == "pow-1")
    input.textContent = Math.pow(eval(input.textContent), -1);
  if(name == "^")
    result = input.textContent;
    input.textContent += "^";
}


