import { Loader, GameObjects, Scene } from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export class FirstLevel extends Scene {

    backgroundSky: Phaser.GameObjects.Image;
    backgroundLayers: { [key: number]: Phaser.GameObjects.TileSprite };
    playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    keys: { [key: string]: Phaser.Input.Keyboard.Key };
    tilemap: Phaser.Tilemaps.Tilemap;
    changedX: number;

    constructor() {
        super("FirstLevel");
    }

    create() {
        this.setupKeys();
        this.setupPlayer("blueDino");
        this.setupTilemap();
        this.createParallexBackground();
    }

    update() {
        //movement is so pressing A goes left, D goes right and pressing them both makes you jump
        if (this.keys["left"].isDown && this.keys["right"].isDown && this.playerSprite.body.onFloor()) {
            this.playerSprite.body.setVelocityY(-1500);
        } else if (this.keys["left"].isDown && !this.keys["right"].isDown) {
            this.playerSprite.body.setVelocityX(-675);
            if (this.playerSprite.anims.getName() != "walk" || !this.playerSprite.flipX) {
                this.playerSprite.play("walk");
                this.playerSprite.setFlipX(true);
            }
        } else if (!this.keys["left"].isDown && this.keys["right"].isDown) {
            this.playerSprite.body.setVelocityX(675);
            if (this.playerSprite.anims.getName() != "walk" || this.playerSprite.flipX) {
                this.playerSprite.play("walk");
                this.playerSprite.setFlipX(false);
            }
        }
        if (this.playerSprite.x != this.changedX) {
            if (this.playerSprite.x > this.changedX) {
                this.backgroundLayers[1].tilePositionX -= 1;
                this.backgroundLayers[2].tilePositionX -= 1.5;
                this.backgroundLayers[3].tilePositionX -= 2;
            } else if (this.playerSprite.x < this.changedX) {
                this.backgroundLayers[1].tilePositionX += 1;
                this.backgroundLayers[2].tilePositionX += 1.5;
                this.backgroundLayers[3].tilePositionX += 2;
            }
            this.changedX = this.playerSprite.x;
            console.log(this.playerSprite.body.velocity);
            this.backgroundLayers[1].x = this.playerSprite.x;
            this.backgroundLayers[2].x = this.playerSprite.x;
            this.backgroundLayers[3].x = this.playerSprite.x;
        }

        //check if animation is playing when we hit the ground, if it is not start playing idle
        if (!this.playerSprite.anims.isPlaying && this.playerSprite.body.onFloor()) {
            console.log("setting idle");
            this.playerSprite.play("idle");
        }
    }

    setupKeys() {
        this.keys = {};
        this.keys["right"] = this.input.keyboard.addKey("D");
        this.keys["left"] = this.input.keyboard.addKey("A");
        this.keys["jump"] = this.input.keyboard.addKey("SPACE");

        this.input.keyboard.on('keyup-D', () => {
            console.log("D Pressed")
            this.playerSprite.body.setVelocityX(0);
            this.playerSprite.anims.play("idle");
            if (!this.playerSprite.body.onFloor()) {
                this.playerSprite.anims.stop();
            }
        }, this);
        this.input.keyboard.on('keyup-A', () => {
            console.log("A Pressed")
            this.playerSprite.body.setVelocityX(0);
            this.playerSprite.anims.play("idle");
            if (!this.playerSprite.body.onFloor()) {
                this.playerSprite.anims.stop();
            }
        }, this);
    }

    setupPlayer(key: string) {
        this.playerSprite = this.physics.add.sprite(256, 800, key, 0);
        this.playerSprite.setScale(7);
        this.playerSprite.body.setOffset(0, 0)
        this.playerSprite.body.setSize(16, 18);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height, true, true, true, true);
        //this.playerSprite.body.setCollideWorldBounds(true);
        this.playerSprite.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        })
        this.playerSprite.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(key, { start: 4, end: 9 }),
            frameRate: 8,
            repeat: -1
        })
        this.playerSprite.anims.create({
            key: "hurt",
            frames: this.anims.generateFrameNumbers(key, { start: 13, end: 16 }),
            frameRate: 8,
            repeat: -1,
        })
        this.playerSprite.play("idle");
    }

    setupTilemap() {
        this.tilemap = this.make.tilemap({ key: "FirstLevelTilemap" });

        let tileset = this.tilemap.addTilesetImage("spritesheet", "firstLevelSpriteSheet");

        let collisionLayer = this.tilemap.createLayer("collide", tileset, 0, 0);
        this.tilemap.createLayer("overtop", tileset, 0, 0);

        this.tilemap.setCollisionBetween(1, 999, true, true, "collide");
        this.physics.add.collider(this.playerSprite, collisionLayer);

        //setup camera
        this.cameras.main.startFollow(this.playerSprite);
        this.cameras.main.setZoom(0.5)
        this.cameras.main.setBounds(0,0,this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    createParallexBackground() {
        this.backgroundLayers = {};

        //setup background stuff
        this.backgroundSky = this.add.image(0, 0, "firstLevelSky");
        let backgroundScaleX = this.tilemap.widthInPixels / this.backgroundSky.width;
        let backgroundScaley = this.tilemap.heightInPixels / this.backgroundSky.height;
        this.backgroundSky.setOrigin(0, 0);
        this.backgroundSky.setScale(backgroundScaleX, backgroundScaley);
        this.backgroundSky.setDepth(-1);

        this.backgroundLayers[1] = this.add.tileSprite(0, 2750, 0, 0, "firstLevelBackground1");
        backgroundScaleX = this.cameras.main.displayWidth / this.backgroundLayers[1].width;
        backgroundScaley = this.cameras.main.displayHeight / this.backgroundLayers[1].height;
        this.backgroundLayers[1].setOrigin(.5, .5);
        this.backgroundLayers[1].setDepth(-1);
        this.backgroundLayers[1].setScale(backgroundScaleX, backgroundScaley);
        this.backgroundLayers[1].width *= 2;

        this.backgroundLayers[2] = this.add.tileSprite(0, 2750, 0, 0, "firstLevelBackground2");
        backgroundScaleX = this.cameras.main.displayWidth / this.backgroundLayers[2].width;
        backgroundScaley = this.cameras.main.displayHeight / this.backgroundLayers[2].height;
        this.backgroundLayers[2].setOrigin(.5, .5);
        this.backgroundLayers[2].setDepth(-1);
        this.backgroundLayers[2].setScale(backgroundScaleX, backgroundScaley);
        this.backgroundLayers[2].width *= 2;

        this.backgroundLayers[3] = this.add.tileSprite(0, 3000, 0, 0, "firstLevelBackground3");
        backgroundScaleX = this.cameras.main.displayWidth / this.backgroundLayers[3].width;
        backgroundScaley = this.cameras.main.displayHeight / this.backgroundLayers[3].height;
        this.backgroundLayers[3].setOrigin(.5, .5);
        this.backgroundLayers[3].setDepth(-1);
        this.backgroundLayers[3].setScale(backgroundScaleX, backgroundScaley);
        this.backgroundLayers[3].width *= 2;
    }
}