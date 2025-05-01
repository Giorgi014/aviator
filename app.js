const balance = document.querySelector(".balance-value");
const INSUFFICIENT_BALANCE = document.getElementById("error-message");

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

let index = 1.0;
let interval;
let isRunning = false;
let maxDelay = 12000;

let walletBalance = 1000.0;

let LEFT_BET_ACTIVE = false;
let RIGTH_BET_ACTIVE = false;

let PENDING_LEFT_BET = false;
let PENDING_RIGTH_BET = false;
let PENDING_BET_AMOUNT = 0;

const userBalance = () => {
  balance.textContent = walletBalance.toFixed(2);
};

const indexNumber = () => {
  if (index >= 0 && index < 5) {
    index += 0.02;
  } else if (index >= 5 && index < 20) {
    index += 0.12;
  } else if (index >= 20 && index < 50) {
    index += 1.12;
  } else if (index >= 50 && index < 100) {
    index += 2.16;
  } else if (index >= 100) {
    index += 3.16;
  }
  index = parseFloat(index.toFixed(2));
  document.querySelector(".index").innerHTML = index + "x";
  multiplicationValue();
};
// setInterval(indexNumber, 100);

const startInterval = () => {
  if (!isRunning) {
    if (PENDING_LEFT_BET) {
      if (PENDING_BET_AMOUNT <= walletBalance) {
        LEFT_BET_ACTIVE = true;
        walletBalance -= PENDING_BET_AMOUNT;
        userBalance();
      }
      PENDING_LEFT_BET = false;
    }
    if (PENDING_RIGTH_BET) {
      if (PENDING_BET_AMOUNT <= walletBalance) {
        LEFT_BET_ACTIVE = true;
        walletBalance -= PENDING_BET_AMOUNT;
        userBalance();
      }
      PENDING_RIGTH_BET = false;
    }
    isRunning = true;
    // multiplicationValue();
    interval = setInterval(indexNumber, 100);
  }
  const stopTime = Math.random() * (maxDelay - 100) + 100;
  setTimeout(() => {
    stopInterval();
  }, stopTime);
};
const stopInterval = () => {
  clearInterval(interval);
  isRunning = false;
  if (LEFT_BET_ACTIVE) {
    const leftBetAmount = parseFloat(LEFT_INPUT.value) || 0;
    LEFT_BET_ACTIVE = false;
    LEFT_BET_BUTTON.textContent = `${leftBetAmount.toFixed(2)} BET`;
    LEFT_BET_BUTTON.style.backgroundColor = "";
    LEFT_BET_BUTTON.style.color = "";
  }
  if (RIGTH_BET_ACTIVE) {
    const rigthBetAmount = parseFloat(LEFT_INPUT.value) || 0;
    RIGTH_BET_ACTIVE = false;
    RIGTH_BET_BUTTON.textContent = `${rigthBetAmount.toFixed(2)} BET`;
    RIGTH_BET_BUTTON.style.backgroundColor = "";
    RIGTH_BET_BUTTON.style.color = "";
  }
  const restartDelay = 3000;
  setTimeout(() => {
    index = 1.0;
    startInterval();
  }, restartDelay);
};

const getFullScreen = () => {
  const enterFullScreen = () => {
    if (GET_FULL_SCREEN.requestFullscreen) {
      GET_FULL_SCREEN.requestFullscreen();
    } else if (GET_FULL_SCREEN.webkitRequestFullscreen) {
      GET_FULL_SCREEN.webkitRequestFullscreen();
    } else if (GET_FULL_SCREEN.mozRequestFullScreen) {
      GET_FULL_SCREEN.mozRequestFullScreen();
    } else if (GET_FULL_SCREEN.msRequestFullscreen) {
      GET_FULL_SCREEN.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  FULL_SCREEN.addEventListener("click", () => {
    enterFullScreen();
  });

  MINIMIZE_SCREEN.addEventListener("click", () => {
    exitFullScreen();
  });

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = !!document.fullscreenElement;
    FULL_SCREEN.style.display = isFullscreen ? "none" : "block";
    MINIMIZE_SCREEN.style.display = isFullscreen ? "block" : "none";
  });
};

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
    if (value < 500 && !LEFT_BET_ACTIVE) {
      value += 1;
      LEFT_INPUT.value = value.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
  LEFT_MINUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(LEFT_INPUT.value) || 1.0;
    if (value > 1 && !LEFT_BET_ACTIVE) {
      value -= 1;
      LEFT_INPUT.value = value.toFixed(2);
      LEFT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });

  // RIGHT SIDE BUTTONS

  RIGTH_PLUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGTH_INPUT.value) || 1.0;
    if (value < 500 && !RIGTH_BET_ACTIVE) {
      value += 1;
      RIGTH_INPUT.value = value.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
  RIGTH_MINUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGTH_INPUT.value) || 1.0;
    if (value > 1 && !RIGTH_BET_ACTIVE) {
      value -= 1;
      RIGTH_INPUT.value = value.toFixed(2);
      RIGTH_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
};

const singleLeftButtons = (v) => {
  let currentValue = parseFloat(LEFT_INPUT.value) || 0;
  let addedValue = v;
  if (currentValue < 500 && !LEFT_BET_ACTIVE) {
    let newValue = currentValue + addedValue;
    LEFT_INPUT.value = newValue.toFixed(2);
    LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
  }
};
const singleRightButtons = (v) => {
  let currentValue = parseFloat(RIGTH_INPUT.value) || 0;
  let addedValue = v;
  if (currentValue < 500 && !RIGTH_BET_ACTIVE) {
    let newValue = currentValue + addedValue;
    RIGTH_INPUT.value = newValue.toFixed(2);
    RIGTH_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
  }
};

const betValue = () => {
  // LEFT SIDE BUTTONS

  LEFT_ONE_BUTTON.addEventListener("click", () => {
    singleLeftButtons(1.0);
  });
  LEFT_FIVE_BUTTON.addEventListener("click", () => {
    singleLeftButtons(5.0);
  });
  LEFT_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    singleLeftButtons(25.0);
  });
  LEFT_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    singleLeftButtons(100.0);
  });

  // RIGHT SIDE BUTTONS

  RIGTH_ONE_BUTTON.addEventListener("click", () => {
    singleRightButtons(1.0);
  });
  RIGTH_FIVE_BUTTON.addEventListener("click", () => {
    singleRightButtons(5.0);
  });
  RIGTH_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    singleRightButtons(25.0);
  });
  RIGTH_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    singleRightButtons(100.0);
  });
};
const betButton = () => {
  LEFT_BET_BUTTON.addEventListener("click", () => {
    let betAmount = parseFloat(LEFT_INPUT.value) || 0;

    if (LEFT_BET_BUTTON.textContent === "CANCEL") {
      LEFT_BET_BUTTON.textContent = `${betAmount.toFixed(2)} BET`;
      LEFT_BET_BUTTON.style.backgroundColor = "";
      LEFT_BET_BUTTON.style.color = "";
      walletBalance += betAmount;
      userBalance();
      return;
    } else {
      LEFT_BET_ACTIVE = true;
      LEFT_BET_BUTTON.textContent = "CANCEL";
      LEFT_BET_BUTTON.style.backgroundColor = "red";
    }

    if (LEFT_BET_BUTTON.textContent === "WAITING") {
      LEFT_BET_BUTTON.textContent = `${betAmount.toFixed(2)} BET`;
      LEFT_BET_BUTTON.style.backgroundColor = "";
      LEFT_BET_BUTTON.style.color = "";
      userBalance();
      return;
    }

    if (betAmount > walletBalance) {
      INSUFFICIENT_BALANCE.style.display = "flex";
      setTimeout(() => {
        INSUFFICIENT_BALANCE.style.display = "none";
      }, 3000);
    }
    if (isRunning) {
      if (LEFT_BET_ACTIVE) {
        PENDING_LEFT_BET = true;
        PENDING_BET_AMOUNT = betAmount;
        LEFT_BET_BUTTON.textContent = "WAITING";
        LEFT_BET_BUTTON.style.backgroundColor = "red";
        LEFT_BET_BUTTON.style.color = "white";
        return;
      }
    }
    // else {
    //   LEFT_BET_BUTTON.textContent = "CANCEL";
    //   LEFT_BET_BUTTON.style.backgroundColor = "red";
    //   LEFT_BET_BUTTON.style.color = "white";
    // }
    if (betAmount > 0 && walletBalance >= betAmount) {
      walletBalance -= betAmount;
      userBalance();
    }
  });
  RIGTH_BET_BUTTON.addEventListener("click", () => {
    let betAmount = parseFloat(RIGTH_INPUT.value) || 0;

    if (RIGTH_BET_BUTTON.textContent === "CANCEL") {
      RIGTH_BET_BUTTON.textContent = `${betAmount.toFixed(2)} BET`;
      RIGTH_BET_BUTTON.style.backgroundColor = "";
      RIGTH_BET_BUTTON.style.color = "";
      walletBalance += betAmount;
      userBalance();
      return;
    } else {
      RIGTH_BET_ACTIVE = true;
      RIGTH_BET_BUTTON.textContent = "CANCEL";
      RIGTH_BET_BUTTON.style.backgroundColor = "red";
    }
    if (RIGTH_BET_BUTTON.textContent === "WAITING") {
      RIGTH_BET_BUTTON.textContent = `${betAmount.toFixed(2)} BET`;
      RIGTH_BET_BUTTON.style.backgroundColor = "";
      RIGTH_BET_BUTTON.style.color = "";
      userBalance();
      return;
    }
    if (betAmount > walletBalance) {
      INSUFFICIENT_BALANCE.style.display = "block";
      setTimeout(() => {
        INSUFFICIENT_BALANCE.style.display = "none";
      }, 3000);
    }
    if (isRunning) {
      if (RIGTH_BET_ACTIVE) {
        PENDING_RIGTH_BET = true;
        PENDING_BET_AMOUNT = betAmount;
        RIGTH_BET_BUTTON.textContent = "WAITING";
        RIGTH_BET_BUTTON.style.backgroundColor = "red";
        RIGTH_BET_BUTTON.style.color = "white";
        return;
      }
    }
    // else {
    //   RIGTH_BET_BUTTON.textContent = "CANCEL";
    //   RIGTH_BET_BUTTON.style.backgroundColor = "red";
    //   RIGTH_BET_BUTTON.style.color = "white";
    // }
    if (betAmount > 0 && walletBalance >= betAmount) {
      walletBalance -= betAmount;
      userBalance();
    }
  });
};

const multiplicationValue = () => {
  const leftBetAmount = parseFloat(LEFT_INPUT.value) || 0;
  const rigthBetAmount = parseFloat(RIGTH_INPUT.value) || 0;

  if (
    LEFT_BET_BUTTON.textContent === "CANCEL" ||
    LEFT_BET_BUTTON.textContent === "WAITING"
  ) {
    LEFT_BET_BUTTON.textContent = `${leftBetAmount.toFixed(2)} BET`;
    LEFT_BET_BUTTON.style.backgroundColor = "";
    LEFT_BET_BUTTON.style.color = "";
  }

  if (
    RIGTH_BET_BUTTON.textContent === "CANCEL" ||
    RIGTH_BET_BUTTON.textContent === "WAITING"
  ) {
    RIGTH_BET_BUTTON.textContent = `${rigthBetAmount.toFixed(2)} BET`;
    RIGTH_BET_BUTTON.style.backgroundColor = "";
    RIGTH_BET_BUTTON.style.color = "";
  }

  if (isRunning && LEFT_BET_ACTIVE) {
    const leftMultiplication = index * leftBetAmount;
    LEFT_BET_BUTTON.textContent = `${leftMultiplication.toFixed(2)}GEL`;
    LEFT_BET_BUTTON.style.backgroundColor = "orange";
    LEFT_BET_BUTTON.style.color = "white";
  } else {
    LEFT_BET_BUTTON.textContent = `${leftBetAmount.toFixed(2)} BET`;
    LEFT_BET_BUTTON.style.backgroundColor = "";
    LEFT_BET_BUTTON.style.color = "";
  }

  if (isRunning && RIGTH_BET_ACTIVE) {
    const rigthMultiplication = index * rigthBetAmount;
    RIGTH_BET_BUTTON.textContent = `${rigthMultiplication.toFixed(2)}GEL`;
    RIGTH_BET_BUTTON.style.backgroundColor = "orange";
    RIGTH_BET_BUTTON.style.color = "white";
  } else {
    RIGTH_BET_BUTTON.textContent = `${rigthBetAmount.toFixed(2)} BET`;
    RIGTH_BET_BUTTON.style.backgroundColor = "";
    RIGTH_BET_BUTTON.style.color = "";
  }

  // if (isRunning && PENDING_LEFT_BET) {
  //   LEFT_BET_BUTTON.textContent = "WAITING";
  //   LEFT_BET_BUTTON.style.backgroundColor = "red";
  //   LEFT_BET_BUTTON.style.color = "white";
  // } else {
  //   LEFT_BET_BUTTON.textContent = `${leftBetAmount.toFixed(2)} BET`;
  //   LEFT_BET_BUTTON.style.backgroundColor = "";
  //   LEFT_BET_BUTTON.style.color = "";
  // }

  // if (isRunning && PENDING_RIGTH_BET) {
  //   RIGTH_BET_BUTTON.textContent = "WAITING";
  //   RIGTH_BET_BUTTON.style.backgroundColor = "red";
  //   RIGTH_BET_BUTTON.style.color = "white";
  // } else {
  //   RIGTH_BET_BUTTON.textContent = `${rigthBetAmount.toFixed(2)} BET`;
  //   RIGTH_BET_BUTTON.style.backgroundColor = "";
  //   RIGTH_BET_BUTTON.style.color = "";
  // }
};

userBalance();
indexNumber();
startInterval();
getFullScreen();
airplane();
betBtn();
betValue();
betButton();
