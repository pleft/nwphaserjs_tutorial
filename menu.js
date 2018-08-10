var game = new Phaser.Game(319, 239, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
var menu = [{ name: 'Breakout', file: 'breakout/index.html' }, { name: 'Invaders', file: 'invaders/index.html' }, { name: 'Defender', file: 'defender/index.html' }];
var upKey;
var downKey;
var startKey;
var escKey;
var menuItem;
var menuPreviousItem;
var menuNextItem;
var menuPosition = 0;

function preload() {}

function create() {
    game.stage.backgroundColor = '#000000';
    game.add.text(4, 2, 'GameSh> Phaser.io Menu', { fontSize: 16, fill: '#FFFFFF' });
    game.add.text(4, 230, '  [UP/DOWN]: select game        [START]: play               [MENU]: exit', { fontSize: 8, fill: '#FFFFFF' });

    if (menu === undefined || menu.length == 0) {
        menu = [{ name: '...empty...', file: 'index.html' }];
    }

    this.menuPreviousItem = game.add.text(80, 86, '', { fontSize: 12, fill: '#747474' });
    this.menuItem = game.add.text(60, 100, '> ' + menu[menuPosition].name, { fontSize: 16, fill: '#FFFFFF' });
    if (menu.length > 1) {
        this.menuNextItem = game.add.text(80, 120, menu[menuPosition + 1].name, { fontSize: 12, fill: '#747474' });
    }

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.ENTER, Phaser.Keyboard.ESC]);
}

function update() {
    if (this.downKey.justDown && menuPosition < menu.length - 1) {
        this.menuItem.text = '> ' + menu[++menuPosition].name;
        this.menuPreviousItem.text = menu[menuPosition - 1].name;
        if (menuPosition < menu.length - 1) {
            this.menuNextItem.text = menu[menuPosition + 1].name;
        } else {
            this.menuNextItem.text = '';
        }
    }
    if (this.upKey.justDown && menuPosition > 0) {
        this.menuItem.text = '> ' + menu[--menuPosition].name;
        if (menuPosition > 0) {
            this.menuPreviousItem.text = menu[menuPosition - 1].name;
        } else {
            this.menuPreviousItem.text = '';
        }
        this.menuNextItem.text = menu[menuPosition + 1].name;
    }
    if (this.startKey.justDown) {
        console.log('selected: ' + menu[menuPosition].name);
        game.pendingDestroy = true;
        window.location.replace(menu[menuPosition].file);
    }
    if (this.escKey.isDown) {
        // nwjs related code to close the application
        nw.App.closeAllWindows();
    }
}