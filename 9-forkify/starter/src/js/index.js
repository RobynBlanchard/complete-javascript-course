import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements } from './views/base';

// global state of the app
// * Search object 
// * current recipe object
// * shopping list object
// * linked recipes

const state = {};

const crtlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search =  new Search(query);
        await state.search.getResults();
        console.log(searchView.renderResults(state.search.result));
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    crtlSearch();
});