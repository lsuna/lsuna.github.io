function Crate(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    
    this.health = 12;
    this.destroyed = false;
    
    this.destroySound = game.add.audio('destroySound');
    
}

Crate.prototype = Object.create(Phaser.Sprite.prototype);
Crate.prototype.constructor = Crate;

Crate.prototype.update = function(){
    if(this.health <= 0) {
        if(!this.destroyed) {
            this.destroySound.play();
            this.destroyed = true;
        }
        this.kill();
    }
}