import Carousel from 'react-bootstrap/Carousel';

function Slider({ children }) {
  return (
    <Carousel className={'flex-grow-1'} interval={null} controls={false}>
      {children.map((child, index) => {
        return <Carousel.Item key={index}>{child}</Carousel.Item>;
      })}
    </Carousel>
  );
}

export default Slider;
