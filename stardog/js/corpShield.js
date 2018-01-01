function CorpShield(game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
}

CorpShield.prototype = Object.create(Phaser.Sprite.prototype);
CorpShield.prototype.constructor = CorpShield;