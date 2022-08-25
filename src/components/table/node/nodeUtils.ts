import { NodeStyleType, NodeType } from '../../..';
import { ColorPlate, FunctionalColors } from '../../../lib/utils';

export const NodeTypeList: NodeType[] = [
  'danger',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

export const NodeStyle: NodeStyleType = {
  default: {
    type: 'default',
    normalStyle: {
      borderColor: '#dcdcdc',
      backgroundColor: '#f3f4f7',
      color: '#333333',
    },
    hoverStyle: {
      borderColor: '#cccccc',
      backgroundColor: '#f1f2f4',
      color: '#333333',
    },
  },
  primary: {
    type: 'primary',
    normalStyle: {
      borderColor: FunctionalColors.primary,
      backgroundColor: FunctionalColors.primary + '10',
      color: FunctionalColors.primary,
    },
    hoverStyle: {
      borderColor: FunctionalColors.primary,
      backgroundColor: FunctionalColors.primary,
      color: ColorPlate.white,
    },
  },
  success: {
    type: 'success',
    normalStyle: {
      borderColor: FunctionalColors.success,
      backgroundColor: FunctionalColors.success + '10',
      color: FunctionalColors.success,
    },
    hoverStyle: {
      borderColor: FunctionalColors.success,
      backgroundColor: FunctionalColors.success,
      color: ColorPlate.white,
    },
  },
  info: {
    type: 'info',
    normalStyle: {
      borderColor: FunctionalColors.info,
      backgroundColor: FunctionalColors.info + '10',
      color: '#333333',
    },
    hoverStyle: {
      borderColor: FunctionalColors.info,
      backgroundColor: FunctionalColors.info,
      color: ColorPlate.white,
    },
  },
  warning: {
    type: 'warning',
    normalStyle: {
      borderColor: FunctionalColors.warning,
      backgroundColor: FunctionalColors.warning + '10',
      color: FunctionalColors.warning,
    },
    hoverStyle: {
      borderColor: FunctionalColors.warning,
      backgroundColor: FunctionalColors.warning,
      color: ColorPlate.white,
    },
  },
  danger: {
    type: 'danger',
    normalStyle: {
      borderColor: FunctionalColors.danger,
      backgroundColor: FunctionalColors.danger + '10',
      color: FunctionalColors.danger,
    },
    hoverStyle: {
      borderColor: FunctionalColors.danger,
      backgroundColor: FunctionalColors.danger,
      color: ColorPlate.white,
    },
  },
};
