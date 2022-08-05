
import Carousel from 'react-bootstrap/Carousel';


function Slider({children}) {
    console.log("print children ", children)

    return (
        <Carousel className={"flex-grow-1"} interval={null} controls={false}>
            {children.map((child)=>{
                return <Carousel.Item>
                    {child}
                </Carousel.Item>
            })}
        </Carousel>

    )

}

export default Slider