import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import Button from '../ui/button/Button';
import Toggler from '../ui/toggler/Toggler';
import { Mode } from '../../types';
// import { Icon } from './ui/Icon';

/**
 * table-flow-graph toolbar
 */
export default class Toolbar {
  public element: HTMLElement;
  public graphInstance: TableFlowGraph;
  public disabledMask: HTMLElement;

  constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('div', 'tfgraph-toolbar', parentElement);
    new Toggler(this.element, {
      items: [
        { label: this.graphInstance.options.labels.editMode, id: 'edit' },
        { label: this.graphInstance.options.labels.previewMode, id: 'preview' },
      ],
      onChange: (item) => {
        graphInstance.changeMode(item.id as Mode);
      },
    });
    // new Icon(this.element, {
    //   name: 'plus',
    //   style: { width: '16px', height: '16px' },
    // });
    const rightBtns = createClassElement('div', 'flex-row items-center', this.element);
    new Button(rightBtns, {
      icon: 'plus',
      label: this.graphInstance.options.labels.addColumn,
      type: 'primary',
      onClick: () => this.addColumn(this.graphInstance),
    });

    this.disabledMask = createClassElement('div', 'tfgraph-toolbar-mask hidden', this.element);
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

  disable() {
    this.disabledMask.classList.remove('hidden');
  }

  enable() {
    this.disabledMask.classList.add('hidden');
  }
}
