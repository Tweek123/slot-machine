import * as PIXI from "pixi.js";

class ButtonStart {
    buttonSprite: PIXI.Sprite;
    flashTexture: PIXI.Texture;
    buttonTexture: PIXI.Texture;
    switch: Boolean;

    constructor(textureFolder: string, textureFolderFlash: string) {
      this.buttonTexture = PIXI.Texture.from(textureFolder);

      this.buttonSprite = new PIXI.Sprite(this.buttonTexture);
      this.buttonSprite.scale.x = 0.3;
      this.buttonSprite.scale.y = 0.3;
      this.buttonSprite.x=200;
      this.buttonSprite.y=150;
      this.buttonSprite.interactive=true;	

      this.flashTexture = PIXI.Texture.from(textureFolderFlash);
    
      this.switch = false;

      this.flash();
    }

    flash(): void { //мигание кнопки
        setInterval(() => {
            this.switch = !this.switch; 
            if(this.switch) {
                this.buttonSprite.texture = this.flashTexture;
            } else { 
                this.buttonSprite.texture = this.buttonTexture;
            }
        },1000)
    }
 
  }
  
  export default ButtonStart;