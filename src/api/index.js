const rapidapiHost = 'omgvamp-hearthstone-v1.p.rapidapi.com';
const rapidapiKey = 'ad19c34cc9msh781c297aac24bb4p155dd2jsnf75d4c846f35';

class API {
  constructor(host, key) {
    this.fetch = async path => {
      let result = {error: null, json: null};
      try {
        const res = await fetch(`https://${host}/${path}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': host,
            'x-rapidapi-key': key,
          },
        });

        if (!res.ok) {
          throw new Error(res.status);
        }

        result.json = await res.json();
      } catch (e) {
        if (e.message === 'Network request failed') {
          result.error =
            'A network error occured. Please check your connection';
        } else if (e.message === '404') {
          result.error = 'There is no result.';
        } else {
          result.error = 'An error occured. Please try again.';
        }
      } finally {
        return result;
      }
    };
  }

  findCards() {
    return this.fetch('cards');
  }

  searchCards(name) {
    return this.fetch(`cards/search/${name}`);
  }
}

export default new API(rapidapiHost, rapidapiKey);
