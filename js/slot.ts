import * as PIXI from "pixi.js";

class Slot {
    speed: number;
    slotSprite: PIXI.TilingSprite;
    position: number;
    movement: string;
    ticker: PIXI.Ticker; 
    number: number;

    constructor(speed: number, textureFolder: string, width: number, height: number, position: number, number: number, ticker: PIXI.Ticker) {
      this.speed = speed;
      this.slotSprite = new PIXI.TilingSprite(PIXI.Texture.from(textureFolder), width, height);
      this.position = position;
      this.slotSprite.tilePosition.x = 0;
      this.slotSprite.tilePosition.y = height*number;
      this.number = number;
      this.slotSprite.x = width*position;
      this.slotSprite.y = 0;
      
      this.ticker = ticker;

      this.initTicker();

      this.movement = 'noMove';
    }

    spin(): void { //вращение слота, 1 сек. ускорение, 2 сек. вращение, 1 сек. замедление, остановка - поиск ближайшего номера.
        (async () => {
            this.movement = 'start';
            this.ticker.start();
            await this.wait(1000);
            this.movement = 'proccess';


            await this.wait(2000);
            this.movement = 'end';

            await this.wait(1000);
            this.movement = 'stop';
        })();
    }

    private initTicker(): void {//инициализация анимации вращения
        let increas = 0;
        this.ticker.add(() => {
            switch (this.movement) {
                case 'start':
                    increas += 0.01;
                    this.slotSprite.tilePosition.y  = this.slotSprite.tilePosition.y + increas*this.speed;
                    break;
                
                case 'proccess':
                    this.slotSprite.tilePosition.y  = this.slotSprite.tilePosition.y + this.speed;
                    break;
                
                case 'end':
                    if(increas > 0.005) {
                        increas -= 0.005;
                    }

                    this.slotSprite.tilePosition.y  = this.slotSprite.tilePosition.y + increas*this.speed;
                    break;

                case 'stop':
                    this.slotSprite.tilePosition.y  = this.slotSprite.tilePosition.y + increas*this.speed;
                    
                    if( 95 <= Math.round(this.slotSprite.tilePosition.y)%100) {
                        this.slotSprite.tilePosition.y = Math.round(this.slotSprite.tilePosition.y/100)*100;
                        this.position = this.slotSprite.tilePosition.y/100;
                        this.ticker.stop();
                        this.movement = 'noMove';
                        increas = 0;
                    }
                    break;
            }

            if(this.slotSprite.tilePosition.y >= 300) {
                this.slotSprite.tilePosition.y = 0;
            }
        });
    }

    private wait(ms: number) { //ожидание смены типа вращения 
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      }
  }
  
  export default Slot;