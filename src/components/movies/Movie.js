import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../shows/Show.css";

import ErrorMessage from "../errors/ErrorMessage";
import { destroyObject, getOneObject } from "../../api/fetch";

function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getOneObject('movies', id).then(response => {
      setMovie(response)
      setLoadingError(false)
    })
    .catch(error => {
      setLoadingError(true)
    })
  }, [])

  function handleDelete(id) {
    destroyObject('movies', id)
  }

  return (
    <section className="shows-show-wrapper">
      <h2>{movie.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => {
                handleDelete(movie.id)
                window.location.reload()
              }}>
                Remove show
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Movie;
