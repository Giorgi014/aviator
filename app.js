const BET_INDEX = document.getElementsByClassName("index");

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

const RIGHT_INPUT = document.querySelector(".r-input");
const RIGHT_PLUS_BUTTON = document.getElementById("r-plus");
const RIGHT_MINUS_BUTTON = document.getElementById("r-minus");
const RIGHT_BET_BUTTON = document.getElementById("r-bet-btn");

const LEFT_ONE_BUTTON = document.getElementById("l-one");
const LEFT_FIVE_BUTTON = document.getElementById("l-five");
const LEFT_TWENTYFIVE_BUTTON = document.getElementById("l-twenty-five");
const LEFT_ONEHUNDRED_BUTTON = document.getElementById("l-one-hundred");

const RIGHT_ONE_BUTTON = document.getElementById("r-one");
const RIGHT_FIVE_BUTTON = document.getElementById("r-five");
const RIGHT_TWENTYFIVE_BUTTON = document.getElementById("r-twenty-five");
const RIGHT_ONEHUNDRED_BUTTON = document.getElementById("r-one-hundred");

const STOREAGE_CONTAINER = document.getElementById("storeage-container");
const LAST_INDEX = document.getElementsByClassName("storeage");

const GAME_HISTORY = document.getElementsByClassName("game-history");
const MY_GAME_HISTORY = document.getElementsByClassName("my-game");
const MY_BET = document.getElementsByClassName("bet");
const MY_WIN_BET = document.getElementsByClassName("win");

let interval;
let maxDelay = 12000;

const BUTTON_STATUS = ["INACTIVE", "WAITING", "BETTING"];
const GAME_STATUS = ["PLAYING", "RESTARTING"];

const gameState = {
  leftButton: 0,
  rightButton: 0,
  game: 0,
  index: 1.0,
  isRunning: false,
  walletBalance: 1000.0,
};

const getLastIndex = () => {
  const lastIndices = localStorage.getItem("lastAviatorIndices");
  return lastIndices ? JSON.parse(lastIndices) : [];
};

const renderHistory = (items) => {
  STOREAGE_CONTAINER.innerHTML = '';
  
  items.forEach((item, index) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'storeage';
    historyItem.textContent = item.toFixed(2);
    
    if (index === items.length - 1) {
      historyItem.classList.add('latest');
    }
    
    STOREAGE_CONTAINER.appendChild(historyItem);
  });
}

const addNewIndex = (newIndex) => {
  const indices = getLastIndex();
  indices.push(newIndex);
  if (indices.length < 10) indices.push();
  localStorage.setItem("lastAviatorIndices", JSON.stringify(indices));

  renderHistory(indices)
};

const displayLastIndex = () => {
  const indices = getLastIndex();
  STOREAGE_CONTAINER[0].textContent = indices.map(v => v.toFixed(2));
};

const userBalance = () => {
  balance.textContent = gameState.walletBalance.toFixed(2);
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
  document.querySelector(".index").innerHTML = gameState.index + "x";
  updateGameState();
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
        buttonUpdate(LEFT_BET_BUTTON, 2, betAmount);
      } else {
        gameState.leftButton = 0;
        buttonUpdate(LEFT_BET_BUTTON, 0, betAmount);
      }
    }

    if (BUTTON_STATUS[gameState.rightButton] === "WAITING") {
      const betAmount = parseFloat(RIGHT_INPUT.value) || 0;
      if (betAmount <= gameState.walletBalance) {
        gameState.rightButton = 2;
        gameState.walletBalance -= betAmount;
        buttonUpdate(RIGHT_BET_BUTTON, 2, betAmount);
      } else {
        gameState.rightButton = 0;
        buttonUpdate(RIGHT_BET_BUTTON, 0, betAmount);
      }
    }

    userBalance();
    interval = setInterval(indexNumber, 100);
  }

  const stopTime = Math.random() * (maxDelay - 100) + 100;
  setTimeout(() => {
    stopInterval();
  }, stopTime);
};

const stopInterval = () => {
  clearInterval(interval);

  gameState.isRunning = false;
  gameState.game = 1;

  if (BUTTON_STATUS[gameState.leftButton] === "BETTING") {
    gameState.leftButton = 0;
    buttonUpdate(LEFT_BET_BUTTON, 0, parseFloat(LEFT_INPUT.value));
  }

  if (BUTTON_STATUS[gameState.rightButton] === "BETTING") {
    gameState.rightButton = 0;
    buttonUpdate(RIGHT_BET_BUTTON, 0, parseFloat(RIGHT_INPUT.value));
  }

  userBalance();
  const restartDelay = 3000;
  setTimeout(() => {
    gameState.index = 1.0;
    gameState.game = 0;
    startInterval();
  }, restartDelay);

  localStorage.setItem("lastAviatorIndex", gameState.index.toString());

  addNewIndex(gameState.index);
  displayLastIndex();

  window.addEventListener("load", () => {
    displayLastIndex();
  });
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

  RIGHT_PLUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGHT_INPUT.value) || 1.0;
    if (value < 500) {
      value += 1;
      RIGHT_INPUT.value = value.toFixed(2);
      RIGHT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
  RIGHT_MINUS_BUTTON.addEventListener("click", () => {
    let value = parseFloat(RIGHT_INPUT.value) || 1.0;
    if (value > 1) {
      value -= 1;
      RIGHT_INPUT.value = value.toFixed(2);
      RIGHT_BET_BUTTON.textContent = `${value.toFixed(2)} BET`;
    }
  });
};

const singleLeftButtons = (v) => {
  let currentValue = parseFloat(LEFT_INPUT.value) || 0;
  let addedValue = v;
  if (currentValue < 500) {
    let newValue = currentValue + addedValue;
    LEFT_INPUT.value = newValue.toFixed(2);
    LEFT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
  }
};
const singleRightButtons = (v) => {
  let currentValue = parseFloat(RIGHT_INPUT.value) || 0;
  let addedValue = v;
  if (currentValue < 500) {
    let newValue = currentValue + addedValue;
    RIGHT_INPUT.value = newValue.toFixed(2);
    RIGHT_BET_BUTTON.textContent = `${newValue.toFixed(2)} BET`;
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

  RIGHT_ONE_BUTTON.addEventListener("click", () => {
    singleRightButtons(1.0);
  });
  RIGHT_FIVE_BUTTON.addEventListener("click", () => {
    singleRightButtons(5.0);
  });
  RIGHT_TWENTYFIVE_BUTTON.addEventListener("click", () => {
    singleRightButtons(25.0);
  });
  RIGHT_ONEHUNDRED_BUTTON.addEventListener("click", () => {
    singleRightButtons(100.0);
  });
};

const buttonUpdate = (element, index, betAmount = 0) => {
  switch (BUTTON_STATUS[index]) {
    case "INACTIVE":
      element.textContent = `${betAmount.toFixed(2)} BET`;
      element.style.backgroundColor = "";
      element.style.color = "";
      break;

    case "WAITING":
      element.textContent = `WAITING ${betAmount.toFixed(2)} GEL`;
      element.style.backgroundColor = "red";
      element.style.color = "white";
      break;

    case "BETTING":
      element.textContent = "CANCEL";
      element.style.backgroundColor = "red";
      element.style.color = "white";
      break;
  }
};

const updateGameState = () => {
  if (GAME_STATUS[gameState.game] === "PLAYING" && gameState.isRunning) {
    // document.querySelector(".index").innerHTML = gameState.index + "x";
    BET_INDEX.innerHTML = `${gameState.index.toFixed(2)}x`;

    if (BUTTON_STATUS[gameState.leftButton] === "BETTING") {
      const multiplication = parseFloat(LEFT_INPUT.value) * gameState.index;
      LEFT_BET_BUTTON.textContent = `${multiplication.toFixed(2)} GEL`;
      LEFT_BET_BUTTON.style.backgroundColor = "orange";
    }

    if (BUTTON_STATUS[gameState.rightButton] === "BETTING") {
      const multiplication = parseFloat(RIGHT_INPUT.value) * gameState.index;
      RIGHT_BET_BUTTON.textContent = `${multiplication.toFixed(2)} GEL`;
      RIGHT_BET_BUTTON.style.backgroundColor = "orange";
    }
  }
};

const betButton = (side) => {
  const input = side === "left" ? LEFT_INPUT : RIGHT_INPUT;
  const button = side === "left" ? LEFT_BET_BUTTON : RIGHT_BET_BUTTON;
  const currentIndex =
    side === "left" ? gameState.leftButton : gameState.rightButton;
  const currentStatus = BUTTON_STATUS[currentIndex];

  const betAmount = parseFloat(input.value) || 0;

  if (currentStatus === "BETTING" || currentStatus === "WAITING") {
    if (side === "left") {
      gameState.leftButton = 0;
    } else {
      gameState.rightButton = 0;
    }

    if (currentStatus === "BETTING") {
      gameState.walletBalance += betAmount * gameState.index;
    }

    buttonUpdate(button, 0, betAmount);
    userBalance();
    return;
  }

  if (betAmount > gameState.walletBalance) {
    INSUFFICIENT_BALANCE.style.display = "flex";
    setTimeout(() => (INSUFFICIENT_BALANCE.style.display = "none"), 3000);
    return;
  }

  if (gameState.isRunning) {
    if (side === "left") {
      gameState.leftButton = 1;
    } else {
      gameState.rightButton = 1;
    }
  } else {
    if (side === "left") {
      gameState.leftButton = 2;
    } else {
      gameState.rightButton = 2;
    }
    gameState.walletBalance -= betAmount;
  }

  buttonUpdate(
    button,
    side === "left" ? gameState.leftButton : gameState.rightButton,
    betAmount
  );
  userBalance();
};

LEFT_BET_BUTTON.addEventListener("click", () => betButton("left"));
RIGHT_BET_BUTTON.addEventListener("click", () => betButton("right"));

getFullScreen();
indexNumber();
userBalance();
startInterval();
airplane();
betBtn();
betValue();
updateGameState();
betButton();