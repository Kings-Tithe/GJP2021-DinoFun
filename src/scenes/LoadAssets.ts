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

        //sound effects
        this.load.audio("coinPickupSound",`${this.assets}/audio/soundEffects/Ancient_Game_Coin_Jar_Touch.wav`);
        this.load.audio("forestMusic",`${this.assets}/audio/music/Field_3.mp3`);
    }

    create(){
        //star hud scene
        this.scene.launch("Hud");
        //layer actual game under hud scene
        this.scene.start("FirstLevel");
    }
}