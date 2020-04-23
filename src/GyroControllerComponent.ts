/**
 * @File   : GyroController.js
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/3/02 下午1:00:00
 * @Description:
 */
import * as Sein from 'seinjs';

/**
 * @hidden
 */
const ORIEN_RAGNE = Math.PI / 180 * 15;
/**
 * @hidden
 */
const LEFT_QUAT = new Sein.Quaternion().rotateY(-ORIEN_RAGNE);
/**
 * @hidden
 */
const RIGHT_QUAT = new Sein.Quaternion().rotateY(ORIEN_RAGNE);
/**
 * @hidden
 */
const STEP_FACTOR = 0.006;
/**
 * @hidden
 */
const MAX_DELTA = 0.04;
/**
 * @hidden
 */
let tmpY = 0;
/**
 * @hidden
 */
const tmpEuler = new Sein.Euler();
/**
 * @hidden
 */
const tmpQuat = new Sein.Quaternion();

/**
 * @hidden
 */
function deg2Rad(deg) {
  return deg / 180 * Math.PI;
}

/**
 * @hidden
 */
export default class GyroControllerComponent extends Sein.Component {
  public forceDisable = false;
  private enabled = false;
  private lpfFactor = 0.5;
  private preRealZ = null;
  private preZ = null;
  private damp = 0.9;
  private requestDelta = 0;

  onAdd() {
    this._event.register('Rotation');
  }

  enable() {
    if (this.enabled || this.forceDisable) {
      return;
    }

    this.preZ = null;
    this.preRealZ = null;

    this.enabled = true;
    this.requestDelta = 0;
    window.addEventListener('deviceorientation', this.handler);
  }

  disable() {
    window.removeEventListener('deviceorientation', this.handler);
    this.requestDelta = 0;
    this.enabled = false;
  }

  handler = (event) => {
    const { alpha, beta, gamma } = event;

    (tmpEuler as any).set(deg2Rad(alpha), deg2Rad(beta), -deg2Rad(gamma), 'YXZ');
    tmpQuat.fromEuler(tmpEuler);
    tmpEuler.fromQuat(tmpQuat);
    const currentZ = (tmpEuler as any).degZ;
    const preRealZ = this.preRealZ;
    this.preRealZ = currentZ;

    if (this.preZ === null) {
      this.preZ = currentZ;
      this.preRealZ = currentZ;
      return;
    }

    const zDiff = Math.abs(preRealZ - currentZ);
    if (preRealZ * currentZ < 0 && zDiff > 340) {
      this.preZ = currentZ;
      return;
    }

    const finalZ = this.lpfFactor * currentZ + (1 - this.lpfFactor) * this.preZ;

    const diff = finalZ - this.preZ;
    let delta = diff * STEP_FACTOR;
    delta = delta > MAX_DELTA ? MAX_DELTA : delta;

    this.preZ = finalZ;

    if (Math.abs(this.requestDelta) < Math.abs(delta)) {
      this.requestDelta = delta;
    }
  }

  onUpdate() {
    if (!this.enabled || Math.abs(this.requestDelta) < 0.001) {
      return;
    }

    tmpY += this.requestDelta;
    let forceQuat = null;
    if (tmpY <= -ORIEN_RAGNE) {
      forceQuat = LEFT_QUAT;
      this.requestDelta = 0;
      tmpY = -ORIEN_RAGNE;
    } else if (tmpY >= ORIEN_RAGNE) {
      forceQuat = RIGHT_QUAT;
      this.requestDelta = 0;
      tmpY = ORIEN_RAGNE;
    }

    this._event.trigger('Rotation', { rotation: this.requestDelta, forceQuat });

    this.requestDelta *= this.damp;
  }

  onDestroy() {
    this.disable();
  }
}
