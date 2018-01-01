function Switch(game, x, y, key, name) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    this.name = name;
}

Switch.prototype = Object.create(Phaser.Sprite.prototype);
Switch.prototype.constructor = Dog;

