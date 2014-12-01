var quiz;

config.quiz = {
    type: "environment",
    states: [
        {name: "default", representation: "<div id='kbc-question'></div><div id='options-area'></div>"}
//        {name: "correct", representation: "<div id='msgWindow'></div>"},
//        {name: "wrong", representation: "<img src='img/questionwrong.png'/>"}
    ]
};

function initQuiz() {
    quiz = new Environment("quiz");
    loadConfig(quiz);
    quiz.setState('default');
    loadQuestionBank();
}

function loadQuestionBank() {
    for (var i in   questionbank.questions) {
        var q = questionbank.questions[i];
        var opts = ["a", "b", "c", "d"];
        var optsz = ["", "correct", "points"];
        var options = [];
        var optiones = {};
        for(var i=0; i<opts.length; i++) {
            var temp1 = "opt" + opts[i] + optsz[0];
            var temp2 = "opt" + opts[i] + optsz[1];
            var temp3 = "opt" + opts[i] + optsz[2];

            optiones.option = i+1;
            optiones.name = q[temp1];
            optiones.correct = q[temp2];
            optiones.points = q[temp3];

            options.push(optiones);
            optiones = {};
        }

        new Question(q.statement, q.image, q.weight, options, q.help);
    }
    return true;
}

//function loadQuestionBank() {
//    for (var i in   questionbank.questions) {
//        var q = questionbank.questions[i];
//        new Question(q.statement, q.image, q.weight, q.options, q.help);
//    }
//    return true;
//}


var Question = Class({
    initialize: function (name, image, weight, options, help) {
        this.name = name;
        this.image = image;
        this.weight = weight || 1;
        this.options = options;
        this.help = help;
        Question.all.push(this);
        log.add('Question: ' + name + ' created')
    },
    checkAnswer: function (option, id) {
        var thisAnswer = $.grep(this.options, function (a) {
            return ( a == option );
        })[0];
        return {id: id, correct: thisAnswer.correct, weight: this.weight, points: thisAnswer.points, help: this.help}
    }
});

Question.all = [];

Question.getByWeight = function (weight) {
    var questions = $.grep(Question.all, function (a) {
        return ( a.weight == weight );
    });
    return questions[randBetween(0, questions.length - 1)]
};

Question.getQuestion = function(weight, flag) {
    var questions = $.grep(Question.all, function (a) {
        return ( a.weight == weight );
    });
    return questions[flag];
}

Question.showQuizPanel = function (obj, question) {
    $('#kbc-question').html(question.name);
    $('#options-area').empty().append("<ul></ul>");
    for (var i in question.options) {
        $('#options-area ul').append('<li class="kbc-answer-block" id="kbc-answer-block-' + i + '">' + question.options[i].name + '</li>');
    }
    $('.kbc-answer-block').unbind('click').on('click', function () {
        $this = $(this);
        $(question).trigger("answered", [question.checkAnswer(question.options[parseInt($this.attr("id").split("kbc-answer-block-")[1])], $this.attr("id"))]);
    });
};


