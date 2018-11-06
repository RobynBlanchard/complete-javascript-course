import axios from 'axios';

async function getResults(query) {
    const apiKey = '22432da2a6d7239dae83500fdf6a2655';
    const result = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${query}`);
    console.log(result);
}

getResults('pasta');
