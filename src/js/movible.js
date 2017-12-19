'use strict';

// Esto es la constructora de los objetos del tipo GameObject que por defecto tienen: 
// 1. Un juego (game) 2. Un renderizado gráfico (sprite) 3. Una posición en el mapa (posX, posY)
// Esta será la clase principal de todo el juego. Todo coso del juego pasará por aquí 
var gameObject = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY) {

	this.sprite = game.add.sprite(posX, posY, sprite);
	this.sprite.anchor.set(scaleX, scaleY);
	this.sprite.scale.setTo(scaleX, scaleY);

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.body.inmovable = true;
	this.sprite.body.colliderWorldBounds = true;
	this.sprite.body.bounce.setTo(1, 1);
	this.sprite.allowRotation = false;
}

gameObject.prototype.constructor = gameObject;

var movible = function (game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY) {

	this.game = game;

	this.velocityX = 0;
	this.velocityY = 0;
	this.acceleration = 10;
	this.MaxVelocity = 300;
	this.MinVelocity = 0;

	gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY);
};

movible.prototype = Object.create(gameObject.prototype);
movible.prototype.constructor = movible;

movible.prototype.updateBullet = function () {
	this.velocityX = 200;
	this.velocityY = 0;

	this.sprite.body.velocity.x = velocityX;
	this.sprite.body.velocity.y = velocityY;
};

var ship = function (game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY, velX, velY) {

	this.game = game;

	movible.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY);

};

ship.prototype = Object.create(movible.prototype);
ship.prototype.constructor = ship;

ship.prototype.update = function (cursors, fireBotton, game, bullet) {

	console.log(this.velocityY);

	this.velocityX = 0;
	this.velocityY = 0;

	if (cursors.up.isDown) this.velocityY = -300;

    else if (cursors.down.isDown)this.velocityY  = 300;
    	
    if (cursors.left.isDown) this.velocityX = -250;
   
    else if (cursors.right.isDown) this.velocityX = 250;
	
	
	this.sprite.body.velocity.y = this.velocityY;
	this.sprite.body.velocity.x = this.velocityX;

    if (fireBotton.isDown) {
		bullet.fire();
    }
};

var power = function (game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY) {

	this.game = game;

	gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY);
};

power.prototype = Object.create(gameObject.prototype);
power.prototype.constructor = power;

module.exports = { gameObject, movible, ship, power };


// Sistema de hijos 