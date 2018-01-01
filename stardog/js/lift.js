function Lift(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    
    game.physics.arcade.enable(this);
    this.enableBody = true;
    
    this.body.immovable = true;
    
    this.start = y;
    this.bound = y-250;
}

Lift.prototype = Object.create(Phaser.Sprite.prototype);
Lift.prototype.constructor = Lift;

Lift.prototype.update = function() {
    if (this.position.y <= this.bound) {
        this.direction = 1;
    }
    else if (this.position.y >= this.start) {
        this.direction = -1;
    }
    
    this.body.velocity.y = 100 * this.direction;
}