const NUM_ACROSS = 10;
const NUM_DOWN = 10;
const GRID_WIDTH = 1200;
const GRID_HEIGHT = 800;
const CIRCLE_WIDTH = GRID_WIDTH/NUM_ACROSS;
const CIRCLE_HEIGHT = GRID_HEIGHT/NUM_DOWN;
const imageCircles = [];



function setup(){

    createCanvas(GRID_WIDTH, GRID_HEIGHT, WEBGL);
    noStroke();




}

function draw(){
    // if(imgPathsFromFirestore.length > 0){
    //     console.log(imgPathsFromFirestore);
    // }
    background(20);
    translate(-GRID_WIDTH/4, -GRID_WIDTH/4, 0);
    if(imageCircles.length > 0){
        // console.log('hi');
        imageCircles.forEach(imageCircle => {
            imageCircle.update();
            push();
            imageCircle.display();
            pop();
        })
    }
}


function initCircles(imgArray){
    let counter = 0;
    let rowCounter = 0;
    imgArray.forEach((img,i) => {   
        const x = (i % NUM_ACROSS) * CIRCLE_WIDTH;
        const y = rowCounter * CIRCLE_HEIGHT;
        
        imageCircles.push(new ImageCircle(img, x, y, CIRCLE_WIDTH, CIRCLE_HEIGHT))

        if(counter > NUM_ACROSS){
            counter = 0;
            rowCounter ++
        } else {
            counter++
        }
    })
}


//take image paths from firestore and load them into buffers
function loadImages(){

    //load images here; do I need to do this without p5?

    initCircles(images)
}