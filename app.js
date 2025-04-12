const container = document.querySelector(".game-container");
const plane = document.getElementById('plane');

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

  let interval = setInterval(() => {
    if (x >= max) {
      clearInterval(interval);
      return;
    }
    x += 5;
    y -= 1.2;

    plane.style.transform = `translate(${x}px, ${y}px)`;
  }, 16);
};


const betBtn = () => {
  // LEFT SIDE BUTTONS

  LEFT_PLUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(LEFT_INPUT.value) || 1.0;
    value += 1;
    LEFT_INPUT.value = value.toFixed(2);
    LEFT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
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
    value += 1;
    RIGTH_INPUT.value = value.toFixed(2);
    RIGTH_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
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
    LEFT_INPUT.value = "1.00";
    LEFT_BET_BUTTON.textContent = `1.00 BET`;
  });
  LEFT_FIVE_BUTTON.addEventListener("click", () => {
    LEFT_INPUT.value = "5.00";
    LEFT_BET_BUTTON.textContent = `5.00 BET`;
  });
  LEFT_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    LEFT_INPUT.value = "25.00";
    LEFT_BET_BUTTON.textContent = `25.00 BET`;
  });
  LEFT_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    LEFT_INPUT.value = "100.00";
    LEFT_BET_BUTTON.textContent = `100.00 BET`;
  });

  // RIGHT SIDE BUTTONS

  RIGTH_ONE_BUTTON.addEventListener("click", () => {
    RIGTH_INPUT.value = "1.00";
    RIGTH_BET_BUTTON.textContent = `1.00 BET`;
  });
  RIGTH_FIVE_BUTTON.addEventListener("click", () => {
    RIGTH_INPUT.value = "5.00";
    RIGTH_BET_BUTTON.textContent = `5.00 BET`;
  });
  RIGTH_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    RIGTH_INPUT.value = "25.00";
    RIGTH_BET_BUTTON.textContent = `25.00 BET`;
  });
  RIGTH_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    RIGTH_INPUT.value = "100.00";
    RIGTH_BET_BUTTON.textContent = `100.00 BET`;
  });
};


airplane();
betBtn();
betValue();
