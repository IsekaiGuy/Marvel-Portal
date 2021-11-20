import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import marvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charList.scss";

const CharList = ({ onCharSelected }) => {
  const refsArr = useRef([]);

  // STATES
  const [charlist, setCharlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1540);
  const [charEnded, setCharEnded] = useState(false);

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setNewItemLoading(true);
      window.removeEventListener("scroll", onScroll);
    }
    if (charEnded) return window.removeEventListener("scroll", onScroll);
  };

  useEffect(() => {
    onRequest();
  }, []);

  useEffect(() => {
    if (offset >= 219) window.addEventListener("scroll", onScroll);
    else return;
  }, [offset]);

  useEffect(() => {
    if (newItemLoading) {
      setNewItemLoading(false);
      onRequest(offset);
    }
  }, [newItemLoading]);

  const focusElement = (index) => {
    refsArr.current.forEach((el) => el.classList.remove("char__item_selected"));
    refsArr.current[index].focus();
  };

  const onRequest = (offset) => {
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharlist((charlist) => [...charlist, ...newCharList]);
    setLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const renderItems = (arr) => {
    if (arr.length >= 9) {
      return arr.map((item, index) => {
        let cover = { objectFit: "cover" };
        if (
          item.thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ) {
          cover = { objectFit: "unset" };
        }
        return (
          <li
            ref={(el) => (refsArr.current[index] = el)}
            tabIndex={0}
            key={item.id}
            className="char__item"
            onClick={() => {
              onCharSelected(item.id);
              focusElement(index);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onCharSelected(item.id);
                focusElement(index);
              }
            }}
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

  const errorMessage = error ? (
    <li className="char__item" style={{ gridColumnStart: 2, height: 200 }}>
      <ErrorMessage />
    </li>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content =
    !loading && !error && charlist.length > 8 ? (
      renderItems(charlist)
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
        disabled={newItemLoading}
        className="button button__main button__long"
      >
        <div className="inner">{error ? "ERROR" : "load more"}</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
