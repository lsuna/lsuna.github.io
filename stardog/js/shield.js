function Shield(game, x, y, key, dog){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;

    this.target = dog;
    
}

Shield.prototype = Object.create(Phaser.Sprite.prototype);
Shield.prototype.constructor = Shield;

Shield.prototype.update = function(){
    
    this.position.x = this.target.position.x-20;
    this.position.y = this.target.position.y-20;
    
    this.alpha-=0.003;
    
}