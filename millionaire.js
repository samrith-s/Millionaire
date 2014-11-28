var base = new Environment("base");
var ladder = new Environment("ladder");
var lifelines = new Environment("lifelines");
var messageBox = new Environment("messageBox");
var fifty_fifty = new Environment("fifty_fifty");
var player = new Entity("player");
var pollSelected;
var halfSelected;
var changeSelected;
var flag;

$(function () {
    initGame();
    playGame();
});

function initGame() {
    loadConfig(base);
    loadConfig(ladder);
    loadConfig(lifelines);
    loadConfig(messageBox);
    loadConfig(fifty_fifty);
    initQuiz();
    loadConfig(player);
    player.setState('1');
    player.location(ladder.rung0);
    var lives = new Currency("lives");
    player.createWallet(lives, 0, 1, 1);
    pollSelected = false;
    halfSelected = false;
    changeSelected = false;
    flag = 0;
    Question.all = shuffle(Question.all);

}

function playGame() {
    question = Question.getQuestion(1, flag);
    $('#quiz').fadeIn(function () {
        Question.showQuizPanel(quiz, question)
    });
    $(question).unbind('answered').on('answered', function (e, data) {
        flag++;
        if (data.correct == "true") {
            quiz.setState("correct");
            $("#quiz").fadeOut(function () {
                quiz.setState('default');
                ladder[player.location().name].setState('complete');
                if (player.location().name == 'rung9')
                    victory();
                else {
                    player.location(ladder.nextLocation(player.location()));
                    //$("#"+player.location().name).append(player);
                    playGame();
                }

            });
        } else {
            player.lives.is(-1);
        }
    });

    $(player.lives).unbind('min').on('min', function () {
        defeat();
    });


    //---------------lifeline function----------------------


    $("#poll").unbind('click').on('click', function () {
        if(pollSelected == false) {
            pollSelected = true;
            $("#messageBox").html('<p>If the contestant uses this lifeline, audience members use touch pads to designate what they believe the correct answer to be. After the audience have chosen their choices, the results are displayed to the contestant in percentages in bar-graph format.</p>').fadeIn();
            $("#messageBox").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").fadeOut();

            $("#messageOk").unbind('click').on('click', function () {
                $("#messageBox").fadeOut();
                $("#fifty_fifty").fadeIn();
                $("#fifty_fifty").append('<div id="messageOk2">Ok</div>');


                poll();
                $("#messageOk2").unbind('click').on('click', function () {
                    $("#fifty_fifty").fadeOut();
                    $("#quiz").fadeIn();
                    lifelines.poll.setState("complete");
                });

            });
            $("#messageCancel").unbind('click').on('click', function (){
                pollSelected = false;
                $("#messageBox").fadeOut();
                $("#quiz").fadeIn();
            });

        }
    });


    $("#half").unbind('click').on('click', function () {
        if(halfSelected == false) {
            halfSelected = true;
            //$("#half").addClass('lifeline-selected');
            $("#messageBox").text("If the contestant uses this lifeline, the host will ask the computer to randomly remove and eliminate two of the 'wrong' answers. This will leave one right answer and one wrong answer, resulting in a situation of eliminating 50% of the choices as well as having a 50% chance of getting the answer right if the contestant is in a situation of making a guess.").show();
            $("#messageBox").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").fadeOut();
            $("#messageOk").unbind('click').on('click', function () {
                $("#messageBox").fadeOut();
                half();
                $("#quiz").fadeIn();
                lifelines.half.setState("complete");
            });
            $("#messageCancel").unbind('click').on('click', function (){
                halfSelected = false;
                $("#messageBox").fadeOut();
                $("#quiz").fadeIn();
            });
        }
    });
    $("#change").unbind('click').on('click', function () {
        if(changeSelected == false) {
            changeSelected = true;
            //$("#change").addClass('lifeline-selected');
            $("#messageBox").text("The computer replaced, at the contestant's request, one question with another of the same monetary value. Any lifelines used on the original question prior to the switching were not reinstated.").fadeIn();
            $("#messageBox").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").hide();
            $("#messageOk").unbind('click').on('click', function () {
                $("#messageBox").fadeOut();
                flag++;
                playGame();
                lifelines.change.setState("complete");
            });
        }
        $("#messageCancel").unbind('click').on('click', function (){
            changeSelected = false;
            $("#messageBox").fadeOut();
            $("#quiz").fadeIn();
        });
    });
}

function poll() {
    var chr = String.fromCharCode(65 + 1);
    var sum = 0;
    for(var i = 0; i < question.options.length; i++) {
        if(i != question.options.length-1) {
            if(question.options[i].correct == "true") {
                var random = randBetween(45, 100);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                $("#"+String.fromCharCode(65 + i)).css({width: random+"%"});
            } else {
                var random = randBetween(0, 50);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                $("#"+String.fromCharCode(65 + i)).css({width: random+"%"});
            }
        } else {
            random = 100-sum;
            $("#"+String.fromCharCode(65 + i)).css({width: random+"%"});
        }
    }
}

function half() {
    while(true) {
        var random1 = randBetween(0,100)%4;
        var random2 = randBetween(0,100)%4;
        while(random1 == random2) {
            random2 = randBetween(0,100)%4;
        }

        if((question.options[random1].correct == "false") && (question.options[random2].correct == "false")) {
            console.log(random1, random2);
            $(".option-block").eq(random1).hide();
            $(".option-block").eq(random2).hide();
            break;
        }
    }
}

function victory() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Win!</span>");
}

function defeat() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Lose!</span>");
}




