var loadState = {
    
    preload: function() {
        
        //logo
        game.load.image('logo', 'assets/stardog.png');
        game.load.spritesheet('bg', 'assets/titlescreen.png', 1200, 600);
        
        //music
        game.load.audio('music1', 'assets/audio/logoMusic.mp3');
        game.load.audio('music2', 'assets/audio/level1music.wav');
        game.load.audio('music3', 'assets/audio/labMusic.wav');
        game.load.audio('music4', 'assets/audio/bossMusic.wav');
        
        //credit screen
        game.load.image('credits', 'assets/credits.png');
        
        //intro slides
        game.load.image('screen', 'assets/screen.jpg');
        game.load.spritesheet('intro1', 'assets/incoming.png', 1000, 500);
        game.load.image('intro2', 'assets/incomingmessage.png');
        game.load.image('start1', 'assets/spaceStart.png');
         game.load.image('start2', 'assets/spaceAccept.png');
        
        //pause screen
        game.load.image('pause', 'assets/menu1.jpg');
        
        //player sprite sheet
        game.load.spritesheet('dog', 'assets/dog.png', 200, 100);
        
        //astrid sprite sheet
        game.load.spritesheet('astrid', 'assets/astrid.png', 83, 200);
        
        //enemy sprite sheets
        game.load.spritesheet('guard1', 'assets/guard1.png', 110, 199);
        game.load.spritesheet('guard2', 'assets/guard2.png', 111, 200);
        game.load.spritesheet('guard3', 'assets/guard3.png', 113, 199);
        game.load.spritesheet('scientist1', 'assets/scientist1.png', 114, 205);
        game.load.spritesheet('nox', 'assets/tenebris.png', 160, 256);
        
        //level backgrounds + grounds
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground1', 'assets/ground1.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('tower', 'assets/tower.png');
        game.load.image('smallTower', 'assets/smallTower.png');
        game.load.image('elevator', 'assets/elevator.png');
        game.load.image('lab', 'assets/lab.png');
        game.load.image('ground2', 'assets/ground2.png');
        game.load.image('platform2', 'assets/platform2.png');
        game.load.image('elevator2', 'assets/elevator2.png');
        game.load.image('bossBG', 'assets/bossBG.png');
        game.load.image('cage', 'assets/cage.png');
        game.load.image('arrow', 'assets/arrow.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('ground3', 'assets/ground3.png');
        game.load.image('platform3', 'assets/platform3.png');
        game.load.image('laser', 'assets/laser.png');
        game.load.image('laser2', 'assets/laser2.png');
        
        //dog related items
        game.load.image('bark1', 'assets/barkwaves.png');
        game.load.image('bark2', 'assets/barkwaves2.png');
        game.load.image('shield', 'assets/shield.png');
        game.load.image('dogbone', 'assets/dogbone.png');
        game.load.image('capsule', 'assets/capsule.png');
        
        //feedback bars
        game.load.image('hb1', 'assets/healthBar.png');
        game.load.image('hb2', 'assets/healthFrame.png');
        game.load.image('bb1', 'assets/barkBar.png');
        game.load.image('bb2', 'assets/barkFrame.png');
        
        //enemy related items
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('bullet2', 'assets/bullet2.png');
        game.load.image('crate', 'assets/crate.png');
        
        //switch and shield
        game.load.spritesheet('switch', 'assets/switch.png', 52, 91);
        game.load.spritesheet('switch2', 'assets/switch2.png', 52, 91);
        game.load.image('corpshield', 'assets/corpshield.png');
        game.load.image('corp', 'assets/corp.png');
        
        //speech blocks
        game.load.image('chat1', 'assets/chat3.png');
        game.load.image('chat2', 'assets/chat4.png');
        game.load.image('noxtext1', 'assets/noxtext1.png');
        game.load.image('noxtext2', 'assets/noxtext2.png');
        game.load.image('astridtext1', 'assets/astridtext1.png');
        game.load.image('astridtext2', 'assets/astridtext2.png');
        
        //sound effects
        game.load.audio('barkSound', 'assets/audio/bark.wav');
        game.load.audio('superBarkSound', 'assets/audio/superbark.wav');
        game.load.audio('superMegaBarkSound', 'assets/audio/supermegabark.wav');
        game.load.audio('shootSound', 'assets/audio/enemyShootSound.wav');
        game.load.audio('shieldFuzz', 'assets/audio/shield.wav');
        game.load.audio('shieldOn', 'assets/audio/shieldOn.wav');
        game.load.audio('shieldOff', 'assets/audio/shieldOff.wav');
        game.load.audio('damageSound', 'assets/audio/damage.wav');
        game.load.audio('healthSound', 'assets/audio/health.wav');
        game.load.audio('powerSound', 'assets/audio/powerUp.wav');
        game.load.audio('deathSound', 'assets/audio/dogHit.wav');
        game.load.audio('destroySound', 'assets/audio/objectDestroyed.wav');
        game.load.audio('destroyShield', 'assets/audio/shieldDestroyed.wav');
        game.load.audio('jump', 'assets/audio/jump.wav');
        
        
        
    },
    
    create: function() {
        
        //start the menu state
        game.state.start('menu');
        
    }
    
}
