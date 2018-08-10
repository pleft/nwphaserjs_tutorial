
var game = new Phaser.Game(318, 238, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/shmup-ship.png');
    game.load.image('bullet', 'assets/bullet0.png');
    game.load.audio('sfxLazer', ['assets/lazer.wav']);

}

var sprite;
var bullet;
var bullets;
var bulletTime = 0;
var sfxLazer;

//  Left, right and space key for controls
var upKey;
var downKey;
var leftKey;
var rightKey;
var fireKey;
var escKey;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(10, 'bullet');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet, this);
    bullets.setAll('checkWorldBounds', true);

    sprite = game.add.sprite(150, 180, 'phaser');

    sfxLazer = game.add.audio('sfxLazer');

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	
	//  Register the keys.
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.J, Phaser.Keyboard.ESC ]);

}

function update() {

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    //  If true, it means that this key is down. If not, it means that the key is not down (was released/not pressed)
    if (this.upKey.isDown)
    {
        sprite.body.velocity.y = -200;
    }

    if (this.downKey.isDown)
    {
        sprite.body.velocity.y = 200;
    }

    if (this.leftKey.isDown)
    {
        sprite.body.velocity.x = -200;
    } 
	
    if (this.rightKey.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    if (this.fireKey.isDown)
    {
        fireBullet();
    }

    if (this.escKey.isDown)
    {
        game.pendingDestroy = true;
        window.location.replace('../index.html');
    }
}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x + 6, sprite.y - 8);
            bullet.body.velocity.y = -300;
            bulletTime = game.time.now + 250;
            sfxLazer.play();
        }
    }

}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {

    bullet.kill();

}

