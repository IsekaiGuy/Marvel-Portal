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
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharlistLoading();
    marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharlistLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ charlist, offset }) => ({
      charlist: [...charlist, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  renderItems = (arr) => {
    if (arr.length >= 9) {
      return arr.map((item) => {
        let cover = { objectFit: "cover" };
        if (
          item.thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ) {
          cover = { objectFit: "unset" };
        }
        return (
          <li
            key={item.id}
            className="char__item"
            onClick={() => this.props.onCharSelected(item.id)}
          >
            <img style={cover} src={item.thumbnail} alt={item.name} />
            <div className="char__name">{item.name}</div>
          </li>
        );
      });
    } else {
      return;
    }
  };

  render() {
    const { charlist, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const errorMessage = error ? (
      <li className="char__item" style={{ gridColumnStart: 2, height: 200 }}>
        <ErrorMessage />
      </li>
    ) : null;
    const spinner = loading ? <Spinner /> : null;
    const content =
      !loading && !error && charlist.length > 8 ? (
        this.renderItems(charlist)
      ) : (
        <Spinner />
      );

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          style={charEnded ? { display: "none" } : { display: "block" }}
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          className="button button__main button__long"
        >
          <div className="inner">{error ? "ERROR" : "load more"}</div>
        </button>
      </div>
    );
  }
}

export default CharList;
