import SvgGrid from 'src/assets/images/feature-grid.svg';
import SvgCustomize from 'src/assets/images/feature-customizable.svg';
import SvgMovable from 'src/assets/images/feature-movable.svg';
import SvgTs from 'src/assets/images/feature-ts.svg';

export type FeatureIconName = 'Customizable' | 'Movable' | 'Grid' | 'Ts';

type Props = {
  iconName: FeatureIconName;
  label: string;
};

const FeatureNode = (props: Props) => {
  const { iconName, label } = props;

  let svgSrc = SvgGrid;
  switch (iconName) {
    case 'Customizable':
      svgSrc = SvgCustomize;
      break;
    case 'Grid':
      svgSrc = SvgGrid;
      break;
    case 'Movable':
      svgSrc = SvgMovable;
      break;
    case 'Ts':
      svgSrc = SvgTs;
      break;
    default:
      break;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={svgSrc} className="w-3/4 h-3/4" />
      {label ? (
        <div className="text-size-13px text-gray-600 text-center mt-10px">{label}</div>
      ) : null}
    </div>
  );
};

export default FeatureNode;
