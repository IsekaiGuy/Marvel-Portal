import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [charLoaded, setCharLoaded] = useState(false);

  const { condition, setCondition, getCharacter, clearError } =
    useMarvelService();

  useEffect(() => {
    updateChar();
    //eslint-disable-next-line
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    setCharLoaded(true);
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setCondition("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(condition, View, char)}
      <CSSTransition
        in={charLoaded}
        timeout={800}
        classNames="randomchar__static"
        mountOnEnter
      >
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
      </CSSTransition>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  const validatedDescription =
    description && description.length > 200
      ? description.slice(0, 200) + "(...)"
      : description;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{validatedDescription}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
