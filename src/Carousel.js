import { Component } from "react";

class Carousel extends Component {
  state = { active: 0 };
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    const handleIndexClick = (event) => {
      this.setState({
        active: +event.target.dataset.index
      });
    }

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((image, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <img
              alt="animal thumbnail"
              key={image}
              src={image}
              data-index={index}
              className={index === active ? "active" : ""}
              onClick={handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
