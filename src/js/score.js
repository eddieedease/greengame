(function() {
    'use strict';

    function Score() {

    }
    var bmpText;
    var gamename;
    var headertext;
    var scoreText;
    var scores;
    var let11;
    var let12;
    var let13;
    var let14;
    var let15;
    var let21;
    var let22;
    var let23;
    var let24;
    var let25;
    var letters1 = [];
    var letters2 = [];
    var currentselect1;
    var currentselect2;
    var p1up;
    var p2up;
    var p2down;
    var p1ok;
    var p1back;
    var p1down;
    var p2ok;
    var p2back;
    var currentnumber1 = 0;
    var currentnumber2 = 0;
    var currentletter1 = 0;
    var currentletter2 = 0;
    // the collected names
    var name1 = ["a", "", "", ""];
    var name2 = ["a", "", "", ""];

    // the names
    var genname1;
    var genname2;

    var timerdisplay;
    var counter = 45;
    var timeralready;


    var donebutton;

    var currentletterxArray = [-100, -50, 0, 50, 100];

    var arrowcurrent1;
    var arrowcurrent2;

    var nothighp1;
    var nothighp2;

    var p1;
    var p2;

    var scorestext;

    var highscoreChanged = false;

    var p1ready = false;
    var p2ready = false;
    var highp1 = false;
    var highp2 = false;
    var backtomain = false;

    var scorep1;
    var scorep2;
    var plek1;
    var plek1tekst;
    var plek2;
    var plek2tekst;

    var aantalhigh = 0;

    var backbutton;
    var knoppenscore;

    var backtomain = false;

    var dudes;

    var scoreaudio;

    var plek1taken;
    var plek2taken;


    var scoresssss;

    var toScore = false;

    var alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '@'];

    //scoring
    var scoresArray = [];
    var nameArray = [];

    var p1higher = false;
    var p2higher = false;

    //control


    Score.prototype = {
        create: function() {
            timeralready = false;

            name1 = ["a", "", "", ""];
            name2 = ["a", "", "", ""];

            this.game.add.image(0, 0, 'scorebg');
            dudes = this.game.add.image(this.game.width / 2 + 70, this.game.height - 120, 'scoredudes');
            backbutton = this.game.add.sprite(25, 440, 'backbutton');
            dudes.anchor.setTo(0.5, 0.5);
            dudes.scale.setTo(0.6, 0.6);
            dudes.visible = false;

            toScore = false;

            p1higher = false;
            p2higher = false;

            knoppenscore = this.game.add.sprite(25, 385, 'knoppenscore');
            knoppenscore.visible = false;

            backbutton.visible = true;

            counter = 45;

            scoreaudio = this.game.add.audio('scoresound');


            scorep1 = this.game.scorep1;
            console.log(scorep1);
            scorep2 = this.game.scorep2;

            backtomain = false;
            p1ready = false;
            p2ready = false;
            highp1 = false;
            highp2 = false;
            plek1 = 0;
            plek2 = 0;
            currentselect1 = 0;
            currentselect2 = 0;
            currentnumber1 = 0;
            currentnumber2 = 0;



            this.game.highgame4 = JSON.parse(localStorage.getItem('highgame4'));

            timerdisplay = this.game.add.bitmapText(this.game.world.centerX + 6, 40, 'scorefont', '', 45);
            timerdisplay.anchor.setTo(0.5, 0.5);
            //timerdisplay.fixedToCamera = true;
            //timerdisplay.anchor.setTo(0.5, 0.5);





            scoresArray = this.game.highgame4[0];
            nameArray = this.game.highgame4[1];
            //gamename = this.game.add.bitmapText(this.game.width / 2, this.game.height / 10, 'scorefont', "Prullenbak Bullebak", 40);


            // checking score player 1
            // TODO here should come the comparison of the highshcores
            // this will
            for (var w = 0; w < scoresArray.length; w++) {
                //console.log(w + "  " + scoresArray[w])
                if (scoresArray[w] >= scorep1 || scorep1 == null) {

                } else {
                    if (highp1 !== true) {
                        highp1 = true;
                        plek1 = w;
                        aantalhigh++;
                    }

                }
            }

            // check if multiplay
            if (this.game.multiplay === true) {
                for (var o = 0; o < scoresArray.length; o++) {
                    if (scoresArray[o] >= scorep2 || scorep2 == null) {

                    } else {
                        if (highp2 !== true) {
                            console.log("trace");
                            highp2 = true;
                            plek2 = o;

                            // set initial for 
                            p2higher = true;

                            if (highp1 === true && plek1 < plek2) {
                                p1higher = true;
                                p2higher = false;
                            }

                            if (highp1 === true && plek1 > plek2) {
                                p2higher = true;
                                p1higher = false;
                            }


                            if (plek2 === plek1 && highp1 === true) {
                                if (highp1 >= highp2) {
                                    p1higher = true;
                                    p2higher = false;
                                } else {
                                    p2higher = true;
                                    p1higher = false;
                                }
                            }


                            console.log('player 1 = rank --> ' + plek1);
                            console.log('player 2 = rank --> ' + plek2);
                            aantalhigh++;

                        }

                    }
                }



            }






            headertext = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5 + 20, 'scorefont', 'goed gedaan! vul je naam in', 40);
            // gamename.anchor.setTo(0.5, 0.5);
            headertext.anchor.setTo(0.5, 0.5);

            //NOTE settings up player inputs (iffy)

            if (highp1) {
                console.log("player 1 has a high score !")
                this.game.time.events.loop(Phaser.Timer.SECOND, this.timerLoop, this);
                timeralready = true;
                knoppenscore.visible = true;
                backbutton.visible = false;
                let11 = this.game.add.bitmapText(this.game.width / 2 - 100, this.game.height / 2, 'scorefont', 'a', 50);
                let12 = this.game.add.bitmapText(this.game.width / 2 - 50, this.game.height / 2, 'scorefont', '', 50);
                let13 = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'scorefont', '', 50);
                let14 = this.game.add.bitmapText(this.game.width / 2 + 50, this.game.height / 2, 'scorefont', '', 50);
                let15 = this.game.add.bitmapText(this.game.width / 2 + 100, this.game.height / 2, 'scorefont', '', 50);
                p1 = this.game.add.bitmapText(this.game.width / 8, this.game.height / 2, 'scorefont', 'speler 1', 40);

                plek1tekst = this.game.add.bitmapText(this.game.width / 4 * 2.8, this.game.height / 2, 'scorefont', ' ' + scorep1, 40);
                letters1 = [let11, let12, let13, let14, let15];
                arrowcurrent1 = this.game.add.image(this.game.width / 2 - 88, this.game.height / 2 + 20, 'currentletter');
                arrowcurrent1.anchor.setTo(0.5, 0.5);
                p1up = this.input.keyboard.addKey(Phaser.Keyboard.UP);
                p1up.onDown.add(this.p1up, this);
                p1down = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                p1down.onDown.add(this.p1down, this);
                p1back = this.input.keyboard.addKey(Phaser.Keyboard.X);
                p1back.onDown.add(this.p1back, this);
                p2back = this.input.keyboard.addKey(Phaser.Keyboard.E);
                p2back.onDown.add(this.p2back, this);
            } else {
                p1ready = true;
                //backbutton.visible = true;
            }

            p1ok = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            backtomain = this.input.keyboard.addKey(Phaser.Keyboard.X);
            p1ok.onDown.add(this.p1ok, this);
            backtomain.onDown.add(this.backtomain, this);

            if (highp2 && this.game.multiplay === true) {
                console.log("player 2 has a high score !!");
                if (timeralready === false) {
                    this.game.time.events.loop(Phaser.Timer.SECOND, this.timerLoop, this);
                }

                knoppenscore.visible = true;
                backbutton.visible = false;
                let21 = this.game.add.bitmapText(this.game.width / 2 - 100, this.game.height / 2 + 180, 'scorefont', 'a', 50);
                let22 = this.game.add.bitmapText(this.game.width / 2 - 50, this.game.height / 2 + 180, 'scorefont', '', 50);
                let23 = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 + 180, 'scorefont', '', 50);
                let24 = this.game.add.bitmapText(this.game.width / 2 + 50, this.game.height / 2 + 180, 'scorefont', '', 50);
                let25 = this.game.add.bitmapText(this.game.width / 2 + 100, this.game.height / 2 + 180, 'scorefont', '', 50);

                plek2tekst = this.game.add.bitmapText(this.game.width / 4 * 2.8, this.game.height / 2 + 180, 'scorefont', ' ' + scorep2, 40);

                p2 = this.game.add.bitmapText(this.game.width / 8, this.game.height / 2 + 180, 'scorefont', 'speler 2', 40);
                letters2 = [let21, let22, let23, let24, let25];
                arrowcurrent2 = this.game.add.image(this.game.width / 2 - 88, this.game.height / 2 + 200, 'currentletter');
                arrowcurrent2.anchor.setTo(0.5, 0.5);

                p2up = this.input.keyboard.addKey(Phaser.Keyboard.W);
                p2up.onDown.add(this.p2up, this);
                p2down = this.input.keyboard.addKey(Phaser.Keyboard.S);
                p2down.onDown.add(this.p2down, this);
                p2ok = this.input.keyboard.addKey(Phaser.Keyboard.Q);
                p2ok.onDown.add(this.p2ok, this);
                //p2back = this.input.keyboard.addKey(Phaser.Keyboard.E);
                //p2back.onDown.add(this.p2back, this);
            } else {
                p2ready = true;
                //backbutton.visible = true;
            }


            // NOTE yes, below is the scorescreen
            //scorestext.visible = false;

            // wat als beide geen highscore hebben behaald
            if (highp1 === false && highp2 === false) {
                backbutton.visible = true;
                knoppenscore.visible = false;
                scorestext = this.game.add.bitmapText(this.game.width / 4 * 1.5, this.game.height / 2 + 80, 'scorefont', '1  = ' + nameArray[0] + '\n2 = ' + nameArray[1] + '\n3 = ' + nameArray[2] + '\n4 = ' + nameArray[3] + '\n5 = ' + nameArray[4], 50);
                scorestext.anchor.setTo(0.5, 0.5);
                scoresssss = this.game.add.bitmapText(this.game.width / 4 * 3, this.game.height / 2 + 90, 'scorefont', scoresArray[0] + '\n' + scoresArray[1] + '\n' + scoresArray[2] + '\n' + scoresArray[3] + '\n' + scoresArray[4], 50);
                scoresssss.anchor.setTo(0.5, 0.5);
                scoreaudio.play();
                dudes.visible = true;
                //headertext.text = 'helaas! geen highscore';

                if (this.game.multiplay === false) {
                    headertext.text = 'helaas! geen highscore' + '\n' + 'player 1: ' + scorep1;
                } else {
                    headertext.text = 'helaas! geen highscore' + '\n' + 'player 1: ' + scorep1 + '   score player 2: ' + scorep2;
                }
                headertext.align = "center";


                headertext.anchor.set(0.5);
                //scorestext.visible = true;
                backtomain = true;
                p2back = this.input.keyboard.addKey(Phaser.Keyboard.E);
                p2back.onDown.add(this.p2back, this);
                this.game.time.events.add(Phaser.Timer.SECOND * 15, this.toScreensaver, this);
            }



            //backbutton.visible = false;

        },

        // UPDATE, do not use the update loop in this one
        update: function() {




        },
        timerLoop: function() {
            //slidertweento.start();
            if (counter === 0 && toScore === false) {
                toScore = true;
                timerdisplay.setText(" ");
                p1ready = true;
                p2ready = true;



                this.showscores();
            }

            if (counter > 0) {
                counter--;
                if (p1ready === true && p2ready == true) {
                    timerdisplay.setText(" ");
                } else {
                    timerdisplay.setText(counter);
                }

            } else {
                if (p1ready !== true && p2ready !== true) {
                    timerdisplay.setText(" ");
                    arrowcurrent1.visible = false;
                    arrowcurrent2.visible = false;
                    p1ready = true;
                    p2ready = true;
                    this.showscores();
                }

            }

            //timerdisplay.fixedToCamera = true;
        },
        toScreensaver: function() {
            scoreaudio.stop();
            this.game.state.start('screensaver');
        },


        showscores: function() {
            //dudes.visible = true;

            //TODO set ok for score. set all



            if (p1ready && p2ready) {

                // shoot it in

                //  1 & 2 have highscore, 1 = higher so 2 gets kicked in first
                if (highp2 === true && p1higher && highp1) {
                    console.log('plek 2 = ' + plek2);
                    genname2 = name2.join('');
                    p2ready = true;
                    aantalhigh--;
                    arrowcurrent2.visible = false;
                    headertext.text = '';
                    scoresArray.splice(plek2, 0, scorep2);
                    nameArray.splice(plek2, 0, genname2);
                    scoresArray.splice(5, 1);
                    nameArray.splice(5, 1);
                }

                //  1 has highscore, is minimal case of is highscore = set
                if (highp1 === true) {
                    console.log('plek 1 = ' + plek1);
                    genname1 = name1.join('');
                    p1ready = true;
                    headertext.text = '';
                    aantalhigh--;
                    arrowcurrent1.visible = false;
                    scoresArray.splice(plek1, 0, scorep1);
                    nameArray.splice(plek1, 0, genname1);
                    scoresArray.splice(5, 1);
                    nameArray.splice(5, 1);

                }

                // if p2 has higher score, first let above 'if' (player 1) than overwrite
                if (highp2 === true && p2higher) {
                    console.log('plek 2 = ' + plek2);
                    genname2 = name2.join('');
                    p2ready = true;
                    aantalhigh--;
                    arrowcurrent2.visible = false;
                    headertext.text = '';
                    scoresArray.splice(plek2, 0, scorep2);
                    nameArray.splice(plek2, 0, genname2);
                    scoresArray.splice(5, 1);
                    nameArray.splice(5, 1);
                }




                knoppenscore.visible = false;
                backbutton.visible = true;
                dudes.visible = true;
                scorestext = this.game.add.bitmapText(this.game.width / 4 * 1.5, this.game.height / 2 + 80, 'scorefont', '1  = ' + nameArray[0] + '\n2 = ' + nameArray[1] + '\n3 = ' + nameArray[2] + '\n4 = ' + nameArray[3] + '\n5 = ' + nameArray[4], 40);
                scorestext.anchor.setTo(0.5, 0.5);
                headertext.text = 'highscores';
                scoresssss = this.game.add.bitmapText(this.game.width / 4 * 3, this.game.height / 2 + 80, 'scorefont', scoresArray[0] + '\n' + scoresArray[1] + '\n' + scoresArray[2] + '\n' + scoresArray[3] + '\n' + scoresArray[4], 50);
                scoresssss.anchor.setTo(0.5, 0.5);

                var booya = [
                    scoresArray,
                    nameArray
                ];

                this.game.time.events.add(Phaser.Timer.SECOND * 10, this.toScreensaver, this);
                switch (this.game.currentgame) {
                    case "breakout":
                        localStorage.setItem('highgame1', JSON.stringify(booya));
                        break;
                    case "catmouse":
                        localStorage.setItem('highgame2', JSON.stringify(booya));
                        break;
                    case "racer":
                        localStorage.setItem('highgame3', JSON.stringify(booya));
                        break;
                    case "platformer":
                        localStorage.setItem('highgame4', JSON.stringify(booya));
                        break;
                    case "other":
                        break;
                }


                //clean up everything
                if (highp1) {
                    let11.destroy();
                    let12.destroy();
                    let13.destroy();
                    let14.destroy();
                    let15.destroy();
                    p1.destroy();

                    plek1tekst.destroy();
                    highp1 = false;

                }
                if (highp2) {
                    let21.destroy();
                    let22.destroy();
                    let23.destroy();
                    let24.destroy();
                    let25.destroy();
                    p2.destroy();

                    plek2tekst.destroy();
                    highp2 = false;
                }
            }



            if (highp1 === false && highp2 === false) {
                scorestext.visible = true;
                backtomain = true;
                scoreaudio.play();
            }


        },

        // OK TIME FOR THE KEYPRESS HANDLING
        p1up: function() {


            if (p1ready === false) {
                //this.game.world.remove(letters1[currentnumber1]);


                var q;

                if (currentletter1 == 26) {
                    currentletter1 = 0;
                } else {
                    currentletter1++;
                }


                switch (currentnumber1) {
                    case 0:
                        q = let11;
                        break;
                    case 1:
                        q = let12;
                        break;
                    case 2:
                        q = let13;
                        break;
                    case 3:
                        q = let14;
                        break;
                    case 4:
                        q = let15;
                        break;
                }
                q.text = alfabet[currentletter1];
                name1[currentnumber1] = alfabet[currentletter1];
            }

            //console.log(letters1[currentnumber1]);
            //letters1[currentnumber1].setText = "b"
            //letters1[currentnumber1] = this.game.add.bitmapText(this.game.width / 2 - 80, this.game.height / 2, 'scorefont', alfabet[currentletter1], 50);
        },
        p1down: function() {

            if (p1ready === false) {
                var q;
                //this.game.world.remove(letters1[currentnumber1]);
                if (currentletter1 == 0) {
                    currentletter1 = 26;
                } else {
                    currentletter1--;
                }
                switch (currentnumber1) {
                    case 0:
                        q = let11;
                        break;
                    case 1:
                        q = let12;
                        break;
                    case 2:
                        q = let13;
                        break;
                    case 3:
                        q = let14;
                        break;
                    case 4:
                        q = let15;
                        break;
                }
                q.text = alfabet[currentletter1];
                name1[currentnumber1] = alfabet[currentletter1];
            }
        },
        p2up: function() {
            if (p2ready === false) {
                var q;
                //is.game.world.remove(letters2[currentnumber2]);

                if (currentletter2 == 26) {
                    currentletter2 = 0;
                } else {
                    currentletter2++;
                }
                switch (currentnumber2) {
                    case 0:
                        q = let21;
                        break;
                    case 1:
                        q = let22;
                        break;
                    case 2:
                        q = let23;
                        break;
                    case 3:
                        q = let24;
                        break;
                    case 4:
                        q = let25;
                        break;
                }
                q.text = alfabet[currentletter2];
                name2[currentnumber2] = alfabet[currentletter2];
            }
        },
        p2down: function() {

            if (p2ready === false) {
                var q;
                if (currentletter2 == 0) {
                    currentletter2 = 26;
                } else {
                    currentletter2--;
                }
                switch (currentnumber2) {
                    case 0:
                        q = let21;
                        break;
                    case 1:
                        q = let22;
                        break;
                    case 2:
                        q = let23;
                        break;
                    case 3:
                        q = let24;
                        break;
                    case 4:
                        q = let25;
                        break;
                }


                q.text = alfabet[currentletter2];

                name2[currentnumber2] = alfabet[currentletter2];
            }

        },
        p1ok: function() {


            if (p1ready === false) {
                if (currentnumber1 != 4) {
                    currentnumber1++;
                    arrowcurrent1.x = arrowcurrent1.x + 50;
                } else {
                    //TODO set ok for score. set all

                    p1ready = true;
                    aantalhigh--;
                    arrowcurrent1.visible = false;
                    this.showscores();
                }

            }
        },
        p2ok: function() {



            if (p2ready === false) {
                if (currentnumber2 != 4) {
                    currentnumber2++;
                    arrowcurrent2.x = arrowcurrent2.x + 50;
                } else {

                    p2ready = true;
                    aantalhigh--;
                    arrowcurrent2.visible = false;
                    this.showscores();
                }
            }
        },
        p1back: function() {
            if (p1ready === false) {
                if (currentnumber1 != 0) {
                    currentnumber1--;
                    arrowcurrent1.x = arrowcurrent1.x - 50;
                } else {
                    //todo set ok for score
                }
            }
        },
        backtomain: function() {
            if (backtomain === true) {
                if (this.game.currentgame === "racer") {
                    location.reload();
                }
                scoreaudio.stop();
                this.game.state.start('screensaver');
                return;
            }
        },
        p2back: function() {
            if (p2ready === false) {
                if (currentnumber2 !== 0) {
                    currentnumber2--;
                    arrowcurrent2.x = arrowcurrent2.x - 50;
                } else {
                    //todo set ok for score
                }
            } else if (backtomain === true) {
                if (this.game.currentgame === "racer") {
                    location.reload();
                }
                scoreaudio.stop();
                this.game.state.start('screensaver');
                return;
            }
        }

    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Score = Score;
}());;