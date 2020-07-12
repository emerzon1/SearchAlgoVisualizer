let heights = []; //Change bars with user
//Different sort algos
//change speed
let bars = 70;
const container = document.getElementById("container");
const width = window.innerWidth;
var setHeights = () => {
    heights = [];
    for (let i = 0; i < bars; i++) {
        heights.push(Math.random() * bars + 20);
    }
};
console.log(heights);
var setup = () => {
    setHeights();
    for (let i = 0; i < bars; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.className = "bar";
        newDiv.style.width = width / (bars + 0.2 * bars) + "px";
        newDiv.style.height = heights[i] + "px";
        container.appendChild(newDiv);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setup();
});
document.getElementsByClassName("SSort")[0].addEventListener("click", () => {
    selectionSort();
    //visualize(moves);
});
var draw = () => {
    for (var i = 0; i < bars; i++) {
        var curr = document.getElementById(i + "");
        curr.style.height = heights[i];
    }
};
var redraw = (i, j) => {
    //TODO -> change color of bars at i and j
    document.getElementById('' + i).style.backgroundColor = "red";
    document.getElementById('' + minInd).style.backgroundColor = "red";
    let temp = document.getElementById("" + i).style.height;
    document.getElementById("" + i).style.height = document.getElementById("" + j).style.height;
    document.getElementById("" + j).style.height = temp;
};
var selectionSort = () => {
    for (let i = 0; i < heights.length; i++) {
        let min = 500;
        let minInd = i;
        for (let j = i; j < heights.length; j++) {
            if (heights[j] < min) {
                min = heights[j];
                minInd = j;
            }
        }
        let temp = heights[i];
        heights[i] = heights[minInd];
        heights[minInd] = temp;

        setTimeout(() => {

            redraw(i, minInd);
            document.getElementById('' + i).style.backgroundColor = "blue";
            document.getElementById('' + minInd).style.backgroundColor = "blue";
        }, i * 1000);

    }
};

