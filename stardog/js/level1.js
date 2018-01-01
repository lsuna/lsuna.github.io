var level1 = {

    create: function(){
        
        //music
        this.levelMusic = game.add.audio('music2');
        this.levelMusic.play('', 0, 1, true);
        this.levelMusic.onLoop.add(this.playLevelMusic, this);
        
        //add background image
        this.sky = game.add.sprite(0, 0, 'sky');
        
        //add ground group
        var bigTower = game.add.image(2650, 210, 'tower');
        var smallTower = game.add.image(3150, 290, 'smallTower');
        var liftTower = game.add.image(2330, 210, 'tower');
        
        this.ground = game.add.group();
        this.ground.addChild(new Ground(game, 0, 490, 'ground1'));
        this.ground.addChild(new Ground(game, 2500, 210, 'platform'));
        this.ground.addChild(new Ground(game, 3000, 250, 'platform'));
        
        //add elevators group
        this.elevators = game.add.group();
        this.elevators.addChild(new Lift(game, 2280, 450, 'elevator'));
        
        this.switch = game.add.group();
        this.shieldSwitch = (new Switch(game, 3900, 400, 'switch'));
        this.switch.addChild(this.shieldSwitch);
        
        this.corpShield = new CorpShield(game, 4000, -100, 'corpshield');
        this.corp = game.add.sprite(4200, -5, 'corp');
        game.physics.arcade.enable(this.corp);
        this.corp.enableBody = true;
        
        //groups for items with collisions
        this.dogBarks = game.add.group();
        this.bullets = game.add.group();
        this.shield = game.add.group();
        this.healthItems = game.add.group();
        this.powerUp = game.add.group();
        this.crates = game.add.group();
        
        //the player!
        this.dog = new Dog(game, 100, 390, 'dog', 1, this.dogBarks, this.shield);
        
        //the enemies
        this.enemies = game.add.group();
        this.enemies.addChild(new Guard(game, 680, 290, 'guard1', this.dog, this.bullets));
        this.enemies.addChild(new Guard(game, 1825, 290, 'guard2', this.dog, this.bullets));
        this.enemies.addChild(new Guard(game, 2510, -20, 'guard3', this.dog, this.bullets));
        this.enemies.addChild(new Guard(game, 3650, 290, 'guard1', this.dog, this.bullets));

        this.enemies.addChild(new Scientist(game, 2650, 240, 'scientist1', this.dog, this.bullets));
        
        //world objects and collectibles
        this.crates.addChild(new Crate(game, 1000, 392, 'crate'));  //beginning 
        this.crates.addChild(new Crate(game, 1100, 392, 'crate'));  //of the
        this.crates.addChild(new Crate(game, 1050, 292, 'crate'));  //level
        
        this.crates.addChild(new Crate(game, 2800, 110, 'crate'));  //on top of platform
        
        this.crates.addChild(new Crate(game, 2830, 392, 'crate'));  //end
        this.crates.addChild(new Crate(game, 2930, 392, 'crate'));  //of the
        this.crates.addChild(new Crate(game, 2880, 292, 'crate'));  //level
        
        this.healthItems.addChild(new HealthItem(game, 1120, 465, 'dogbone')); 
        this.healthItems.addChild(new HealthItem(game, 2935, 465, 'dogbone')); 
        
        this.powerUp.addChild(new PowerUp(game, 2802, 175, 'capsule'));
        
        //health bar
        this.healthBar = game.add.sprite(10, 10, 'hb1');
        this.healthBarP2 = game.add.sprite(10, 10, 'hb2');
        
        //bark bar
        this.barkBar = game.add.sprite(10, 55, 'bb1');
        this.barkBarP2 = game.add.sprite(10, 55, 'bb2');
        
        //sound effects
        this.hitSound = game.add.audio('damageSound');
        this.healthSound = game.add.audio('healthSound');
        this.powerSound = game.add.audio('powerSound');
        this.shieldSound = game.add.audio('destroyShield');
        
        
        //pause controls
        this.control = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.control.onDown.add(function() {
            if (!game.paused) {
                this.pauseScreen = game.add.sprite(this.game.camera.x, this.game.camera.y,'pause');
                this.pauseScreen.alpha = 0.9;
                game.paused = true;
            }
            else {
                game.paused = false;
                this.pauseScreen.kill();
            }
        });
        
        this.chat1 = game.add.sprite(300, 100, 'chat1');
        game.time.events.add(3000, function() {this.chat1.kill();}, this); 
        
    },
    
    update: function(){
        
        if (this.dog.health <= 0) {
            this.levelMusic.stop();
            if (this.dog.levelComplete) {
                game.state.start('level2', false, true);
            }
            else {
                game.state.start('level1', false, true);
            }
        }
        
        //camera follow dog
        this.game.camera.focusOnXY(this.dog.position.x + 200, this.dog.position.y);
        
        //parallax on background
        this.sky.position.x = this.game.camera.x/2;
        
        //update health bar
        if (!this.dog.levelComplete) {
            if (this.dog.health > 0) {
                this.healthBar.scale.set(this.dog.health/15, 1);
            }
            else {
                this.healthBar.scale.set(0,0);
            }
        }
        this.healthBar.position.x = this.game.camera.x+10;
        this.healthBarP2.position.x = this.game.camera.x+10;
        //bark bar
        this.barkBar.scale.set(this.dog.barkCount/5, 1);
        this.barkBar.position.x = this.game.camera.x+10;
        this.barkBarP2.position.x = this.game.camera.x+10;
        
        //ground collide with dog - jump handlers
        game.physics.arcade.collide(this.dog, this.ground, this.jumpHandler, null, this);
        game.physics.arcade.collide(this.dog, this.elevators, this.jumpHandler, null, this);
        game.physics.arcade.collide(this.dog, this.crates, this.jumpHandler, null, this);
        
        //ground collisions w/o handlers
        game.physics.arcade.collide(this.enemies, this.ground);
        game.physics.arcade.collide(this.crates, this.ground);
        game.physics.arcade.collide(this.crates, this.crates);
        game.physics.arcade.collide(this.dog, this.corpShield);
        
        //dog and enemy collide - hurts dog
        game.physics.arcade.collide(this.dog, this.enemies, this.fightHandler, null, this);
        
        //collisions - health of first, kill second
        game.physics.arcade.collide(this.dog, this.bullets, this.healthKillHandler, null, this);
        game.physics.arcade.overlap(this.enemies, this.dogBarks, this.healthKillHandler, null, this);
        game.physics.arcade.overlap(this.crates, this.dogBarks, this.healthKillHandler, null, this);
        game.physics.arcade.overlap(this.crates, this.bullets, this.healthKillHandler, null, this);  
        
        //collisions - kill one on hit
        game.physics.arcade.collide(this.bullets, this.ground, this.hitHandler, null, this);
        game.physics.arcade.collide(this.dogBarks, this.ground, this.hitHandler, null, this);
        game.physics.arcade.overlap(this.bullets, this.shield, this.hitHandler, null, this);
        
        //collisions - kill both
        game.physics.arcade.collide(this.bullets, this.dogBarks, this.killHandler, null, this);
        
        //overlap - collectible items
        game.physics.arcade.overlap(this.dog, this.healthItems, this.pickUpHandler, null, this);
        game.physics.arcade.overlap(this.dog, this.powerUp, this.pickUpHandler, null, this);
        
        
        //shield switch
        game.physics.arcade.overlap(this.dogBarks, this.switch, this.switchHandler, null, this);
        
        game.physics.arcade.overlap(this.dog, this.corp, this.endLevel, null, this);
        
    },
    
    //dog can jump if touching down on ground
    jumpHandler: function(dog, ground){
        if (dog.body.touching.down){
            dog.canJump = true; 
        }
    },
    
    fightHandler: function() {
        this.dog.health-=0.1;
    },
    
    //handle collision between object w/ health and projectile
    healthKillHandler: function(object, projectile) {
        object.health-=projectile.power;
        projectile.kill();
        object.tint = 0xFF7979
        this.hitSound.play();
        game.time.events.add(100, function() {object.tint=0xFFFFFF;}, this);
    },
    
    //handle collision between projectile and indestructable object
    hitHandler: function(projectile, solid) {
        projectile.kill();
    },
    
    //handle collision between destructable objects w/o health
    killHandler: function(object1, object2) {
        this.hitSound.play();
        object1.kill();
        object2.kill();
    },
    
    //handle overlap of dog with collectible item
    pickUpHandler: function(dog, item){
        
        if (item.name == "health"){
            this.healthSound.play();
            if(dog.health < 15){
                dog.health+=item.health;
            }
        }
        else if (item.name == "powerup") {
            this.powerSound.play();
            dog.level++;
            dog.power+=2;
            this.barkBar.tint = 0xA0FFFF;
        }
        
        item.kill();
    
    },
    
    switchHandler: function(bark, object) {
        bark.kill();
        if (this.dog.level == 2) {
            this.shieldSwitch.frame = 1;
            game.time.events.add(200, function() {this.corpShield.alpha = 0.5;}, this);
            game.time.events.add(200, function() {this.corpShield.alpha =  1;}, this);
            game.time.events.add(200, function() {this.corpShield.alpha = 0.2;}, this);
            game.time.events.add(200, function() {this.corpShield.alpha = 0.7;}, this);
            game.time.events.add(200, function() {this.corpShield.alpha = 0.1;}, this);
            game.time.events.add(1000, function() {this.corpShield.kill();}, this);
            this.shieldSound.play();
        }
        else {
            this.chat2 = game.add.sprite(this.dog.x, 100, 'chat2');
            game.time.events.add(3000, function() {this.chat2.kill();}, this); 
        }
    },
    
     playLevelMusic: function() {
        this.levelMusic.play('', 0, 1, true);
    }, 
    
    endLevel: function() {
        this.levelMusic.stop();
        this.dog.levelComplete = true;
        this.dog.health--;    
    },


}