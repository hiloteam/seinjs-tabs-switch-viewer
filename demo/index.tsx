/**
 * @File   : index.tsx
 * @Author : dtysky(dtysky@outlook.com)
 * @Date   : Wed Feb 26 2020
 * @Description: Component.
 */
import * as Sein from 'seinjs';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as SeinMars from '@alipay/seinjs-mars';

if (!window['Sein']) {
  window['Sein'] = Sein;
}

import TabSwitchViewer from '../src';
import './base.scss';

class Demo extends React.Component {
  private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  private viewer: TabSwitchViewer;
  private switching: boolean = true;

  public async componentDidMount() {
    this.canvas.current.style.opacity = '0.04';
    this.viewer = new TabSwitchViewer();
    await this.viewer.init({
      useGyroscope: false,
      canvas: this.canvas.current,
      gltf: require('./assets/gltfs/main.gltf'),
      tabList: ['miku', 'pig', 'bird'],
      leave: {
        duration: 500
      },
      enter: {
        duration: 500
      },
      mars: {
        RUNTIME: SeinMars,
        vfx: 'https://gw.alipayobjects.com/os/gltf-asset/mars-e/AXOIWMMTTMUM/sakura.vfx-163d9.json',
        bgName: 'sakura'
      }
    });
    await this.viewer.start('miku');
    this.canvas.current.style.opacity = '1';

    this.switching = false;
  }

  private async handleSwitch(tab: string) {
    if (this.switching) {
      return;
    }

    this.switching = true;
    await this.viewer.switchTab(tab);
    this.switching = false;
  }

  public render() {
    return (
      <React.Fragment>
        <canvas ref={this.canvas} className={'game'} />
        <div className={'tabs'}>
          <div onClick={() => this.handleSwitch('miku')}>Miku</div>
          <div onClick={() => this.handleSwitch('pig')}>Pig</div>
          <div onClick={() => this.handleSwitch('bird')}>Bird</div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDom.render(
  <Demo />,
  document.getElementById('container')
);
