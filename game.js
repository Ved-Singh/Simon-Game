var level = 1;
let userpattern = [];
let ourpattern = [];

// start the game by keypress

$(document).on("keypress", function () {
    playaudio("red");
    animateButton("#red", "pressed");

    setTimeout(() => {
        $("#level-title").html("Level " + level);
        nextsequence();
    }, 1000);

});


// generate sequence and play the sequence

const colors = ['green', 'red', 'blue', 'yellow'];
function nextsequence() {

    var rn = Math.random();
    rn *= 4;
    rn = Math.floor(rn);
    var randomcolor = colors[rn];

    $("#level-title").html("Level " + level);
    level += 1;
    // console.log(randomcolor);
    ourpattern.push(rn);
    sequence(ourpattern);
    function sequence(ourpattern){
        var i = 0;
        while (i < ourpattern.length) {
          (function(i) {
            setTimeout(function() {
                
                playaudio(document.getElementById(colors[ourpattern[i]]).id);
                animateButton(document.getElementById(colors[ourpattern[i]]), "pressed");
                
                
            }, 500 * (i+1))
          })(i++)
        }
      };
    console.log(ourpattern);
    setTimeout(() => {
        {}
    }, (level) * 150 + 1000);
}


//check usersequence 

function detect(tile) {
    userpattern.push(tile);
    var index = userpattern.length - 1;
    var remainingclicks = ourpattern.length - userpattern.length;

    if (colors[ourpattern[index]] !== userpattern[index]) {
        endgame("Game Over. Press any key to start again -_-");
        return;
    }
    if (colors[ourpattern[index]] === userpattern[index]) {
        if (userpattern.length === 20) {
            endgame("Congrats you have won all 20 levels!!!")
            return;
        }
    }
    if (remainingclicks === 0) {
        userpattern = [];
        $("h1").text("Level " + level);
        setTimeout(() => {
            nextsequence();
        }, 2000);
        return;
    }
}


// detect button clicks of user

$(".btn").on("click", function (event) {

    playaudio(event.target.id);
    animateButton(event.target, "pressed");
    detect(event.target.id);
});


// end game and start anew

function endgame(text) {

    ourpattern = [];
    userpattern = [];
    animateButton("body", "game-over");
    playaudio("wrong");
    level=1;
    $(".btn").addClass("unclickable");
    $("#level-title").html(text);

}


//button animation and audio

function playaudio(id) {
    switch (id) {
        case "green":
            var a = new Audio("sounds/green.mp3");
            a.play();
            break;
        case "blue":
            var b = new Audio("sounds/blue.mp3");
            b.play();
            break;
        case "red":
            var c = new Audio("sounds/red.mp3");
            c.play();
            break;
        case "yellow":
            var d = new Audio("sounds/yellow.mp3");
            d.play();
            break;

        default:
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;
    }
}
function animateButton(id, Class) {
    $(id).addClass(Class);
    setTimeout(function () {
        $(id).removeClass(Class);
    }, 150);
}
