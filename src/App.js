import React from 'react';
// import { moviesData } from './moviesData';
import MovieItem from './components/movieItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import {API_URL, API_KEY_3} from "./untils/api";
import MovieTabs from "./components/movieTabs";


class App extends  React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "vote_average.desc"
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data);
      this.setState({
        movies: data.results
      })
    })
  }

  deleteMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    });
    // this.state.movies = updateMovies;
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  }

  render() {
    return (
        <div className="container pt-4">
          <div className="row">
            <div className="col-9">
              <div className="row pb-4">
                <div className="col-12">
                  <MovieTabs
                      sort_by={this.state.sort_by}
                      updateSortBy={this.updateSortBy} />
                </div>
              </div>
              <div className="row">
                {this.state.movies.map(movie => {
                  return (
                    <div className="col-6 mb-4" key={movie.id}>
                      <MovieItem
                          movie={movie}
                          deleteMovie={this.deleteMovie}
                          addMovieToWillWatch={this.addMovieToWillWatch}
                          deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-3">
              <p>Will Watch: {this.state.moviesWillWatch.length}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
