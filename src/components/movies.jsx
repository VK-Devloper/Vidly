import React, {Component} from "react";

import _, {filter} from "lodash";

import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../utils/paginate";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: 1,
    sortColumn: {path: "title", order: "asc"},
  };

  componentDidMount() {
    this.setState({movies: getMovies(), genres: getGenres()});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({movies});
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;

    this.setState({movies});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  };

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre._id, currentPage: 1});
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filterd =
      selectedGenre !== 1
        ? allMovies.filter((m) => m.genre._id === selectedGenre)
        : allMovies;

    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return {totalCount: filterd.length, data: movies};
  };

  render() {
    const {length: count} = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>There are no movies in database.</p>;

    const {totalCount, data: movies} = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onIteamSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>There are {totalCount} in database.</p>
            <MoviesTable
              sortColumn={sortColumn}
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
