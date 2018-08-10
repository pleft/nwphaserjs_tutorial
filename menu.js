var game = new Phaser.Game(318, 238, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
var menu  = [{name: 'Space Shooting', file:'game1/index.html'}, {name: 'Duckhunt', file:''}, {name: 'SuperMarioLand', file:''}];
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
    game.add.text(10, 10, 'Menu', {fontSize: 24, fill: '#FFFFFF'});

    this.menuPreviousItem = game.add.text(100, 80, '', {fontSize: 12, fill: '#D1D1D1'});
    this.menuItem = game.add.text(100, 100, menu[menuPosition].name, {fontSize: 14, fill: '#FFFFFF'});
    this.menuNextItem = game.add.text(100, 120, menu[++menuPosition].name, {fontSize: 12, fill: '#D1D1D1'});
    
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.ENTER, Phaser.Keyboard.ESC]);
}

function update() {
    if (this.downKey.justDown && menuPosition<menu.length-1) {
        this.menuItem.text = menu[++menuPosition].name;
        this.menuPreviousItem.text = menu[menuPosition-1].name;
        if(menuPosition<menu.length-1) {
            this.menuNextItem.text = menu[menuPosition+1].name;
        } else {
            this.menuNextItem.text = '';
        }
    }
    if (this.upKey.justDown && menuPosition>0) {
        this.menuItem.text = menu[--menuPosition].name;
        if(menuPosition>0) {
            this.menuPreviousItem.text = menu[menuPosition-1].name;
        } else {
            this.menuPreviousItem.text = '';
        }
        this.menuNextItem.text = menu[menuPosition+1].name;
    }
    if (this.startKey.justDown) {
        console.log('selected: ' + menu[menuPosition].name);
        game.pendingDestroy = true;
        window.location.replace(menu[menuPosition].file);
    }
    if (this.escKey.isDown)
    {
        // nwjs related code to close the application
        nw.App.closeAllWindows();
    }
}