import { Loader, GameObjects, Scene} from 'phaser';


export class LoadAssets extends Scene {

    //varibles
    assets :string = "../../assets";

    constructor(){
        super("LoadAssets");
    }

    preload(){
        //our 4 dino friends
        this.load.spritesheet("blueDino",`${this.assets}/images/characters/Dino/DinoSpritesBlue.png`,{ frameWidth: 24, frameHeight: 24});

        //background
        this.load.image("firstLevelBackground",`${this.assets}/images/tilesets/fantasyVillage/ParallaxBackground/Background-01.png`);
    }

    create(){
        this.scene.start("FirstLevel");
    }
}