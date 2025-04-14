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

const airplane = () => {
  let x = 0;
  let y = 0;
  const containerWidth = container.offsetWidth;
  const planeWidth = plane.offsetWidth;

  const max = containerWidth - planeWidth;

  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.strokeStyle = "red";
  // ctx.lineWidth = 2;
  // ctx.beginPath();

  // let startX = x + planeWidth / 2.2;
  // let startY = y + canvas.height / 1.3;
  // ctx.moveTo(startX, startY);

  let interval = setInterval(() => {
    if (x >= max) {
      clearInterval(interval);
      return;
    }
    x += 5;
    y -= 1.2;

    plane.style.transform = `translate(${x}px, ${y}px)`;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x + planeWidth / 2.2, y + canvas.height / 1.3, 2, 0, Math.PI * 2);
    ctx.fill();
    // const newX = x + planeWidth / 2.2;
    // const newY = y + canvas.height / 1.3;

    // ctx.lineTo(newX, newY);
    // ctx.stroke();
  }, 16);
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

airplane();
betBtn();
betValue();
