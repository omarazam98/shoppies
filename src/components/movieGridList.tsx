import React from "react";
import {connect} from "react-redux";
import {GridList, GridListTile, GridListTileBar, AppBar, Toolbar, Typography, Paper} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {fetchMovies} from '../actions/movieActions'

const MovieGridList = (props : any) => {
    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar style={{display: "block", backgroundColor: "#669933"}}>
                    <Typography variant="h3" noWrap>
                        The Shoppies
                    </Typography>
                </Toolbar>
            </AppBar>
            <TextField
                label="Search"
                placeholder="Movie name"
                variant = "filled"
                fullWidth
                onChange={(event => {
                    props.searchMovies(event.target.value)
                })}
            />
            <GridList cellHeight={160} cols={4}>
            {props.movies.map((movie : any) => (
                <GridListTile key={movie.imdbID}>
                    {console.log(movie.Poster)}
                    {movie.Poster !== "N/A" ?
                        <img src={movie.Poster}/> :
                        <img src={'https://cdn.shopify.com/assets/images/logos/shopify-bag.png'}/>
                    }
                    <GridListTileBar title={movie.Title}/>
                </GridListTile>
            ))}
            </GridList>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { movies: state.movies };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchMovies: (term : any) => {fetchMovies(term).then((action => dispatch(action)))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieGridList);