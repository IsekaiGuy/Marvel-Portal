import { useHttp } from "../hooks/http.hook.js";

const useMarvelService = () => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _baseOffset = 210;

  const { request, clearError, condition, setCondition } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}charactes?limit=9&offset=${offset}&${process.env.REACT_APP_API_KEY}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(
      `${_apiBase}characters/${id}?${process.env.REACT_APP_API_KEY}`
    );
    return _transformCharacter(res.data.results[0]);
  };

  const getComic = async (id) => {
    const res = await request(
      `${_apiBase}comics/${id}?${process.env.REACT_APP_API_KEY}`
    );
    return _transformComics(res.data.results[0]);
  };

  const getComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${process.env.REACT_APP_API_KEY}`
    );

    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description || "Description unavaliable",
      pages: comics.pageCount,
      language: comics.textObjects.language || "en-us",
      image:
        comics.images.length > 0
          ? comics.images[0].path + "." + comics.images[0].extension
          : `https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg`,
      homepage: comics.urls[0].url,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description || "Description unavaliable",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getCharacterByName = async (name) => {
    if (!name) return;
    const res = await request(
      `${_apiBase}characters?nameStartsWith=${name}&${process.env.REACT_APP_API_KEY}`
    );

    return res.data.results.map(_transformCharacter);
  };

  return {
    getAllCharacters,
    getCharacter,
    clearError,
    getComics,
    getComic,
    getCharacterByName,
    condition,
    setCondition,
  };
};

export default useMarvelService;
