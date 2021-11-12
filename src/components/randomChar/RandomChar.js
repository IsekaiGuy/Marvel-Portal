import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

class RandomChar extends Component {
  marvelService = new MarvelService();

  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { loading, char, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content =
      !loading || !error ? <View char={char} error={error} /> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char, error }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const errorMargin = error ? { marginLeft: 30 } : { marginLeft: "inherit" };

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p style={errorMargin} className="randomchar__name">
          {error ? "ERROR" : name}
        </p>
        <p style={errorMargin} className="randomchar__descr">
          {error ? "Please, reload the page" : description}
        </p>
        <div style={errorMargin} className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">{error ? "error" : "homepage"}</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">{error ? "error" : "Wiki"}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
