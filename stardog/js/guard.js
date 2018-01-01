function Guard(game, x, y, key, target, bullets){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.enableBody = true;
    this.game.physics.arcade.enable(this);
    this.alive = true;
    
    this.health = 15;
    
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;

    this.leftBound = x;
    this.rightBound = x+200;
    
    this.direction = 1;
    
    this.attack = false;
    this.target = target;
    
    
    this.animations.add('left', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('right', [8,9,10,11,12,13,14,15], 10, true);
    this.shootSound = game.add.audio('shootSound');
    
    this.shootCount = 0;
    
    this.bullets = bullets;
}

Guard.prototype = Object.create(Phaser.Sprite.prototype);
Guard.prototype.constructor = Guard;

Guard.prototype.update = function(){
    
    if (!this.alive) {
        return;
    }
    
    if(this.health <= 0) {
        this.kill();  
    }
    
    //attack state!!!!
    if (this.attack) {
        this.fire();
        if(this.target.x > this.x) {
            this.frame = 17;
        }
        else {
            this.frame = 16;
        }
    } 
    else {
        this.move();
    }
    
    
    if (game.physics.arcade.distanceBetween(this, this.target) < 600) {
        this.attack = true;
    }
    else {
        this.attack = false;
    }
    
    
}

Guard.prototype.move = function(){
    //patrol state
    if (this.position.x <= this.leftBound) {
        this.animations.play('right');
        this.direction = 1;
    }
    else if (this.position.x >= this.rightBound) {
        this.animations.play('left');
        this.direction = -1;
    }
    
    this.body.velocity.x = 100 * this.direction;
    
}


Guard.prototype.fire = function(){
    
    this.body.velocity.x = 0;
    if (this.shootCount%100 == 0) {
        this.shootSound.play();
        if (this.frame == 16) {
            var bullet = new Bullet(this.game, this.x-10, this.y+80, 'bullet', 3);
            this.bullets.addChild(bullet);
            this.game.physics.arcade.moveToObject(bullet, this.target, 200);
        }
        else if (this.frame == 17){
            var bullet = new Bullet(this.game, this.x+110, this.y+80, 'bullet', 3);
            this.bullets.addChild(bullet);
            this.game.physics.arcade.moveToObject(bullet, this.target, 200);
        }
        
    }
    this.shootCount++;  
}