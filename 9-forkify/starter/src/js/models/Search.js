import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const apiKey = '22432da2a6d7239dae83500fdf6a2655';
        try {
            const result = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = result.data.recipes;
        } catch(error) {
            alert(error);
        }
    }
}
