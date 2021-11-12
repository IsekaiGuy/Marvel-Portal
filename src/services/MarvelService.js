class MarvelService {
  #apiBase = "https://gateway.marvel.com:443/v1/public/";
  #apiKey = "apikey=f730f3724ec0309e4fe9a277dbe9d532";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`
    );
  };

  getCharacter = (id) => {
    return this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`);
  };
}

export default MarvelService;
