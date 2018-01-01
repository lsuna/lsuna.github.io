//make game object
var game = new Phaser.Game(1200, 600);

//add the various states to the game
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('intro', introState);
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('credits', credits);

//start the boot state
game.state.start('boot');