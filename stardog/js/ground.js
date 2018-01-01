function Ground(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    
    game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    
    
}

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;

