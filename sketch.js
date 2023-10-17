var hypnoticBall, hypnoticBall2, database;
var position;

function setup() {
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);

    hypnoticBall = createSprite(250,250,20,20);
    hypnoticBall.shapeColor = "#FF8C00";
    hypnoticBall2 = createSprite(240,240,20,20);
    hypnoticBall2.shapeColor = "blue";

    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value", readPosition, showError);
    var hypnoticBallPosition2 = database.ref('ball2/position');
    hypnoticBallPosition2.on("value", readPosition2, showError);
}

function draw() {
    background("#8A2BE2");
    if(position !== undefined) {
        if(keyDown(LEFT_ARROW)) {
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)) {
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)) {
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)) {
            writePosition(0,+1);
        }
    }

    if(position !== undefined) {
        if(keyDown("A")) {
            writePosition2(-1,0);
        }
        else if(keyDown("D")) {
            writePosition2(1,0);
        }
        else if(keyDown("W")) {
            writePosition2(0,-1);
        }
        else if(keyDown("S")) {
            writePosition2(0,+1);
        }
    }
    drawSprites();
    
}

function writePosition(x,y) {
    database.ref('ball/position').set({
        'x': position.x + x ,
    	'y': position.y + y
    })
}

function writePosition2(x,y) {
    database.ref('ball2/position').set({
        'x': position2.x + x ,
    	'y': position2.y + y
    })
}

function readPosition(data) {
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function readPosition2(data) {
    position2 = data.val();
    hypnoticBall2.x = position2.x;
    hypnoticBall2.y = position2.y;
}

function showError() {
    console.log("Error in writing to the database");
}