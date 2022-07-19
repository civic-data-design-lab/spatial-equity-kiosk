import Carousel from 'react-bootstrap/Carousel';


function HomeCarousel() {

    return (
        <Carousel className={"flex-grow-1"} interval={null} controls={false}>
      <Carousel.Item>
          <div className={"w-100 h-100 d-flex flex-column justify-content-center align-items-center"}>
            placeholder text
        </div>

      </Carousel.Item>
      <Carousel.Item>
        <div className={"w-100 h-100 d-flex flex-column justify-content-center align-items-center"}>
            placeholder text
        </div>


      </Carousel.Item>
      <Carousel.Item>
          <div className={"w-100 h-100 d-flex flex-column justify-content-center align-items-center"}>
            placeholder text
          </div>


      </Carousel.Item>
    </Carousel>

    )

}

export default HomeCarousel