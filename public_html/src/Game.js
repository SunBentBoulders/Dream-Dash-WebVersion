var Game = function(game) {
    var playerName;

    //add in the plugin for transitions
    var transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);
    transitionPlugin.settings = {
        // length of animation
        duration: 2000,
        // ease property
        ease: Phaser.Easing.Quadratic.Out,
        /* default ease */
        // what property should be tweened
        properties: {
            alpha: 0
        }
    };
    transitionPlugin;

    // define the player
    this.player;
    // define the enemy sprite group
    this.enemies;
    // clocks for the player to collect, number will display and decrement, was this.tokensToCollect
    this.tokensToCollect = 5;
    //group of candle sprites for the player to collect to gain lives
    this.livesToCollect;
    // this is the number of tokens that have been collected
    this.collectedTokens = 0;
    //sets the beginning score
    this.score = 0;
    game.scrollableWidth = game.width * 2.5;
    // same as 2000 but in relation to the game.width
    this.right = 1;
    this.left = 0;
    var backgroundScroll;
    var pause;
    var pausedText;
    var totalScore;
    var endGameScore;
    thisLevel = 0;
    // tracks current level that the player is on
    this.currentLevel = 0;
    game.currentLevel = this.currentLevel;
    nextLevel = 1;
    //sets player invincibility when hit by an enemy
    playerInvincible = false;
    //sets the player's livesLost as false to start
    playerLostLife = false;
    this.backgroundImage;
    // add timer for when player flashes on invincibility. see toggleInvincible function
    this.flashingTimer = 0;

};

Game.prototype = {

    preload: function(game) {
        //checks for vibration and wil activate if available
        if ("vibrate" in window.navigator) {
            // console.log('vibrate is on');
        }

        // load the rest of the game assets. see preload gamestate for others
        game.load.image('enemy', 'img/friendlyGhost.png');
        game.load.image('life', 'img/candle.png');
        // each sprite image is 32px wide by 48px tall in spritesheet
        game.load.spritesheet('dude', 'img/dude.png', 86, 129);
        game.load.image('pause', 'img/pause.png');
        game.load.image('token', 'img/clock.png');
    },


    create: function(game) {
        //resets the number of tokens to collect
        this.tokensToCollect = 5;
        // increase the level
        thisLevel++;
        this.currentLevel++;
        //adds in transitions
        transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);
        transitionPlugin.settings = {
            // sets animation length
            duration: 2000,
            // ease property
            ease: Phaser.Easing.Quadratic.Out,
             /*
             default ease
             what property should be tweened
             */
            properties: {
                alpha: 0
            }
        };

        this.backgroundImage = game.add.sprite(0, 0, 'game-bg');

        //  Enables the Arcade Physics system for game
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // this is for the game menu
        this.stage.disableVisibilityChange = false;


        // add main sprites to screen
        //===================================================
        // add group of enemy stars

        game.enemies = game.add.group();
        game.enemyCount = 0;

        // adds group of tokens to collect
        game.tokensToCollect = game.add.group();
        game.tokensToCollect.enableBody = true;
        game.collectedTokens = 0;

        //add group of lives to collect
        game.livesToCollect = game.add.group();
        game.livesToCollect.enableBody = true;

        // add player to game
        this.player = game.add.sprite(game.scrollableWidth / 2, game.height / 8 * 5, 'dude');
        // this.player.scale.setTo(1.5, 1.5);
        // set initial location of player in the top center of screen
        this.player.anchor.setTo(.5, 1);
        // enables physics on the player
        game.physics.arcade.enable(this.player);
        // sets the bounding box size of the physics body for collision detection
        this.player.enableBody = true;
        this.player.body.width = 45;
        this.player.body.height = 95;
        //  Player physics properties that give the player a slight bounce
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.y = 0.4;
        this.player.body.bounce.x = 0.2;
        this.player.body.gravity.y = 500;
        //===================================================



        // this block adds enemies, tokens, and lives to the game
        //=====================================================
        // this function creates the sprites when called and sets the sprite properties
        game.addSprite = function(className, spriteName, bodySizeX, bodySizeY, timeToTween) { // e.g. game.enemies, enemy, 150, 250, 9000
            // create sprite that starts invisible with a size of 0
            var sprite = className.create(game.camera.view.randomX, game.height / 2, spriteName);
            sprite.scale.setTo(0);
            sprite.anchor.setTo(0.5);
            // modify physics body of sprites
            game.physics.arcade.enable(className);
            className.enableBody = true;
            sprite.body.setSize(bodySizeX, bodySizeY);

            // add velocity to sprites so that collisions still register when player is standing still
            game.physics.arcade.accelerateToXY(sprite, Math.random() * game.scrollableWidth, this.height * 1.5, 20, timeToTween)

            // add a tween that scales the sprite sizes
            var scaleTween = game.add.tween(sprite.scale);
            // scales sprite from size 0 to full size
            scaleTween.to({ x: 1, y: 1}, timeToTween, Phaser.Easing.Exponential.In, true);
             // this function gets called once tween is complete - will kill sprites once tween is complete and they are off screen
            scaleTween.onComplete.add(function() {
                sprite.kill();
            });

            // add a tween that changes the position of the sprite
            var positionTween = game.add.tween(sprite.position);
            // sprites move to random x coordinates of screen
            positionTween.to({ x: Math.random() * game.scrollableWidth, y: this.height * 1.5}, timeToTween, Phaser.Easing.Exponential.In, true);

        };

        // this function adds sprites based on a set interval of time
        game.startSpriteTimer = function(className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval) {
            // add and start a phaser timer
            game.dropTimer = game.time.create(false);
            game.dropTimer.start();
            // add a sprite
            game.addSprite(className, spriteName, bodySizeX, bodySizeY, timeToTween);
            // after adding an enemy, call the addEnemyTimer function again after a random amount of time elapses

            game.dropTimer.add(Phaser.Timer.SECOND * Math.random() * timerInterval, game.startSpriteTimer, this, className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval);
        };
        // parameters: className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval
        // add enemies to game
        game.startSpriteTimer(game.enemies, 'enemy', 150, 250, 9000, 1 / this.currentLevel * 3.5);
        // add tokens to game for player to collect (clocks)
        game.startSpriteTimer(game.tokensToCollect, 'token', 30, 30, 10000, 5);
        // add lives to game (candles)
        game.startSpriteTimer(game.livesToCollect, 'life', 50, 300, 12000, 25);
        //=====================================================



        // Our two animations walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3, 2, 1], 12, true);
        this.player.animations.add('right', [5, 6, 7, 8, 7, 6], 12, true);

        // Score - clocks on right of screen=============================================
        // will add this back once level up game state is made
        // this.scoreText = game.add.text(this.realPlayer.x-400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        // this.scoreText.fixedToCamera = true;
        if (window.deviceAssetSize === 'desktop') {
            this.scoreSprite = game.add.sprite(this.player.x - this.game.width / 1.937, this.game.height / 37.5, 'token');
            this.leftToCollect = game.add.text(this.player.x - this.game.width / 2.3, this.game.height / 37.5, ' x ' + this.tokensToCollect, {
                fontSize: this.game.height / 17 + 'px',
                fill: '#fff'
            });
        } else {
            this.scoreSprite = game.add.sprite(this.player.x - this.game.width / 2, this.game.height / 30, 'token');
            this.leftToCollect = game.add.text(this.player.x - this.game.width / 2.2, this.game.height / 37.5, ' x ' + this.tokensToCollect, {
                fontSize: this.game.height / 17 + 'px',
                fill: '#fff'
            });
            this.leftToCollect.cssFont = 'bold 50pt Arial';
        }
        this.scoreSprite.scale.setTo(0.5);
        this.scoreSprite.fixedToCamera = true;
        this.leftToCollect.fixedToCamera = true;

        // Score - current score displays in middle of screen================
        this.showCurrentScore = game.add.text(game.camera.view.centerX, this.game.height / 12, 'Score: ' + this.score, {
            fontSize: this.game.height / 24 + 'px',
            fill: '#fff'
        });
        this.showCurrentScore.fixedToCamera = true;
        this.showCurrentScore.anchor.setTo(0.5, 0.2);
        //===================================================================

        // show current level in middle of screen============================
        this.showCurrentLevel = game.add.text(game.camera.view.centerX, this.game.height / 37.5, 'Level ' + this.currentLevel, {
            fontSize: this.game.height / 17 + 'px',
            fill: '#fff'
        });
        this.showCurrentLevel.fixedToCamera = true;
        this.showCurrentLevel.anchor.setTo(0.5, 0.3);
        //===================================================================


        //Life bar=======================================
        this.lifeDistance = this.game.width / 8
        this.life1 = game.add.sprite(this.lifeDistance, this.game.height / 37.5, 'life');
        this.life1.scale.setTo(.20);
        this.life1.fixedToCamera = true;
        this.life2 = game.add.sprite(this.lifeDistance + this.game.width / 20, this.game.height / 37.5, 'life');
        this.life2.scale.setTo(.20);
        this.life2.fixedToCamera = true;
        this.life3 = game.add.sprite(this.lifeDistance + this.game.width / 10, this.game.height / 37.5, 'life');
        this.life3.scale.setTo(.20);
        this.life3.fixedToCamera = true;




        // Controls =======================================
        cursors = game.input.keyboard.createCursorKeys();
        //sets the world to be wider behind the frame
        game.world.setBounds(0, 0, game.scrollableWidth, game.height);
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.player.body.collideWorldBounds = true;
        this.player.collideWorldBounds = true;


        //Pause button ============================
        pause = game.add.button(this.game.width / 50, this.game.height / 37.5, 'pause');
        pause.fixedToCamera = true;
        pause.inputEnabled = true;
        pause.events.onInputUp.add(function() {
            //Pause game text
            console.log("game.camera", game.camera)
            pausedText = game.add.text(game.camera.view.centerX, game.height / 2, "Paused", {
                font: '200px Arial',
                fill: '#fff'
            });
            pausedText.anchor.setTo(0.5, 0.5);
            game.paused = true;
        });
        game.input.onDown.add(function() {
            //Unpause game
            if (game.paused) {
                pausedText.destroy();
                game.paused = false;
            }
        });
        //=============================================
        // console.log(playerName);
    },

    update: function(game) {

        // collisions/collections===============================
        //Check to see if tokensTocollect is collected if so, run collectToken
        game.physics.arcade.overlap(this.player, game.tokensToCollect, this.collectToken, null, this);

        //check to see if livesToCollect is collected, if so, run collectLife
        game.physics.arcade.overlap(this.player, game.livesToCollect, this.collectLife, null, this);

        // Checks to see if the player overlaps with any of the enemies, if he does, call the checkCollision function.
        // 3rd parameter is collision logic; 4th parameter allows collision to happen if returns true
        game.physics.arcade.collide(this.player, game.enemies, this.checkCollision, function() {
            return !playerInvincible;
        }, this);
        // game.physics.arcade.collide(this.player, game.enemies, null, this.checkCollision, this);
        //=====================================================

        // Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        // controls=========================================

        //this is for computer input
        if (game.device.desktop) {
            if (cursors.left.isDown) {
                //  Move left
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            } else if (cursors.right.isDown) {
                //  Move right
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            } else {
                //  Stand still
                this.player.body.velocity.x = 0;
                this.player.frame = 4;
            }
        } else {

            //this if for the phone input
            if (game.input.pointer1.isDown) {
                //check to see if the touch is happening on the left
                if (Math.floor(game.input.x / (game.width / 2)) === this.left) {
                    //move to the left
                    this.player.animations.play('left');
                    this.player.body.velocity.x = -400;
                    //check to see if the touch is happening on the right
                } else if (Math.floor(game.input.x / (game.width / 2)) === this.right) {
                    //move to the right
                    this.player.animations.play('right');
                    this.player.body.velocity.x = 400;
                }
            } else {
                this.player.body.velocity.x = 0;
                this.player.frame = 4;
            }
        }
        //==================================================

        // make player flash for 3 seconds (while invincible)
        //===================================================
        if (playerInvincible) {
            // make timer count to x amount of time, then reset to 0 and toggle the player visibility
            this.flashingTimer += this.time.elapsed;
            if (this.flashingTimer >= 80) {
                this.flashingTimer -= 80;
                this.player.visible = !this.player.visible;
            }
        }
        //===================================================

        //this is here to simulate winning the game, need to go to game.state(win) once set up
        if (this.tokensToCollect + this.collectedTokens === this.collectedTokens) {
            //calls function to increase the level
            this.levelUp();
        }
    },

    collectToken: function(player, token) {
        // Removes the token from the screen
        token.kill();

        // Add and update the score, set number of tokens collected and left to collect
        this.collectedTokens++;
        this.tokensToCollect--;
        this.score += 10;
        totalScore = this.score;

        //this sets the upper right corner left to collect
        this.leftToCollect.text = ' x ' + this.tokensToCollect;
        this.showCurrentScore.text = 'Score: ' + this.score;
    },

    // this function is called when the player collides with an enemy
    checkCollision: function(player, enemy) {
        /* console.log("checking for collision");
         this.input.keyboard.enabled = false;
         player.animations.frame = 4;
         player.animations.paused = true;

         make player "react" to the collision*/
        player.body.velocity.y = -200;
        this.loseLife();
    },

     // // this function for debugging only
     // render: function(game) {
     //   // this.game.debug.bodyInfo(this.player, 32, 32);
     //   this.game.debug.body(this.player);
     //   this.game.enemies.forEachAlive(this.renderGroup, this);
     //   this.game.tokensToCollect.forEachAlive(this.renderGroup, this);
     //   this.game.livesToCollect.forEachAlive(this.renderGroup, this);
     // },

     // // this function for debugging groups of sprites only
     // renderGroup: function(member) {
     //   this.game.debug.body(member);
     // },

    collectLife: function(player, life) {
        life.kill();
        // // TODO: animate candle going to top of screen
        // var lifePositionTween = this.game.add.tween(life.position);
        // // life.fixedToCamera = true;
        // console.log("life.anchor", life.anchor)
        // // life.anchor.setTo(0);
        // // sprites move to top left of screen
        // lifePositionTween.to({ x: this.game.camera.x + this.lifeDistance, y: this.game.height / 37.5}, 3000, Phaser.Easing.Exponential.Out, true);

        // var lifeScaleTween = this.game.add.tween(life.scale);

        // // scales sprite from size 0 to full size
        // lifeScaleTween.to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Exponential.In, true);
        // lifeScaleTween.onComplete.add(function() {
        //     life.kill();
        // })

        this.gainLife();
    },

    gameOver: function(player) {
        // player.kill();
        window.navigator.vibrate([2000]);
        endGameScore = totalScore || 0;
        // reset score and level

        totalScore = 0;
        this.score = 0;
        this.currentLevel = 0;
        // reset world bounds to the original 800x600 so following gamestates show up correctly
        this.world.setBounds(0, 0, this.game.width, this.game.height);

        // go to gameover state
        transitionPlugin.to("GameOver");
    },

    //this is the function that will be called when player collects all tokens
    levelUp: function() {
        playerInvincible = false;
        //increases the level
        nextLevel++;
        thisLevel = this.currentLevel;

        //starts the LevelUp state
        transitionPlugin.to("LevelUp");
        //resets the world bounds
        this.world.setBounds(0, 0, this.game.width, this.game.height);
    },

    loseLife: function() {
        if (!playerInvincible) {
            //makes the player invincible
            this.toggleInvincible();
            //makes device vibrate
            window.navigator.vibrate([1000]);
            //makes the player non-invincible after 3 seconds
            this.game.time.events.add(3000, this.toggleInvincible, this);
            if (this.life3.visible) {
                // set new alpha for sprites
                var newAlpha = 0.8;
                //makes the third life dissappear
                this.life3.visible = false;
            } else if (this.life2.visible) {
                var newAlpha = 0.6;
                //makes 2nd life disappear
                this.life2.visible = false;
            } else {
                //Ends the game once player loses last life
                this.gameOver();
            }
            // set new alphas on sprites
            this.player.alpha = newAlpha;
            this.game.enemies.setAll('alpha', newAlpha);
            this.game.tokensToCollect.setAll('alpha', newAlpha);
            this.backgroundImage.alpha = newAlpha;
        }
    },

    gainLife: function() {
        // add points to score
        this.score += 5;
        totalScore = this.score;
        // update score shown on screen
        this.showCurrentScore.text = 'Score: ' + this.score;

        if (!playerLostLife) {
            this.toggleLostLife();
            this.game.time.events.add(3000, this.toggleLostLife, this);

            if (!this.life2.visible) {
                var newAlpha = 0.8;
                this.life2.visible = true;
            } else if (!this.life3.visible) {
                var newAlpha = 1;
                this.life3.visible = true;
            }
        }
        // set new alphas on sprites
        this.player.alpha = newAlpha;
        this.game.enemies.setAll('alpha', newAlpha);
        this.game.tokensToCollect.setAll('alpha', newAlpha);
        this.backgroundImage.alpha = newAlpha;

    },

    toggleInvincible: function(game) {
        playerInvincible = !playerInvincible;
        // make sure player is visible when invincibility ends
        this.player.visible = true;
    },

    toggleLostLife: function() {
        playerLostLife = !playerLostLife;
    }

};