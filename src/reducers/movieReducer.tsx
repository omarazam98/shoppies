
let intialState = { list: [], selected: []}
if(localStorage.getItem('state') !== null){
    intialState = JSON.parse(localStorage.getItem('state') as string)
}

const movieReducer = (state = intialState, action: any) => {
    localStorage.setItem('state', JSON.stringify(state));
    console.log(localStorage.getItem('state'))
    switch (action.type){
        case 'FETCH_MOVIES' :
            if(action.payload.Search){
                const movieList = Object.assign( {}, ...action.payload.Search.map((movie: any) => ({[movie.imdbID]: movie})))
                return {...state, list: movieList}
            }
            break;
        case 'NOMINATE_MOVIE' :
            const selectedMovie = Object.assign( {}, state.selected, action.payload)
            return {
                ...state,
                selected: selectedMovie
            }
        case 'REMOVE_NOMINATION' :
            const filteredMovies = Object.assign({}, state.selected)
            delete filteredMovies[action.payload]
            return {
                ...state,
                selected: filteredMovies
            }

    }
    return state;
}

export default movieReducer;