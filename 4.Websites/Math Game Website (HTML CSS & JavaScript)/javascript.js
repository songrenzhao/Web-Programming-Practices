var playing = false;
var score = 0;
var action;
var timeRemain;
var correctAnswer;
//Restart/Start the game
document.getElementById("startreset").onclick=function(){
    if(playing == true){
        location.reload();
    }else{
        playing = true;
        score = 0;
        // Show score box
        document.getElementById("scoreValue").innerHTML = score;
        
        //Show countdown box
        show("timeRemaining");
        timeRemain = 60;
        document.getElementById("second").innerHTML = timeRemain;
        
        //Hide gameOver box
        hide("gameOver");
        
        //Change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //Start countdown
        startCountdown();
        
        //Generate Q&A
        generateQA();
    }
}
//Clicking on answer box
for(var i = 1; i < 5; i++){
    document.getElementById("box" + i).onclick=function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++; //Increase score by 1
                document.getElementById("scoreValue").innerHTML = score; 
                hide("wrong"); //Hide wrong box
                show("correct"); //Show correct box
                setTimeout(function(){ //Duration 
                    hide("correct");
                }, 1000);
                //Generate new Q&A
                generateQA();
            }
            else{
                hide("correct"); 
                show("wrong"); 
                setTimeout(function(){ //Duration 
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

function startCountdown(){ //start counter
    action = setInterval(function(){
        timeRemain -= 1;
        document.getElementById("second").innerHTML = timeRemain;
        if(timeRemain == 0){
            stopCountdown();
            show("gameOver")
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>You score is " + score + ".</p>"
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
function stopCountdown(){ //stop counter
    clearInterval(action);
}
function hide(id){ //hide 
    document.getElementById(id).style.display = "none";
}
function show(id){ //show
    document.getElementById(id).style.display = "block";
}
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(Math.random()*3);
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    for(var i = 1; i < 5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = Math.round(Math.random()*9) * Math.round(Math.random()*9);
            }while(answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}