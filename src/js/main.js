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
	this.game.load.image('enemy', 'images/starman.png');

}

var ship;
var cursors;

var bullet;
var bullets;
var fireButton;
var bulletTime = 0;
var fireRate = 300;

var enemy;

function create() {

	game.renderer.clearBeforeRender = false;
	game.renderer.roundPixels = true;

	// Activación de las físicas del juego
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds(0, 0, 5000, 600);
	game.add.tileSprite(0, 0, 5000, 600, 'background');

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;

	bullets.createMultiple(40, 'bullet');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 0.5);

    ship = game.add.sprite(100, 300, 'ship');
    ship.anchor.set(0.5);

    game.physics.enable(ship, Phaser.Physics.ARCADE);

    ship.body.collideWorldBounds = true;



    ship.body.drag.set(100);
    ship.body.maxVelocity.set(200);

    game.camera.follow(ship, Phaser.Camera.FOLLOW_TOPDOWN);

    // Input del juego
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    enemy = game.add.sprite(500, 300, 'enemy');
    enemy.anchor.set(0.5);

    game.physics.enable(enemy, Phaser.Physics.ARCADE);

    
}

function update() {

	ship.body.velocity.x = 0;
	ship.body.velocity.y = 0;

	if (cursors.up.isDown)
    	ship.body.velocity.y = -300;
    
    else if (cursors.down.isDown)
    	ship.body.velocity.y = 300;

    if (cursors.left.isDown)
        ship.body.velocity.x = -300;

    else if (cursors.right.isDown)
        ship.body.velocity.x = 300;

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    	fireBullet();

    
    if (ship.y < enemy.y)
    	enemy.body.velocity.y = -100;
	
	else if (ship.y > enemy.y)
		enemy.body.velocity.y = 100;

	else if (ship.y === enemy.y)
		enemy.body.velocity.y = 0;

	if (ship.x < enemy.x)
		enemy.body.velocity.x = -100;

	else if (ship.x > enemy.x)
		enemy.body.velocity.x = 100;

	else if (ship.x > enemy.x)
		enemy.body.velocity.y = 0;

 	
    game.physics.arcade.collide(enemy, bullet, collisionHandler, null, this);
}

// 
function fireBullet(){

	if (game.time.now > bulletTime) {

		bullet = bullets.getFirstExists(false);

		// hay un pequeño error con las balas pero mola mazo
		if (bullet) {
			bullet.reset(ship.body.x +  16, ship.body.y + 16);
			bullet.lifespan = 2000;
			//game.physics.arcade.moveToPointer(bullet, 300);
			game.physics.arcade.velocityFromRotation(ship.rotation, 400, bullet.body.velocity);
			bulletTime = game.time.now + fireRate;
		}
	}
} 

function collisionHandler (obj1, obj2) {
	enemy.kill();
	bullets.remove(bullet);
}

function render() {

}
