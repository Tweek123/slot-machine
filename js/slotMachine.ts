import * as PIXI from "pixi.js";
import Slot from './slot'
import ButtonStart from './buttonStart'

class SlotMachine {
    buttonStart: ButtonStart;
    slots: Slot[];
    blockStart: Boolean;
    constructor(buttonStart: ButtonStart, slots: Slot[]) {
        this.buttonStart = buttonStart;
        this.slots = slots;
        this.buttonStart.buttonSprite.on('mousedown', this.start.bind(this));
        this.blockStart = false;
    }

    protected waitSpin(slot: Slot) {//ожидание конца вращения слота
        return new Promise(resolve => {
          setInterval(function() {
            if(slot.movement == 'noMove') {
              resolve();
            }
          }, 100)
        });
      }

    protected async start() {//нажатие кнопки
        if(!this.blockStart) {
          this.blockStart = true;//блокировка кнопки  
          await this.spinSlots();//ожидание конца вращения слотов
          this.checkWon();//проверка выиграша
          this.blockStart = false;//снятие блокировки
        }
    }

    protected async spinSlots() {//вращение слотов
        for (const slot of this.slots) {
            slot.spin();//вращение слота
            await this.waitSpin(slot);//ожидание конца вращения слота
        }
    }

    protected checkWon():void {//проверка выиграша
        let won = true;
        this.slots.reduce((prev,curr) => {
            if(prev.position != curr.position) {
              won = false;
            }
            return prev;
          });
        if(won) {
            alert('Вы выиграли !');
        }
    }
  }
  
  export default SlotMachine;