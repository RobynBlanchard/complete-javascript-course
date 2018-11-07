import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        try {
            const result = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = result.data.recipes;

        } catch(error) {
            alert(error);
        }
    }
}
