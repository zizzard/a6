import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById("modal-container");

export default function ReposModal({ onClose, login, url }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "token a5c0d2fbea8ee8b945f7cfb46ee83fe19147f317",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRepos(result);
      });
  }, [url]);

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{login}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {repos.map((repo) => {
                let description = repo.description;
                if (!description) {
                  description = "No description.";
                }
                return (
                  <div key={repo.id}>
                    <div className="repo-mini">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>{repo.name}</div>
                      </a>
                      <div>{description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>,
    modalContainer
  );
}
