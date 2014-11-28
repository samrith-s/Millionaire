var config = {};
config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='img/background1.jpg'/>"}
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
        {name: "rung9", sequence: 9, states: [
            {name: "complete", representation: "<span class='completed'>1000000</span>"},
            {name: "default", representation: "<span>1000000</span>"}

        ]},
        {name: "rung8", sequence: 8, states: [
            {name: "complete", representation: "<span class='completed'>500000</span>"},
            {name: "default", representation: "<span>500000</span>"}
        ]},
        {name: "rung7", sequence: 7, states: [
            {name: "complete", representation: "<span class='completed'>200000</span>"},
            {name: "default", representation: "<span>200000</span>"}
        ]},
        {name: "rung6", sequence: 6, states: [
            {name: "complete", representation: "<span class='completed'>100000</span>"},
            {name: "default", representation: "<span>100000</span>"}

        ]},
        {name: "rung5", sequence: 5, states: [
            {name: "complete", representation: "<span class='completed'>50000</span>"},
            {name: "default", representation: "<span>50000</span>"}

        ]},
        {name: "rung4", sequence: 4, states: [
            {name: "complete", representation: "<span class='completed'>20000</span>"},
            {name: "default", representation: "<span>20000</span>"}

        ]},
        {name: "rung3", sequence: 3, states: [
            {name: "complete", representation: "<span class='completed'>10000</span>"},
            {name: "default", representation: "<span>10000</span>"}

        ]},
        {name: "rung2", sequence: 2, states: [
            {name: "complete", representation: "<span class='completed'>5000</span>"},
            {name: "default", representation: "<span>5000</span>"}

        ]},
        {name: "rung1", sequence: 1, states: [
            {name: "complete", representation: "<span class='completed'>2000</span>"},
            {name: "default", representation: "<span>2000</span>"}

        ]},
        {name: "rung0", sequence: 0, states: [
            {name: "complete", representation: "<span class='completed'>1000</span>"},
            {name: "default", representation: "<span>1000</span>"}

        ]}
    ]
};
config.lifelines = {
    type: "environment",
    states: [
        {name: "default", representation: ""},

    ],
    locations: [
        {name: "poll", sequence: 0, states: [
            {name: "complete", representation: "<img src='img/poll-disabled.png'/>"},
            {name: "default", representation: "<img src='img/poll.png'/>"}
        ]},
        {name: "half", sequence: 0, states: [
            {name: "complete", representation: "<img src='img/50-50-disabled.png'/>"},
            {name: "default", representation: "<img src='img/50-50.png'/>"}
        ]},
        {name: "change", sequence: 0, states: [
            {name: "complete", representation: "<img src='img/change-disabled.png'/>"},
            {name: "default", representation: "<img src='img/change.png'/>"}
        ]}
    ]
};


config.player = {
    type: "entity",
    states: [
        {name: "default", representation: ""}
    ]
};

config.messageBox = {
    type:"environment",
    states:[
        {name:"messageBox",representation:""}
    ]
};

config.fifty_fifty = {
    type:"environment",
    states:[
        {name:"fifty-fifty",representation:""}
    ],
    locations: [
        {name: "A", sequence: 0, states: [
            {name: "default", representation: "A"}
        ]},
        {name: "B", sequence: 1, states: [
            {name: "default", representation: "B"}
        ]},
        {name: "C", sequence: 2, states: [
            {name: "default", representation: "C"}
        ]},
        {name: "D", sequence: 3, states: [
            {name: "default", representation: "D"}
        ]}
    ]
}
