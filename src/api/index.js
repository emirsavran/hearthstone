const rapidapiHost = 'omgvamp-hearthstone-v1.p.rapidapi.com';
const rapidapiKey = 'ad19c34cc9msh781c297aac24bb4p155dd2jsnf75d4c846f35';

class API {
  constructor(host, key) {
    this.fetch = path => {
      return fetch(`https://${host}/${path}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key,
        },
      });
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
