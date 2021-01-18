export const fetchMovies = async (term: any) => {
    const request = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=c00e4098`);
    const response = await request.json();
    return {
        type: 'FETCH_MOVIES',
        payload: response
    }
}