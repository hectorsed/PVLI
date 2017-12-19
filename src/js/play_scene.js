'use strict';

var GameObject = require('./movible.js');

var ship;

var bit;
var power;

var cursors;

var bullet;
var fireButton;

var enemy;

var PlayScene = {

	preload : function () {

		this.game.load.baseURL = 'https://hectorsed.github.io/PVLI/scr/';
    	this.game.load.crossOrigin = 'anonymous';

		this.game.load.image('background', 'images/spacebackground.png');
		this.game.load.image('ship', 'images/spaceship.png');
		this.game.load.image('bullet', 'images/bullet.png');
		this.game.load.image('enemy', 'images/starman.png');
		this.game.load.image('bit' , 'images/bit.png');
		this.game.load.image('power' , 'images/power.png');
	},

  	create : function () {

    	// INICIALIZACIÓN DE LAS FÍSICAS DEL JUEGO
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.game.add.tileSprite(0, 0, 5000, 600, 'background');

    	// CREACIÓN DEL PLAYER : juego, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY, 
    	ship = new GameObject.ship(this.game, 'ship', 300, 100, 0.5, 0.5, 0.5, 0.5);

    	// DETECCIÓN DEL INPUT
    	cursors = this.game.input.keyboard.createCursorKeys();
		fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		bullet = this.game.add.weapon(30, 'bullet');
		bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		bullet.bulletAngleOffset = 90;
		bullet.bulletSpeed = -400;
		bullet.fireRate = 60;
		bullet.trackSprite(this.ship, 14, 0);

		bit = ship.addChild(this.game.make.sprite(0, 100, 'bullet'));
    	//power = game.add.sprite(400, 300, 'power');
  	},

  	update : function () {
  		ship.update(cursors, fireButton, this.game, bullet);
  	}
};

module.exports = PlayScene;
