'use strict';

/*var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	this.game.load.image('background', 'images/spacebackground.png');
	this.game.load.image('ship', 'images/spaceship.png');
	this.game.load.image('bullet', 'images/bullet.png');

}

var ship;
var cursors;

var bullet;
var bullets;
var fireButton;
var bulletTime = 0;
var fireRate = 50;

function create() {

	game.renderer.clearBeforeRender = false;
	game.renderer.roundPixels = true;

	// Activación de las físicas del juego
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.tileSprite(0, 0, game.width, game.height, 'background');

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;

	bullets.createMultiple(40, 'bullet');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 0.5);


    ship = game.add.sprite(100, 300, 'ship');
    ship.anchor.set(0.5);

    game.physics.enable(ship, Phaser.Physics.ARCADE);

    ship.body.drag.set(100);
    ship.body.maxVelocity.set(200);

    // Input del juego
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
}

function update() {

	ship.body.velocity.x = 0;
	ship.body.velocity.y = 0;

	if (cursors.up.isDown)
    	ship.body.velocity.y -= 1000;
    
    else if (cursors.down.isDown)
    	ship.body.velocity.y += 1000;

    if (cursors.left.isDown)
        ship.body.velocity.x -= 1000;

    else if (cursors.right.isDown)
        ship.body.velocity.x += 1000;

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    	fireBullet();
 	
}

function fireBullet(){

	if (game.time.now > bulletTime) {

		bullet = bullets.getFirstExists(false);

		// hay un pequeño error con las balas pero mola mazo
		if (bullet) {
			bullet.reset(ship.body.x +  16, ship.body.y + 16);
			bullet.lifespan = 2000;
			game.physics.arcade.moveToPointer(bullet, 300);
			bulletTime = game.time.now + fireRate;
		}
	}
} 

function render() {

}
