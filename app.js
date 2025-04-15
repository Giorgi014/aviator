const balance = document.querySelector('.balance-value');

const GET_FULL_SCREEN = document.documentElement;
const FULL_SCREEN = document.getElementById("full-screen");
const MINIMIZE_SCREEN = document.getElementById("min-screen");

const container = document.querySelector(".game-container");
const plane = document.getElementById("plane");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const LEFT_INPUT = document.querySelector(".l-input");
const LEFT_PLUS_BUTTON = document.getElementById("l-plus");
const LEFT_MINUS_BUTTON = document.getElementById("l-minus");
const LEFT_BET_BUTTON = document.getElementById("l-bet-btn");

const RIGTH_INPUT = document.querySelector(".r-input");
const RIGTH_PLUS_BUTTON = document.getElementById("r-plus");
const RIGTH_MINUS_BUTTON = document.getElementById("r-minus");
const RIGTH_BET_BUTTON = document.getElementById("r-bet-btn");

const LEFT_ONE_BUTTON = document.getElementById("l-one");
const LEFT_FIVE_BUTTON = document.getElementById("l-five");
const LEFT_TWENTYFIVE_BUTTON = document.getElementById("l-twenty-five");
const LEFT_ONEHUNDRED_BUTTON = document.getElementById("l-one-hundred");

const RIGTH_ONE_BUTTON = document.getElementById("r-one");
const RIGTH_FIVE_BUTTON = document.getElementById("r-five");
const RIGTH_TWENTYFIVE_BUTTON = document.getElementById("r-twenty-five");
const RIGTH_ONEHUNDRED_BUTTON = document.getElementById("r-one-hundred");

let index = 1.00;
let walletBalance = 1000.00;

const userBalance = () => {
  balance.textContent = walletBalance.toFixed(2);
};


// const indexNumber = () =>{
//   if (index >= 0 && index < 5) {
//     index += 0.02; 
//     index = parseFloat(index.toFixed(2));
//     document.querySelector('.index').innerHTML = index + "x";
//   }else if(index >= 5 && index < 20){
//     index += 0.12; 
//     index = parseFloat(index.toFixed(2));
//     document.querySelector('.index').innerHTML = index + "x";
//   }
//   else if(index >= 20 && index < 50){
//     index += 1.12; 
//     index = parseFloat(index.toFixed(2));
//     document.querySelector('.index').innerHTML = index + "x";
//   }else if(index >= 50 && index < 100){
//     index += 2.16; 
//     index = parseFloat(index.toFixed(2));
//     document.querySelector('.index').innerHTML = index + "x";
//   }else if(index >= 100){
//     index += 3.16; 
//     index = parseFloat(index.toFixed(2));
//     document.querySelector('.index').innerHTML = index + "x";
//   }
// }
// setInterval(indexNumber, 100);


const getFullScreen = () => {
  FULL_SCREEN.addEventListener('click', () => {
    if (GET_FULL_SCREEN.msRequestFullScreen) {
      GET_FULL_SCREEN.msRequestFullScreen();
    }else if (GET_FULL_SCREEN.mozRequestFullScreen) {
      GET_FULL_SCREEN.mozRequestFullScreen();
    }else if (GET_FULL_SCREEN.webkitRequestFullScreen) {
      GET_FULL_SCREEN.webkitRequestFullScreen();
    }
  })
}

const airplane = () => {
  let x = 0;
  let y = 0;
  const containerWidth = container.offsetWidth;
  const planeWidth = plane.offsetWidth;

  const max = containerWidth - planeWidth;

  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let animationId;
  let reachedEnd = false;
  let waveAngle = 0;
  let baseY = 0;
  const animate = () => {

    if (!reachedEnd) {
      x += 5;
      y -= 1.2;

      if (x >= max) {
        x = max;
        reachedEnd = true;
        baseY = y;
      }
    } else {
      waveAngle += 0.005;
      y = baseY + Math.sin(waveAngle) * 70;
    }

    plane.style.transform = `translate(${x}px, ${y}px)`;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x + planeWidth / 6, y + canvas.height / 1.34, 2, 0, Math.PI * 2);
    ctx.fill();

    animationId = requestAnimationFrame(animate);
  };

  animate(); 
  // // ctx.strokeStyle = "red";
  // // ctx.lineWidth = 2;
  // // ctx.beginPath();

  // // let startX = x + planeWidth / 2.2;
  // // let startY = y + canvas.height / 1.3;
  // // ctx.moveTo(startX, startY);

  // let interval = setInterval(() => {
  //   if (x >= max) {
  //     clearInterval(interval);
  //     return;
  //   }
  //   x += 5;
  //   y -= 1.2;

  //   plane.style.transform = `translate(${x}px, ${y}px)`;

  //   ctx.fillStyle = "red";
  //   ctx.beginPath();
  //   ctx.arc(x + planeWidth / 2.2, y + canvas.height / 1.3, 2, 0, Math.PI * 2);
  //   ctx.fill();
  //   // const newX = x + planeWidth / 2.2;
  //   // const newY = y + canvas.height / 1.3;

  //   // ctx.lineTo(newX, newY);
  //   // ctx.stroke();
  // }, 16);
};

const betBtn = () => {
  // LEFT SIDE BUTTONS

  LEFT_PLUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(LEFT_INPUT.value) || 1.0;
    if (value < 500) {
      value += 1;
      LEFT_INPUT.value = value.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
  LEFT_MINUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(LEFT_INPUT.value) || 1.0;
    if (value > 1) {
      value -= 1;
      LEFT_INPUT.value = value.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });

  // RIGHT SIDE BUTTONS

  RIGTH_PLUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGTH_INPUT.value) || 1.0;
    if (value < 500) {
      value += 1;
      RIGTH_INPUT.value = value.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
  RIGTH_MINUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGTH_INPUT.value) || 1.0;
    if (value > 1) {
      value -= 1;
      RIGTH_INPUT.value = value.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
};

const betValue = () => {
  // LEFT SIDE BUTTONS

  LEFT_ONE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(LEFT_INPUT.value) || 0;
    let addedValue = 1.0;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      LEFT_INPUT.value = newValue.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  LEFT_FIVE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(LEFT_INPUT.value) || 0;
    let addedValue = 5.0;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      LEFT_INPUT.value = newValue.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  LEFT_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(LEFT_INPUT.value) || 0;
    let addedValue = 25.0;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      LEFT_INPUT.value = newValue.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  LEFT_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(LEFT_INPUT.value) || 0;
    let addedValue = 100.0;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      LEFT_INPUT.value = newValue.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });

  // RIGHT SIDE BUTTONS

  RIGTH_ONE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(RIGTH_INPUT.value) || 0;
    let addedValue = 1.0;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      RIGTH_INPUT.value = newValue.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  RIGTH_FIVE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(RIGTH_INPUT.value) || 0;
    let addedValue = 5.00;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      RIGTH_INPUT.value = newValue.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  RIGTH_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(RIGTH_INPUT.value) || 0;
    let addedValue = 25.00;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      RIGTH_INPUT.value = newValue.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
  RIGTH_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    let currentValue = parseFloat(RIGTH_INPUT.value) || 0;
    let addedValue = 100.00;
    if (currentValue < 500) {
      let newValue = currentValue + addedValue;
      RIGTH_INPUT.value = newValue.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
    }
  });
};

const betButton = () =>{
  LEFT_BET_BUTTON.addEventListener("click", () => {
    let betAmount = parseFloat(LEFT_INPUT.value) || 0;
    if (betAmount > 0 && walletBalance >= betAmount) {
      walletBalance -= betAmount;
      userBalance();
    }
  });
  RIGTH_BET_BUTTON.addEventListener("click", () => {
    let betAmount = parseFloat(RIGTH_INPUT.value) || 0;
    if (betAmount > 0 && walletBalance >= betAmount) {
      walletBalance -= betAmount;
      userBalance();
    }
  });
}


userBalance();
// indexNumber();
getFullScreen();
airplane();
betBtn();
betValue();
betButton();