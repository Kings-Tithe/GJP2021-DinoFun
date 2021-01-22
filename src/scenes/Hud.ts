import { Loader, GameObjects, Scene} from 'phaser';
import { SignalManager } from '../services/SignalManager';


export class Hud extends Scene {

    //coin counter
    coinCountSymbol: Phaser.GameObjects.Sprite;
    totalCoinCount: number;
    currentCoinCount: number;
    coinCountText: Phaser.GameObjects.Text;

    //level timer
    levelTime: number;
    levelTimeText: Phaser.GameObjects.Text;
    levelTimeInterval: any;

    //tools
    singalManager: SignalManager;


    constructor(){
        super("Hud");
        //initalize
        this.singalManager = SignalManager.get();
        this.totalCoinCount = 0;
        this.currentCoinCount = 0;
        this.levelTime = 0;
    }


    create(){
        this.createSingalListeners();
        this.createCoinCounter();
        this.createLevelTimer();
    }

    createSingalListeners(){
        this.singalManager.on("TotalCoinCount", (total:number) => {
            this.totalCoinCount = total;
            this.coinCountText.setText(`${this.currentCoinCount}/${this.totalCoinCount}`);
        }, this);
        this.singalManager.on("coinCollected", () => {
            this.currentCoinCount++;
            this.coinCountText.setText(`${this.currentCoinCount}/${this.totalCoinCount}`);
            if(this.currentCoinCount == this.totalCoinCount){
                this.stopLevelTime();
            }  
        });
        this.singalManager.on("levelTimerStart", () => {
            this.startLevelTime();
        })
    }

    createCoinCounter(){
        let coinCountSymbol = this.add.sprite(15,15,"coin");
        coinCountSymbol.setOrigin(0,0);
        coinCountSymbol.setScale(.5,.5);
        coinCountSymbol.play("coinSpin");
        this.coinCountText = this.add.text(85,15,`${this.currentCoinCount}/${this.totalCoinCount}`,{
            fontSize: "75px",
            color: "#FFD700"
        })
    }

    createLevelTimer(){
        this.levelTimeText = this.add.text(this.sys.canvas.width/2, 20, "0:00", {
            fontSize: "75px",
            color: "white"
        })
    }

    startLevelTime(){
        //reset value
        this.levelTime = 0;
        //increment and update timer text every second
        this.levelTimeInterval = setInterval(() => {
            this.levelTime++;
            let seconds: string = '' + this.levelTime % 60;
            seconds = seconds.padStart(2, '0');
            this.levelTimeText.setText(`${Math.trunc(this.levelTime/60)}:${seconds}`);
        }, 1000);
    }

    stopLevelTime(){
        clearInterval(this.levelTimeInterval);
    }
}