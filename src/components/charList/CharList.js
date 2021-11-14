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
    const { charlist, loading, error } = this.state;
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
        <button className="button button__main button__long">
          <div className="inner">{error ? "ERROR" : "load more"}</div>
        </button>
      </div>
    );
  }
}

export default CharList;
