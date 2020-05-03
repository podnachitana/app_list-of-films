import React from 'react';

class MovieItem extends React.Component {
    constructor() {
        super();

        this.state = {
            willWatch: false
        };
    }
    render() {
        const { movie, deleteMovie, addMovieToWillWatch, deleteMovieFromWillWatch } = this.props;
        return (
            <div className="card">
                <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {movie.vote_average}</p>
                        {this.state.willWatch === true ? (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.setState({
                                        willWatch:false
                                    });
                                    deleteMovieFromWillWatch(movie);
                                }}
                            >
                                Remove Will Watch
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.setState({
                                        willWatch:true
                                    });
                                    addMovieToWillWatch(movie);
                                }}
                            >
                                Add Will Watch
                            </button>
                        )}
                    </div>
                    <button onClick={()=>{deleteMovie(movie)}}>
                        Delete movie
                    </button>
                </div>
            </div>
        );
    }
}

export default MovieItem;