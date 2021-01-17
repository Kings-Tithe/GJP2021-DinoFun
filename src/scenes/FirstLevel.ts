import { Loader, GameObjects, Scene} from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export class FirstLevel extends Scene {

    backgroundSky: Phaser.GameObjects.Image;
    playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    constructor(){
        super("FirstLevel");
    }

    create(){
        this.backgroundSky = this.add.image(0,0,"firstLevelBackground");
        this.backgroundSky.setScale(3,3);

        //make test character
        this.playerSprite = this.physics.add.sprite(15,15,"blueDino",0);
        this.playerSprite.setScale(2);

        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height,true,true,true,true);
        this.playerSprite.body.setCollideWorldBounds(true);
    }
}