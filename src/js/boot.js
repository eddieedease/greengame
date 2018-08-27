(function() {
    'use strict';


    function Boot() {}

    Boot.prototype = {
        preload: function() {
            this.load.image('preloader', 'assets/preloader.gif');
        },

        create: function() {
            // NOTE configure game
            this.game.input.maxPointers = 1;
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;

                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.minWidth = 480;
                this.game.scale.minHeight = 260;
                this.game.scale.maxWidth = 10000;
                this.game.scale.maxHeight = 5630;
                this.game.scale.forceOrientation(true);
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.updateLayout(true);
            }

            // NOTE preparing the scoring, use local storage, retrieve or create new
            this.game.currentgame = "other";
            this.game.highgame4 = JSON.parse(localStorage.getItem('highgame4'));

            this.game.credits = localStorage.getItem('credits');
            this.game.aantalphones = localStorage.getItem('aantalphones');
            this.game.aantalafval = localStorage.getItem('aantalafval');

            console.log("Aantal afval ingegooid is:" + this.game.aantalafval);
            if (this.game.credits === null) {
                var cred = 0;
                localStorage.setItem('credits', cred);
            }

            if (this.game.aantalafval === null) {
                var aantalafval = 0;
                localStorage.setItem('aantalafval', aantalafval);
            }

            if (this.game.aantalphones === null) {
                var nummm = 0;
                this.game.aantalphones = 0;
                localStorage.setItem('aantalphones', nummm);
            }

            this.game.aantalphones = parseInt(this.game.aantalphones);

            // if highscores don't exit --> create
            if (this.game.highgame4 === null) {
                console.log("yesss!");
                var booya = [
                    [0, 0, 0, 0, 0],
                    ["", "", "", "", ""]
                ];
                localStorage.setItem('highgame4', JSON.stringify(booya));
                this.game.highgame1 = JSON.parse(localStorage.getItem('highgame4'));
            } else {
                console.log(this.game.highgame4);
            }



            // loading the assets
            this.game.state.start('preloader');




        }
    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Boot = Boot;
}());