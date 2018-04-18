var game = new Phaser.Game(1920, 1300);

var mainstate = {
    preload: function()
    {
        this.load.image("freshmenGoodBG", "img/freshmenGood.png");
        this.load.image("freshmenBadBG", "img/freshmenBad.png");
        
        this.load.image("seniorGoodBG", "img/seniorGood.png");
        this.load.image("seniorBadBG", "img/seniorBad.png");
        
        this.load.image("fButton", "img/freshmanButton.png");
        this.load.image("sButton", "img/seniorButton.png");
        
        this.load.image("arrow", "img/arrow.png");
    },
    
    create: function()
    {
        
        //
        game.stage.backgroundColor = "#F0F0F0";
        
        //Aglorithm assumes both images are same dimensions, and placed in the same location
        
        //initializing my groups for the two images
        this.freshmenSet = game.add.group();
        this.seniorSet = game.add.group();
        
        //freshmen set cropping
        this.bg = this.add.image(0,0, "freshmenGoodBG");
        this.freshmenSet.add(this.bg);
//        this.bg = this.add.image(0,0, "seniorGoodBG");
        //create the rectangle that will be used to crop this image
        //arguments are: x, y, width, height. We use the original properties of the image to initialize this rectangle
        this.bg.cropRect = new Phaser.Rectangle(this.bg.x, this.bg.y, this.bg.width, this.bg.height);
        this.bgWidth = this.bg.width; //save original width of the image to be used as a maximum later
        
        this.bg2 = this.add.image(0,0, "freshmenBadBG");
        this.freshmenSet.add(this.bg2);
//        this.bg2 = this.add.image(0,0, "seniorBadBG");
        //create another rectangle that will be used to crop the second image
        this.bg2Width = this.bg2.width; //save original width of the second image
        this.bg2X = this.bg2.x; //save the original position of the second image
        this.bg2.cropRect = new Phaser.Rectangle(this.bg2.x, this.bg2.y, this.bg2.width, this.bg2.height);
        
        //senior cropping       
        this.bg3 = this.add.image(0,0, "seniorGoodBG");
        this.seniorSet.add(this.bg3);
//        this.bg = this.add.image(0,0, "seniorGoodBG");
        //create the rectangle that will be used to crop this image
        //arguments are: x, y, width, height. We use the original properties of the image to initialize this rectangle
        this.bg3.cropRect = new Phaser.Rectangle(this.bg3.x, this.bg3.y, this.bg3.width, this.bg3.height);
        this.bg3Width = this.bg3.width; //save original width of the image to be used as a maximum later
        this.bg3.alpha = 0;
        
        this.bg4 = this.add.image(0,0, "seniorBadBG");
        this.seniorSet.add(this.bg4);
//        this.bg2 = this.add.image(0,0, "seniorBadBG");
        //create another rectangle that will be used to crop the second image
        this.bg4.cropRect = new Phaser.Rectangle(this.bg4.x, this.bg4.y, this.bg4.width, this.bg4.height);
        this.bg4Width = this.bg4.width; //save original width of the second image
        this.bg4X = this.bg4.x; //save the original position of the second image
        this.bg4.alpha = 0;
        
        //just a silly little thing to follow the mouse
        this.mouseSprite = this.add.image(this.game.world.width/2, 540, "arrow");
        this.mouseSprite.anchor.set(.5,.5);
        
        //adding the buttons
        this.fButton = game.add.button(200,1085, 'fButton', this.fOnClick, this, 2, 1, 0);
        this.sButton = game.add.button(1200,1085, 'sButton', this.sOnClick, this, 2, 1, 0);
        
        this.cropImage(this.bg.width / 2);
        
    },
    
    update: function()
    {
        
        //add if statement to only make it work game.add.input.activePointer.isDown
        if(game.input.activePointer.isDown){
            this.mouseSprite.x = this.game.input.activePointer.x; //update position of eye to match the mouse's x
            this.cropImage(this.input.activePointer.x); //call our crop function
        }
        
    },
          
    cropImage: function(relativeX)
    {
        //Handle cropping the images
        //the Phaser crop() method physically changes the properties of the sprite. This is the reason
        //we saved some of those properties when we first created the images
        
        //crop the first image, using the relative mouse position as a the width for the new crop rectangle
        this.bg.crop(new Phaser.Rectangle(this.bg.x, this.bg.y, relativeX, this.bg.height));
        
        //crop the second image. We use the relative x position as the crop rectangle's left coordinate
        //the width of the second crop rectangle is the opposite of the first (so the relativeX subtracted from the total width)
        this.bg2.crop(new Phaser.Rectangle(relativeX, this.bg2.y, this.bg2Width - relativeX, this.bg2.height));
        //We now need to move the sprite over to match up with the left side of the crop
        this.bg2.x = relativeX; 
        
        //THE SAME THING BUT WITH THE SENIOR SET
        //crop the first image, using the relative mouse position as a the width for the new crop rectangle
        this.bg3.crop(new Phaser.Rectangle(this.bg3.x, this.bg3.y, relativeX, this.bg3.height));
        
        //crop the second image. We use the relative x position as the crop rectangle's left coordinate
        //the width of the second crop rectangle is the opposite of the first (so the relativeX subtracted from the total width)
        this.bg4.crop(new Phaser.Rectangle(relativeX, this.bg4.y, this.bg4Width - relativeX, this.bg4.height));
        //We now need to move the sprite over to match up with the left side of the crop
        this.bg4.x = relativeX; 
    },
    
    fOnClick: function () {
//
//        this.bg = this.add.image(0,0, "freshmenGoodBG");
//        this.bg2 = this.add.image(0,0, "freshmenBadBG");
        
//        game.world.bringToTop(this.bg);
//        game.world.bringToTop(this.bg2);
        
        this.bg.alpha = 1;
        this.bg.alpha = 1;
        this.bg3.alpha = 0;
        this.bg4.alpha = 0;
        
        game.world.bringToTop(this.mouseSprite);
//        this.mouseSprite = this.add.image(this.game.world.width/2, 540, "arrow");
        
        //this.bg ==
        
        this.mouseSprite.x = this.bgWidth / 2; //update position of eye to match the mouse's x
        this.cropImage(this.bgWidth / 2);

    },
    
    sOnClick: function () {

//        this.bg = this.add.image(0,0, "seniorGoodBG");
//        this.bg2 = this.add.image(0,0, "seniorBadBG");
        
//        game.world.bringToTop(this.bg3);
//        game.world.bringToTop(this.bg4);
        
        this.bg3.alpha = 1;
        this.bg4.alpha = 1;
        this.bg.alpha = 0;
        this.bg.alpha = 0;
        
        game.world.bringToTop(this.mouseSprite);
//        this.mouseSprite = this.add.image(this.game.world.width/2, 540, "arrow");
        
        this.mouseSprite.x = this.bgWidth / 2; //update position of eye to match the mouse's x
        this.cropImage(this.bgWidth / 2);
//        
    }
    
    
    

    
};

game.state.add("play", mainstate, true);