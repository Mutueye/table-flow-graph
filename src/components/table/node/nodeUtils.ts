import { NodeStyleType, NodeType } from '../../..';
import { ColorPlate, FunctionalColors } from '../../../lib/utils';

export const NodeTypeList: NodeType[] = [
  'default',
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
      borderColor: '#999999',
      backgroundColor: '#FFFFFF',
      color: '#999999',
    },
    hoverStyle: {
      borderColor: '#aaaaaa',
      backgroundColor: '#aaaaaa',
      color: '#333333',
    },
  },
  primary: {
    type: 'primary',
    normalStyle: {
      borderColor: FunctionalColors.primary,
      backgroundColor: '#E8F3FF',
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
      backgroundColor: '#ECE9E9',
      color: FunctionalColors.info,
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
      backgroundColor: '#FFF2DE',
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
