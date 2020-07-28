import Slot from "./js/slot";
import ButtonStart from "./js/buttonStart";
import SlotMachine  from "./js/slotMachine";
import * as PIXI from "pixi.js";

const IMG_MACHINE = "./img/slot-machine.png";
const IMG_BUTTON_LIGHT = "./img/button-red-light.png";
const IMG_BUTTON = "./img/button-red.png";
const slots: Slot[] = [];

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
});

document.body.appendChild(app.view);
app.stage.interactive=true;
	

const loader = new PIXI.Loader();
loader.add('MACHINE', IMG_MACHINE)
  .add('BUTTON_LIGHT', IMG_BUTTON_LIGHT)
  .add('BUTTON', IMG_BUTTON);
 
loader.onComplete.add(setup);

loader.load();

function setup() {
  const incr = [10,20,25,20,25,10];//скорости вращения
  for(let i=0; i<5; i++) {//инициализация слотов
    slots.push(new Slot(incr[i],IMG_MACHINE,102,100,i,i, new PIXI.Ticker()));
  }

  slots.forEach(slot => {//рендер слотов
    app.stage.addChild(slot.slotSprite);
  });

  const buttonStart = new ButtonStart(IMG_BUTTON, IMG_BUTTON_LIGHT);//инициализация кнопки 

  app.stage.addChild(buttonStart.buttonSprite);//рендер кнопки
  const slotMachine = new SlotMachine(buttonStart, slots);//инициализация машины
  
  const fps = new PIXI.Text(String(app.ticker.FPS), {font:"50px Arial", fill:"green"});//инициализация fps
  fps.x = 0;
  fps.y = 300;
  app.stage.addChild(fps);//рендер fps

  setInterval(function(){//обновление fps
      fps.text = String(app.ticker.FPS);
  }, 100);
}