// eslint-disable-next-line import/namespace,import/named
import { withRouter } from "react-router-dom";
import { Component } from "react";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends Component {
  state = { loading: true, name: "", animal: "", breed: "" };

  async componentDidMount() {
    const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`);
    const json = await res.json();
    this.setState(Object.assign({
      loading: false
    }, json.pets[0]));
  }

  render() {
    if (this.state.loading) {
      return (<h2>Loading</h2>);
    }
    const { animal, breed, description, city, state, name, images } = this.state;

    throw new Error("It is error")
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <button> Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailWithRouter = withRouter(Details);
export default function DetailWithError() {
  return (
    <ErrorBoundary>
      <DetailWithRouter />
    </ErrorBoundary>
  );
};
