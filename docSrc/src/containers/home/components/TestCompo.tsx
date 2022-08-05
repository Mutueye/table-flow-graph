// import Button from 'react-bootstrap/Button';

type Props = {
  title: string;
};

function TestCompo(prop: Props) {
  // const handleClick = () => {
  //   console.log('clicked:::::::::');
  // };

  return <div className="text-size-16px font-bold">{prop.title ? prop.title : ''}</div>;
  // return (
  //   <Button variant="primary" onClick={handleClick}>
  //     {prop.title}
  //   </Button>
  // );
}

export default TestCompo;
