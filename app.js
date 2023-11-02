let snakeBoard = document.querySelector(".snake-board");
let containerDiv = document.querySelector(".container");

let inputDir = { x: 0, y: 0 };
let speed = 10;
let lastPaintTime = 0;
let snakeArray = [
    { x: 15, y: 15 }
];
let food = { x: 6, y: 6 };
let foodA = 2;
let foodB = 18;
let score = 0;
let activate = false;

function main(ctime) {
    window.requestAnimationFrame(main);
    if (((ctime - lastPaintTime) / 1000) < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true;
    }
    if ((snakeArr[0].x <= 20 && snakeArr[0].x >= 0) && (snakeArr[0].y <= 20 && snakeArr[0].y >= 0)) {
        return false;
    }
    else return true;
}

function gameEngine() {
    // ********** Updating the snake array and food ***********
    if (isCollide(snakeArray)) {
        alert("Game Over. Press any key to start the Game...");
        inputDir = { x: 0, y: 0 };
        snakeArray = [
            { x: 15, y: 15 }
        ];
        score = 0;
    }

    // If sanke has eaten the food, then generate a new one, increment the score and add a new dov to snakeArray 
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        food = { x: Math.round(foodA + (foodB - foodA) * Math.random()), y: Math.round(foodA + (foodB - foodA) * Math.random()) };
        score++;
        scoreDiv.textContent = `Score :  ${score}`;
    }

    // ************ Moving the snake ***************
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;





    // ************** Display the snake ***************
    snakeBoard.innerHTML = "";
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("snake-head");
        }
        else snakeElement.classList.add("snake-body");

        snakeBoard.appendChild(snakeElement);
    });

    //************** Display the food *******************
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snake-food');
    snakeBoard.appendChild(foodElement);

}

 //************ Display the score **************
 let scoreDiv = document.createElement("div");
 scoreDiv.classList.add("score-div");
 scoreDiv.textContent = `Score :  ${score}`;
 containerDiv.appendChild(scoreDiv);

// ****************** Main Logic ****************************
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };

    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
        // case " ":
        //     if (activate) activate = false;
        //     else activate = true;
        default:
            break;
    }
});