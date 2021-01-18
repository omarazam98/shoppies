import React from "react";
import {connect} from "react-redux";
import {
    GridList,
    GridListTile,
    GridListTileBar,
    Box,
    IconButton,
    ListSubheader,
    Card,
    CardMedia,
    CardContent,
    Container,
    Typography,
} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {fetchMovies} from '../actions/movieActions'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const MovieGridList = (props : any) => {
    return (
        <Box display={'flex'} width={'100%'}>
            <Box width={'80%'} style={{backgroundColor: "grey", height: window.innerHeight}}>
                <TextField
                    label="The Shoppies"
                    placeholder="Search"
                    variant = "filled"
                    fullWidth
                    onChange={(event => {
                        props.searchMovies(event.target.value)
                    })}
                />
                <GridList spacing={10} cellHeight={150} cols={4}>
                    {Object.keys(props.movieList).map((movieId : any) => (
                        <GridListTile key={props.movieList[movieId].imdbID}>
                            <Card style={{backgroundColor: "gray"}}>
                            <CardContent>
                                {props.movieList[movieId].Poster !== "N/A" ?
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={props.movieList[movieId].Poster}
                                        title="Contemplative Reptile"
                                    /> :
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={'https://cdn.shopify.com/assets/images/logos/shopify-bag.png'}
                                        title="Contemplative Reptile"
                                    />
                                }
                            </CardContent>
                            </Card>
                            <GridListTileBar
                                title={props.movieList[movieId].Title}
                                subtitle={props.movieList[movieId].Year}
                                actionIcon={
                                    <IconButton aria-label={'Nominate'} color={'primary'} onClick={ () => props.nominateMovie({[movieId]: props.movieList[movieId]})}>
                                        <AddCircleIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Box>
            <Box width={'20%'} style={{backgroundColor: "darkgray", height: window.innerHeight}}>
            <Container>
            <GridList cellHeight={150} cols={1}>
                    <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                        <ListSubheader color={"primary"}>
                            <h3>
                                Nominations
                            </h3>
                        </ListSubheader>
                    </GridListTile>
                    {Object.keys(props.selectedList).map((selectedId : any) => (
                        <GridListTile key={props.selectedList[selectedId].imdbID} >
                            {console.log(props.selectedList[selectedId].Poster)}
                            {props.selectedList[selectedId].Poster !== "N/A" ?
                                <img src={props.selectedList[selectedId].Poster}/> :
                                <img src={'https://cdn.shopify.com/assets/images/logos/shopify-bag.png'}/>
                            }
                            <GridListTileBar
                                title={props.selectedList[selectedId].Title}
                                subtitle={props.selectedList[selectedId].Year}
                                actionIcon={
                                    <IconButton aria-label={'Nominate'} color={'secondary'} onClick={ () => props.removeNomination(selectedId)}>
                                        <RemoveCircleIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: any) => {
    return {
        movieList: state.movies.list,
        selectedList: state.movies.selected
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchMovies: (term : any) => {fetchMovies(term).then((action => dispatch(action)))},
        nominateMovie: (movie: any) => {dispatch({type: 'NOMINATE_MOVIE', payload: movie})},
        removeNomination: (movie: any) => {dispatch({type: 'REMOVE_NOMINATION', payload: movie})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieGridList);