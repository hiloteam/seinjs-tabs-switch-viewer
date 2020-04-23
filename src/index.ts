/**
 * @File   : index.ts
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/3/02 下午1:00:00
 * @Description:
 */
import * as Sein from 'seinjs';

import GameState, {IOptions, IAnimationOptions} from './GameState';
import Bazier from './Bazier';
import {main} from './game';
import {checkCompressTexture} from './utils';

export {IOptions, IAnimationOptions, Bazier};

/**
 * 切换管理器。
 */
export default class TabSwitchViewer {
  private _game: Sein.Game<GameState>;
  private _started: boolean = false;
  private _currentTab: string = null;

  get game() {
    return this._game;
  }

  /**
   * 通过参数初始化。
   * 
   * @param options 初始化参数。
   * @param beforeGameStart 在游戏实际执行前的回调，你可以做一些事情。
   */
  async init(
    options: IOptions,
    beforeGameStart: (game: Sein.Game<GameState>) => void = () => {}
  ) {
    options.canvas.style.opacity = `${options.startAlpha}`;

    return new Promise((resolve, reject) => {
      const game = this._game = main(options);

      if (options.forceCompressTexture && !checkCompressTexture(game)) {
        reject(new Error('Not support compress textures'));
        return;
      }

      game.event.addOnce('Ready', () => {
        resolve();
      });

      game.onError = error => {
        reject(error);
      };

      game.event.add('WebglContextRestored', () => {
        window.location.reload();
      });
      game.event.register('FirstShowModel');
      game.event.register('SwitchModel');
      game.event.register('SwitchModelDone');
      game.event.register('Ready');

      beforeGameStart(game);

      game.start();
    });
  }

  /**
   * 以`tab`作为第一个展示的场景开始。
   */
  public async start(tab: string) {
    this._game.event.trigger('FirstShowModel', tab);

    return new Promise(resolve => {
      this._game.event.addOnce('MainRendererIsFinished', () => {
        this._currentTab = tab;
        this._started = true;
        this._game.canvas.style.opacity = '1';
        resolve();
      });
    });
  }

  /**
   * 切换到某一个Tab。
   * 
   * @param tab 要切换到的Tab。
   * @param onStart 在切换前调用。
   */
  public async switchTab(
    tab: string,
    onStart?: (direction: 'pre' | 'next') => void
  ) {
    if (!this._started) {
      return;
    }

    const {tabList} = this._game.state.options;
    const i = tabList.indexOf(this._currentTab);
    const j = tabList.indexOf(tab);
    this._currentTab = tab;
    const direction = j < i ? 'next' : 'pre';

    return new Promise((resolve, reject) => {
      this._game.event.addOnce('SwitchModelDone', () => resolve());
      onStart && onStart(direction);
      this._game.event.trigger('SwitchModel', {tab, direction});
    });
  }

  /**
   * 页面暂停时调用。
   */
  pause() {
    this._game && this._game.pause();
  }

  /**
   * 页面唤醒时调用。
   */
  resume() {
    this._game && this._game.resume();
  }

  /**
   * 退出时记得销毁。
   */
  destroy() {
    this._game && this._game.destroy();
    this._game = null;
  }
}
