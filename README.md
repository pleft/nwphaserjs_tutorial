# GameShell + NWjs + Phaser = :cupid:

## Intro

The scope of this tutorial is to demonstrate how to setup an HTML5/JavaScript environment (NWjs) on Clockworkpi's GameShell along with a JS game engine (Phaser) and deploy a simple Phaser example that is playable and controlled by GameShell.

## Requirements
* Clockworkpi's GameShell portable console (https://www.clockworkpi.com/)
* NWjs ARM binaries (https://github.com/LeonardLaszlo/nw.js-armv7-binaries)

## Instructions

### Installing NWjs on GameShell

First of all connect via `ssh` to GameShell. 

Then download NWjs ARMv7 binaries (many thanks LeonardLaszlo) by executing the following command: 

```bash
cpi@clockworkpi:~$ wget https://github.com/LeonardLaszlo/nw.js-armv7-binaries/releases/download/v0.27.6/nwjs-v0.27.6-linux-arm.tar.gz
```

Untar the archive with:

```bash
cpi@clockworkpi:~$ tar -xvf nwjs-v0.27.6-linux-arm.tar.gz
```

This will create a directory with all `NWjs` binaries. Inside this directory there is a `lib/` directory. All the shared object files located in `lib/` directory need to be copied to `/usr/lib` directory.


```bash
cpi@clockworkpi:~$ cd nwjs-v0.27.6-linux-arm
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ sudo cp lib/* /usr/lib
```

One last thing, `NWjs` requires another shared object library, libnss3 which is not installed by default on GameShell. Install it by running:

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ sudo apt-get update
```
and then

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ sudo apt-get install libnss3-dev
```

To execute the `NWjs` create a shortcut in the menu:

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ touch /home/cpi/apps/launcher/Menu/GameShell/NWJS.sh
```

give it permission to execute:

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ chmod +x /home/cpi/apps/launcher/Menu/GameShell/NWJS.sh
```

then open the `NWJS.sh` file (with `vim` or any other editor) and insert the following line:
```
/home/cpi/nwjs-v0.27.6-linux-arm/nw --use-gl=egl --ignore-gpu-blacklist --disable-accelerated-2d-canvas --num-raster-threads=2
```

Reboot GameShell and an NWJS icon should appear on the menu. Selecting it should run the `nw` app.

To exit the application it is needed either to switch off GameShell or kill the `nw` process id, `sudo kill -9 PID`. In the rest of the tutorial, a key shortcut will be added to close the application and return to the launcher by pressing the `menu` key on GameShell.

That's all configuring `NWjs` on GameShell. The rest of this tutorial is the fun part of integrating `Phaser` game engine into `NWjs`

### Deploying a Phaser.io Game

Like before, connect via `ssh` to GameShell. 

Enter the directory where the `nwjs` binaries are, most probably in `nwjs-v0.27.6-linux-arm/`.

```bash
cpi@clockworkpi:~$ cd nwjs-v0.27.6-linux-arm
```

Clone this repository *inside* `nwjs-v0.27.6-linux-arm/` directory

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ git clone https://github.com/pleft/nwphaserjs_tutorial.git
```

This will create a directoy `nwphaserjs_tutorial/` inside `nwjs-v0.27.6-linux-arm/`. Rename this directory to `package.nw`. Doing this will allow the `nwjs` binary to pickup this repository's phaser.io code and execute it.

```bash
cpi@clockworkpi:~/nwjs-v0.27.6-linux-arm$ mv nwphaserjs_tutorial/ package.nw/
```

That's all, now selecting the `NWJS` icon on the GameShell menu will launch our little phaser.io game. To exit the game and return to GameShell launcer press the `MENU` key.

### Significant code parts

#### Screen size 

GameShell's screen is 320x240 pixels, however setting in phaser.io the playfield's size to exact match the screen's size will result to the appearance of scrollbars. So it is set 2-pixels lower, 318x238.

```javascript
var game = new Phaser.Game(318, 238, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
```

#### Key mapping
GameShell maps its buttons to keyboard keys. This makes our lives easier and it is pretty straightforward to map GameShell's buttons to phaser.io keys

* `UP = Phaser.Keyboard.UP`
* `DOWN = Phaser.Keyboard.DOWN`
* `LEFT = Phaser.Keyboard.LEFT`
* `RIGHT = Phaser.Keyboard.RIGHT`
* `A = Phaser.Keyboard.J`
* `B = Phaser.Keyboard.K`
* `X = Phaser.Keyboard.U`
* `Y = Phaser.Keyboard.I`
* `MENU = Phaser.Keyboard.ESC`
* `START = Phaser.Keyboard.ENTER`
* `SELECT = Phaser.Keyboard.SPACEBAR`

#### Exiting the application
To exit the application and return to the GameShell's launcher, `nwjs` command: `closeAllWindows()` should be called. Mapping this command to the `MENU` key is done as:

```javascript
if (this.escKey.isDown)
{
    // nwjs related code to close the application
    nw.App.closeAllWindows();
}
```