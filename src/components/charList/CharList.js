import { Component } from "react";
import marvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charList.scss";

class CharList extends Component {
  state = {
    charlist: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.onCharListLoaded(
      marvelService
        .getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    );
  }

  onCharListLoaded = (charlist) => {
    this.setState({ charlist, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  renderItems = (arr) => {
    if (arr.length === 9) {
      return arr.map((item) => {
        return (
          <li key={item.name} className="char__item">
            <img src={item.thumbnail} alt="abyss" />
            <div className="char__name">{item.name}</div>
          </li>
        );
      });
    } else {
      return;
    }
  };

  render() {
    const { charlist, loading, error } = this.state;
    const errorMessage = error ? (
      <li className="char__item" style={{ gridColumnStart: 2, height: 200 }}>
        <ErrorMessage />
      </li>
    ) : null;
    const spinner = loading || charlist.length < 9 ? <Spinner /> : null;
    const content = !loading || !error ? this.renderItems(charlist) : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">{error ? "ERROR" : "load more"}</div>
        </button>
      </div>
    );
  }
}

export default CharList;
