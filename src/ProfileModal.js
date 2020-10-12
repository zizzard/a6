import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById("modal-container");

export default function ProfileModal({ onClose, login, url }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [blog, setBlog] = useState("");

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "token a5c0d2fbea8ee8b945f7cfb46ee83fe19147f317",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let name = result.name;
        let location = result.location;
        let blog = result.blog;

        if (!name) {
          name = "No name found.";
        }

        if (!location) {
          location = "No location found.";
        }

        if (!blog) {
          blog = "No blog found.";
        }

        setName(name);
        setLocation(location);
        setBlog(blog);
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
              <div>Name: {name}</div>
              <div>Location: {location}</div>
              <div>Website (blog): {blog}</div>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalContainer
  );
}
