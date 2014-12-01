var config = {};
config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='img/background.jpg'/>"}
    ],
    locations: [
        {name: "message-box", states: [
            {name: "message", representation: "<div id='message'></div>"}
        ]}
    ]
};
config.ladder = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "kbc_ladder10_text", sequence: 9, states: [
            {name: "complete", representation: "<span class='completed'>$ 1,000,000</span>"},
            {name: "default", representation: "<span>$ 1,000,000</span>"}

        ]},
        {name: "kbc_ladder09_text", sequence: 8, states: [
            {name: "complete", representation: "<span class='completed'>$ 500,000</span>"},
            {name: "default", representation: "<span>$ 500,000</span>"}
        ]},
        {name: "kbc_ladder08_text", sequence: 7, states: [
            {name: "complete", representation: "<span class='completed'>$ 200,000</span>"},
            {name: "default", representation: "<span>$ 200,000</span>"}
        ]},
        {name: "kbc_ladder07_text", sequence: 6, states: [
            {name: "complete", representation: "<span class='completed'>$ 100,000</span>"},
            {name: "default", representation: "<span>$ 100,000</span>"}

        ]},
        {name: "kbc_ladder06_text", sequence: 5, states: [
            {name: "complete", representation: "<span class='completed'>$ 50,000</span>"},
            {name: "default", representation: "<span>$ 50,000</span>"}

        ]},
        {name: "kbc_ladder05_text", sequence: 4, states: [
            {name: "complete", representation: "<span class='completed'>$ 20,000</span>"},
            {name: "default", representation: "<span>$ 20,000</span>"}

        ]},
        {name: "kbc_ladder04_text", sequence: 3, states: [
            {name: "complete", representation: "<span class='completed'>$ 10,000</span>"},
            {name: "default", representation: "<span>$ 10,000</span>"}

        ]},
        {name: "kbc_ladder03_text", sequence: 2, states: [
            {name: "complete", representation: "<span class='completed'>$ 5,000</span>"},
            {name: "default", representation: "<span>$ 5,000</span>"}

        ]},
        {name: "kbc_ladder02_text", sequence: 1, states: [
            {name: "complete", representation: "<span class='completed'>$ 2,000</span>"},
            {name: "default", representation: "<span>$ 2,000</span>"}

        ]},
        {name: "kbc_ladder01_text", sequence: 0, states: [
            {name: "complete", representation: "<span class='completed'>$ 1,000</span>"},
            {name: "default", representation: "<span>$ 1,000</span>"}

        ]}
    ]
};

config.lifelines = {
    type: "environment",
    states: [
        {name: "default", representation: ""}

    ],
    locations: [
        {name: "kbc-lifeline-panel", sequence: 0, states: [
            {name: "kbc-lifeline-3", representation: "<div id='kbc-lifeline-3' class='kbc-lifeline-3-space'></div>"},
            {name: "kbc-lifeline-2", representation: "<div id='kbc-lifeline-2' class='kbc-lifeline-2-space'></div>"},
            {name: "kbc-lifeline-1", representation: "<div id='kbc-lifeline-1' class='kbc-lifeline-1-space'></div>"},
            {name: "default", representation: "<span id='default'>Choose any of the Lifeline to help you win the game.</span>"}
        ]},

        {name: "kbc-lifeline1-img", sequence: 0, states: [
            {name: "complete", representation: "<img class='complete' src='img/poll-disabled.png'/>"},
            {name: "default", representation: "<img class='default' src='img/poll.png'/>"}
        ]},
        {name: "kbc-lifeline2-img", sequence: 0, states: [
            {name: "complete", representation: "<img class='complete' src='img/50-50-disabled.png'/>"},
            {name: "default", representation: "<img class='default' src='img/50-50.png'/>"}
        ]},
        {name: "kbc-lifeline3-img", sequence: 0, states: [
            {name: "complete", representation: "<img class='complete' src='img/change-disabled.png'/>"},
            {name: "default", representation: "<img class='default' src='img/change.png'/>"}
        ]}
    ]
};


config.player = {
    type: "entity",
    states: [
        {name: "default", representation: ""}
    ]
};

config.kbc_lifeline = {
    type:"environment",
    states:[
        {name:"kbc_lifeline_text",representation:""}
    ]
};

config.poll = {
    type:"environment",
    states:[
        {name:"poll",representation:"<div class='canvas-holder'><canvas id='abc' width='182' height='145'></canvas></div>"}
    ],
    locations: [
//        {name: "A", sequence: 0, states: [
//            {name: "default", representation: "<div class='poll-bar-text'>A</div><div id='barA' class='poll-bar'></div>"}
//        ]},
//        {name: "B", sequence: 1, states: [
//            {name: "default", representation: "<div class='poll-bar-text'>B</div><div id='barB' class='poll-bar'></div>"}
//        ]},
//        {name: "C", sequence: 2, states: [
//            {name: "default", representation: "<div class='poll-bar-text'>C</div><div id='barC' class='poll-bar'></div>"}
//        ]},
//        {name: "D", sequence: 3, states: [
//            {name: "default", representation: "<div class='poll-bar-text'>D</div><div id='barD' class='poll-bar'></div>"}
//        ]}
    ]
}
