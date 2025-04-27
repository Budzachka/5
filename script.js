document.addEventListener("DOMContentLoaded", function (event) {
  const WINDOWWIDTH = window.innerWidth;
  const WINDOWHEIGHT = window.innerHeight;

  const difficultyLevel = document.getElementById("difficulty");
  const playerColor = document.getElementById("playerColor");
  const startButton = document.getElementById("startButton");
  const menuContainer = document.getElementById("menuContainer");
  const playerDisplay = document.getElementById("playerDisplay");

  let size;
  let timeLimit;
  let moveDistance;
  let timer;

  startButton.addEventListener("click", function (event) {
    const level = difficultyLevel.value;
    const color = playerColor.value;
    const square = document.createElement("div");
    square.style.backgroundColor = color;

    switch (level) {
      case "easy":
        menuContainer.style.display = "none";
        playerDisplay.style.display = "block";
        size = 70;
        moveDistance = 200;
        timeLimit = 7;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.backgroundColor = color;
        square.style.position = "absolute";
        break;
      case "medium":
        menuContainer.style.display = "none";
        playerDisplay.style.display = "block";
        size = 53;
        moveDistance = 300;
        timeLimit = 4;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.backgroundColor = color;
        square.style.position = "absolute";
        break;
      case "hard":
        menuContainer.style.display = "none";
        playerDisplay.style.display = "block";
        size = 13;
        moveDistance = 400;
        timeLimit = 2;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.backgroundColor = color;
        square.style.position = "absolute";
        break;
      case "empty":
        alert("Please select a difficulty level");
        location.reload();
        break;
    }

    generatePosition();
    playerDisplay.appendChild(square);

    let clickCount = 0;
    const clickCounter = document.createElement("p");
    const timerDisplay = document.createElement("p");
    clickCounter.textContent = `Score: ${clickCount}`;
    let timeLeft = timeLimit;
    timerDisplay.textContent = `Time left for click: ${timeLeft}`;
    playerDisplay.appendChild(clickCounter);
    playerDisplay.appendChild(timerDisplay);

    function generatePosition() {
      let newX, newY;
      newX = Math.floor(Math.random() * (WINDOWWIDTH - size));
      newY = Math.floor(Math.random() * (WINDOWHEIGHT - size));

      square.style.left = newX + "px";
      square.style.top = newY + "px";
    }

    function updateTimer() {
      timeLeft--;
      timerDisplay.textContent = `Time left for click: ${timeLeft}`;

      if (timeLeft === 0) {
        clearInterval(timer);
        if (clickCount === 0) {
          alert(
            `You didn't click on the square. \nAfter you click OK, the page will be reloaded `
          );
        } else {
          alert(
            `Game over. \nYour score is ${clickCount}. \nAfter you click OK, the page will be reloaded `
          );
        }
        location.reload();
      }
    }

    square.addEventListener("click", function (event) {
      if (timeLeft > 0) {
        generatePosition();
        clickCount++;
        timeLeft = timeLimit;
        clickCounter.textContent = `Score: ${clickCount}`;
        timerDisplay.textContent = `Time left for click: ${timeLeft}`;
      }
    });

    timer = setInterval(updateTimer, 1000);
  });
});
