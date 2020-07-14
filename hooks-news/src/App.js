import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");
  const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState(null)
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true)
   try { const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);} catch (err) {
      setError(err)
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getResults();
  };

  const handleClear = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          ref={searchInputRef}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {loading ? (
        <div>Loading results.....</div>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default App;
