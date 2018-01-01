var menuState = {
    
    create: function() {
        
        this.bg = game.add.sprite(0,0,'bg');
        this.bg.animations.add('twinkle', [0,1], 10, true);
        this.bg.animations.play('twinkle');
        
        this.logo = game.add.sprite(200, 0, 'logo');
        
        this.music = game.add.audio('music1');
        this.music.play('', 0, 1, true);
        this.music.onLoop.add(this.playMusic, this);
    
        this.bark = game.add.audio('barkSound');
        
        //add starting instructions
        this.instructions = game.add.sprite(440, 500, 'start1');
        
        this.fade= true;
        
        //add control for starting the game
        this.startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.startKey.onDown.add(this.start, this);
        
    },
    
    update: function() {
        
        if (this.fade) {
            this.instructions.alpha -= 0.02;
        }
        else {
            this.instructions.alpha += 0.02;
        }
        
        if (this.instructions.alpha <= 0.1) {
            this.fade = false;
        }
        else if (this.instructions.alpha >= 1) {
            this.fade = true;
        }
        
    },
    
    playMusic: function() {
        this.music.play('', 0, 1, true);    
    },
    
    start: function() {
        this.music.stop();
        this.bark.play();
        game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        game.state.start('intro');
    }

    
}