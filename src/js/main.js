window.addEventListener('load', function() {
    'use strict';

    var ns = window['ewaste'];
    var game = new Phaser.Game(1000, 563, Phaser.CANVAS, 'ewaste-game');

    // also, declare the global variable



    // game states
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('screensaver', ns.Screensaver);
    game.state.add('score', ns.Score);
    game.state.add('platformer', ns.Platformer);
    /* yo phaser:state new-state-files-put-here */
    game.state.start('boot');
}, false);