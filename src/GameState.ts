/**
 * @File   : GameState.tsx
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/3/02 下午1:00:00
 * @Description: GameState.
 */
import * as Sein from 'seinjs';

import Bazier from './Bazier';

/**
 * 场景切换动画配置。
 */
export interface IAnimationOptions {
  /**
   * 切换时长。
   */
  duration?: number;
  /**
   * 切换插值函数。
   */
  ease?: (progress: number) => number;
}

/**
 * TabSwitchViewer的配置。
 */
export interface IOptions {
  /**
   * Canvas。
   */
  canvas: HTMLCanvasElement;
  /**
   * gltf文件地址，一般通过`seinjs-gltf-loader`引入。
   */
  gltf: string;
  /**
   * Tab列表，按顺序。
   */
  tabList: string[];
  /**
   * 是否强制锁30帧。
   * 
   * @default false
   */
  lockFrame?: boolean;
  /**
   * 预渲染时的透明度。
   * 
   * @default 0.03
   */
  startAlpha?: number;
  /**
   * 是否使用陀螺仪。
   * 
   * @default true
   */
  useGyroscope?: boolean;
  /**
   * 每个模型初始化之间的间隔，一个优化，毫秒。
   * 
   * @default 200
   */
  intervalPerCreating?: number;
  /**
   * 不支持压缩纹理的情况下，是否强制失败。
   * 
   * @default false
   */
  forceCompressTexture?: boolean;
  /**
   * 向前切的角度四元数。
   * 
   * @default -90度的四元数
   */
  preRotation?: Sein.Quaternion;
  /**
   * 向后切的角度四元数。
   * 
   * @default 90度的四元数
   */
  nextRotation?: Sein.Quaternion;
  /**
   * 场景模型入场配置。
   */
  enter?: IAnimationOptions;
  /**
   * 场景模型出场配置。
   */
  leave?: IAnimationOptions;
  /**
   * Mars配置。
   */
  mars?: {
    /**
     * Runtime注入。
     */
    RUNTIME?: any;
    /**
     * VFX文件URL。
     */
    vfx?: string;
    /**
     * 背景特效名称。
     */
    bgName?: string;
    /**
     * 暂时不可用。
     */
    preTransName?: string;
    /**
     * 暂时不可用。
     */
    nextTransName?: string;
  };
}

/**
 * @hidden
 */
const ENTER_CURVE = new Bazier([0.19, 0.88], [0.27, 1.00]);
/**
 * @hidden
 */
const LEAVE_CURVE = new Bazier([0.75, 0.00], [0.81, 0.12]);

/**
 * @hidden
 */
const DEFAULT_OPTIONS: IOptions = {
  canvas: null,
  gltf: '',
  tabList: null,
  lockFrame: false,
  startAlpha: 0.03,
  useGyroscope: true,
  intervalPerCreating: 200,
  forceCompressTexture: false,
  preRotation: new Sein.Quaternion().rotateY(-90 / 180 * Math.PI),
  nextRotation: new Sein.Quaternion().rotateY(90 / 180 * Math.PI),
  enter: {
    duration: 300,
    ease: t => ENTER_CURVE.eval(t)
  },
  leave: {
    duration: 300,
    ease: t => LEAVE_CURVE.eval(t)
  },
  mars: {
    RUNTIME: null,
    vfx: '',
    bgName: '',
    preTransName: '',
    nextTransName: ''
  }
};

/**
 * @hidden
 */
export default class GameState extends Sein.StateActor {
  public options: IOptions;

  public init(options: IOptions) {
    Object.keys(DEFAULT_OPTIONS).forEach(key => {
      if (key === 'enter' || key === 'leave') {
        options[key] = Object.assign({}, DEFAULT_OPTIONS[key], options[key] || {});
      } else {
        options[key] = options[key] !== undefined ? options[key] : DEFAULT_OPTIONS[key];
      }
    });

    this.options = options;
    console.log(options)
  }
}
