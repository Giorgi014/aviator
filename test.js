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

// let index = 1.0;
// let interval;
// let isRunning = false;
let maxDelay = 12000;

let walletBalance = 1000.0;


// let LEFT_BET_ACTIVE = false;
// let RIGHT_BET_ACTIVE = false;

// let PENDING_LEFT_BET = false;
// let PENDING_RIGHT_BET = false;
// let PENDING_BET_AMOUNT = 0;

const userBalance = () => {
  balance.textContent = walletBalance.toFixed(2);
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

// ===

const BUTTON_STATUS = ["INACTIVE", "WAITING", "BETTING"];
const GAME_STATUS = ["PLAYING", "RESTARTING"];

const gameState = {
  leftButton: 0,
  rightButton: 0,
  game: 0,
  index: 1.0,
  isRunning: false,
  walletBalance: 1000.0
};

const updateButtonState = (buttonElement, statusIndex, betAmount = 0) => {
  switch(BUTTON_STATUS[statusIndex]) {
    case "INACTIVE":
      buttonElement.textContent = `${betAmount.toFixed(2)} BET`;
      buttonElement.style.backgroundColor = "";
      buttonElement.style.color = "";
      break;
      
    case "WAITING":
      buttonElement.textContent = "WAITING";
      buttonElement.style.backgroundColor = "red";
      buttonElement.style.color = "white";
      break;
      
    case "BETTING":
      buttonElement.textContent = "CANCEL";
      buttonElement.style.backgroundColor = "red";
      buttonElement.style.color = "white";
      break;
  }
};

const updateGameState = () => {
  if (GAME_STATUS[gameState.game] === "PLAYING" && gameState.isRunning) {
    document.querySelector(".index").innerHTML = gameState.index.toFixed(2) + "x";
    
    if (BUTTON_STATUS[gameState.leftButton] === "BETTING") {
      const winAmount = parseFloat(LEFT_INPUT.value) * gameState.index;
      LEFT_BET_BUTTON.textContent = `${winAmount.toFixed(2)} GEL`;
      LEFT_BET_BUTTON.style.backgroundColor = "orange";
    }
    
    if (BUTTON_STATUS[gameState.rightButton] === "BETTING") {
      const winAmount = parseFloat(RIGTH_INPUT.value) * gameState.index;
      RIGTH_BET_BUTTON.textContent = `${winAmount.toFixed(2)} GEL`;
      RIGTH_BET_BUTTON.style.backgroundColor = "orange";
    }
  }
};

const handleBet = (side) => {
  const inputElement = side === 'left' ? LEFT_INPUT : RIGTH_INPUT;
  const buttonElement = side === 'left' ? LEFT_BET_BUTTON : RIGTH_BET_BUTTON;
  const currentStatusIndex = side === 'left' ? gameState.leftButton : gameState.rightButton;
  const currentStatus = BUTTON_STATUS[currentStatusIndex];
  
  const betAmount = parseFloat(inputElement.value) || 0;
  
  if (currentStatus === "BETTING" || currentStatus === "WAITING") {
    if (side === 'left') {
      gameState.leftButton = 0;
    } else {
      gameState.rightButton = 0;
    }
    gameState.walletBalance += betAmount;
    updateButtonState(buttonElement, 0, betAmount);
    userBalance();
    return;
  }
  
  if (betAmount > gameState.walletBalance) {
    INSUFFICIENT_BALANCE.style.display = "flex";
    setTimeout(() => INSUFFICIENT_BALANCE.style.display = "none", 3000);
    return;
  }
  
  if (gameState.isRunning) {
    if (side === 'left') {
      gameState.leftButton = 1;
    } else {
      gameState.rightButton = 1;
    }
  } else {
    if (side === 'left') {
      gameState.leftButton = 2;
    } else {
      gameState.rightButton = 2;
    }
    gameState.walletBalance -= betAmount;
  }
  
  updateButtonState(
    buttonElement, 
    side === 'left' ? gameState.leftButton : gameState.rightButton,
    betAmount
  );
  userBalance();
};

const startInterval = () => {
  if (!gameState.isRunning) {
    gameState.isRunning = true;
    gameState.game = 0;
    
    if (BUTTON_STATUS[gameState.leftButton] === "WAITING") {
      const betAmount = parseFloat(LEFT_INPUT.value) || 0;
      if (betAmount <= gameState.walletBalance) {
        gameState.leftButton = 2;
        gameState.walletBalance -= betAmount;
        updateButtonState(LEFT_BET_BUTTON, 2, betAmount);
      } else {
        gameState.leftButton = 0;
        updateButtonState(LEFT_BET_BUTTON, 0, betAmount);
      }
    }
    
    if (BUTTON_STATUS[gameState.rightButton] === "WAITING") {
      const betAmount = parseFloat(RIGTH_INPUT.value) || 0;
      if (betAmount <= gameState.walletBalance) {
        gameState.rightButton = 2;
        gameState.walletBalance -= betAmount;
        updateButtonState(RIGTH_BET_BUTTON, 2, betAmount);
      } else {
        gameState.rightButton = 0;
        updateButtonState(RIGTH_BET_BUTTON, 0, betAmount);
      }
    }
    
    userBalance();
    interval = setInterval(indexNumber, 100);
  }
  
  const stopTime = Math.random() * (maxDelay - 100) + 100;
  setTimeout(stopInterval, stopTime);
};

const stopInterval = () => {
  clearInterval(interval);
  gameState.isRunning = false;
  gameState.game = 1;
  
  if (BUTTON_STATUS[gameState.leftButton] === "BETTING") {
    const winAmount = parseFloat(LEFT_INPUT.value) * gameState.index;
    gameState.walletBalance += winAmount;
    gameState.leftButton = 0;
    updateButtonState(LEFT_BET_BUTTON, 0, parseFloat(LEFT_INPUT.value));
  }
  
  if (BUTTON_STATUS[gameState.rightButton] === "BETTING") {
    const winAmount = parseFloat(RIGTH_INPUT.value) * gameState.index;
    gameState.walletBalance += winAmount;
    gameState.rightButton = 0;
    updateButtonState(RIGTH_BET_BUTTON, 0, parseFloat(RIGTH_INPUT.value));
  }
  
  userBalance();
  
  setTimeout(() => {
    gameState.index = 1.0;
    gameState.game = 0;
    startInterval();
  }, 3000);
};

const indexNumber = () => {
  if (gameState.index >= 0 && gameState.index < 5) {
    gameState.index += 0.02;
  } else if (gameState.index >= 5 && gameState.index < 20) {
    gameState.index += 0.12;
  } else if (gameState.index >= 20 && gameState.index < 50) {
    gameState.index += 1.12;
  } else if (gameState.index >= 50 && gameState.index < 100) {
    gameState.index += 2.16;
  } else if (gameState.index >= 100) {
    gameState.index += 3.16;
  }
  
  gameState.index = parseFloat(gameState.index.toFixed(2));
  updateGameState();
};

const init = () => {
  LEFT_BET_BUTTON.addEventListener("click", () => handleBet('left'));
  RIGTH_BET_BUTTON.addEventListener("click", () => handleBet('right'));
  
  userBalance();
  startInterval();
  getFullScreen();
  airplane();
  betBtn();
  betValue();
};

init();