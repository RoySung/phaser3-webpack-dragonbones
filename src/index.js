import Phaser from "phaser";
import dragonBones from "./external/dragonBones";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  plugins: {
    scene: [
      { key: "DragonBones", plugin: dragonBones.phaser.plugin.DragonBonesScenePlugin, mapping: "dragonbone" } // setup DB plugin
    ]
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);

  this.load.dragonbone(
      "Dragon",
      "src/assets/Dragon_tex.png",
      "src/assets/Dragon_tex.json",
      "src/assets/Dragon_ske.json",
  );
}

function create() {
  const logo = this.add.image(400, 300, "logo");

  const arm = this.add.armature("Dragon", "Dragon");
  arm.x = 400;
  arm.y = 300;
  arm.animation.play("walk");
}
