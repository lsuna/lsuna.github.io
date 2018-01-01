var introState = {
    
    create: function() {
        
        //music
        this.levelMusic = game.add.audio('music2');
        this.levelMusic.play('', 0, 1, true);
        this.levelMusic.onLoop.add(this.playLevelMusic, this);
        
        game.add.sprite(0,0,'screen');
        this.incoming = game.add.sprite(100,50,'intro1');
        this.incoming.animations.add('dots', [0,1,2], 3, true);
        this.incoming.animations.play('dots');
        
        this.message = game.add.sprite(100,50,'intro2');
        this.message.alpha = 0;
        
        this.incoming.fade = true;
        game.time.events.add(3000, function() {this.incoming.kill(); this.message.alpha = 1;}, this);
        
        this.bark = game.add.audio('barkSound');
        
        this.startText = game.add.sprite(370, 490, 'start2');
        this.startText.alpha = 0;
        this.ready = false;
        this.startText.fade = true;
        
        this.startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        game.time.events.add(6000, function() {
            this.ready = true; 
            this.message.alpha = 1;
            this.startKey.onDown.add(this.startLevel, this);
            }, this);
        
    }, 
    
    update: function() {
        //this.pulse(this.incoming);
        if(this.ready) {
            this.pulse(this.startText);
        }
            
    },
    
    pulse: function(sprite) {
        if (sprite.fade) {
            sprite.alpha -= 0.02;
        }
        else {
            sprite.alpha += 0.02;
        }
        
        if (sprite.alpha <= 0.1) {
            sprite.fade = false;
        }
        else if (sprite.alpha >= 1) {
            sprite.fade = true;
        }
    },
    
    playLevelMusic: function() {
        this.levelMusic.play('', 0, 1, true);
    }, 
    
    startLevel: function() {
        this.bark.play();
        this.levelMusic.stop();
        game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        game.state.start('level1');
    }
    
}