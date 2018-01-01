function Bullet(game, x, y, key, power){
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    
    this.start = x;
    
    this.power = power;

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
    //shoots the bullet to the left or right depending on the direction of the enemy
    if (this.x > this.start+500 || this.x < this.start-500 || this.y < this.start.y-200) {
        this.kill();
    }
    
}

