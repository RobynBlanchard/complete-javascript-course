import { elements } from './base';

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => console.log(recipe);

export const renderResults = recipes => {
    recipes.forEach(element => {
        renderRecipe(element);
    });
}