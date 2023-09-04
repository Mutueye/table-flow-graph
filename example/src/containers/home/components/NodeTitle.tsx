type Props = {
  title: string;
  info: string;
};

const NodeTitle = (props: Props) => {
  const { title, info } = props;

  return (
    <div className="w-full min-w-200px flex py-20px px-15px flex-col item-center justify-center">
      <div className="text-size-24px font-bold text-gray-900 text-center">{title}</div>
      {info ? (
        <div className="text-size-14px text-gray-600 text-justify leading-20px mt-20px">{info}</div>
      ) : null}
    </div>
  );
};

export default NodeTitle;
