import {ApolloClient, gql, InMemoryCache} from "@apollo/client";


export default class CountryData {
    _client = new ApolloClient({
        uri: 'https://countries.trevorblades.com/',
        cache: new InMemoryCache()
    });
    async getData(country){
     const info=  await this._client.query({
                query: gql`
      query GetRates {
        country(code: "${country}") {
        name
        native
        capital
        emoji
        currency
        languages{
        code
        name
            }
           }
      }
    `
            })

return info

        }
}