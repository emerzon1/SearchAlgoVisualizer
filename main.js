let heights = []; //MERGE SORT, COUNTING SORT
if (document.cookie.indexOf('bars') == -1) {
    document.cookie = 'bars=50';
}
if (document.cookie.indexOf('speed') == -1) {
    document.cookie = 'speed=slow';
}
let start = true;
let bars = 50;
let str = document.cookie
let speed = "slow";
let a;
let b;
speed = str.slice(str.indexOf('speed') + 6, (str.indexOf('speed') != 0) ? str.length : str.indexOf(';'))
console.log(speed);
bars = parseInt(str.slice(str.indexOf('bars') + 5, (str.indexOf('bars') != 0) ? str.length : str.indexOf(';')))
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
        heights.push(Math.random() * 500 + 20);
    }
};

document.getElementById('heapSort').addEventListener('click', async function() {
    if (start) {
        
        start = false;
        heapSort();

    }
})
document.getElementById('quickSort').addEventListener('click', () => {
    if (start) {
        start = false;
        quickSort(0, heights.length-1);
    }
})
document.getElementById('mergeSort').addEventListener('click', () => {
    if (start) {
        start = false;
        mergeSort(0, heights.length-1);
    }
})
var mSort = (start, end) => {
    
}
async function mergeSort(start, end){
    if(start < end){
        let mid = parseInt((start+end)/2);
        await mergeSort(start, mid);
        await mergeSort(mid+1, end);
        await merge(start, mid, end);
    }
}
let mSwaps = 0;
async function merge(start, mid, end){
    let Sa = mid-start+1;
    let Sb = end - mid;
    let left = [];
    let right = [];
    for (var i = 0; i < Sa; i++){ left.push(heights[start+i]);}
    for (var i = 0; i < Sb; i++){ right.push(heights[mid+i+1]);}
    let k = start;
    let j = 0;
    for(let i = 0; i < Sa && j < Sb; k ++){
        if(left[i] < right[i]){
            heights[k] = left[i]
            document.getElementById('' + k).height = heights[k] + "px";
            await color(k);
            i++;
        }
        else{
            heights[k] = right[i];
            document.getElementById('' + k).height = heights[k] + "px";
            await color(k);
            j++;
        }
        mSwaps++;
        document.getElementById('number').textContent = mSwaps;
    }
    for(; i < Sa; i++, k++) {
        heights[k] = left[i];
        document.getElementById('' + k).style.height = heights[k] + "px";
        await color(k);
        mSwaps++;
        document.getElementById('number').textContent = mSwaps;
    }
	for(; j < Sb; j++, k++) {
        heights[k] = right[j];
        document.getElementById('' + k).style.height = heights[k] + "px";
        await color(k);
        mSwaps++;
        document.getElementById('number').textContent = mSwaps;
    }

}
async function color(k){
    setTimeout(() => {
        document.getElementById('' + k).style.backgroundColor = "red"
    }, mSwaps * getNum(speed))
    setTimeout(() => {
        document.getElementById('' + k).style.backgroundColor = "blue"
    }, (mSwaps+1) * getNum(speed))
}
let qSwaps = 0;
async function quickSort(start, end) {
    if(start < end){
        let p = await partition(start, end);
        await quickSort(start, p-1);
        await quickSort(p+1, end);
    }
}
async function partition(start, end){
    let p = heights[end];
    let smallInd = start-1;
    for(let i = start; i < end; i ++){
        if(heights[i] < p){
            smallInd ++;
            await qSwap(i, smallInd);
        }
    }
    await qSwap(smallInd+1, end);
    return smallInd + 1;
}
async function qSwap(indexA, indexB) {
    var temp = heights[indexA]
    let i = qSwaps;
    heights[indexA] = heights[indexB]
    heights[indexB] = temp
    setTimeout(() => {
        if (!stop) {
            document.getElementById('' + indexB).style.backgroundColor = "red";
            document.getElementById('' + indexA).style.backgroundColor = "red";
            redraw(indexA, indexB);
        }
        document.getElementById('number').textContent = i+1;
    }, qSwaps * getNum(speed))

    setTimeout(() => {
        if (!stop) {
            document.getElementById('' + indexA).style.backgroundColor = "blue";
            document.getElementById('' + indexB).style.backgroundColor = "blue";
        }
    }, (qSwaps + 1) * getNum(speed)) 
    qSwaps++;


}

let swaps = 0;
async function maxHeap(i) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let max = i

    if (left < arrLength && heights[left] > heights[max]) {
        max = left
    }

    if (right < arrLength && heights[right] > heights[max]) {
        max = right
    }

    if (max != i) {
        await swap(i, max)
        await maxHeap(max)
    }
}

async function swap(indexA, indexB) {
    const temp = heights[indexA]
    let i = swaps
    heights[indexA] = heights[indexB]
    heights[indexB] = temp
    setTimeout(() => {
        if (!stop) {
            document.getElementById('' + indexB).style.backgroundColor = "red";
            document.getElementById('' + indexA).style.backgroundColor = "red";
            redraw(indexA, indexB);
        }
        document.getElementById('number').textContent = i+1;
    }, swaps * getNum(speed))

    setTimeout(() => {
        if (!stop) {
            document.getElementById('' + indexA).style.backgroundColor = "blue";
            document.getElementById('' + indexB).style.backgroundColor = "blue";
        }
    }, (swaps + 1) * getNum(speed)) 
    swaps++;

}

async function heapSort() {
    arrLength = heights.length

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
        await maxHeap(i)
    }

    for (i = heights.length - 1; i > 0; i--) {
        await swap(0, i);
        arrLength--;

        await maxHeap(0);
    }
    return
}


/*document.getElementById('mergeSort').addEventListener('click', () => {
    if (start) {
        start = false;
        quickSort();
    }


})*/

NE.addEventListener('change', () => {


    if (parseInt(NE.value) != bars) {
        document.cookie = "bars=" + parseInt(NE.value);
        bars = parseInt(NE.value);
        console.log(bars);
        reset();
    }
});
SPEED.addEventListener('change', () => {
    speed = SPEED.value;
    document.cookie = "speed=" + speed;
    //console.log(speed);
})
//console.log(heights);
var setup = () => {
    setHeights();
    container.querySelectorAll('*').forEach(n => n.remove());
    for (let i = 0; i < bars; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.className = "bar";
        newDiv.style.width = (bars==700) ? '1px' : width / (bars + 0.2 * bars) + "px";
        newDiv.style.height = heights[i] + "px";
        container.appendChild(newDiv);
    }
};
var reset = () => {
    location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
    console.log('loaded');
    setup();
});

document.getElementsByClassName("SSort")[0].addEventListener("click", () => {
    if (start) {
        start = false;
        new Promise(async function (resolve, reject) {
            await selectionSort();

        })

        //.catch(() => {})
        //.then(() => {
        //    start = true;

        //})    
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
    location.reload();
})
var redraw = (i, j) => {

    // document.getElementById('' + i).style.backgroundColor = "red";
    //document.getElementById('' + j).style.backgroundColor = "red";
    let temp = document.getElementById("" + i).style.height;
    document.getElementById("" + i).style.height = document.getElementById("" + j).style.height;
    document.getElementById("" + j).style.height = temp;
};
var getNum = (speed) => {
    return (speed == 'slow') ? 1500 : ((speed == 'medium') ? 1000 : ((speed == 'fast') ? 500 : (speed == "veryfast") ? 150 : (speed=='insane') ? 5 : 50));
}

async function selectionSort() {
    for (let i = 0; i < heights.length; i++) {
        if (stop) {
            break;
        }
        let min = 5000;
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


        a = setTimeout(() => {
            if (!stop) {
                document.getElementById('' + i).style.backgroundColor = "red";
                document.getElementById('' + minInd).style.backgroundColor = "red";
                redraw(i, minInd);
            }
            document.getElementById('number').textContent = i+1;
        }, i * getNum(speed))
        setTimeout(() => {
            if (!stop) {
                document.getElementById('' + i).style.backgroundColor = "blue";
                document.getElementById('' + minInd).style.backgroundColor = "blue";
            }
            
        }, (i + 1) * getNum(speed))

    }
    setTimeout(() => { return true; }, (((bars) * (bars - 1)) / 2) * getNum(speed));
    
};

