/**
 * @File   : utils.ts
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : 2020/2/27 上午11:29:07
 * @Description:
 */
import * as Sein from 'seinjs';

/**
 * @hidden
 */
export function checkCompressTexture(options: {game: Sein.Game}): boolean {
  const {renderer} = options.game;
  renderer.initContext();

  const {gl} = renderer;
  const supports = {};

  let supported = false;
  ['WEBGL_compressed_texture_pvrtc', 'WEBGL_compressed_texture_astc'].forEach(ext => {
    supports[ext] = gl.getExtension(ext) || gl.getExtension(`WEBKIT_${ext}`);
    supported = supported || supports[ext];
  });

  return supported;
}
