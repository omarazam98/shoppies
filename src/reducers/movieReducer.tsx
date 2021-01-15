import {fetchMovies} from '../actions/movieActions'

const movieReducer = (state = [], action: any) => {
    if (action.type === 'FETCH_MOVIES') {
        if(action.payload.Search){
            return action.payload.Search
        }
    }

    return state;
}

export default movieReducer;