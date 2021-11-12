class MarvelService {
  #apiBase = "https://gateway.marvel.com:443/v1/public/";
  #apiKey = "apikey=f730f3724ec0309e4fe9a277dbe9d532";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this.#apiBase}characters/${id}?${this.#apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description:
        char.description.length > 30
          ? char.description.slice(0, 30) + "(...)"
          : char.description || "Description unavaliable",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
