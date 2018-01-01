var credits = {
    
    create: function() {
        
        game.add.sprite(0,0,'credits');
        
        this.music = game.add.audio('music1');
        this.music.play('', 0, 1, true);
        this.music.onLoop.add(this.playMusic, this);
        
    },
    
    playMusic: function() {
        this.music.play('', 0, 1, true);    
    },
    
}