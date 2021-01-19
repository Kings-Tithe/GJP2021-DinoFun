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

        //backgrounds
        this.load.image("firstLevelSky",`${this.assets}/images/tilesets/fantasyVillage/ParallaxBackground/Background-01.png`);
        this.load.image("firstLevelBackground1",`${this.assets}/images/tilesets/fantasyVillage/ParallaxBackground/Background-02.png`);
        this.load.image("firstLevelBackground2",`${this.assets}/images/tilesets/fantasyVillage/ParallaxBackground/Background-03.png`);
        this.load.image("firstLevelBackground3",`${this.assets}/images/tilesets/fantasyVillage/ParallaxBackground/Background-04.png`);
        this.load.image("firstLevelSpriteSheet",`${this.assets}/images/tilesets/fantasyVillage/Platformer/spritesheet.png`);
        this.load.image("firstLevelObjectsheet",`${this.assets}/images/tilesets/fantasyVillage/GameObject/objects.png`);

        //tilemaps
        this.load.tilemapTiledJSON("FirstLevelTilemap", `${this.assets}/tilemaps/firstLevel/firstLevel.json`);

        //objects
        this.load.image("coin",`${this.assets}/images/tilesets/fantasyVillage/GameObject/Coin.png`);
    }

    create(){
        this.scene.start("FirstLevel");
    }
}