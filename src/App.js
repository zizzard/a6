import React, { useState, useEffect } from "react";
import "./App.css";

import Member from "./Member";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/orgs/emberjs/members`, {
      headers: {
        Authorization: "token a5c0d2fbea8ee8b945f7cfb46ee83fe19147f317",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMembers(result);
      });
  }, []);

  return (
    <div className="main">
      {members.map((member) => {
        return (
          <Member
            key={member.id}
            avatar_url={member.avatar_url}
            id={member.id}
            login={member.login}
            repos_url={member.repos_url}
            url={member.url}
          />
        );
      })}
    </div>
  );
}

export default App;
