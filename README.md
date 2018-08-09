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

This will create a directory with all `NWjs` binaries. Inside this directory there is a `lib/` directory. Copy all the shared object files located in lib directory need to be copied to `/usr/lib` directory.


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

That's all configuring `NWjs` on GameShell. The rest of this tutorial is the fun part of integrating `Phaser` game engine into `NWjs`

TODO