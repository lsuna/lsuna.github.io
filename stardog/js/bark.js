function Bark(game, x, y, key, direction, power){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.enableBody = true;
    game.physics.arcade.enable(this);
    
    //bark properties
    this.direction = direction;
    this.power = power;
    this.start = x;
    
    if (this.power == 5) {
        this.scale.set(1.2, 1);
    }
    if (this.power == 7) {
        this.scale.set(1.35, 1);
    }
    
    this.nextFire = 0;
    this.reloadTime = 1000;
    
    
}

Bark.prototype = Object.create(Phaser.Sprite.prototype);
Bark.prototype.constructor = Bark;

Bark.prototype.update = function(){
    
    //shoot in the right direction
    if (this.direction == "right") {
        this.shootBarkRight();
    }
    else if(this.direction == "left") {
        this.shootBarkLeft();
    }
    
    //kill bark after it travels a certain distance
    if (this.x > this.start+400 || this.x < this.start-400) {
        this.kill();
    }
    
}
    
Bark.prototype.shootBarkRight = function(){
    
    this.body.velocity.x = 200;
    
}

Bark.prototype.shootBarkLeft = function(){
    
    this.body.velocity.x = - 200;
    
}
    