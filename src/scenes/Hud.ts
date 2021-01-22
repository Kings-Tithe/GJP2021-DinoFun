import { Loader, GameObjects, Scene} from 'phaser';
import { SignalManager } from '../services/SignalManager';


export class Hud extends Scene {

    totalCoinCount: number;
    currentCoinCount: number;
    singalManager: SignalManager;
    coinCountText: Phaser.GameObjects.Text;

    constructor(){
        super("Hud");
        console.log("Hud Scene Started!");
        //initalize
        this.singalManager = SignalManager.get();
        this.totalCoinCount = 0;
        this.currentCoinCount = 0;

        this.createSingalThings();
    }


    create(){
        let coinCountSymbol = this.add.sprite(15,15,"coin");
        coinCountSymbol.setOrigin(0,0);
        coinCountSymbol.setScale(.5,.5  );
        this.coinCountText = this.add.text(85,15,`${this.currentCoinCount}/${this.totalCoinCount}`,{
            fontSize: "75px",
            color: "#FFD700"
        })
    }

    createSingalThings(){
        this.singalManager.on("TotalCoinCount", (total:number) => {
            this.totalCoinCount = total;
            this.coinCountText.setText(`${this.currentCoinCount}/${this.totalCoinCount}`);
            console.log("test ", total);
        }, this);
        this.singalManager.on("coinCollected", () => {
            this.currentCoinCount++;
            this.coinCountText.setText(`${this.currentCoinCount}/${this.totalCoinCount}`);
            console.log("Coincollected");   
        })
    }
}