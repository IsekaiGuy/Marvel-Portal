import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

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

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const { getComics, condition, setCondition } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    //eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getComics(offset)
      .then(onComicsLoaded)
      .then(() => setCondition("confirmed"));
  };

  const onComicsLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffset((offset) => offset + 8);
    setNewItemLoading(false);
  };

  const renderComics = () => {
    if (!comicsList) return;
    return comicsList.map((comics, index) => {
      return (
        <li className="comics__item" key={index} tabIndex={-1}>
          <Link to={`/comics/${comics.id}`} tabIndex={0}>
            <img
              src={comics.image}
              alt={comics.name}
              className="comics__item-img"
            />
            <div className="comics__item-name">{comics.name}</div>
            <div className="comics__item-price">{comics.price}</div>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="comics__list">
      <ul
        className="comics__grid"
        style={
          (condition === "loading" || condition === "error") &&
          comicsList.length < 1
            ? { display: "flex", justifyContent: "center" }
            : null
        }
      >
        {setContent(condition, () => renderComics(), newItemLoading)}
      </ul>
      <button
        disabled={condition === "loading" ? true : false}
        style={
          condition === "error" ? { display: "none" } : { display: "block" }
        }
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
