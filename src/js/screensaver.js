(function () {
    'use strict';

    function Screensaver() {

    }

    // Define keys used
    var keyq;
    var keyw;
    var keye;
    var keya;
    var keys;
    var keyd;
    var keyh;
    var keyz;
    var keyx;
    var keyi;
    var keyo;
    var keyp;

    var keyleft;
    var keyright;
    var keyup;
    var keydown;

    // Also the number keys
    var key0;
    var key1;
    var key2;
    var key3;
    var key4;
    var key5;
    var key6;
    var key7;
    var key8;
    var key9;

    var video;
    var sprite;

    var cursors;
    var keycursors;

    var valid;
    var creditadd;

    var credit;

    var tweenrecyclespeel;
    var recyclespeel;

    var kiesspelers;
    var selectie;

    var readytoplay = false;

    var letsplay;
    var letsplaytween;
    var kiesspelerstween;
    // choose player animation
    var animationstarted = false;
    // insert number animation
    var animationstarted2 = false;




    var is1player = true;

    // two boolean vars for state management of number entering
    var enternumber = false;
    var numberentered = false;
    var inputnumbertween;
    var inputthisplay = '';
    // view war, this is the png
    var enternumberpng;

    var levelsound;
    /*
        var distance = 700;
        var speed = 2;
        var max = 8;

        var canvas;

        var xx = [];
        var yy = [];
        var zz = [];

        var xx2 = [];
        var yy2 = [];
        var zz2 = [];

        var xx3 = [];
        var yy3 = [];
        var zz3 = [];*/

    var text;

    // timer
    var timerdisplay2
    var counter = 45;

    var chooseloop;

    // local storage warning img
    var warning;
    var resetvalue = 0;

    // boolean for storing waste insert is triggered
    var blockInsert = false;


    Screensaver.prototype = {
        create: function () {
            credit = localStorage.getItem('credits');
            credit--;
            blockInsert = false;
            localStorage.setItem('credits', credit);

            levelsound = this.game.add.audio('levelsound');

            this.game.stage.backgroundColor = "#000";

            video = this.game.add.video('introfilm');
            video.stop();
            video.play(true);


            sprite = video.addToWorld(0, 0, 0, 0);
            sprite.x = 0;
            sprite.y = 0;

            // timer for choosing teams
            counter = 45;

            animationstarted = false;
            is1player = true;
            recyclespeel = this.game.add.sprite(70, 200, 'recyclespeel');
            recyclespeel.alpha = 0;

            enternumberpng = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'enternumber');
            enternumberpng.anchor.setTo(0.5, 0.5);
            enternumberpng.alpha = 0;

            letsplay = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'letsplay');
            letsplay.anchor.setTo(0.5, 0.5);
            letsplay.alpha = 0;

            kiesspelers = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'kiesspelers');
            kiesspelers.anchor.setTo(0.5, 0.5);
            kiesspelers.alpha = 0;

            selectie = this.game.add.sprite(80, 140, 'selectie');
            selectie.alpha = 0;

            readytoplay = false;
            this.game.multiplay = false;





            cursors = this.game.input.keyboard.createCursorKeys();


            keyz = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            keyi = this.input.keyboard.addKey(Phaser.Keyboard.I);

            key0 = this.input.keyboard.addKey(Phaser.Keyboard.ZERO);
            key1 = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
            key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
            key3 = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
            key4 = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
            key5 = this.input.keyboard.addKey(Phaser.Keyboard.FIVE);
            key6 = this.input.keyboard.addKey(Phaser.Keyboard.SIX);
            key7 = this.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
            key8 = this.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
            key9 = this.input.keyboard.addKey(Phaser.Keyboard.NINE);

            keyh = this.input.keyboard.addKey(Phaser.Keyboard.H);
            keyh.onDown.add(this.resetLocalStorage, this);


            keyz.onDown.add(this.onDown, this);
            keyi.onDown.add(this.onDown, this);

            key0.onDown.add(this.onDownNumber, this);
            key1.onDown.add(this.onDownNumber, this);
            key2.onDown.add(this.onDownNumber, this);
            key3.onDown.add(this.onDownNumber, this);
            key4.onDown.add(this.onDownNumber, this);
            key5.onDown.add(this.onDownNumber, this);
            key6.onDown.add(this.onDownNumber, this);
            key7.onDown.add(this.onDownNumber, this);
            key8.onDown.add(this.onDownNumber, this);
            key9.onDown.add(this.onDownNumber, this);






            timerdisplay2 = this.game.add.bitmapText(this.game.world.centerX + 6, 40, 'scorefont', 'testtimer', 45);
            timerdisplay2.anchor.setTo(0.5, 0.5);
            timerdisplay2.visible = true;
            timerdisplay2.setText(" ");

            inputthisplay = this.game.add.bitmapText(this.game.world.centerX - 130, 140, 'scorefont', 'pin', 70);
            inputthisplay.visible = true;
            inputthisplay.setText(" ");


            // WARNING IMG
            warning = this.game.add.image(this.game.width / 8 * 4, 300, 'warning');
            warning.anchor.set(0.5, 0.5);
            warning.visible = false;


        },
        resetLocalStorage: function () {
            console.log('check');
            if (resetvalue === 0) {
                this.game.time.events.add(Phaser.Timer.SECOND * 6, this.timerresetend, this);
            }

            resetvalue++;

            if (resetvalue === 4) {
                warning.visible = true;
            } else if (resetvalue === 5) {
                warning.visible = false;
                resetvalue = 0;
                localStorage.clear();
                location.reload();
            }
        },
        timerresetend: function () {
            resetvalue = 0;
            warning.visible = false;
        },

        creditadd: function () {
            credit = parseInt(credit) + 3;
            localStorage.setItem('credits', credit);
            this.game.aantalphones = this.game.aantalphones + 1;
            localStorage.setItem('aantalphones', this.game.aantalphones);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.creditgone, this);
        },
        creditgone: function () {
            this.game.time.events.remove(Phaser.Timer.SECOND * 3, this.creditgone, this);

            //this.game.state.start('menu', true, false);
        },

        timerLoop: function () {
                if (counter === 0) {
                    // TODO need some logic to go through nexxt screen but keep current selection
                    //video.stop();
                    timerdisplay2.setText(" ");
                    this.game.time.events.remove(chooseloop);
                    counter = 45;
                    timerdisplay2.visible = false;
                    selectie.alpha = 0;
                    kiesspelers.alpha = 0;
                    letsplay.alpha = 0;
                    animationstarted = false;

                    blockInsert = false;
                    //this.game.state.start('platformer', true, false);
                }

                if (counter > 0) {
                    counter--;
                    timerdisplay2.setText(counter);
                }
            }

            ,

        update: function () {

            if (cursors.left.isDown) {
                //  Move to the left
                // this.game.state.start('menu', true, false);
                selectie.x = 80;
                this.game.multiplay = false;
            }
            if (cursors.right.isDown) {
                //  Move to the left
                // this.game.state.start('menu', true, false);
                selectie.x = 550;
                this.game.multiplay = true;
            }

            /*canvas.clear();

      for (var i = 0; i < max; i++) {
        var perspective = distance / (distance + zz[i]);
        var x = this.game.world.centerX + xx[i] * perspective;
        z
        var y = this.game.world.centerY + yy[i] * perspective + 400;

        zz[i] += speed;

        if (zz[i] > 300) {
          zz[i] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('bullet2', x, y);
      }

      for (var q = 0; q < max; q++) {
        var perspectiveq = distance / (distance + zz2[q]);
        var x = this.game.world.centerX + xx2[q] * perspectiveq;
        var y = this.game.world.centerY + yy2[q] * perspectiveq + 300;

        zz2[q] += speed;

        if (zz2[q] > 300) {
          zz2[q] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('tel2', x, y);
      }

      for (var z = 0; z < max; z++) {
        var perspectivez = distance / (distance + zz3[z]);
        var x = this.game.world.centerX + xx3[z] * perspectivez;
        var y = this.game.world.centerY + yy3[z] * perspectivez + 300;

        zz3[z] += speed;

        if (zz3[z] > 300) {
          zz3[z] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('tel3', x, y);
      }
*/

        },
        onDownNumber: function (key) {

            // Only when the state of entering pin is enter allow this input
            if (enternumber === true && inputthisplay.text.length < 6) {
                let newNumber;
                console.log(key.keyCode);
                switch (key.keyCode) {
                    case 48:
                    newNumber = '0'
                        break;
                    case 49:
                    newNumber = '1';
                        break;
                    case 50:
                    newNumber = '2';
                        break;
                    case 51:
                    newNumber = '3';
                        break;
                    case 52:
                    newNumber = '4';
                        break;
                    case 53:
                    newNumber = '5';
                        break;
                    case 54:
                    newNumber = '6';
                        break;
                    case 55:
                    newNumber = '7';
                        break;
                    case 56:
                    newNumber = '8';
                        break;
                    case 57:
                    newNumber = '9';
                        break;
                }
                // Switch KEY
                inputthisplay.setText(inputthisplay.text + newNumber);
            }


        },
        onDown: function (key) {
            console.log(key.keyCode);

            if (key.keyCode === 73 && blockInsert === false && enternumber === false) {
                blockInsert = true;
                numberentered = false;
                // enternumber = true;
                this.insertNumber();
                //this.kiesspeler();
            }

            // if readytoplay flase en number is ready to be entered
            if (key.keyCode === 90 && readytoplay === false && enternumber === true) {
                // Here we should catch the accept and cancel buttons
            }


            // starting of the game when everything is ready
            if (key.keyCode === 90 && readytoplay === true) {
                video.stop();
                this.game.time.events.remove(chooseloop);
                blockInsert = false;
                this.game.state.start('platformer', true, false);
            }



        },
        letplaysdone: function () {
            levelsound.play();
            console.log("comes here");
            kiesspelers.alpha = 1;
            kiesspelerstween = this.game.add.tween(kiesspelers).to({
                y: this.game.height / 2
            }, 1000, Phaser.Easing.Bounce.Out, true);

            kiesspelerstween.onComplete.add(this.kiesspelersdone, this);
            chooseloop = this.game.time.events.loop(Phaser.Timer.SECOND, this.timerLoop, this);
        },
        kiesspelersdone: function () {
            console.log("comes here");
            selectie.alpha = 1;
            readytoplay = true;
            // this.game.time.events.remove(chooseloop);
        },
        // kiesspeler
        kiesspeler: function () {
            if (animationstarted === false) {
                timerdisplay2.visible = true;
                animationstarted = true;
                this.game.stage.backgroundColor = "#000";
                letsplay.alpha = 1;
                letsplaytween = this.game.add.tween(letsplay).from({
                    y: -200
                }, 1500, Phaser.Easing.Bounce.Out, true);
                letsplaytween.onComplete.add(this.letplaysdone, this);
                // this.game.aantalafval++;
                // var aantalafval = this.game.aantalafval;
                // localStorage.setItem('aantalafval', aantalafval);
            }
        },
        insertNumber: function () {
            if (animationstarted2 === false) {
                animationstarted2 = false;
                this.game.stage.backgroundColor = "#fff";
                enternumberpng.alpha = 1;
                inputnumbertween = this.game.add.tween(enternumberpng).from({
                    y: -200
                }, 1500, Phaser.Easing.Bounce.Out, true);
                inputnumbertween.onComplete.add(this.inputtweendone, this);
            }
        },

        inputtweendone: function () {
            console.log('comes here');
            enternumber = true;
        }


    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Screensaver = Screensaver;
}());