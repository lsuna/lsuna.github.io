function Dog(game, x, y, key, level, barks, shield){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    
    //dog properties
    this.level = level;
    if (this.level == 1) {
        this.power = 3;
    }
    else if (this.level == 2) {
        this.power = 5;
    }
    else {
        this.power = 7;
    }
    this.health = 15;
    this.onGround = false;
    
    //bark related
    this.barks = barks;
    this.canBark = true;
    this.barkCount = 5;
    this.reloadTime = 0;
    
    //shield related
    this.shield = shield;
    this.hasShield = false;
    
    //running related
    this.direction = "right";
    this.animations.add('left', [0,1,2,3,4,5,6,7], 20, true);
    this.animations.add('right', [10,11,12,13,14,15,16,17,18], 20, true);
    
    //sounds
    this.barkSound = game.add.audio('barkSound');
    this.superBarkSound = game.add.audio('superBarkSound');
    this.superMegaBarkSound = game.add.audio('superMegaBarkSound');
    this.shieldOnSound = game.add.audio('shieldOn');
    this.shieldOffSound = game.add.audio('shieldOff');
    this.deathSound = game.add.audio('deathSound');
    this.isHeckinDead = false;
    this.shieldVibration = game.add.audio('shieldFuzz');
    
    //dog controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space.onDown.add(this.bark, this);
    this.cursors.down.onDown.add(this.raiseShield, this);
    
    this.levelComplete = false;
}

Dog.prototype = Object.create(Phaser.Sprite.prototype);
Dog.prototype.constructor = Dog;

    Dog.prototype.update = function(){
        
        this.move();
        this.canJump = false;
        this.reloadTime++;
        
        //dog gets crushed by elevators
        if(this.position.y >= 400) {
            this.health-=0.5;
            this.scale.set(1, this.health/15-0.1);
        }
        
        //kill dog if health is depleted
        if(this.health <= 0) {
            if(!this.isHeckinDead) {
                if (!this.levelComplete) {
                    this.deathSound.play();
                }
                this.isHeckinDead = true;
            }
            this.position.x = 0;
            this.position.y = 0;
            this.kill();
        }
        
        if (this.health > 15) {
            this.health = 15;
        }
        
        //bark reload system
        if(this.barkCount == 0){
            this.canBark = false;
        }
        else {
            this.canBark = true;
        }
        
        if (this.barkCount < 5 && (this.reloadTime%70 == 0)) {
            this.barkCount++;
        }
        
    }

    //dog running and jumping controls
    Dog.prototype.move = function() {
        if(this.cursors.up.isDown && this.canJump && !this.hasShield) {
            this.body.y = this.body.y-1;
            this.body.velocity.y = -500;
            if (this.direction == "left") {
                this.frame = 4;
                
            }
            else if (this.direction == "right") {
                this.frame = 14;
            }
        }
        else if (this.cursors.left.isDown) {
            this.body.velocity.x = -200;
            this.direction = "left";
            if (this.canJump) {
                this.animations.play('left');
            }
            else {
                this.frame = 4;
            }  
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x = 200;
            this.direction = "right";
            if (this.canJump) {
                this.animations.play('right');
            }
            else {
                this.frame = 14;
            }
        }
        else {
            this.body.velocity.x = 0;
            if (this.direction == "right") {
                this.frame = 9;
            }
            else if (this.direction == "left") {
                this.frame = 8;
            }
        }
        
        
    }
    
    //bark power control
    Dog.prototype.bark = function(){
        if (this.canBark) {
            if (this.level == 1) {
                this.barkSound.play();
            }
            else if (this.level == 2) {
                this.superBarkSound.play();
            }
            else {
                this.superMegaBarkSound.play();
            }
            if(this.direction == "right") {           
                this.barks.addChild(new Bark(this.game, this.position.x+180, this.position.y-50, 'bark1', "right", this.power));
            }
            else if (this.direction == "left") {
                this.barks.addChild(new Bark(this.game, this.position.x-20, this.position.y-50, 'bark2', "left", this.power));
            }
            this.barkCount--;
        }
        
    }
     
    //shield power control
    Dog.prototype.raiseShield = function() {
        if (!this.hasShield) {
            this.hasShield = true;
            this.shieldOnSound.play();
            var shield = new Shield(this.game, this.position.x-20, this.position.y-20, 'shield', this);
            this.shield.addChild(shield);
            this.shieldVibration.play();
            game.time.events.add(Phaser.Timer.SECOND * 5, function() {this.shieldVibration.stop(); this.shieldOffSound.play(); shield.kill(); this.hasShield = false;}, this);
        }
    }
    
    
    
    
