function PowerUp(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    
    this.power;
    this.name = "powerup";
    
    this.body.collideWorldBounds = true;
}

PowerUp.prototype = Object.create(Phaser.Sprite.prototype);
PowerUp.prototype.constructor = PowerUp;