var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'main');


var mainState = {
    
    preload: function(){
        game.load.spritesheet('dog', 'assets/dog.png', 200, 100);
        game.load.spritesheet('guard', 'assets/guard.png', 95, 220);
        game.load.spritesheet('scientist1', 'assets/scientist1a.png', 95, 241);
        
        game.load.image('ground', 'assets/ground.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('background', 'assets/back.png');
        
        game.load.image('bark', 'assets/barkwaves.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('bullet2', 'assets/bullet2.png');
        game.load.image('shield', 'assets/shield.png');
        game.load.image('keyCard', 'assets/key.png');

        game.load.image('dogbone', 'assets/dogbone.png');
        game.load.image('crate', 'assets/crate.png');
        
    },
    
    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);  
        
        this.game.world.setBounds(0,0,3000,600);
        
        game.add.sprite(0, 0, 'background');
        
        this.ground = game.add.group();
        this.ground.addChild(new Ground(game, 0, 500, 'ground'));
        this.ground.addChild(new Ground(game, 2300, 280, 'platform'));
        
        this.elevators = game.add.group();
        this.elevators.addChild(new Lift(game, 1900, 500, 'platform'));
        
        this.dogBarks = game.add.group();
        
        this.bullets = game.add.group();
        
        this.items = game.add.group();
        
        this.shield = game.add.group();
        
        this.dog = new Dog(game, 30, 400, 'dog', this.dogBarks, this.shield);
        
        this.enemies = game.add.group();
        this.enemies.addChild(new Guard(game, 700, 280, 'guard', this.dog, this.bullets));
        this.enemies.addChild(new Guard(game, 1800, 280, 'guard', this.dog, this.bullets));
        this.enemies.addChild(new Guard(game, 2325, 60, 'guard', this.dog, this.bullets));
    
        this.enemies.addChild(new Scientist(game, 2700, 250, 'scientist1', this.dog, this.bullets));
        //this.items.addChild(new Item(game, 100, 100, 'keyCard'));
        
        //game world objects code
        
        this.healthItem = game.add.group();
        this.healthItem.addChild(new HealthItem(game, 405, 470, 'dogbone'));
        
        this.crate = game.add.group();
        this.crate.addChild(new Crate(game, 400, 400, 'crate'));
    },
    
    update: function(){
        
        this.game.camera.focusOnXY(this.dog.position.x + 200, this.dog.position.y);
        
        game.physics.arcade.collide(this.dog, this.ground, this.jumpHandler, null, this);
        
        game.physics.arcade.collide(this.dog, this.elevators);
        
        game.physics.arcade.collide(this.enemies, this.ground);
        
        game.physics.arcade.collide(this.dog, this.crate);
        
        game.physics.arcade.collide(this.enemies, this.dogBarks, this.barkHandler, null, this);
        
        game.physics.arcade.collide(this.dog, this.bullets, this.bulletHandler, null, this);
        
        game.physics.arcade.collide(this.bullets, this.dogBarks, this.fireHandler, null, this);
        
        game.physics.arcade.collide(this.bullets, this.ground, this.hitHandler, null, this);
        
        game.physics.arcade.collide(this.dogBarks, this.ground, this.hitHandler, null, this);
        
        game.physics.arcade.collide(this.bullets, this.shield, this.hitHandler, null, this);
        
        game.physics.arcade.collide(this.crate, this.dogBarks, this.barkHandler, null, this);
        
        game.physics.arcade.collide(this.crate, this.bullets, this.barkHandler, null, this);
        
        //do the rest of the health item handler
        
        game.physics.arcade.overlap(this.dog, this.healthItem, this.itemHandler, null, this);
        
        console.log(this.dog.health);
    },
    
    jumpHandler: function(dog, ground){
        if (dog.body.touching.down){
            dog.canJump = true; 
        }
    },
    
    bulletHandler: function(dog, bullet){
        dog.health-=bullet.power;
        bullet.kill();
    },
    
    barkHandler: function(enemy, bark) {
        bark.kill();
        enemy.health-=bark.power;  
    },
    
    fireHandler: function(bullet, bark) {
        bark.kill();
        bullet.kill();
    },
    
    hitHandler: function(projectile, solid) {
        projectile.kill();
    },
    
    itemHandler: function(dog, healthitem){
        
        if(dog.health < 15){
            dog.health+=healthitem.health;
        }
        healthitem.kill();
        console.log(dog.health);
    }
    
}


game.state.add('main', mainState);

game.state.start('main');