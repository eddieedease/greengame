(function () {
    'use strict';

    function Platformer() {}

    var p2Platforms;
    var platforms;
    var platform;
    var cursors;

    var music;
    var playerhit;

    var stars;
    var starBounce = [];
    var score = 0;
    var scoreText;
    var facingp1 = 'left';
    var facingp2 = 'right';

    var platplayer1;
    var platplayer2;

    var carry1 = false;
    var carry2 = false;

    var waste1;
    var waste2;
    var waste3;

    var p1jump;
    var p1grab;

    var lifeactive = false;


    var p2left;
    var p2right;
    var p2up;
    var p2down;
    var p2grab;

    var scorep1 = 0;
    var scorep2 = 0;

    var scoretogether = 0;
    var scoreTextp1;
    var scoreTextp2;

    var enemy1;
    var enemy1anim
    var enemy2;
    var enemy2anim;
    var enemy3;
    var enemy3anim;
    //var mintext;
    var fulltext;

    var audiohit;
    var audiocoin;

    var scoringtext;

    var leveluptween;
    var levelup;

    var timerdisplay;
    var counter = 30;

    var p1nextlevel = false;
    var p2nextlevel = false;

    var levelscores = [50, 100, 150, 200, 250];
    var currentlevel = 0;

    var lifep11;
    var lifep12;
    var lifep13;

    var lifep21;
    var lifep22;
    var lifep23;

    var enemycreated = false;
    var startCreateEnemy = false;

    var enemyspeed1 = 100;
    var enemyspeed2 = -100;
    var enemyspeed3x = -100;
    var enemyspeed3y = 0;
    var enemyspeed3yCurve = 5;
    var fly = false; //spawn fly enemies

    var starsalive = 15;
    var levens1 = 3;
    var levens2 = 3;

    var cont1;
    var cont2;
    var cont3;

    var buzzer1 = true;
    var buzzer2 = true;
    var buzzer3 = true;
    var buzz1 = true;
    var buzz2 = true;
    var buzz3 = true;

    var ledge1;
    var ledge2;
    var ledge3;
    var ledge4;

    var lifeup;

    var round = 1;

    var p1over = false;
    var p2over = false;

    var valid;
    var creditadd;

    var credit;

    var train;
    var traintween;

    var bg1;
    var bg2;
    var bg3;

    var waste1vast = "";
    var waste2vast = "";
    var waste3vast = "";



    var wastecollected = 0;

    var ssplastic;
    var sspapier;
    var sseten;

    var pakop;
    var recyclehier;
    var uitleg;
    var gameover;

    var stoplicht1
    var stoplicht2
    var stoplicht3;

    var aantalplastic;
    var aantalpapier;
    var aantaleten;

    var kranten;
    var compost;
    var fleece;

    var tutorial = true;

    var plastictween;
    var papiertween;
    var etentween;

    var stopbord1;
    var stopbord2;
    var stopbord3;

    var perron;

    var buzzer;
    var cheering;
    var gameoversound;
    var levelsound;
    var wastecollectedsound;
    var wastecollectedsound2;

    var over;
    var overtween;

    var ontwijk;
    var ontwijktween;


    // "1","2","3"
    var player1heeftvast;
    var player2heeftvast;

    var p1w1press = false;
    var p1w2press = false;
    var p1w3press = false;

    var p2w1press = false;
    var p2w2press = false;
    var p2w3press = false;

    var p1jumpblock = false
    var p2jumpblock = false;

    var enemySign1;
    var enemySign2;

    var randomy1;
    var randomTimer1;
    var randomy2;
    var randomTimer2;
    var randomy3;
    var randomTimer3;

    var coinText;
    var minleventext;

    Platformer.prototype = {
        create: function () {

            credit = localStorage.getItem('credits');

            this.game.currentgame = "platformer";
            enemyspeed1 = 100;
            enemyspeed2 = -100;
            enemyspeed3x = -100;
            enemyspeed3y = 0;
            enemyspeed3yCurve = 5;
            wastecollected = 0;
            round = 1;
            levens1 = 3;
            levens2 = 3;
            scorep1 = 0;
            scorep2 = 0;
            tutorial = true
            aantalplastic = 0;
            aantalpapier = 0;
            aantaleten = 0;



            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            music = this.game.add.audio('platformer');

            playerhit = this.game.add.audio('birdhit');

            music.play();
            music.loopFull(1.0);

            audiohit = this.game.add.audio('hitby');
            audiocoin = this.game.add.audio('click');


            p1w1press = false;
            p1w2press = false;
            p1w2press = false;

            p2w1press = false;
            p2w2press = false;
            p2w2press = false;


            buzzer = this.game.add.audio('buzzer');
            cheering = this.game.add.audio('cheering');
            gameoversound = this.game.add.audio('gameoversound');
            levelsound = this.game.add.audio('levelsound');
            wastecollectedsound = this.game.add.audio('wastecollectedsound');
            wastecollectedsound2 = this.game.add.audio('wastecollectedsound2');

            //  A simple background for our game
            bg1 = this.game.add.sprite(0, 0, 'sky');
            bg2 = this.game.add.sprite(0, 0, 'pbbg2');
            bg2.visible = false;
            bg3 = this.game.add.sprite(0, 0, 'pbbg3');
            bg3.visible = false;

            ontwijk = this.game.add.sprite(340, -25, 'ontwijk');
            ontwijk.visible = false;

            train = this.game.add.sprite(-1200, 350, 'train', 0);

            traintween = this.game.add.tween(train);

            traintween.to({
                x: 1500
            }, 3500, Phaser.Easing.Linear.None);
            //traintween.onComplete.add(firstTween, this);
            traintween.start();

            perron = this.game.add.sprite(0, 500, 'perron');



            pakop = this.game.add.sprite(0, 0, 'pakop');

            uitleg = this.game.add.sprite(30, 30, 'uitleg');
            //gameover = this.game.add.sprite(0, 0, 'gameover');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.game.add.group();
            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;
            // Here we create the ground.
            platform = platforms.create(0, this.game.world.height - 55, 'platformground');
            platform.alpha = 0.1;
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            platform.scale.setTo(2, 2);
            //  This stops it from falling away when you jump on it
            platform.body.immovable = true;

            //  Now let's create legdes
            var randomlegde = this.game.rnd.integerInRange(0, 2);

            currentlevel = 0;
            lifeactive = false;

            cont1 = this.game.add.sprite(100, 408, 'cont1');
            this.game.physics.arcade.enable(cont1);
            cont2 = this.game.add.sprite(440, 408, 'cont2');
            this.game.physics.arcade.enable(cont2);
            cont3 = this.game.add.sprite(800, 408, 'cont3');
            this.game.physics.arcade.enable(cont3);
            recyclehier = this.game.add.sprite(500, 400, 'recyclehier');
            recyclehier.visible = false;
            //this.createenemy1();
            //this.createenemy2();
            
            //this.warningEnemy1();
            //this.warningEnemy2();

            enemycreated = false;

            //console.log(randomlegde);
            switch (randomlegde) {
                case 0:
                    ledge1 = platforms.create(400, 400, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(500, 125, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(100, 200, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(600, 260, 'platform');
                    ledge4.body.immovable = true;
                    break;
                case 1:
                    ledge1 = platforms.create(380, 110, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(300, 370, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(20, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(700, 220, 'platform');
                    ledge4.body.immovable = true;
                    break;
                case 2:
                    ledge1 = platforms.create(100, 250, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(350, 140, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(700, 250, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(250, 370, 'platform');
                    ledge4.body.immovable = true;
                    break;
            }
            if (this.game.multiplay === true) {
                // NOTE Player2
                p2grab = this.input.keyboard.addKey(Phaser.Keyboard.E);
                p2left = this.input.keyboard.addKey(Phaser.Keyboard.A);
                p2right = this.input.keyboard.addKey(Phaser.Keyboard.D);
                p2up = this.input.keyboard.addKey(Phaser.Keyboard.Q);
                p2down = this.input.keyboard.addKey(Phaser.Keyboard.S);
                platplayer2 = this.game.add.sprite(900, this.game.world.height - 250, 'crp2');
                platplayer2.anchor.setTo(0.3, 0.5);
                platplayer2.scale.setTo(0.6, 0.6);
                this.game.physics.arcade.enable(platplayer2);
                platplayer2.body.setSize(80, 131, 40, 0);
                platplayer2.body.gravity.y = 700;
                platplayer2.body.collideWorldBounds = true;
                //  Our two animations, walking left and right.
                platplayer2.animations.add('left', [6, 7, 8], 10, true);
                platplayer2.animations.add('right', [9, 10, 11], 10, true);
                platplayer2.animations.add('jumpleft', [12, 13, 14], 10, true);
                platplayer2.animations.add('jumpright', [17, 16, 15], 10, true);
                scoreTextp2 = this.game.add.bitmapText(this.game.width - 100, 40, 'scorefont', 'Score P2\n0', 40);
                scoreTextp2.anchor.setTo(0.5, 0.5);
                lifep21 = this.game.add.image(760, 30, 'p2life');
                lifep22 = this.game.add.image(720, 30, 'p2life');
                lifep23 = this.game.add.image(680, 30, 'p2life');
            }

            p1jump = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            p1grab = this.input.keyboard.addKey(Phaser.Keyboard.X);

            // p1
            // The platplayer1 and its settings
            platplayer1 = this.game.add.sprite(100, this.game.world.height - 250, 'crp1');
            platplayer1.anchor.setTo(0.3, 0.5);
            platplayer1.scale.setTo(0.6, 0.6);



            this.game.physics.arcade.enable(platplayer1);
            platplayer1.body.setSize(80, 131, 40, 0);


            platplayer1.body.gravity.y = 700;
            platplayer1.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
            platplayer1.animations.add('left', [6, 7, 8], 10, true);
            platplayer1.animations.add('right', [9, 10, 11], 10, true);
            platplayer1.animations.add('jumpleft', [12, 13, 14], 10, true);
            platplayer1.animations.add('jumpright', [17, 16, 15], 10, true);
            //this.createStars();





            waste1 = this.game.add.sprite(200, 0, 'ssplastic');
            waste2 = this.game.add.sprite(400, 0, 'sspapier');
            waste3 = this.game.add.sprite(800, 0, 'sseten');

            //waste1 = this.game.add.sprite(200, 0, 'duck1');
            waste1.scale.setTo(0.7, 0.7);
            waste1.anchor.setTo(0.5, 0.5);
            //waste2 = this.game.add.sprite(400, 0, 'duck2');
            waste2.scale.setTo(0.7, 0.7);
            waste2.anchor.setTo(0.5, 0.5);
            // waste3 = this.game.add.sprite(800, 0, 'duck3');
            waste3.scale.setTo(0.7, 0.7);
            waste3.anchor.setTo(0.5, 0.5);

            waste1.kill();
            waste3.kill();

            stoplicht1 = this.game.add.sprite(150, 530, 'stoplicht');
            stoplicht2 = this.game.add.sprite(490, 530, 'stoplicht');
            stoplicht3 = this.game.add.sprite(850, 530, 'stoplicht');
            stoplicht1.scale.setTo(0.5, 0.5);
            stoplicht2.scale.setTo(0.5, 0.5);
            stoplicht3.scale.setTo(0.5, 0.5);
            stoplicht1.anchor.setTo(0.5, 0.5);
            stoplicht2.anchor.setTo(0.5, 0.5);
            stoplicht3.anchor.setTo(0.5, 0.5);
            stoplicht1.frame = 0;
            stoplicht2.frame = 0;
            stoplicht3.frame = 0;

            stopbord1 = this.game.add.sprite(97, 400, 'stopbord');
            stopbord2 = this.game.add.sprite(441, 400, 'stopbord');
            stopbord3 = this.game.add.sprite(796, 400, 'stopbord');







            this.game.physics.arcade.enable(waste1);
            waste1.body.gravity.y = 200;
            waste1.body.bounce.y = 0.2;
            waste1.body.setSize(80, 70, -5, 0);
            //console.log(waste1.width);
            //console.log(waste1.height);
            this.game.physics.arcade.enable(waste2);
            waste2.body.gravity.y = 200;
            waste2.body.bounce.y = 0.2;
            waste2.body.setSize(80, 70, -5, 0);
            this.game.physics.arcade.enable(waste3);
            waste3.body.gravity.y = 200;
            waste3.body.bounce.y = 0.2;
            waste3.body.setSize(80, 70, -5, 0);

            scoreTextp1 = this.game.add.bitmapText(100, 40, 'scorefont', 'Score P1\n0', 40);

            scoreTextp1.anchor.setTo(0.5, 0.5);

            //  Our controls.
            cursors = this.game.input.keyboard.createCursorKeys();

            //LIFE UP
            lifeup = this.game.add.sprite(this.game.width / 2, 30, 'lifeup');
            lifeup.scale.setTo(0.7, 0.7);
            this.game.physics.arcade.enable(lifeup);
            lifeup.body.gravity.y = 100;
            lifeup.kill();

            lifep11 = this.game.add.image(240, 30, 'p1life');
            lifep12 = this.game.add.image(280, 30, 'p1life');
            lifep13 = this.game.add.image(320, 30, 'p1life');

            if (this.game.multiplay === true) {
                var arraylives = [lifep11, lifep12, lifep13, lifep21, lifep22, lifep23];
            } else {
                var arraylives = [lifep11, lifep12, lifep13];
            }


            for (var n = 0; n < arraylives.length; n++) {
                arraylives[n].scale.setTo(0.6, 0.6);
                arraylives[n].anchor.setTo(0.5, 0.5);
            }

            /*valid = this.game.add.image(this.game.width - 100, 100, 'valid')
            valid.anchor.set(0.5, 0.5);
            valid.visible = false;*/


            creditadd = this.input.keyboard.addKey(Phaser.Keyboard.O);
            creditadd.onDown.add(this.creditadd, this);

            fleece = this.game.add.image(80, 600, 'fleece');
            kranten = this.game.add.image(400, 600, 'kranten');
            compost = this.game.add.image(780, 600, 'compost');

            over = this.game.add.sprite(100, 240, 'gameoverr');
            over.alpha = 0;

            coinText = this.game.add.group();
            minleventext = this.game.add.group();
        },
        creditadd: function () {

            credit = parseInt(credit) + 3;

            localStorage.setItem('credits', credit);

            this.game.aantalphones = this.game.aantalphones + 1;
            localStorage.setItem('aantalphones', this.game.aantalphones);
            valid.visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.creditgone, this);
        },
        creditgone: function () {
            this.game.time.events.remove(Phaser.Timer.SECOND * 3, this.creditgone, this);
            valid.visible = false;
        },

        update: function () {
            if (tutorial === true) {
                waste2.frame = 0;
                pakop.x = waste2.x + 30;
                pakop.y = waste2.y - 30;
            }

            //  Allow the platplayer1 to jump if they are touching the ground.

            //  Collide the platplayer1 and the stars with the platforms
            this.game.physics.arcade.collide(platplayer1, platforms);

            if(p1over === false) {
                if (p1jump.isDown && platplayer1.body.touching.down && this.game.multiplay == false) {
                    platplayer1.body.velocity.y = -450;
                    //console.log("p1 jumzping");
                }
            }


            if (this.game.multiplay === true) {

                // TODO Player 2
                this.game.physics.arcade.collide(platplayer2, platforms);

                //console.log(platplayer1.body.velocity.y);
                //this.game.physics.arcade.collide(platplayer1, platplayer2);
                this.game.physics.arcade.collide(platplayer2, platplayer1, this.playersHit);
                if(p2over === false) {
                    this.game.physics.arcade.overlap(platplayer2, stars, this.collectStar2, null, this);
                    platplayer2.body.checkCollision.up = false;
                    platplayer2.body.checkCollision.left = false;
                    platplayer2.body.checkCollision.right = false;
                    platplayer2.body.checkCollision.down = true;
                    this.game.physics.arcade.collide(platplayer2, enemy1, this.killenemy, null, this);
                    this.game.physics.arcade.collide(platplayer2, enemy2, this.killenemy, null, this);
                    if(fly) this.game.physics.arcade.collide(platplayer2, enemy3, this.killenemy, null, this);
                    platplayer2.body.checkCollision.up = true;
                    platplayer2.body.checkCollision.left = true;
                    platplayer2.body.checkCollision.right = true;
                    this.game.physics.arcade.collide(platplayer2, enemy1, this.hitenemy, null, this);
                    this.game.physics.arcade.collide(platplayer2, enemy2, this.hitenemy, null, this);
                    if(fly) this.game.physics.arcade.collide(platplayer2, enemy3, this.killenemy, null, this);
                }
                if(p2over === false) {
                    //  Allow the platplayer1 to jump if they are touching the ground.
                    if (p2up.isDown && platplayer2.body.touching.down) {
                        platplayer2.body.velocity.y = -450;
                    }
                }
                if(p1over === false) {
                    //  This code is here a second time, because oftherwise p1 can't jump while on p2.
                    if (p1jump.isDown && platplayer1.body.touching.down) {
                        platplayer1.body.velocity.y = -450;
                        //console.log("p1 jumzping");
                    }
                }
                

                // NOTE trying to grab something
                if(p2over === false) {
                this.physics.arcade.overlap(platplayer2, waste1, function (_player, _waste) {

                    if (p2grab.isDown && carry2 !== true) {
                        p2w1press = true;
                    }
                    if (p2w1press === true && carry2 !== true) {
                        carry2 = true;
                        if(waste1vast === "p1") {
                            p1w1press = false;
                            carry1 = false;
                            p1jumpblock = false;
                        }
                        waste1vast = "p2";
                        //console.log("GRABBBINGGGGG");
                        p2jumpblock = true;
                        waste1.body.gravity.y = 0;
                        waste1.x = platplayer2.x + 20;
                        waste1.y = platplayer2.y;
                    } else {
                        carry2 = false;
                        p2jumpblock = false;
                    }
                }, null, this);

                this.physics.arcade.overlap(platplayer2, waste2, function (_player, _waste) {

                    if (p2grab.isDown && carry2 !== true) {
                        p2w2press = true;
                    }
                    if (p2w2press === true && carry2 !== true) {
                        if (tutorial === true) {
                            pakop.visible = false;
                            recyclehier.visible = true;
                        }
                        carry2 = true;
                        if(waste2vast === "p1") {
                            p1w2press = false;
                            carry1 = false;
                            p1jumpblock = false;
                        }
                        waste2vast = "p2";
                        //console.log("GRABBBINGGGGG");
                        p2jumpblock = true;
                        waste2.body.gravity.y = 0;
                        waste2.x = platplayer2.x + 20;
                        waste2.y = platplayer2.y;
                    } else {
                        carry2 = false;
                        p2jumpblock = false;
                    }
                }, null, this);

                this.physics.arcade.overlap(platplayer2, waste3, function (_player, _waste) {
                    if (p2grab.isDown && carry2 !== true) {
                        p2w3press = true;
                    }

                    if (p2w3press === true && carry2 !== true) {
                        carry2 = true;
                        if(waste3vast === "p1") {
                            p1w3press = false;
                            carry1 = false;
                            p1jumpblock = false;
                        }
                        waste3vast = "p2";
                        //console.log("GRABBBINGGGGG");
                        p2jumpblock = true;
                        waste3.body.gravity.y = 0;
                        waste3.x = platplayer2.x + 20;
                        waste3.y = platplayer2.y;
                    } else {
                        carry2 = false;
                        p2jumpblock = false;
                    }
                }, null, this);
                }


                platplayer2.body.velocity.x = 0;
                if(p2over === false) {
                if (p2left.isDown) {
                    //  Move to the left
                    platplayer2.body.velocity.x = -240;
                    facingp2 = 'left';
                    platplayer2.animations.play('left');
                } else if (p2right.isDown) {
                    //  Move to the right
                    platplayer2.body.velocity.x = 240;
                    facingp2 = 'right';
                    platplayer2.animations.play('right');
                } else {
                    //  Stand still
                    platplayer2.animations.stop();

                    switch (facingp2) {
                        case 'left':
                            platplayer2.frame = 2;
                            break;
                        case 'right':
                            platplayer2.frame = 3;
                            break;


                    }
                }

                if (platplayer2.body.touching.down === false && p2up.isDown) {
                    switch (facingp2) {
                        case 'left':
                            platplayer2.animations.play('jumpleft');
                            break;
                        case 'right':
                            platplayer2.animations.play('jumpright');
                            break;
                    }
                }
                }
            }





            // after level 2 enable the enemy
            if (enemycreated === true) {
                if(startCreateEnemy === false) {
                    this.createenemy1();
                    this.createenemy2();
                    if(fly) this.createenemy3();
                    startCreateEnemy = true;
                }

                enemy1.animations.play('munch');
                enemy1.body.velocity.x = enemyspeed1;
                enemy1.outOfBoundsKill = true;

                enemy2.animations.play('munch');
                enemy2.body.velocity.x = enemyspeed2;
                enemy2.outOfBoundsKill = true;

                if(fly) {
                    if(enemy3.data === "right") {
                        enemy3.body.velocity.x = enemyspeed3x;
                    }
                    else {
                        enemy3.body.velocity.x = -enemyspeed3x;
                    }  
                    this.enemy3UpdateSpeed();
                    enemy3.body.velocity.y = enemyspeed3y;
                    enemy3.outOfBoundsKill = true;
                }

                this.game.physics.arcade.collide(enemy1, platforms);
                this.game.physics.arcade.collide(enemy2, platforms);

                if(p1over === false) {
                    platplayer1.body.checkCollision.up = false;
                    platplayer1.body.checkCollision.left = false;
                    platplayer1.body.checkCollision.right = false;
                    platplayer1.body.checkCollision.down = true;
                    this.game.physics.arcade.collide(platplayer1, enemy1, this.killenemy, null, this);
                    this.game.physics.arcade.collide(platplayer1, enemy2, this.killenemy, null, this);
                    if(fly) this.game.physics.arcade.collide(platplayer1, enemy3, this.killenemy, null, this);
                    platplayer1.body.checkCollision.up = true;
                    platplayer1.body.checkCollision.left = true;
                    platplayer1.body.checkCollision.right = true;
                    this.game.physics.arcade.collide(platplayer1, enemy1, this.hitenemy, null, this);
                    this.game.physics.arcade.collide(platplayer1, enemy2, this.hitenemy, null, this);
                    if(fly) this.game.physics.arcade.collide(platplayer1, enemy3, this.hitenemy, null, this);
                }

            }


            


            // NOTE trying to grab something
            if(p1over === false) {
            this.physics.arcade.overlap(platplayer1, waste1, function (_player, _waste) {
                if (p1grab.isDown && carry1 !== true) {
                    p1w1press = true;
                }

                if (p1w1press === true && carry1 !== true) {
                    //console.log("check");
                    carry1 = true;
                    if(waste1vast === "p2") {
                        p2w1press = false;
                        carry2 = false;
                        p2jumpblock = false;
                    }
                    p1jumpblock = true;
                    //console.log("GRABBBINGGGGG");
                    waste1vast = "p1";

                    waste1.body.gravity.y = 0;
                    waste1.x = platplayer1.x + 20;
                    waste1.y = platplayer1.y;
                } else {
                    carry1 = false;
                    p1jumpblock = false;
                }
            }, null, this);

            this.physics.arcade.overlap(platplayer1, waste2, function (_player, _waste) {

                if (p1grab.isDown && carry1 !== true) {
                    p1w2press = true;
                }

                if (p1w2press === true && carry1 !== true) {
                    if (tutorial === true) {
                        pakop.visible = false;
                        recyclehier.visible = true;
                    }

                    p1jumpblock = true;
                    carry1 = true;
                    if(waste2vast === "p2") {
                        p2w2press = false;
                        carry2 = false;
                        p2jumpblock = false;
                    }
                    waste2vast = "p1";
                    //console.log("GRABBBINGGGGG");
                    waste2.body.gravity.y = 0;
                    waste2.x = platplayer1.x + 20;
                    waste2.y = platplayer1.y;
                } else {
                    carry1 = false;
                    p1jumpblock = false;
                }

            }, null, this);

            this.physics.arcade.overlap(platplayer1, waste3, function (_player, _waste) {

                if (p1grab.isDown && carry1 !== true) {
                    p1w3press = true;
                }

                if (p1w3press === true && carry1 !== true) {
                    carry1 = true;
                    if(waste3vast === "p2") {
                        p2w3press = false;
                        carry2 = false;
                        p2jumpblock = false;
                    }
                    p1jumpblock = true;
                    //console.log("GRABBBINGGGGG");
                    waste3vast = "p1";
                    waste3.body.gravity.y = 0;
                    waste3.x = platplayer1.x + 20;
                    waste3.y = platplayer1.y;
                } else {
                    carry1 = false;
                    p1jumpblock = false;
                }
            }, null, this);
            }

            //this.game.physics.arcade.collide(platplayer2, enemy1);
            //this.game.physics.arcade.collide(platplayer1, enemy1);


            this.game.physics.arcade.collide(waste1, platforms);
            this.game.physics.arcade.collide(waste2, platforms);
            this.game.physics.arcade.collide(waste3, platforms);

            //this.game.physics.arcade.collide(cont1, waste1);
            //this.game.physics.arcade.collide(cont2, waste2);
            //this.game.physics.arcade.collide(cont3, waste3);collectWaste1
            this.game.physics.arcade.overlap(cont1, waste1, this.collectWaste1, null, this);
            this.game.physics.arcade.overlap(cont2, waste2, this.collectWaste1, null, this);
            this.game.physics.arcade.overlap(cont3, waste3, this.collectWaste1, null, this);

            // error signs
            stopbord1.visible = false;
            stopbord2.visible = false;
            stopbord3.visible = false;

            if(!cont1.overlap(waste2) && !cont1.overlap(waste3) && buzz1 && !buzzer1) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1, this.errorEnable1, this, null);
                buzz1 = false;
            }
            this.game.physics.arcade.overlap(cont1, waste2, this.error1, null, this);
            this.game.physics.arcade.overlap(cont1, waste3, this.error1, null, this);
            if(!cont2.overlap(waste1) && !cont2.overlap(waste3) && buzz2 && !buzzer2) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1, this.errorEnable2, this, null);
                buzz2 = false;
            }
            this.game.physics.arcade.overlap(cont2, waste1, this.error2, null, this);
            this.game.physics.arcade.overlap(cont2, waste3, this.error2, null, this);
            if(!cont3.overlap(waste1) && !cont3.overlap(waste2) && buzz3 && !buzzer3) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1, this.errorEnable3, this, null);
                buzz3 = false;
            }
            this.game.physics.arcade.overlap(cont3, waste1, this.error3, null, this);
            this.game.physics.arcade.overlap(cont3, waste2, this.error3, null, this);


            //  Makes suer all coins bounce a certain distance on their first hit
            this.game.physics.arcade.collide(platforms, stars, this.bounceStar, null, this);
            //  Checks to see if the platplayer1 overlaps with any of the stars, if he does call the collectStar function
            if(p1over === false) {
                this.game.physics.arcade.overlap(platplayer1, stars, this.collectStar1, null, this);
            }


            if (lifeactive === true) {
                this.game.physics.arcade.collide(lifeup, platforms);
                this.game.physics.arcade.overlap(platplayer1, lifeup, this.collectlife, null, this);
                if (this.game.multiplay === true) {
                    this.game.physics.arcade.overlap(platplayer2, lifeup, this.collectlife2, null, this);
                }

            }


            //  Reset the platplayer1s velocity (movement)
            platplayer1.body.velocity.x = 0;
            if(p1over === false) {
            if (cursors.left.isDown) {
                //  Move to the left
                platplayer1.body.velocity.x = -240;
                facingp1 = 'left';
                platplayer1.animations.play('left');
            } else if (cursors.right.isDown) {
                //  Move to the right
                platplayer1.body.velocity.x = 240;
                facingp1 = 'right';
                platplayer1.animations.play('right');
            } else {
                //  Stand still
                platplayer1.animations.stop();
                switch (facingp1) {
                    case 'left':
                        platplayer1.frame = 2;
                        break;
                    case 'right':
                        platplayer1.frame = 3;
                        break;
                }
            }



            if (platplayer1.body.touching.down === false && p1jump.isDown) {
                switch (facingp1) {
                    case 'left':
                        platplayer1.animations.play('jumpleft');
                        break;
                    case 'right':
                        platplayer1.animations.play('jumpright');
                        break;
                }
            }
            }
        },

        playersHit: function () {
            //This is to prevent players from sinking into the ground!
            platplayer1.body.velocity.y = Math.min(platplayer1.body.velocity.y, 200);
            platplayer2.body.velocity.y = Math.min(platplayer2.body.velocity.y, 200);
        },

        // NOTE OUR ENDING
        timerLoop: function () {
            //slidertweento.start();
            counter--;
            timerdisplay.setText(counter);
            if (counter === 0) {
                this.game.scorep1 = scorep1;
                this.game.scorep2 = scorep2;
                scorep1 = 0;
                scorep2 = 0;

                music.stop();
                this.game.state.start('score');
                counter = 50;


            }
        },

        error1: function () {
            stopbord1.visible = true;
            if(buzzer1 === true) {
                buzzer.play();
                buzzer1 = false;
            }
        }

            ,
        error2: function () {
            stopbord2.visible = true;
            if(buzzer2 === true) {
                buzzer.play();
                buzzer2 = false;
            }
        }

            ,
        error3: function () {
            stopbord3.visible = true;
            if(buzzer3 === true) {
                buzzer.play();
                buzzer3 = false;
            }
        }

            ,

        errorEnable1: function () {
            buzzer1 = true;
            buzz1 = true;
        },
        errorEnable2: function () {
            buzzer2 = true;
            buzz2 = true;
        },
        errorEnable3: function () {
            buzzer3 = true;
            buzz3 = true;
        },

        levelup: function () {
            levelsound.play();
            train.x = -1200;
            //traintween.to({x:1500}, 1000,  Phaser.Easing.Linear.None);
            //traintween.onComplete.add(firstTween, this);
            traintween.start();


            this.changeledges();
            if (round < 9) {
                round = round + 1;
            }
            if (levelup !== null || levelup !== undefined) {
                levelup = null;
                leveluptween = null;
            }
            levelup = this.game.add.sprite(this.game.width / 2, 600, 'levelup');
            levelup.anchor.setTo(0.5, 0.5);

            leveluptween = this.game.add.tween(levelup).to({
                y: 150
            }, 2000, Phaser.Easing.Bounce.Out, true);
            leveluptween.onComplete.add(this.removelevelup, this);

            switch (round) {
                case 2:
                    recyclehier.visible = false;
                    pakop.visible = false;
                    uitleg.visible = false;
                    ontwijk.visible = true;
                    //this.createStars();
                    enemycreated = true;
                    randomy1 = this.game.rnd.integerInRange(-450, 450);
                    randomTimer1 = this.game.rnd.integerInRange(3000, 7000);
                    randomy2 = this.game.rnd.integerInRange(-450, 450);
                    randomTimer2 = this.game.rnd.integerInRange(5000, 10000);
                    enemyspeed1 = 100;
                    enemyspeed2 = -100;
                    //enemyspeed3x = -100;
                    enemyspeed3x = 0;
                    enemyspeed3y = -10;
                    enemyspeed3yCurve = 5;
                    break;
                case 3:
                    ontwijk.visible = false;
                    enemyspeed1 = 130;
                    enemyspeed2 = -130;
                    //enemyspeed3x = -130;
                    enemyspeed3x = 0;
                    enemyspeed3y = -13;
                    enemyspeed3yCurve = 4;
                    var randomx = this.game.rnd.integerInRange(20, 980);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 4:
                    //this.changeledges();
                    bg1.visible = false;
                    bg2.visible = true;
                    bg3.visible = false;
                    enemyspeed1 = 200;
                    enemyspeed2 = -200;
                    enemyspeed3x = -100;
                    enemyspeed3y = -10;
                    enemyspeed3yCurve = 3;
                    break;
                case 5:
                    enemyspeed1 = 250;
                    enemyspeed2 = -250;
                    enemyspeed3x = -130;
                    enemyspeed3y = -13;
                    enemyspeed3yCurve = 2;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 6:
                    enemyspeed1 = 300;
                    enemyspeed2 = -300;
                    enemyspeed3x = -200;
                    enemyspeed3y = -20;
                    enemyspeed3yCurve = 1;
                    break;
                case 7:
                    bg1.visible = false;
                    bg2.visible = false;
                    bg3.visible = true;
                    enemyspeed1 = 450;
                    enemyspeed2 = -450;
                    enemyspeed3x = -250;
                    enemyspeed3y = -25;
                    enemyspeed3yCurve = 1;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 8:
                    enemyspeed1 = 500;
                    enemyspeed2 = -500;
                    enemyspeed3x = -300;
                    enemyspeed3y = -30;
                    enemyspeed3yCurve = 1;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
            }

        },
        removelevelup: function () {
            levelup.destroy();
            leveluptween = null;
        },
        changeledges: function () {
            // NOTE add the code for changing ledges
            var randomlegde = this.game.rnd.integerInRange(0, 2);

            switch (randomlegde) {
                case 0:
                    ledge1.x = 400;
                    ledge1.y = 400;
                    ledge2.x = 500;
                    ledge2.y = 125;
                    ledge3.x = 100;
                    ledge3.y = 200;
                    ledge4.x = 600;
                    ledge4.y = 260;
                    /*ledge1 = platforms.create(400, 400, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(500, 125, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(100, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(600, 300, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
                case 1:
                    ledge1.x = 380;
                    ledge1.y = 110;
                    ledge2.x = 300;
                    ledge2.y = 370;
                    ledge3.x = 20;
                    ledge3.y = 230;
                    ledge4.x = 700;
                    ledge4.y = 190;
                    /*ledge1 = platforms.create(100, 100, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platfozrms.create(400, 400, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(300, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(700, 300, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
                case 2:
                    ledge1.x = 100;
                    ledge1.y = 250;
                    ledge2.x = 350;
                    ledge2.y = 140;
                    ledge3.x = 700;
                    ledge3.y = 250;
                    ledge4.x = 250;
                    ledge4.y = 370;
                    /*ledge1 = platforms.create(100, 270, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(350, 170, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(600, 270, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(350, 370, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
            }
        },
        collectlife: function (platplayer1, life) {

            if (levens1 < 3) {
                cheering.play();
                lifeup.kill();
                switch (levens1) {
                    case 1:
                        lifep11.visible = true;
                        lifep12.visible = true;
                        lifep13.visible = false;
                        break;
                    case 2:
                        lifep11.visible = true;
                        lifep12.visible = true;
                        lifep13.visible = true;
                        break;
                }
                levens1++;
            } else {
                if (fulltext) {
                    fulltext.destroy();
                }

                fulltext = this.add.text(platplayer1.x, platplayer1.y - 40, 'Al maximum levens', {
                    font: '15px Arial',
                    fill: '#000',
                    align: 'center'
                });
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fullaway, this);
            }
            //audiocoin.play();
            // Removes the star from the screen
            //if (score === 240) {
            //  this.game.state.start('score');
            //}



        },
        collectlife2: function (platplayer2, life) {
            {
                //audiocoin.play();
                // Removes the star from the screen

                if (levens2 < 3) {
                    cheering.play();
                    lifeup.kill();

                    switch (levens2) {
                        case 1:
                            lifep21.visible = true;
                            lifep22.visible = true;
                            lifep23.visible = false;
                            break;
                        case 2:
                            lifep21.visible = true;
                            lifep22.visible = true;
                            lifep23.visible = true;
                            break;

                    }
                    levens2++;
                } else {
                    if (fulltext) {
                        fulltext.destroy();
                    }

                    fulltext = this.add.text(platplayer2.x, platplayer2.y - 40, 'Al maximum levens', {
                        font: '15px Arial',
                        fill: '#000',
                        align: 'center'
                    });
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fullaway, this);
                }



                //if (score === 240) {
                //  this.game.state.start('score');
                //}
            }


        },


        bounceStar: function (platform, star) {
            //console.log("yes");
            //console.log(star.name);

            if(starBounce[star.name] === true) {
                //console.log("YES");
                star.body.velocity.y = 300;
                starBounce[star.name] = false;
            }
        },

        collectStar1: function (platplayer1, star) {
            {
                audiocoin.play();
                // Removes the star from the screen
                star.kill();
                //  Add and update the score
                scorep1 += 10;
                scoreTextp1.text = 'Score P1:\n' + scorep1;
                scoretogether = scorep1 + scorep2;
                starsalive--;
                this.checkscore();

                //if (score === 240) {
                //  this.game.state.start('score');
                //}

                this.pointsText(platplayer1, '+ 10');
            }
        },

        pointsText: function (player, points) {
            var cointextnew;
            cointextnew = coinText.create();
                
            cointextnew = this.add.bitmapText(player.x, player.y - 40, 'scorefont', points, 20);
            cointextnew.fill = 'f00';
            cointextnew.align = 'center';
                
            this.game.physics.enable(cointextnew, Phaser.Physics.ARCADE);

            cointextnew.body.velocity.y = -100;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.coinaway, this, cointextnew);
            this.game.add.tween(cointextnew).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        },

        coinaway: function (Text) {
            //console.log(Text);
            Text.kill();
        },

        collectStar2: function (platplayer2, star) {
            {
                audiocoin.play();
                // Removes the star from the screen
                star.kill();
                //  Add and update the score
                scorep2 += 10;
                scoreTextp2.text = 'Score P2:\n' + scorep2;
                scoretogether = scorep1 + scorep2;
                starsalive--;
                this.checkscore();
                //if (score === 240) {
                //this.game.state.start('score');
                //}

                this.pointsText(platplayer2, '+ 10');
            }
        },
        endTweenFleece: function () {
            fleece.y = 600;
            switch (waste1vast) {
                case "p1":
                    //scorep1 += 150;
                    //scoreTextp1.text = 'Score P1:\n' + scorep1;
                    //this.pointsText(platplayer1, '+ 150');
                    break;
                case "p2":
                    //scorep2 += 150;
                    //scoreTextp2.text = 'Score P2:\n' + scorep2;
                    //this.pointsText(platplayer1, '+ 150');
                    break;

            };
            aantalplastic = 0;
            stoplicht1.frame = 0;
        },
        endTweenKranten: function () {
            kranten.y = 600;
            switch (waste2vast) {
                case "p1":
                    //scorep1 += 150;
                    //scoreTextp1.text = 'Score P1:\n' + scorep1;
                    //this.pointsText(platplayer1, '+ 150');
                    break;
                case "p2":
                    //scorep2 += 150;
                    //scoreTextp2.text = 'Score P2:\n' + scorep2;
                    //this.pointsText(platplayer2, '+ 150');
                    break;

            };
            aantalpapier = 0;
            stoplicht2.frame = 0;
        },
        endTweenCompost: function () {
            compost.y = 600;
            switch (waste3vast) {
                case "p1":
                    //scorep1 += 150;
                    //scoreTextp1.text = 'Score P1:\n' + scorep1;
                    //this.pointsText(platplayer1, '+ 70');
                    break;
                case "p2":
                    //scorep2 += 150;
                    //scoreTextp2.text = 'Score P2:\n' + scorep2;
                    //this.pointsText(platplayer1, '+ 70');
                    break;
            }
            aantaleten = 0;
            stoplicht3.frame = 0;

        },

        collectWaste1: function (container, _waste) {
            wastecollectedsound2.play();
            //console.log(_waste.key);
            switch (_waste.key) {
                case "ssplastic":
                    if (waste1vast === "p1") {
                        p1w1press = false;
                        p1w2press = false;
                        p1w3press = false;
                        aantalplastic++;
                        if (aantalplastic === 3) {
                            this.pointsText(platplayer1, '+ 250');
                            scorep1 += 250;
                        }
                        else {
                            this.pointsText(platplayer1, '+ 100');
                            scorep1 += 100;
                        }
                        scoreTextp1.text = 'Score P1:\n' + scorep1;
                    } 
                    else if (waste1vast === "p2") {
                        p2w1press = false;
                        p2w2press = false;
                        p2w3press = false;
                        aantalplastic++;
                        if (aantalplastic === 3) {
                            this.pointsText(platplayer2, '+ 250');
                            scorep2 += 250;
                        }
                        else {
                            this.pointsText(platplayer2, '+ 100');
                            scorep2 += 100;
                        }
                        scoreTextp2.text = 'Score P2:\n' + scorep2;
                    }
                    stoplicht1.frame = aantalplastic;

                    if (aantalplastic === 3) {
                        cheering.play();
                        plastictween = this.game.add.tween(fleece).to({
                            y: 300
                        }, 5000, Phaser.Easing.Bounce.Out, true);
                        plastictween.onComplete.add(this.endTweenFleece, this);
                    }

                    waste1.kill();
                    waste1.body.gravity.y = 200;

                    wastecollected++;
                    break;
                case "sspapier":
                    if (waste2vast === "p1") {
                        p1w1press = false;
                        p1w2press = false;
                        p1w3press = false;
                        aantalpapier++;
                        if (aantalpapier === 3) {
                            this.pointsText(platplayer1, '+ 250');
                            scorep1 += 250;
                        }
                        else {
                            this.pointsText(platplayer1, '+ 100');
                            scorep1 += 100;
                        }
                        scoreTextp1.text = 'Score P1:\n' + scorep1;
                    } else if (waste2vast === "p2") {
                        p2w1press = false;
                        p2w2press = false;
                        p2w3press = false;
                        aantalpapier++;
                        if (aantalpapier === 3) {
                            this.pointsText(platplayer2, '+ 250');
                            scorep2 += 250;
                        }
                        else {
                            this.pointsText(platplayer2, '+ 100');
                            scorep2 += 100;
                        }
                        scoreTextp2.text = 'Score P2:\n' + scorep2;
                    }
                    waste2.kill();
                    waste2.body.gravity.y = 200;


                    // tutorial
                    if (tutorial === true) {
                        wastecollected = 3;
                        tutorial = false;
                    } else {
                        wastecollected++;
                    }

                    stoplicht2.frame = aantalpapier;
                    if (aantalpapier === 3) {
                        cheering.play();
                        papiertween = this.game.add.tween(kranten).to({
                            y: 300
                        }, 5000, Phaser.Easing.Bounce.Out, true);
                        papiertween.onComplete.add(this.endTweenKranten, this);
                    }
                    break;
                case "sseten":
                    if (waste3vast === "p1") {
                        p1w1press = false;
                        p1w2press = false;
                        p1w3press = false;
                        aantaleten++;
                        if (aantaleten === 3) {
                            this.pointsText(platplayer1, '+ 250');
                            scorep1 += 250;
                        }
                        else {
                            this.pointsText(platplayer1, '+ 100');
                            scorep1 += 100;
                        }
                        scoreTextp1.text = 'Score P1:\n' + scorep1;
                    } else if (waste3vast === "p2") {
                        p2w1press = false;
                        p2w2press = false;
                        p2w3press = false;
                        scorep2 += 100;
                        aantaleten++;
                        if (aantaleten === 3) {
                            this.pointsText(platplayer2, '+ 250');
                            scorep2 += 250;
                        }
                        else {
                            this.pointsText(platplayer2, '+ 100');
                            scorep2 += 100;
                        }
                        scoreTextp2.text = 'Score P2:\n' + scorep2;
                    }
                    waste3.kill();
                    waste3.body.gravity.y = 200;

                    wastecollected++;
                    stoplicht3.frame = aantaleten;
                    if (aantaleten === 3) {
                        cheering.play();
                        etentween = this.game.add.tween(compost).to({
                            y: 300
                        }, 5000, Phaser.Easing.Bounce.Out, true);
                        etentween.onComplete.add(this.endTweenCompost, this);
                    }
                    break;

            }
            audiocoin.play();
            this.checkWasteCollected();
        },



        checkscore: function () {
            /*if (starsalive === 0) {
                starsalive = 14;
                this.createStars();
                //this.levelup();
            }*/

        },
        checkWasteCollected: function () {

            //console.log("wastecolledted = " + wastecollected);

            if (wastecollected === 3) {
                starsalive = 14;
                this.createStars();

                var randomm = this.game.rnd.integerInRange(1, 5);

                switch (randomm) {
                    case 1:
                        waste1.reset(200, 0);
                        waste2.reset(500, 0);
                        waste3.reset(800, 0);
                        break;
                    case 2:
                        waste1.reset(600, 0);
                        waste2.reset(800, 0);
                        waste3.reset(100, 0);
                        break;
                    case 3:
                        waste1.reset(800, 0);
                        waste2.reset(100, 0);
                        waste3.reset(300, 0);
                        break;
                    case 4:
                        waste1.reset(400, 0);
                        waste2.reset(100, 0);
                        waste3.reset(600, 0);
                        break;
                    case 5:
                        waste1.reset(800, 0);
                        waste2.reset(600, 0);
                        waste3.reset(200, 0);
                        break;


                }

                var r1;
                var r2;
                var r3;

                if (round <= 3) {
                    r1 = this.game.rnd.integerInRange(0, 2);
                    r2 = this.game.rnd.integerInRange(0, 2);
                    r3 = this.game.rnd.integerInRange(0, 2);
                } else {
                    r1 = this.game.rnd.integerInRange(4, 6);
                    r2 = this.game.rnd.integerInRange(4, 6);
                    r3 = this.game.rnd.integerInRange(4, 6);
                }

                waste1.frame = r1;
                waste2.frame = r2;
                waste3.frame = r3;





                wastecollected = 0;
                this.levelup();
            }



        },
        hitenemy: function (enemy, player) {
            //console.log("hit");
            //if(enemy.body.y + enemy.body.height > player.body.y + (player.body.height/10)) {
                audiohit.play();
                playerhit.play();

                //if (mintext) {
                //    mintext.destroy();
               //}
                var mintext;
                mintext = minleventext.create();

                //mintext = this.add.bitmapText(player.x, player.y - 40, 'scorefont', '- leven', 20);
                //mintext.fill = '#000';
                //mintext.align = 'center';
                if(enemy === platplayer1) {
                    if(facingp1 === 'left') {
                        mintext = this.game.add.sprite(enemy.x + 10, enemy.y - 10, 'minleven');
                    }
                    else {
                        mintext = this.game.add.sprite(enemy.x + 28, enemy.y - 10, 'minleven');
                    }
                }
                else if(enemy === platplayer2) {
                    if(facingp2 === 'left') {
                        mintext = this.game.add.sprite(enemy.x + 10, enemy.y - 10, 'minleven');
                    }
                    else {
                        mintext = this.game.add.sprite(enemy.x + 28, enemy.y - 10, 'minleven');
                    }
                }
                this.game.physics.enable(mintext, Phaser.Physics.ARCADE);
                mintext.body.velocity.y = -50;
                mintext.scale.setTo(0.15, 0.15);
                mintext.anchor.setTo(0.5, 0.5);
                this.game.add.tween(mintext).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

                switch (enemy.key) {

                    case "crp1":
                        levens1 = levens1 - 1;
                        this.checklives("crp1");
                        if (scorep1 > 0) {
                            scorep1 = scorep1 - 50;
                            if(scorep1 < 0) {
                                scorep1 = 0;
                            }
                            scoreTextp1.text = 'Score P1\n' + scorep1;
                            //this.pointsText(platplayer1, '- 50');
                        }
                    break;

                    case "crp2":
                        levens2 = levens2 - 1;
                        this.checklives("crp2");
                        if (scorep2 > 0) {
                            scorep2 = scorep2 - 50;
                            if(scorep2 < 0) {
                                scorep2 = 0;
                            }
                            scoreTextp2.text = 'Score P2\n' + scorep2;
                            //this.pointsText(platplayer1, '- 50');

                        }
                    break;
                }

                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this, mintext);
                //scoreTextp1.anchor.setTo(0.5, 0.5);
            //}
            player.kill();
        },
        killenemy: function(enemy, player) {
            //console.log("kill");
            enemy.body.velocity.y = -300;
            player.kill();

            /*
            switch (enemy.key) {
                case "crp1":
                    scorep1 = scorep1 + 30;
                    scoreTextp1.text = 'Score P1\n' + scorep1;
                    this.pointsText(platplayer1, '+ 30');
                break;

                case "crp2":
                    scorep2 = scorep2 + 30;
                    scoreTextp2.text = 'Score P2\n' + scorep2;
                    this.pointsText(platplayer2, '+ 30');
                break;
            }
            */
        },
        minaway: function (mintext) {
            mintext.kill();
            //
        },
        fullaway: function () {
            fulltext.destroy();
            //
        },

        checklives: function (playerthis) {
            switch (playerthis) {
                case "crp1":
                    if (levens1 === 2) {
                        lifep11.visible = true;
                        lifep12.visible = true;
                        lifep13.visible = false;
                    } else if (levens1 === 1) {
                        lifep11.visible = true;
                        lifep12.visible = false;
                        lifep13.visible = false;
                    } else if (levens1 === 0) {
                        lifep11.visible = false;
                        lifep12.visible = false;
                        lifep13.visible = false;
                        
                        //platplayer1.kill();
                        platplayer1.animations.stop();
                        p1over = true;
                        if(facingp1 === 'left') {
                            this.game.add.tween(platplayer1).to( { angle: -90 }, 300, Phaser.Easing.Linear.None, true);
                            platplayer1.body.setSize(131, 80, -15, 0);
                            //this.game.add.tween(platplayer1.anchor).to( { x: 0.6 }, 300, Phaser.Easing.Linear.None, true);
                            this.game.add.tween(platplayer1.body.velocity).to( { x: 0 }, 600, Phaser.Easing.Linear.None, true);
                        }
                        else {
                            this.game.add.tween(platplayer1).to( { angle: 90 }, 300, Phaser.Easing.Linear.None, true);
                            this.game.add.tween(platplayer1.anchor).to( { x: 0.8 }, 300, Phaser.Easing.Linear.None, true);
                            platplayer1.body.setSize(131, 80, 50, 0);
                            this.game.add.tween(platplayer1.body.velocity).to( { x: 0 }, 600, Phaser.Easing.Linear.None, true);
                        }

                        if (this.game.multiplay === true) {
                            if (p2over === true) {
                                over.alpha = 1;
                                overtween = this.game.add.tween(over).from({
                                    y: -200
                                }, 3000, Phaser.Easing.Bounce.Out, true);
                                overtween.onComplete.add(this.overDone, this);
                                gameoversound.play();
                                this.game.scorep1 = scorep1;
                                this.game.scorep2 = scorep2;
                                scorep1 = 0;
                                scorep2 = 0;
                                scoretogether = 0;
                                music.stop();
                                levens1 = 3;
                                levens2 = 3;
                                //this.game.state.start('score');
                            }
                        } else if (this.game.multiplay === false || this.game.multiplay === undefined) {
                            gameoversound.play();
                            over.alpha = 1;
                            overtween = this.game.add.tween(over).from({
                                y: -200
                            }, 3000, Phaser.Easing.Bounce.Out, true);
                            overtween.onComplete.add(this.overDone, this);
                            scorep2 = null;
                            this.game.scorep1 = scorep1;
                            this.game.scorep2 = scorep2;
                            scorep1 = 0;
                            scorep2 = null;
                            scoretogether = 0;
                            music.stop();
                            levens1 = 3;
                            levens2 = 3;
                            //p2over = false;
                            //p1over = false;
                            //this.game.state.start('score');
                        }
                    }
                    break;
                case "crp2":
                    if (levens2 === 2) {
                        lifep21.visible = true;
                        lifep22.visible = true;
                        lifep23.visible = false;
                    } else if (levens2 === 1) {
                        lifep21.visible = true;
                        lifep22.visible = false;
                        lifep23.visible = false;
                    } else if (levens2 === 0) {
                        lifep21.visible = false;
                        lifep22.visible = false;
                        lifep23.visible = false;
                        
                        //platplayer2.kill();
                        platplayer2.animations.stop();
                        if(facingp2 === 'left') {
                            this.game.add.tween(platplayer2).to( { angle: -90 }, 300, Phaser.Easing.Linear.None, true);
                            platplayer2.body.setSize(131, 80, -15, 0);
                            //this.game.add.tween(platplayer2.anchor).to( { x: 0.6 }, 300, Phaser.Easing.Linear.None, true);
                            this.game.add.tween(platplayer2.body.velocity).to( { x: 0 }, 600, Phaser.Easing.Linear.None, true);
                        }
                        else {
                            this.game.add.tween(platplayer2).to( { angle: 90 }, 300, Phaser.Easing.Linear.None, true);
                            this.game.add.tween(platplayer2.anchor).to( { x: 0.8 }, 300, Phaser.Easing.Linear.None, true);
                            platplayer2.body.setSize(131, 80, 50, 0);
                            this.game.add.tween(platplayer2.body.velocity).to( { x: 0 }, 600, Phaser.Easing.Linear.None, true);
                        }

                        p2over = true;
                        if (p1over === true) {
                            gameoversound.play();
                            over.alpha = 1;
                            overtween = this.game.add.tween(over).from({
                                y: -200
                            }, 3000, Phaser.Easing.Bounce.Out, true);
                            overtween.onComplete.add(this.overDone, this);
                            this.game.scorep1 = scorep1;
                            this.game.scorep2 = scorep2;
                            scorep1 = 0;
                            scorep2 = 0;
                            scoretogether = 0;
                            music.stop();
                            levens1 = 3;
                            levens2 = 3;
                            //this.game.state.start('score');
                        }
                    }
                    break;

            }
        },
        overDone: function () {
            this.game.state.start('score');
            //So you can't move after you're dead
            p2over = false;
            p1over = false;
            startCreateEnemy = false;
        },




        createStars: function () {
            starsalive = 14;
            var randomy = this.game.rnd.integerInRange(-500, 400);
            //  Finally some stars to collect
            stars = this.game.add.group();
            //  We will enable physics for any star that is created in this group
            stars.enableBody = true;
            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 14; i++) {
                //  Create a star inside of the 'stars' group
                //var star = stars.create(i * 70 + 30, randomy, 'coin');
                var star = stars.create(i * 70 + 30, -50, 'coin');
                var coinspin = star.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
                star.animations.play('spin');
                star.scale.setTo(0.5, 0.5);
                //  Let gravity do its thing
                star.body.gravity.y = 200;
                //  This just gives each star a slightly random bounce value
                //star.body.bounce.y = 0.7 + Math.random() * 0.2;
                star.body.bounce.y = 0.5;
                
                //Makes sure the stars bouce a certain distance on their hirst hit
                star.name = i;
                starBounce[i] = true;
            }
        },

        createenemy1: function () {

            if (enemy1 === undefined) {
                enemy1 = this.game.add.sprite(-40, randomy1, 'enemy');
                enemy1anim = enemy1.animations.add('munch', [0, 1], 10, true);
                
                enemy1.kill();
                enemy1.revive();
            } else {
                enemy1.kill();
                enemy1 = this.game.add.sprite(-40, randomy1, 'enemy');
                enemy1anim = enemy1.animations.add('munch', [0, 1], 10, true);
                
                enemy1.kill();
                enemy1.revive();
            }

            randomy1 = this.game.rnd.integerInRange(-450, 450);
            randomTimer1 = this.game.rnd.integerInRange(3000, 7000);

            this.physics.enable(enemy1, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            enemy1.scale.setTo(0.4, 0.4);
            enemy1.body.bounce.y = 0.6;
            enemy1.body.gravity.y = 500;
            if(enemycreated === true) {
                this.warningEnemy1();
                this.game.time.events.add(randomTimer1 - 1000, this.showWarning1, this);
            }
            this.game.time.events.add(randomTimer1, this.createenemy1, this);
        },

        showWarning1: function () {
            enemySign1.visible = true;
            this.game.time.events.add(1000, this.hideWarning1, this);
        },
        hideWarning1: function () {
            enemySign1.visible = false;
        },
        
        warningEnemy1: function () {
            //console.log(randomy1);
            if (enemySign1 === undefined) {
                enemySign1 = this.game.add.sprite(35, Math.max(30, randomy1), 'warningEnemy');
                enemySign1.kill();
                enemySign1.revive();
            } else {
                enemySign1.kill();
                enemySign1 = this.game.add.sprite(35, Math.max(30, randomy1), 'warningEnemy');
                
                enemySign1.kill();
                enemySign1.revive();
            }

            this.physics.enable(enemySign1, Phaser.Physics.ARCADE);
            enemySign1.scale.setTo(0.6, 0.6);
            
            enemySign1.anchor.setTo(0.5, 0.5);
            enemySign1.visible = false;
        },
        
        createenemy2: function () {

            if (enemy2 === undefined) {
                enemy2 = this.game.add.sprite(this.game.width + 40, randomy2, 'enemy');
                enemy2anim = enemy2.animations.add('munch', [0, 1], 10, true);
                enemy2.kill();
                enemy2.revive();
            } else {
                enemy2.kill();
                enemy2 = this.game.add.sprite(this.game.width + 40, randomy2, 'enemy');
                enemy1anim = enemy2.animations.add('munch', [0, 1], 10, true);
                enemy2.kill();
                enemy2.revive();
            }

            randomy2 = this.game.rnd.integerInRange(-450, 450);
            randomTimer2 = this.game.rnd.integerInRange(5000, 10000);

            this.physics.enable(enemy2, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            enemy2.scale.setTo(-0.4, 0.4);
            enemy2.body.bounce.y = 0.6;
            enemy2.body.gravity.y = 500;
            if(enemycreated === true) {
                this.warningEnemy2();
                this.game.time.events.add(randomTimer2 - 1000, this.showWarning2, this);
            }
            this.game.time.events.add(randomTimer2, this.createenemy2, this);
        },

        showWarning2: function () {
            enemySign2.visible = true;
            this.game.time.events.add(1000, this.hideWarning2, this);
        },
        hideWarning2: function () {
            enemySign2.visible = false;
        },
        
        warningEnemy2: function () {
            //console.log(randomy2);
            if (enemySign2 === undefined) {
                enemySign2 = this.game.add.sprite(965, Math.max(30, randomy2), 'warningEnemyMirror');
                enemySign2.kill();
                enemySign2.revive();
            } else {
                enemySign2.kill();
                enemySign2 = this.game.add.sprite(965, Math.max(30, randomy2), 'warningEnemyMirror');
                
                enemySign2.kill();
                enemySign2.revive();
            }

            this.physics.enable(enemySign2, Phaser.Physics.ARCADE);
            enemySign2.scale.setTo(0.6, 0.6);

            enemySign2.anchor.setTo(0.5, 0.5);
            enemySign2.visible = false;
        },

        createenemy3: function () {
            var side = this.game.rnd.integerInRange(0, 1);

            console.log("fly");
            if (enemy3 === undefined) {
                if(side === 0) {
                    enemy3 = this.game.add.sprite(- 40, randomy3, 'fly');
                    enemy3.scale.setTo(-0.1, 0.1);
                    enemy3.data = "left";
                }
                else {
                    enemy3 = this.game.add.sprite(this.game.width + 40, randomy3, 'fly');
                    enemy3.scale.setTo(0.1, 0.1);
                    enemy3.data = "right";
                }
                //enemy3anim = enemy2.animations.add('munch', [0, 1], 10, true);
                enemy3.kill();
                enemy3.revive();
            } else {
                enemy3.kill();
                if(side === 0) {
                    enemy3 = this.game.add.sprite(- 40, randomy3, 'fly');
                    enemy3.scale.setTo(-0.1, 0.1);
                    enemy3.data = "left";
                }
                else {
                    enemy3 = this.game.add.sprite(this.game.width + 40, randomy3, 'fly');
                    enemy3.scale.setTo(0.1, 0.1);
                    enemy3.data = "right";
                }
                //enemy3anim = enemy3.animations.add('munch', [0, 1], 10, true);
                enemy3.kill();
                enemy3.revive();
            }

            randomy3 = this.game.rnd.integerInRange(0, this.game.height);
            randomTimer3 = this.game.rnd.integerInRange(5000, 10000);

            this.physics.enable(enemy3, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            enemy3.body.checkCollision = false;
            //enemy3.body.bounce.y = 0.6;
            //enemy3.body.gravity.y = 500;
            //if(enemycreated === true) {
                //this.warningEnemy3();
                //this.game.time.events.add(randomTimer3 - 1000, this.showWarning2, this);
            //}
            enemyspeed3y = 0;

            this.game.time.events.add(randomTimer3, this.createenemy3, this);
        },

        enemy3UpdateSpeed: function() {
            var target = platplayer1;
            if(this.game.multiplay) {
                if(p1over) {
                    target = platplayer2;
                }
                else if(p2over) {
                    target = platplayer1;
                }
                else if(enemy3.data === "left") {
                    target = platplayer1;
                }
                else if(enemy3.data === "right") {
                    target = platplayer2;
                }
            }
            if((enemy3.data === "left" && enemy3.body.x < target.body.x + (target.body.width/2)) || (enemy3.data === "right" && enemy3.body.x > target.body.x + (target.body.width/2))) {
                //if(platplayer1.body.y + (platplayer1.body.height/2) > enemy3.body.y + (enemy3.body.height/2)) {
                    enemyspeed3y = -(((enemy3.body.y + enemy3.body.height/2) - (target.body.y + target.body.height/2))/enemyspeed3yCurve);
                //}
                //else {
                    //enemyspeed3y = enemyspeed3y + (((enemy3.body.y + enemy3.body.height/2) - (platplayer1.body.y + platplayer1.body.height/2))/5);
                //}
            }
        },

        
        render: function () {
            //this.game.debug.body(platplayer1);
            //this.game.debug.body(waste1);
            //this.game.debug.body(waste2);
            //this.game.debug.body(waste3);
        }
        
    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Platformer = Platformer;
}());