import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id).then(onCharLoaded);
  };

  const spinner = loading ? <Spinner /> : null;
  const content = !loading ? <View char={char} error={error} /> : null;

  return (
    <div className="randomchar">
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char, error }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const validatedDescription =
    description && description.length > 200
      ? description.slice(0, 200) + "(...)"
      : description;

  return (
    <div className="randomchar__block">
      {error ? (
        <ErrorMessage />
      ) : (
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
      )}
      <div className="randomchar__info">
        <p className="randomchar__name">{error ? "ERROR" : name}</p>
        <p className="randomchar__descr">
          {error
            ? "Sorry, got an error, please, try again"
            : validatedDescription}
        </p>
        <div className="randomchar__btns">
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
