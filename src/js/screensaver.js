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

    // local storage var for temp holding
    var lsstudid;
    var lspoints;

    var numbertext;

    var is1player = true;

    // two boolean vars for state management of number entering
    var enternumber = false;
    var numberentered = false;
    var inputnumbertween;
    var inputthisplay = '';
    // view war, this is the png
    var enternumberpng;

    // this is the text object that communicates amount of waste needed for player to play a game;
    var neededForPlay = '';

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

    // Logic varsfor making API magic work
    var currentStudId;


    // NOTE: Important, how much is the treshold of playing?
    var amountOfWasteForPlay = 5;
    var canPlay = false;
    var wantToPlay = false;

    // Current user vars
    var userStorage;
    var userPlays;


    var keyDel;


    // how much waste have we thrown in (currently)
    var numberwaste = 0;

    var ntext;
    // button help images throw in screen
    var okplay;
    var nogoback;

    var exit;
    var max;
    var gobackx2 = 0;           

    Screensaver.prototype = {
        create: function () {
            credit = localStorage.getItem('credits');

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

 // The delete button on numpad
            this.game.input.keyboard.onDownCallback = function (e) {

               
                if (e.keyCode === 110 && readytoplay === false && enternumber === true) {
                    numberentered = false;
                    okplay.alpha = 0.5;
                    nogoback.visible = false;
                    exit.visible = true;
                    if (inputthisplay.text.length >= 1) {
                        neededForPlay.text = '';
                        canPlay = false;
                        var newVal = inputthisplay.text.substring(0, inputthisplay.text.length - 1);
                        inputthisplay.setText(newVal);
                    }
                }
                //for demonstration, next line prints the keyCode to console
                //console.log(e.keyCode);

                //here comes your stuff, you might check for certain key, or just trigger a function
            };

            // timer for choosing teams
            counter = 45;
            numberwaste = 0;
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
            keyx = this.input.keyboard.addKey(Phaser.Keyboard.X);
            keyi = this.input.keyboard.addKey(Phaser.Keyboard.I);

            key0 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
            key1 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
            key2 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
            key3 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
            key4 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
            key5 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
            key6 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
            key7 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
            key8 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
            key9 = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);

            keyh = this.input.keyboard.addKey(Phaser.Keyboard.H);
            keyh.onDown.add(this.resetLocalStorage, this);


            keyz.onDown.add(this.onDown, this);
            keyi.onDown.add(this.onDown, this);
            keyx.onDown.add(this.onDown, this);

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

            inputthisplay = this.game.add.bitmapText(this.game.world.centerX, 110, 'scorefont', 'pin', 70);
            inputthisplay.visible = true;
            inputthisplay.setText("");

            neededForPlay = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY + 70 , 'scorefont', 'pin', 20);
            neededForPlay.anchor.setTo(0.5, 0.5);
            neededForPlay.visible = true;
            neededForPlay.setText("");


            okplay = this.game.add.image(this.game.width / 8 * 2.5, 420, 'okplay');
            okplay.anchor.setTo(0.5, 0.5);
            okplay.alpha = 0.5;
            okplay.visible = false;
            nogoback = this.game.add.image(this.game.width / 8 * 5.5, 420, 'nogoback');
            nogoback.anchor.setTo(0.5, 0.5);
            nogoback.visible = false;

            exit = this.game.add.image(this.game.width / 8 * 5.5, 420, 'exit');
            exit.anchor.setTo(0.5, 0.5);
            exit.visible = false;

            max = this.game.add.image(this.game.width / 2, 300, 'max');
            max.anchor.setTo(0.5, 0.5);
            max.visible = false;

            numbertext = this.game.add.bitmapText(this.game.world.centerX, 180, 'scorefont', 'aantal afval ingegooid:', 20);
            ntext = this.game.add.bitmapText(this.game.world.centerX, 260, 'scorefont', '', 50);
            numbertext.anchor.setTo(0.5, 0.5);
            numbertext.visible = false;
            ntext.anchor.setTo(0.5, 0.5);
            ntext.visible = false;

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
                gobackx2 = 0;
                enternumber = false;
                nogoback.visible = false;
                max.visible = false;
                blockInsert = false;
                numbertext.visible = false;
                ntext.visible = false;
                enternumberpng.visible = false;
                //this.game.state.start('platformer', true, false);
            }

            if (counter > 0) {
                counter--;
                timerdisplay2.setText(counter);
            }
        },
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
            if (enternumber === true && inputthisplay.text.length < 5) {
                gobackx2 = 0;
                var newNumber;
                console.log(key.keyCode);

                switch (key.keyCode) {
                    case 96:
                        newNumber = '0'
                        break;
                    case 97:
                        newNumber = '1';
                        break;
                    case 98:
                        newNumber = '2';
                        break;
                    case 99:
                        newNumber = '3';
                        break;
                    case 100:
                        newNumber = '4';
                        break;
                    case 101:
                        newNumber = '5';
                        break;
                    case 102:
                        newNumber = '6';
                        break;
                    case 103:
                        newNumber = '7';
                        break;
                    case 104:
                        newNumber = '8';
                        break;
                    case 105:
                        newNumber = '9';
                        break;
                }
                // Switch KEY
                inputthisplay.setText(inputthisplay.text + newNumber);
                inputthisplay.anchor.setTo(0.5, 0.5);
                // 5 character display
                if (inputthisplay.text.length === 5) {

                    numberentered = true;
                    // okplay.alpha = 1;
                    nogoback.visible = true;
                    exit.visible = false;

                    // TODO:
                    this.getLocalStorage(inputthisplay.text);

                } else {
                    nogoback.visible = false;
                    exit.visible = true;
                    numberentered = false;
                    okplay.alpha = 0.5;
                }
            }


        },
        onDown: function (key) {
            console.log(key.keyCode);

            if (key.keyCode === 73 && blockInsert === false && enternumber === false) {
                inputthisplay.text = '';
                
                inputthisplay.visible = true;
                neededForPlay.visible = true;

                neededForPlay.text = '';
                blockInsert = true;
                numberentered = false;
                numberwaste = 0;
                ntext.text = numberwaste;
                // enternumber = true;
                this.insertNumber();
                //this.kiesspeler();
            }

            if (key.keyCode === 73 && blockInsert === true) {
                max.visible = false;
                // Number of waste may not be more than 5, if it is.... 
                
                if (numberwaste === 5){
                    // MAX reached
                    // TODO: Communicate limit = reached
                    max.visible = true;
                } else {
                    // MAX is not reached, add up
                    numberwaste++;
                    ntext.text = numberwaste;
                    // is there a number entered? If so calculate new remain
                    // TODO: above
                    if (numberentered){
                        console.log("needtoupdate");
                        this.getLocalStorage(inputthisplay.text);
                    }
                }
                
                
                


            }




            // if readytoplay false en number is ready to be entered
            if (key.keyCode === 90 && readytoplay === false && numberentered === true) {
               

                // This starts 
                // first of, let's check if this is possible
                // TODO: Implement further
                if (canPlay === true) {

                     // Here we should catch the accept and cancel buttons
                numberentered = false;
                nogoback.visible = false;
                max.visible = false;
                numbertext.visible = false;
                okplay.visible = false;
                ntext.visible = false;
                enternumberpng.visible = false;

                // TODO: Here comes the API CALL to send it
                console.log('StudID = ' + inputthisplay.text);
                console.log('Amount of waste = ' + numberwaste);
                //
                userPlays++;
                this.handleLocalStorage(inputthisplay.text, numberwaste);
                    // This starts the game, so make it an off
                    this.kiesspeler();
                    neededForPlay.visible = false;
                } else {
                   // Do nothing, wait till canPlay will be triggered
                }




            }

            // Canelbutton Name
            if (key.keyCode === 88 && readytoplay === false) {
                console.log('here');
                // TODO: check if there is a number entered, and update
                if (inputthisplay.text.length === 5){
                    nogoback.visible = true;
                    exit.visible = false;
                    // TODO: Update all values, without play
                    this.handleLocalStorage(inputthisplay.text, numberwaste);
                }
                gobackx2 = 0;
                enternumber = false;
                nogoback.visible = false;
                exit.visible = false;
                max.visible = false;
                blockInsert = false;
                numbertext.visible = false;
                ntext.visible = false;
                enternumberpng.visible = false;
                inputthisplay.visible = false;
                neededForPlay.visible = false;
                okplay.visible = false;
                
                
                // Check if there is a number entered

            }


            // starting of the game when everything is ready
            if (key.keyCode === 90 && readytoplay === true) {
                video.stop();
                this.game.time.events.remove(chooseloop);
                blockInsert = false;
                currentStudId = "";
                numberwaste = 0;
                enternumber = false;
                numberentered = false;
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
                inputthisplay.alpha = 0;
                enternumberpng.alpha = 0;
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
                enternumberpng.visible = true;
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
            nogoback.visible = false;
            exit.visible = true;
            okplay.visible = true;
            numbertext.visible = true;
            ntext.visible = true;
            enternumberpng.visible = true;
        },
        // TODO: TODO: TODO: TODO:
        // TODO: TODO: TODO: TODO:
        // de LOCALSTORAGE FUNCTIES MOETEN GEMERGERD WORDEN
        getLocalStorage(_studid) {
            userStorage = localStorage.getItem(_studid);
            // userStorage = parseInt(userStorage);
            userPlays = localStorage.getItem('x' + _studid);
            userPlays = parseInt(userPlays);

            // for sanity: trace everything
            console.log('amountofwasteforplay' + amountOfWasteForPlay);
            console.log('numberofwastethrownin' + numberwaste);

            console.log('userStorage = ' + userStorage);
            console.log('userPlays = ' + userPlays);

            if (userStorage === null || userStorage === NaN) {
                console.log('= New user');
                // NEXT STEP
                // IS THE CURRENT AMOUNT OF WASTE ENOUGH TO START A GAME?
                // Should we make it?
                // NOTE: User cannot play
                // TODO: note to user
                var remain;
                userPlays = 0;
                userStorage = numberwaste;
                currentStudId = _studid;
                // NOTE:
                // is the current amount of waste enough to start a game?
                if (numberwaste >= amountOfWasteForPlay){
                    // Can play
                    canPlay = true;
                    console.log('HEEFT GENOEG PUNTEN, namelijk ' + userStorage + ' nodig is ' + amountOfWasteForPlay);
                    neededForPlay.text = 'Je kunt spelen!'
                    okplay.alpha = 1;
                } else {
                    // Cannot Play
                    console.log('HEEFT NIET GENOEG PUNTEN, namelijk ' + userStorage + ' nodig is ' + amountOfWasteForPlay);
                    canPlay = false;
                    remain = (amountOfWasteForPlay * (userPlays + 1)) - userStorage;
                    neededForPlay.text = 'Gooi nog ' + remain + ' afval in om te spelen';
                    okplay.alpha = 0.5;
                }

            } else {
                console.log('= User exists');
                // but can it play?
                if (userStorage >= (amountOfWasteForPlay * (userPlays + 1))) {
                    // Should have enough points
                    console.log('Enough points! ' + userStorage + ' need is ' + (amountOfWasteForPlay * (userPlays + 1)));
                    canPlay = true;
                    neededForPlay.text = 'Je kunt spelen!';
                    okplay.alpha = 1;
                } else { 
                    // Not enough points so Should note howmany
                    console.log('Not enough points ' + userStorage + ' we need at least ' + (amountOfWasteForPlay * (userPlays + 1)));
                    canPlay = false;
                    // TODO: Calculate how much left is needed
                    remain = (amountOfWasteForPlay * (userPlays + 1)) - userStorage;
                    neededForPlay.text = 'Gooi nog ' + remain + ' afval in om te spelen';
                    okplay.alpha = 0.5;
                }  
            }


        },
        // local Storage Operator
        handleLocalStorage(_studid, _numwaste) {

            var newNumb = parseInt(userStorage) + parseInt(numberwaste);
            localStorage.setItem(_studid, newNumb);
            localStorage.setItem('x' + _studid, userPlays);
            // NOTE: Send data to wthe API - works fine
            // "http://localhost/greenup/src/api/assignpoints/" + _studid + "/" + lspoints
            // "https://ewastearcades.nl/greenup/api/assignpoints/"
            
            this.makeIOTcall("http://localhost/greenup/src/api/assignpoints/" + _studid + "/" + newNumb);
        },
        // fire away the API calls
        makeIOTcall: function (theUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    console.log(xmlHttp.responseText);
                }
            }
            xmlHttp.open("GET", theUrl, true); // true for asynchronous 
            xmlHttp.send(null);
        }


    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Screensaver = Screensaver;
}());