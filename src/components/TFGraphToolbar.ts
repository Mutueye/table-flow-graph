import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
// import Button from './ui/Button';
import Toggler from './ui/Toggler';
import { Mode } from '../types';

/**
 * table-flow-graph toolbar
 */
export default class TFGraphToolbar {
  public element: HTMLElement;

  constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph) {
    this.element = createClassElement('div', 'tfgraph-toolbar', parentElement);
    new Toggler(this.element, {
      items: [
        { label: '编辑模式', id: 'edit' },
        { label: '预览模式', id: 'preview' },
      ],
      onChange: (item) => {
        graphInstance.changeMode(item.id as Mode);
      },
    });
    // new Button(this.element, { label: 'default' });
    // new Button(this.element, {
    //   label: 'clean',
    //   type: 'clean',
    //   onClick: () => {
    //     console.log('clean clicked');
    //   },
    // });
    // new Button(this.element, { label: 'primary', type: 'primary' });
    // new Button(this.element, { label: 'warning', type: 'warning' });
    // new Button(this.element, { label: 'danger', type: 'danger' });
    // new Button(this.element, { label: 'success', type: 'success' });
    // testBtn.setDisabled();
  }
}
