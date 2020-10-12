import React, { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import ReposModal from "./ReposModal";

export default function Member({ avatar_url, id, login, repos_url, url }) {
  const [profileModalShown, setProfileModalShown] = useState(false);
  const [reposModalShown, setReposModalShown] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    fetch(`api/followings/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.id !== undefined) {
          setFollowed(true);
        }
      });
  }, [id]);

  function showProfileModal() {
    setProfileModalShown(true);
  }

  function hideProfileModal() {
    setProfileModalShown(false);
  }

  function showReposModal() {
    setReposModalShown(true);
  }

  function hideReposModal() {
    setReposModalShown(false);
  }

  function follow() {
    let data = {
      id: id,
    };

    fetch("api/followings/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.id === id) {
          setFollowed(true);
        }
      });
  }

  function unfollow() {
    fetch(`api/followings/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!Object.keys(result).length) {
          setFollowed(false);
        }
      });
  }

  return (
    <>
      <div className="member">
        <img
          className="avatar"
          src={avatar_url}
          alt="avatar_url"
          onClick={showProfileModal}
        />
        <div onClick={showProfileModal}>{login}</div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={showReposModal}
        >
          Repos
        </button>
        {followed ? (
          <button type="button" className="btn btn-primary" onClick={unfollow}>
            Unfollow
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={follow}>
            Follow
          </button>
        )}
      </div>
      {profileModalShown && (
        <ProfileModal onClose={hideProfileModal} login={login} url={url} />
      )}
      {reposModalShown && (
        <ReposModal onClose={hideReposModal} login={login} url={repos_url} />
      )}
    </>
  );
}
