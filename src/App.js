import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const query = `
{
  pageCollection {
    items {
      title
    }
  }
}
`;

function App() {
  // define the initial state
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/9v2q1wnks8pu/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer 0Epzo_VPHVZmqXT4w3bZs5b7ia_uKP3TLf4n_xt9jSU",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.pageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{page.title}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
