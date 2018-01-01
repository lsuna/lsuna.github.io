function HealthItem(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    
    this.health = 3;
    this.name = "health";
    
    this.body.collideWorldBounds = true;
}

HealthItem.prototype = Object.create(Phaser.Sprite.prototype);
HealthItem.prototype.constructor = HealthItem;