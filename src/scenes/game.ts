import Ethers from '../helpers/ethers';
import { requestGetUser } from '../helpers/subgraph';
import { Gotchi } from '../types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export default class GameScene extends Phaser.Scene {
  public address: string;
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private loginText: Phaser.GameObjects.Text;
  private pickCharacterText: Phaser.GameObjects.Text;
  public characterSelect: Phaser.GameObjects.Text[];
  public gotchis: Gotchi[];
  public selectedGotchiSprite: string;
 
  constructor() {
    super(sceneConfig);
  }

  private handleRenderGotchi(svg: string) {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    console.log(url);
    this.load.svg('gotchiSprite', url);

    this.add.image(500, 500, 'gotchiSprite').setScale(5, 5);
  }
 
  public create() {
    this.square = this.add.rectangle(300, 300, 100, 100, 0xFFFFFF) as any;
    this.physics.add.existing(this.square);
    this.characterSelect = [];

    this.loginText =
      this.add
        .text(16, 16, `Loading...`)
        .setFontSize(18)
        .setFontFamily('Trebuchet MS')
        .setColor('#00ffff')

    this.pickCharacterText =
      this.add
        .text(16, 54, `Pick character:`)
        .setFontSize(18)
        .setFontFamily('Trebuchet MS')
        .setColor('#00ffff')
  }
 
  public async update() {
    if (!this.address && window.ethereum.selectedAddress) {
      this.address = window.ethereum.selectedAddress;
      this.loginText.text = `Logged in as: ${this.address}`;
      const response = await requestGetUser(this.address);
      this.gotchis = response.user.gotchisOwned;
      const self = this;

      this.gotchis.forEach((gotchi, i) => this.characterSelect.push(
        this.add.text(16,  80 + 24 * i, gotchi.name).setFontSize(18)
        .setFontFamily('Trebuchet MS')
        .setColor('#00ffff')
        .setInteractive()
        .on('pointerdown', function async () {
          const ether = new Ethers();
          ether.getAavegotchiSVG(gotchi.id).then((res) => self.handleRenderGotchi(res));
        })
      ))
    }
  
    const cursorKeys = this.input.keyboard.createCursorKeys();
 
    if (cursorKeys.up.isDown) {
      this.square.body.setVelocityY(-500);
    } else if (cursorKeys.down.isDown) {
      this.square.body.setVelocityY(500);
    } else {
      this.square.body.setVelocityY(0);
    }
    
    if (cursorKeys.right.isDown) {
      this.square.body.setVelocityX(500);
    } else if (cursorKeys.left.isDown) {
      this.square.body.setVelocityX(-500);
    } else {
      this.square.body.setVelocityX(0);
    }
  }
}