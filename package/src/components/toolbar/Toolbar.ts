import { TableFlowGraph, Mode } from '../../index';
import { createClassElement } from '../../lib/dom';
import Button from '../ui/button/Button';
import Toggler from '../ui/toggler/Toggler';
import EditColumnDialog from '../table/EditColumnDialog';
import HintManager from './HintManager';
// import { Icon } from './ui/Icon';

/**
 * table-flow-graph toolbar
 */
export default class Toolbar {
  public element: HTMLElement;
  public graphInstance: TableFlowGraph;
  public disabledMask: HTMLElement;
  public modeToggler: Toggler;
  public hintEl: HTMLElement;
  public hintMgr: HintManager;
  public newColumnBtn: Button;
  public addColDialog: EditColumnDialog;

  constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('div', 'tfgraph-toolbar', parentElement);
    this.modeToggler = new Toggler(this.element, {
      items: [
        { label: this.graphInstance.options.labels.editMode, id: 'edit' },
        { label: this.graphInstance.options.labels.previewMode, id: 'preview' },
      ],
      onChange: (item) => {
        graphInstance.changeMode(item.id as Mode);
        this.setToolbarState();
      },
    });
    this.hintEl = createClassElement('div', 'tfgraph-toolbar-hint', this.element);
    this.hintMgr = new HintManager(this.hintEl, this.graphInstance);
    // new Icon(this.element, {
    //   name: 'plus',
    //   style: { width: '16px', height: '16px' },
    // });
    const rightBtns = createClassElement('div', 'flex-row items-center', this.element);
    this.newColumnBtn = new Button(rightBtns, {
      icon: 'plus',
      label: this.graphInstance.options.labels.addColumn,
      type: 'primary',
      onClick: () => this.addColumn(),
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
    this.setToolbarState();
    this.addColDialog = new EditColumnDialog(this.graphInstance);
  }

  addColumn() {
    if (typeof this.graphInstance.options.addColumn === 'function') {
      this.graphInstance.options.addColumn();
    } else {
      if (this.graphInstance.hasTableHeader) {
        // add column dialog
        this.addColDialog.show();
      } else {
        this.graphInstance.refresh(
          Object.assign({}, this.graphInstance.options, {
            columns: null,
            totalColumns: this.graphInstance.options.totalColumns + 1,
          }),
        );
        if (typeof this.graphInstance.options.onAddColumn === 'function') {
          this.graphInstance.options.onAddColumn();
        }
      }
    }
  }

  disable() {
    this.disabledMask.classList.remove('hidden');
  }

  enable() {
    this.disabledMask.classList.add('hidden');
  }

  setToolbarState() {
    if (
      this.graphInstance.options.totalColumns >= this.graphInstance.options.maxColumns ||
      this.graphInstance.mode === 'preview'
    ) {
      this.newColumnBtn.element.classList.add('hidden');
    } else {
      this.newColumnBtn.element.classList.remove('hidden');
    }
  }
}
