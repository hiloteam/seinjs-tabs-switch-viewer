/**
 * @File   : game.js
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/3/02 下午1:00:00
 * @Description:
 */
import * as Sein from 'seinjs';
(window as any).Sein = Sein;

import GyroControllerComponent from './GyroControllerComponent';
import GameState, {IOptions} from './GameState';

Sein.AliAMCExtension.useAuto = false;
Sein.AliAMCExtension.useWASM = false;
Sein.AliAMCExtension.useWebWorker = false;

/**
 * @hidden
 */
const ROTATION_TMP = new Sein.Quaternion();

/**
 * @hidden
 */
class MainLevelScript extends Sein.LevelScriptActor {
  private currentActor: Sein.SceneActor = null;
  private actors: {[key: string]: Sein.SceneActor} = {};
  private cyroController: GyroControllerComponent = null;
  private hasError = false;

  onInit() {
    const {resource, state} = this.getGame<GameState>();

    if (state.options.mars.RUNTIME) {
      resource.register('Mars', state.options.mars.RUNTIME.Loader);
    }
  }

  onAdd() {
    this.cyroController = this.addComponent('cyroController', GyroControllerComponent);
    this.cyroController.event.add('Rotation', this.handleDeviceOrientation);
    this.cyroController.forceDisable = !this.getGame<GameState>().state.options.useGyroscope;
  }

  onError() {
    this.hasError = true;
  }

  onPreload() {
    if (this.hasError) {
      return;
    }

    const {resource, state} = this.getGame<GameState>();

    resource.load({type: 'GlTF', name: 'main.gltf', url: state.options.gltf, forceCreateNewBuffer: true});

    if (state.options.mars.vfx) {
      resource.load({type: 'Mars', name: 'vfx.mars', url: state.options.mars.vfx});
    }
  }

  onCreate() {
    if (this.hasError) {
      return;
    }

    const {resource, state, event} = this.getGame<GameState>();
    delete resource.get<'GlTF'>('main.gltf').json;
    const actors = resource.instantiate<'GlTF'>('main.gltf');
    state.options.tabList.forEach((tab: string) => {
      this.actors[tab] = actors.findByName(tab);
      this.actors[tab].visible = false;
    });

    let bgVfx;
    if (state.options.mars.bgName) {
      bgVfx = resource.instantiate('vfx.mars', {name: 'bg', compositionName: state.options.mars.bgName} as any);
    }

    event.addOnce('FirstShowModel', (tab: string) => {
      this.currentActor = this.actors[tab];
      this.currentActor.visible = true;
      if (this.currentActor.animator) {
        setTimeout(() => this.currentActor.animator.play(null, Infinity), 100);
      }
      bgVfx.start();
      this.cyroController.enable();
      event.add('GameWillPause', () => this.cyroController.disable());
      event.add('GameDidResume', () => this.cyroController.enable());
    });

    event.add('SwitchModel', this.handleSwitchTab);

    this.loadOne(0, state.options.tabList.length);
  }

  private loadOne = (index: number, total: number) => {
    const {state, event} = this.getGame<GameState>();

    const actor = this.actors[state.options.tabList[index]];
    actor.visible = true;

    event.addOnce('MainRendererIsFinished', () => {
      actor.visible = false;
      if (index === total - 1) {
        event.trigger('Ready');
      } else {
        setTimeout(() => this.loadOne(index + 1, total), state.options.intervalPerCreating);
      }
    });
  }

  private handleDeviceOrientation = ({rotation, forceQuat}) => {
    if (!this.currentActor) {
      return;
    }

    const {quaternion} = this.currentActor.transform;

    if (forceQuat) {
      quaternion.copy(forceQuat);
    } else {
      quaternion.rotateY(rotation);
    }
  }

  private handleSwitchTab = ({tab, direction}: {tab: string, direction: 'pre' | 'next'}) => {
    if (!this.currentActor) {
      this.currentActor = this.actors[tab];
      this.currentActor.visible = true;
      this.currentActor.animator && this.currentActor.animator.play(null, Infinity);
      this.getGame().event.trigger('SwitchModelDone');
      return;
    }

    const {enter, leave, preRotation, nextRotation} = this.getGame<GameState>().state.options;

    this.cyroController.disable();

    const nextActor = this.actors[tab];
    const cq = this.currentActor.transform.quaternion;
    ROTATION_TMP.copy(cq);
    const nq = nextActor.transform.quaternion;
    const isPre = direction === 'pre';

    Sein.Tween.to(
      0, 1,
      {
        duration: leave.duration,
        ease: leave.ease,
        onUpdate: (delta: number) => {
          cq.copy(ROTATION_TMP).slerp(isPre ? preRotation : nextRotation, delta);
        },
        onComplete: () => {
          this.currentActor.animator && this.currentActor.animator.stop();
          this.currentActor.visible = false;
          nextActor.visible = true;
          nextActor.animator && nextActor.animator.play(null, Infinity);

          Sein.Tween.to(
            0, 1,
            {
              duration: enter.duration,
              ease: enter.ease,
              onUpdate: (delta: number) => {
                nq.copy(!isPre ? preRotation : nextRotation).slerp(ROTATION_TMP, delta);
              },
              onComplete: () => {
                this.currentActor = nextActor;
                this.cyroController.enable();
                this.getGame().event.trigger('SwitchModelDone');
              }
            }
          );
        }
      }
    );
  }
}

/**
 * @hidden
 */
export function main(options: IOptions): Sein.Game<GameState> {
  const {canvas, lockFrame} = options;
  const engine = new Sein.Engine(lockFrame ? {fps: 30} : {});

  const game = new Sein.Game(
    'game',
    {
      canvas,
      clearColor: new Sein.Color(0, 0, 0, 0),
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
      pixelRatio: window.devicePixelRatio,
      alpha: true,
      premultipliedAlpha: true
    },
    GameState
  );

  engine.addGame(game);

  game.addWorld('main', Sein.GameModeActor, MainLevelScript);

  game.state.init(options);

  return game;
}
