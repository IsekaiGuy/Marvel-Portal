import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charList.scss";

const setContent = (condition, Component, newItemLoading) => {
  switch (condition) {
    case "waiting":
      return <Spinner />;

    case "error":
      return <ErrorMessage />;

    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;

    case "confirmed":
      return <Component />;

    default:
      throw new Error("Unexpected proccess state");
  }
};

const CharList = ({ onCharSelected }) => {
  const [charlist, setCharlist] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, condition, setCondition } = useMarvelService();
  const refsArr = useRef([]);

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setNewItemLoading(true);
      window.removeEventListener("scroll", onScroll);
    }
    if (charEnded) return window.removeEventListener("scroll", onScroll);
  };

  useEffect(() => {
    onRequest();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (offset >= 219) window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    //eslint-disable-next-line
  }, [offset]);

  useEffect(() => {
    if (newItemLoading) {
      onRequest(offset);
    }
    //eslint-disable-next-line
  }, [newItemLoading]);

  const focusElement = (index) => {
    refsArr.current.forEach((el) => el.classList.remove("char__item_selected"));
    refsArr.current[index].focus();
  };

  const onRequest = (offset) => {
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setCondition("confirmed"))
      .then(() => window.scrollTo(0, window.scrollY - 100));
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharlist((charlist) => [...charlist, ...newCharList]);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
    setNewItemLoading(false);
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
        <li
          key={index}
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
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const memoizedContent = useMemo(() => {
    return setContent(condition, () => renderItems(charlist), newItemLoading);
    //eslint-disable-next-line
  }, [condition]);

  return (
    <div className="char__list">
      {memoizedContent}

      <button
        style={charEnded ? { display: "none" } : { display: "block" }}
        disabled={newItemLoading}
        className="button button__main button__long"
      >
        <div className="inner">
          {condition === "error" ? "ERROR" : "load more"}
        </div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
