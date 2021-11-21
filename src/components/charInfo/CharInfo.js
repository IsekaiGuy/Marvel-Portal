import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = ({ selectedChar }) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar(selectedChar);
  }, [selectedChar]);

  const updateChar = (id) => {
    if (!id) return;
    setChar(null);

    clearError();
    getCharacter(id).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = (!loading || !error) && char ? <View char={char} /> : null;

  return (
    <aside className="char__info">
      {errorMessage}
      {spinner}
      {skeleton}
      {content}
    </aside>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = char;
  let cover = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    cover = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img style={cover} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length < 1 ? (
          <li>"No comics found"</li>
        ) : (
          comics.map((item, i) => {
            if (i > 6) return null;
            else {
              return (
                <li key={i} className="char__comics-item">
                  {item.name}
                </li>
              );
            }
          })
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
