let heights = []; //Change bars with user
//Different sort algos
//change speed
let start = true;
let bars = 50;
let str = document.cookie
let speed = "slow";

//ars = str.slice(5, str.indexOf(';'))
console.log(speed);
//speed = str.slice(str.indexOf('speed') + 6)
console.log(bars);
const NE = document.getElementById('numElements');
const SPEED = document.getElementById('speed');
const container = document.getElementById("container");
let stop = false;
let START = true;
NE.value = bars;
SPEED.value = speed
const width = window.innerWidth;
var setHeights = () => {
    heights = [];
    for (let i = 0; i < bars; i++) {
        heights.push(Math.random() * bars + 20);
    }
};
NE.addEventListener('change', () => {
    

    if(parseInt(NE.value)!= bars){
        document.cookie = "bars=" + parseInt(NE.value);
        bars = parseInt(NE.value);
        console.log(bars);
        reset();
    }
});
SPEED.addEventListener('change', () => {
    speed = SPEED.value;
    document.cookie = "speed=" + speed;
    console.log(speed);
})
console.log(heights);
var setup = () => {
    setHeights();
    container.querySelectorAll('*').forEach(n => n.remove());
    for (let i = 0; i < bars; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.className = "bar";
        newDiv.style.width = width / (bars + 0.2 * bars) + "px";
        newDiv.style.height = heights[i] + "px";
        container.appendChild(newDiv);
    }
};
var reset = () => {
    stop = true;
    setup();
    stop = false;
}
document.addEventListener("DOMContentLoaded", () => {
    console.log('loaded');
    setup();
});
document.getElementsByClassName("SSort")[0].addEventListener("click", () => {
    if(start){
        start = false;
        new Promise((resolve, reject) => {
            selectionSort();
        }).then(() => {
            start = true;
            resolve();
        })    
    }
    
    //visualize(moves);
});
var draw = () => {
    for (var i = 0; i < bars; i++) {
        var curr = document.getElementById(i + "");
        curr.style.height = heights[i];
    }
};
document.getElementsByClassName('reset')[0].addEventListener('click', () => {
    setup();
})
var redraw = (i, j) => {

    // document.getElementById('' + i).style.backgroundColor = "red";
    //document.getElementById('' + j).style.backgroundColor = "red";
    let temp = document.getElementById("" + i).style.height;
    document.getElementById("" + i).style.height = document.getElementById("" + j).style.height;
    document.getElementById("" + j).style.height = temp;
};
var getNum = (speed) => {
    return (speed=='slow') ? 1500 : ((speed=='medium') ? 1000 : ((speed=='fast') ? 500 : (speed=="veryfast") ? 150 : 50));
}
var selectionSort = () => {
    for (let i = 0; i < heights.length; i++) {
        if(stop){
            break;
        }
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
            document.getElementById('' + i).style.backgroundColor = "red";
            document.getElementById('' + minInd).style.backgroundColor = "red";
            redraw(i, minInd);

        }, i * getNum(speed))
        setTimeout(() => {
            document.getElementById('' + i).style.backgroundColor = "blue";
            document.getElementById('' + minInd).style.backgroundColor = "blue";
        }, (i + 1) * getNum(speed))

    }
};

