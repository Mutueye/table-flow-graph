import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
// import Button from './ui/Button';
import Toggler from './ui/Toggler';
import { Mode } from '../types';

/**
 * table-flow-graph toolbar
 */
export default class Toolbar {
  public element: HTMLElement;
  public graphInstance: TableFlowGraph;

  constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
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
    // const rightBtns = createClassElement('div', 'flex-row items-center', this.element);
    // new Button(rightBtns, {
    //   label: '添加列',
    //   type: 'primary',
    //   className: 'mr-10',
    //   onClick: () => this.addColumn(this.graphInstance),
    // });
    // new Button(rightBtns, { label: '添加行', type: 'primary' });

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

  addColumn(graphInstance) {
    if (typeof graphInstance.options.onAddColumn === 'function') {
      graphInstance.options.onAddColumn();
    }
  }
}
