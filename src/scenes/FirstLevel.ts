import { Loader, GameObjects, Scene} from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export class FirstLevel extends Scene {

    backgroundSky: Phaser.GameObjects.Image;
    playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    keys: {[key: string]: Phaser.Input.Keyboard.Key};

    constructor(){
        super("FirstLevel");
    }

    create(){
        this.backgroundSky = this.add.image(0,0,"firstLevelBackground");
        this.backgroundSky.setScale(3,3);

        this.makeKeys();
        this.setupPlayer("blueDino");

        this.input.keyboard.on('keyup-D', () => {
            console.log("D Pressed")
            this.playerSprite.body.setVelocityX(0);
            if(!this.playerSprite.body.onFloor()){
                this.playerSprite.anims.play("idle");
                this.playerSprite.anims.stop();
            }
        }, this);
        this.input.keyboard.on('keyup-A', () => {
            console.log("A Pressed")
            this.playerSprite.body.setVelocityX(0);
            if(!this.playerSprite.body.onFloor()){
                this.playerSprite.anims.play("idle");
                this.playerSprite.anims.stop();
            }
        }, this);
    }

    update(){
        //movement is so pressing A goes left, D goes right and pressing them both makes you jump
        if(this.keys["left"].isDown && this.keys["right"].isDown && this.playerSprite.body.onFloor()){
            this.playerSprite.body.setVelocityY(-400);
        }else if(this.keys["left"].isDown && !this.keys["right"].isDown){
            this.playerSprite.body.setVelocityX(-200);
            if(this.playerSprite.anims.getName() != "walk" || !this.playerSprite.flipX){
                this.playerSprite.play("walk");
                this.playerSprite.setFlipX(true);
            }
        }else if(!this.keys["left"].isDown && this.keys["right"].isDown){
            this.playerSprite.body.setVelocityX(200);
            if(this.playerSprite.anims.getName() != "walk" || this.playerSprite.flipX){
                this.playerSprite.play("walk");
                this.playerSprite.setFlipX(false);
            }
        }

        //check if animation is playing when we hit the ground, if it is not start playing idle
        if(!this.playerSprite.anims.isPlaying && this.playerSprite.body.onFloor()){
            console.log("setting idle");
            this.playerSprite.play("idle");
        }
    }

    makeKeys(){
        this.keys = {};
        this.keys["right"] = this.input.keyboard.addKey("D");
        this.keys["left"] = this.input.keyboard.addKey("A");
        this.keys["jump"] = this.input.keyboard.addKey("SPACE");
    }

    setupPlayer(key: string){
        this.playerSprite = this.physics.add.sprite(15,15,key,0);
        this.playerSprite.setScale(2);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height,true,true,true,true);
        this.playerSprite.body.setCollideWorldBounds(true);
        this.playerSprite.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers(key, {start:0, end:3}),
            frameRate: 8,
            repeat: -1
        })
        this.playerSprite.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(key, {start:4, end:9}),
            frameRate: 8,
            repeat: -1
        })
        this.playerSprite.anims.create({
            key: "hurt",
            frames: this.anims.generateFrameNumbers(key, {start:13, end:16}),
            frameRate: 8,
            repeat: -1,
        })
        this.playerSprite.play("idle");
    }
}