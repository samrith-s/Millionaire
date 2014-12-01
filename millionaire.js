var base = new Environment("base");
var ladder = new Environment("ladder");
var lifelines = new Environment("lifelines");
var kbc_lifeline = new Environment("kbc_lifeline");
var poll = new Environment("poll");
var player = new Entity("player");
var pollSelected;
var halfSelected;
var changeSelected;
var flag;
var pointsEarned;

$(function () {
    initTheme();
    initGame();
    playGame();
});

function initTheme() {
    loadConfig(base);
    $("#message").css({"background": "url(img/kbc-endgame-texture.jpg)", opacity: "0.9"})

    loadConfig(ladder);
    loadConfig(lifelines);
    loadConfig(kbc_lifeline);
    $("#kbc_lifeline").attr("id", "kbc-lifeline");
    $("#kbc-lifeline").css({"background": "url(img/kbc-lifeline-panel-texture.jpg)", opacity: "0.9"});

    loadConfig(poll);
    $("#poll").css({"background": "url(img/kbc-lifeline-panel-texture.jpg)", opacity: "0.9"});
    initQuiz();
    loadConfig(player);
    runGlobalObservers();
    player.setState('1');
    player.location(ladder.kbc_ladder01_text);
    var lives = new Currency("lives");
    player.createWallet(lives, 0, 1, 1);
    $("#base img").attr("id", "kbc-back")
}

function runGlobalObservers() {
    $("#kbc-lifeline1-img").mouseover(function() {
        $("#lifelines").append($('<div />', {id: "life1", class:"lifeline-text", text: "Audience Poll"}))
        $("#life1").css({"background": "url(img/kbc-lifeline-texture.jpg)", opacity: "0.9"});
    });

    $("#kbc-lifeline2-img").mouseover(function() {
        $("#lifelines").append($('<div />', {id: "life2", class:"lifeline-text", text: "50-50"}))
        $("#life2").css({"background": "url(img/kbc-lifeline-texture.jpg)", opacity: "0.9"});
    });

    $("#kbc-lifeline3-img").mouseover(function() {
        $("#lifelines").append($('<div />', {id: "life3", class:"lifeline-text", text: "Change Question"}))
        $("#life3").css({"background": "url(img/kbc-lifeline-texture.jpg)", opacity: "0.9"});
    });

    $("#lifelines .location").mouseout(function() {
        $(".lifeline-text").remove();
    });
}

function initGame() {
    pollSelected = false;
    halfSelected = false;
    changeSelected = false;
    flag = 0;
    pointsEarned = 0;
    quizShuffle();

}

function quizShuffle() {
    for(var i in Question.all)
        Question.all[i].options = shuffle(Question.all[i].options);

    Question.all = shuffle(Question.all);
}

function answerHover() {
    $(".kbc-answer-block").mouseover(function() {
        $("#"+$(this).attr("id")).css({"background": "rgba(255, 136, 0, 0.85)"});
    });
    $(".kbc-answer-block").mouseout(function() {
        $("#"+$(this).attr("id")).css({"background": "url(img/kbc-answer-texture.jpg)", opacity: "0.85"});
    });
}

function playGame() {
    question = Question.getQuestion(1, flag);
    $('#quiz').fadeIn(function () {
        Question.showQuizPanel(quiz, question);
        $("#kbc-question").css({"background": "url(img/kbc-question-texture.jpg)", opacity: "0.85"});
        $(".kbc-answer-block").css({"background": "url(img/kbc-answer-texture.jpg)", opacity: "0.85"});
        answerHover();
    });
    $(question).unbind('answered').on('answered', function (e, data) {
        flag++;
        if (data.correct == "true") {
            $("#"+data.id).css({"background": "rgba(0, 130, 0, 0.85)"});
            pointsEarned += parseInt(data.points);
            $("#quiz").fadeOut(function () {
                quiz.setState('default');
                ladder[player.location().name].setState('complete');
                if (player.location().name == 'kbc_ladder10_text')
                    victory();
                else {
                    player.location(ladder.nextLocation(player.location()));
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


    $("#kbc-lifeline1-img").unbind('click').on('click', function () {
        if(pollSelected == false) {
            $("#lifelines .location").css({"pointer-events": "none"});
            $("#kbc-lifeline").html('If you use this lifeline, audience members will use touch pads to designate what they believe the correct answer to be. After the audience have chosen their choices, the results are displayed to the contestant in percentages in bar-graph format.').fadeIn();
            $("#kbc-lifeline").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").fadeOut();

            $("#messageOk").unbind('click').on('click', function () {
                $("#kbc-lifeline").fadeOut();
                $("#poll").fadeIn();
                $("#poll").append('<div id="messageOk2">Ok</div>');
                pollSelected = true;

                usePoll();

                $("#messageOk2").unbind('click').on('click', function () {
                    $("#lifelines .location").css({"pointer-events": "auto"});
                    $("#poll").fadeOut();
                    $("#quiz").fadeIn();
                    lifelines["kbc-lifeline1-img"].setState("complete");
                });

            });
            $("#messageCancel").unbind('click').on('click', function (){
                $("#lifelines .location").css({"pointer-events": "auto"});
                $("#kbc-lifeline").fadeOut();
                $("#quiz").fadeIn();
            });

        }
    });


    $("#kbc-lifeline2-img").unbind('click').on('click', function () {
        if(halfSelected == false) {
            $("#lifelines .location").css({"pointer-events": "none"});

            //$("#half").addClass('lifeline-selected');
            $("#kbc-lifeline").text("If you use this lifeline, the computer will randomly remove and eliminate two of the 'wrong' answers.").show();
            $("#kbc-lifeline").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").fadeOut();
            $("#messageOk").unbind('click').on('click', function () {
                halfSelected = true;
                $("#lifelines .location").css({"pointer-events": "auto"});
                $("#kbc-lifeline").fadeOut();
                useHalf();
                $("#quiz").fadeIn();
                lifelines["kbc-lifeline2-img"].setState("complete");
            });
            $("#messageCancel").unbind('click').on('click', function (){
                $("#lifelines .location").css({"pointer-events": "auto"});
                $("#kbc-lifeline").fadeOut();
                $("#quiz").fadeIn();
            });
        }
    });
    $("#kbc-lifeline3-img").unbind('click').on('click', function () {

        if(changeSelected == false) {
            $("#lifelines .location").css({"pointer-events": "none"});
            //$("#change").addClass('lifeline-selected');
            $("#kbc-lifeline").text("If you use this lifeline, the computer will replace this question with another of the same monetary value.").fadeIn();
            $("#kbc-lifeline").append(   '<p><span id="messageOk">Use</span>' +
                '<span id="messageCancel">Cancel</span></p>');
            $("#quiz").hide();
            $("#messageOk").unbind('click').on('click', function () {
                changeSelected = true;
                $("#lifelines .location").css({"pointer-events": "auto"});
                $("#kbc-lifeline").fadeOut();
                flag++;
                playGame();
                lifelines["kbc-lifeline3-img"].setState("complete");
            });
        }
        $("#messageCancel").unbind('click').on('click', function (){
            $("#lifelines .location").css({"pointer-events": "auto"});
            $("#kbc-lifeline").fadeOut();
            $("#quiz").fadeIn();
        });
    });
}

function usePoll() {
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

function useHalf() {
    while(true) {
        var random1 = randBetween(0,100)%4;
        var random2 = randBetween(0,100)%4;
        while(random1 == random2) {
            random2 = randBetween(0,100)%4;
        }

        if((question.options[random1].correct == "false") && (question.options[random2].correct == "false")) {
            console.log(random1, random2);
            $(".kbc-answer-block").eq(random1).hide();
            $(".kbc-answer-block").eq(random2).hide();
            break;
        }
    }
}

function victory() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Win!</span>" +
        "<p><i>You scored " + pointsEarned + " Points.</i></p>");
    console.log(pointsEarned);
}

function defeat() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Lose!</span>" +
        "<p><i>You scored " + pointsEarned + " Points.</i></p>");
    console.log(pointsEarned);

}




