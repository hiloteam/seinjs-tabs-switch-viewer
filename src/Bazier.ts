/**
 * @File   : Constants.ts
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/3/02 下午1:00:00
 * @Description:
 */
/**
 * @hidden
 */
const p1 = [0, 0];
/**
 * @hidden
 */
const p4 = [1, 1];

/**
 * @hidden
 */
function bezier4(p2: number[], p3: number[], t: number) {
  return [
    [p1[0], p2[0], p3[0], p4[0]],
    [p1[1], p2[1], p3[1], p4[1]]
  ].map(p =>
    p[0] * (Math.pow((1 - t), 3))
      + 3 * p[1] * t * (Math.pow((1 - t), 2))
      + 3 * p[2] * Math.pow(t, 2) * (1 - t)
      + p[3] * Math.pow(t, 3)
  );
}

/**
 * 贝塞尔曲线插值器生成。
 */
export default class Bazier {
  private ys: number[] = [];

  /**
   * 构造函数。
   * 
   * @param p2 控制点1
   * @param p3 控制点2
   * @param step 单步步长
   */
  constructor(
    p2: number[],
    p3: number[],
    step: number = 0.01
  ) {
    for (let index = 0; index < 1; index += step) {
      const p = bezier4(p2, p3, index);
      const xs = ~~(p[0] * 100);
      this.ys[xs] = ~~(p[1] * 100);
    }

    let pre = 0;
    for (let index = 0; index < 100; index += 1) {
      this.ys[index] = this.ys[index] || pre;
      pre = this.ys[index];
    }
  }

  /**
   * 求值方法。
   * 
   * @param t 进度, 0 ~ 1
   */
  public eval(t: number) {
    const x = ~~(t * 99);
    const y = this.ys[x];

    return y / 100;
  }
}
