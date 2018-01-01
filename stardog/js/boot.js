var bootState = {
    
    create: function() {
        
        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.world.setBounds(0,0,4500,600);
        
        //call the load state
        game.state.start('load');
        
    }
    
}