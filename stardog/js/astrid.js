function Astrid(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.enableBody = true;
    this.game.physics.arcade.enable(this);

    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    
    this.animations.add('left', [1,2,3,4,5,6,7,8,9], 15, true);
    this.animations.add('right', [10,11,12,13,14,15,16,17,18], 15, true);
    
    this.free = false;
}

Astrid.prototype = Object.create(Phaser.Sprite.prototype);
Astrid.prototype.constructor = Astrid;

Astrid.prototype.update = function(){
    //plays animation when Astrid is free
    if(this.free) {
        this.body.velocity.x = 200;
        this.animations.play('right');
    }
    
}

