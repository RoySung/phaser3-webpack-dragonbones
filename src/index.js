import Phaser from "phaser";
import dragonBones from "./external/dragonBones";
import logoImg from "./assets/logo.png";

class MyGame extends Phaser.Scene {

    constructor () {
        super();
        this.gopher = null
    }

    preload () {
      this.load.image("logo", logoImg);

      this.load.dragonbone(
          "Armaturegopher-stand",
          "src/assets/gopher_stand_tex.png",
          "src/assets/gopher_stand_tex.json",
          "src/assets/gopher_stand_ske.json",
      );
    }
      
    create () {
      const logo = this.add.image(800, 300, "logo");

      this.gopher = this.add.armature("Armaturegopher-stand", "Armaturegopher-stand");
      this.gopher.addDBEventListener(dragonBones.EventObject.LOOP_COMPLETE, (e) => this._animationEventHandler(e), this);
      this.gopher.x = 400;
      this.gopher.y = 300;
      this.gopher.setScale(0.5)
      this.gopher.animation.play("normal");
    }

    _animationEventHandler(event) {
      console.log("_animationEventHandler")
      console.log(event.animationState.name, event.type, event.name);
      if (event.animationState.name =="normal") {
        this.gopher.animation.play("watch");
      } else {
        this.gopher.animation.play("normal");
      }
    }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1024,
  height: 800,
  plugins: {
    scene: [
      { key: "DragonBones", plugin: dragonBones.phaser.plugin.DragonBonesScenePlugin, mapping: "dragonbone" } // setup DB plugin
    ]
  },
  scene: MyGame
};

const game = new Phaser.Game(config);

