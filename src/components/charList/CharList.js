import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charList.scss";

const CharList = ({ onCharSelected }) => {
  const refsArr = useRef([]);
  const { loading, error, getAllCharacters } = useMarvelService();

  // STATES
  const [charlist, setCharlist] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
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
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharlist((charlist) => [...charlist, ...newCharList]);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
    if (loading) return;
  };

  const renderItems = (arr) => {
    const items = arr.map((item, index) => {
      let cover = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        cover = { objectFit: "unset" };
      }

      return (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="char__item"
          mountOnEnter
          unmountOnExit
        >
          <li
            ref={(el) => (refsArr.current[index] = el)}
            tabIndex={0}
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
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  const errorMessage = error ? (
    <li className="char__item" style={{ gridColumnStart: 2, height: 200 }}>
      <ErrorMessage />
    </li>
  ) : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const items = renderItems(charlist);

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}

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
