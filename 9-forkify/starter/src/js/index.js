import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base';

// global state of the app
// * Search object 
// * current recipe object
// * shopping list object
// * linked recipes

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search =  new Search(query);
        
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            await state.search.getResults();
            console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Just for testing
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchRes.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});



const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        state.recipe = new Recipe(id);

        // for testing expose recipe to global window
        // window.r = state.recipe;

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcServings();
            state.recipe.calcTime();

            console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }
        
       
    }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
