import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";
import { destroyObject, getOneObject } from "../../api/fetch";

function Show() {
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();

  function handleDelete(id) {
    destroyObject('shows', id)
  }

  useEffect(() => {
    getOneObject('shows', id).then(json => {
      setShow(json)
      setLoadingError(false)
    })
    .catch(error => {
      console.log(error)
      setLoadingError(true)
    })
  }, [])

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded ? show.dateAdded : '---'}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => {
                handleDelete(show.id)
                window.location.reload()
              }}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;
