var mainState = {
    preload: function() { 
        game.load.json('data', 'movingUp.json');
        game.load.image('floor', 'assets/floor.png');
        game.load.image('gameBackground', 'assets/gameBackground.png');
        game.load.image('main', 'assets/testCharacter.png');
        game.load.image('man', 'assets/man.png');
        game.load.image('trigger', 'assets/trigger.png');
        game.load.image('dBubble', 'assets/dialogueBubble.png');
        game.load.image('D1O1Button', 'assets/D1O1.png');
        game.load.image('D1O2Button', 'assets/D1O2.png');
        game.load.image('button', 'assets/buttons.png');
        game.load.image('GOBackground', 'assets/GOBackground.png');
        game.load.image('compliment1', 'assets/compliment1.png');
        game.load.image('compliment2', 'assets/compliment2.png');
        game.load.image('compliment3', 'assets/compliment3.png');
    },
    
    
    
    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.background = game.add.image(0, 0, 'gameBackground');
        this.floor = game.add.sprite(0, 520, 'floor');
        
        //enable physics on the floor
        this.floor.enableBody = true; 
        this.floor.immovable = true;
        game.physics.enable(this.floor, Phaser.Physics.ARCADE);
        
        //adding in characters
        this.main = game.add.sprite(30, 277, 'main');
        this.main.scale.set(.10, .10);
        this.main.enableBody = true; 
        game.physics.enable(this.main, Phaser.Physics.ARCADE);
        
        this.man = game.add.sprite(460, 227, 'man');
        this.man.scale.set(.3, .3);
        
        this.dBubble = game.add.sprite(330, 100, 'dBubble');
        this.dBubble.scale.set(.15,.15);
        
        
        this.goodButton = game.add.button(80, 523, 'button', this.goodClick, this, 2, 1, 0);
        
        this.okButton = game.add.button(290, 523, 'button', this.okClick, this, 2, 1, 0);
        
        this.badButton = game.add.button(498, 523, 'button', this.badClick, this, 2, 1, 0);
        
        
        //Main Character text
        
        this.goodTextStyle = { font: 'bold 12pt Arial', fill: 'black', align: 'center', wordWrap: true, wordWrapWidth: 190 };
        this.goodText = game.add.text(83, 523, "I'm going for it", this.goodTextStyle);
        
        this.okTextStyle = { font: 'bold 12pt Arial', fill: 'black', align: 'center', wordWrap: true, wordWrapWidth: 180 };
        this.okText = game.add.text(293, 523, "I am about 60% qualified, so maybe.", this.okTextStyle);
        
        this.badTextStyle = { font: 'bold 12pt Arial', fill: 'black', align: 'center', wordWrap: true, wordWrapWidth: 180 };
        this.badText = game.add.text(500, 523, "I'm not qualified so, no", this.goodTextStyle);
        
        //Protagonist Text
        
        this.pTextStyle = { font: 'bold 12pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 150 };
        this.pText = game.add.text(390, 130, "I wonder who is going to apply to replace Ben Smith as CEO of Intellitech", this.pTextStyle);
        
        
        //game text
        this.confidencePointsLabel = "Confidence Points: ";
        this.labelConfidencePointsLabel = game.add.text(240, 30, this.confidencePointsLabel,{font: "30px Arial", fill: '#000000'});
        
        this.confidencePoints = 0;
        this.labelConfidencePoints = game.add.text(500, 30, this.confidencePoints,{font: "30px Arial", fill: '##000000'});
        
        this.GOTextStyle = { font: 'bold 80pt Arial', fill: 'white', align: 'left'};
        this.factTextStyle = { font: 'bold 30pt Arial', fill: 'white', align: 'left' , wordWrap: true, wordWrapWidth: 750 };
        
        this.winTextStyle = { font: 'bold 70pt Arial', fill: 'white', align: 'left'};
        this.factTextStyle = { font: 'bold 30pt Arial', fill: 'white', align: 'left' , wordWrap: true, wordWrapWidth: 750 };
        
        
        //weird test things
        
        this.clicked = 0;

        
        this.facts=["Only 8.3 percent of venture capital-funded U.S. tech startups founded in 2014 were led by women CEOs. Great job fighting the odds!", "Only 18% of bachelor’s degrees in computer science in America were awarded to women in 2013. Great job fighting the odds!", "Men apply for a job when they meet only 60% of the qualifications, but women apply only if they meet 100% of them. You are qualified to do this job, you can do it!", "40 percent of women with a degree in one of the tech fields reportedly either never enter their field or drop out within five years. Don't give up!" ];
        
       
    },
        
    
    
    update: function() {
       
        //Dialogue Algorythmn 
        if (this.goodButton.callback) {
            console.log("Good job");
        }
        
        //this.goodButton.onClick();
        
        
    },
    
    //CUSTOM FUNCTION LIST
    
    removeText: function() {

        this.text.text="";
        //text = null;

    },
    
   goodClick: function() {
       
       if(this.clicked == 0) {
           console.log("I'm clicked");
           this.goodText.text = "I already applied";
           this.okText.text = "I'm decently qualified for it";
           this.badText.text = "Haha, that was a good joke by me... :(";
           this.pText.text = "HaHa, that's a good one, you applying for CEO";
           this.confidencePoints = this.confidencePoints + 20;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 1) {
           console.log("I'm clicked");
           this.goodText.text = "I got 2 up on you, pretty and a better coder";
           this.okText.text = "Who says I can't be pretty and code";
           this.badText.text = "That's it, I'm leaving the tech industry";
           this.pText.text = "You can't be CEO. You're even too pretty to be a programmer";
           this.confidencePoints = this.confidencePoints + 40;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 2) {
           console.log("I'm clicked");
           this.goodText.text = "I have the best application.";
           this.okText.text = "What makes you think I can't do it";
           this.badText.text = "I'm not a man, so I don't know best";
           this.pText.text = "You' really think YOU can handle that position?'";
           this.confidencePoints = this.confidencePoints + 60;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 3) {
           console.log("I'm clicked");
           this.goodText.text = "If I can't be CEO, I'll start my own company";
           this.okText.text = "Give me a chance and I'll prove you wrong";
           this.badText.text = "You're right, I don't stand a chance";
           this.pText.text = "This company will fail under your leadership";
           this.confidencePoints = this.confidencePoints + 80;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if (this.clicked == 4){
           this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.winText = game.add.text(20, 50, "Congratulations!", this.winTextStyle);
            this.labelConfidencePointsLabel = game.add.text(100, 200, this.confidencePointsLabel,{font: "50px Arial", fill: '#FFF'});
            this.labelConfidencePoints = game.add.text(530, 200, this.confidencePoints,{font: "50px Arial", fill: '#FFF'});
            this.factText = game.add.text(50, 300, "Only 8.3 percent of venture capital-funded U.S. tech startups founded in 2014 were led by women CEOs. Great job fighting the odds!", this.factTextStyle);
       }
       
       
        
        
    },
    
    okClick: function() {
        console.log("ok click");
       if(this.clicked == 0) {
           console.log("I'm clicked");
           this.goodText.text = "I actually already applied";
           this.okText.text = "Do you want a copy of my resume?";
           this.badText.text = "I was kidding! Me, CEO?";
           this.pText.text = "You really think you can go for this?";
           this.confidencePoints = this.confidencePoints + 10;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 1) {
           console.log("I'm clicked");
           this.goodText.text = "I have the best application";
           this.okText.text = "What makes you think I can't do it";
           this.badText.text = "That's it, I'm leaving the tech industry";
           this.pText.text = "You really think YOU can handle that position?";
           this.confidencePoints = this.confidencePoints + 20;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 2) {
           console.log("I'm clicked");
           this.goodText.text = "I'll be really cute when I get the job";
           this.okText.text = "You think I'm too cute for this";
           this.badText.text = "...";
           this.pText.text = "Awww! Look at you...";
           this.confidencePoints = this.confidencePoints + 30;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
       
       else if(this.clicked == 3) {
           console.log("I'm clicked");
           this.goodText.text = "If I can't be CEO, I'll start my own company";
           this.okText.text = "Give me a chance and I'll prove you wrong";
           this.badText.text = "You're right, I don't stand a chance";
           this.pText.text = "Even if your resume is good, you couldn't handle the position";
           this.confidencePoints = this.confidencePoints + 40;
           this.labelConfidencePoints.text = this.confidencePoints;
           this.displayCompliments();
           this.clicked++;
           console.log(this.clicked);
       }
        
        else if (this.clicked == 4){
           this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.winText = game.add.text(20, 50, "Congratulations!", this.winTextStyle);
            this.labelConfidencePointsLabel = game.add.text(100, 200, this.confidencePointsLabel,{font: "50px Arial", fill: '#FFF'});
            this.labelConfidencePoints = game.add.text(530, 200, this.confidencePoints,{font: "50px Arial", fill: '#FFF'});
            this.labelConfidencePointsLabel
            this.factText = game.add.text(50, 300, "Only 18% of bachelor’s degrees in computer science in America were awarded to women in 2013. Great job fighting the odds!", this.factTextStyle);
       }
        
        
        
    },
    
    badClick: function() {
        
        if(this.clicked == 0){
            console.log("bad click");
            this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.GOText = game.add.text(150, 150, "Try Again!", this.GOTextStyle);
            this.factText = game.add.text(25, 300, "Men apply for a job when they meet only 60% of the qualifications, but women apply only if they meet 100% of them. You are qualified to do this job, you can do it!", this.factTextStyle);
             
        }
        
        else if(this.clicked == 1) {
            console.log("bad click");
            this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.GOText = game.add.text(150, 150, "Try Again!", this.GOTextStyle);
            this.factText = game.add.text(25, 300, "A survey of 210 women in the valley found that 60% had experienced unwanted sexual advances and that two-thirds felt excluded from important social and networking opportunities"
, this.factTextStyle);
        }
        
        else if (this.clicked == 2){
            this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.GOText = game.add.text(150, 150, "You Can Do It!", this.GOTextStyle);
            this.factText = game.add.text(25, 300, "40 percent of women with a degree in one of the tech fields reportedly either never enter their field or drop out within five years. Don't give up!"
, this.factTextStyle);
        }
        
        else if (this.clicked == 3){
            this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.GOText = game.add.text(150, 150, "Try Again!", this.GOTextStyle);
            this.factText = game.add.text(25, 300, "PayScale, a research firm, has found that only 21% of American tech executives are female. Defeat the odds!", this.factTextStyle);
        }
        
        else if (this.clicked == 4){
            this.clicked++;
            console.log(this.clicked);          
            this.background = game.add.image(0, 0, 'GOBackground');
            this.GOText = game.add.text(150, 150, "Try Again!", this.GOTextStyle);
            this.factText = game.add.text(25, 300, "PayScale, a research firm, has found that only 21% of American tech executives are female. Defeat the odds!", this.factTextStyle);
        }
        
    },
    
    displayCompliments: function(){
        if(this.confidencePoints >= 30){
            this.compliment1 = game.add.image(400, -200, 'compliment1');
            this.compliment1.scale.set(.4, .4);
        }
        if(this.confidencePoints >= 100){
            this.compliment2 = game.add.image(-260, -180, 'compliment2');
            this.compliment2.scale.set(.5, .5);
        }
        if(this.confidencePoints > 190){
            this.compliment3 = game.add.image(440, -40, 'compliment3');
            this.compliment3.scale.set(.4, .4);
        }
    },
    
    genRandomInt: function(min, max){
        return Math.floor(Math.random()*(max - min)+ min);
    } 
    
    
    
};

//initializes Phaser, and create a 400px by 490px game
var game = new Phaser.Game(800, 600);

//adds the 'mainState' and call it 'main'
game.state.add('main', mainState); 

//start the state to start the game
game.state.start('main');