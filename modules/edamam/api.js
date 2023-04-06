//ENVIRONMENT variables can be accessed with process.env.<environment_variable>
// ie: process.env._________

async function getSearchedRecipes(input) {
    const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input + "&app_id=" + process.env.EDAMAM_API_KEY);
    const data = await response.json();
    const hits = data.hits;
    return hits
}

async function getVideos(dish) {
    const response = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&key="+ process.env.YOUTUBE_API_KEY + "&type=video&q=" + dish);
    const data = await response.json();
    const items = data.items;
    return items
}

//EXPORT any functions to be used outside this file
module.exports = {
    getSearchedRecipes,
    getVideos,
};
