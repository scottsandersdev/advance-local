import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * Api urls.
 * @type {string}
 */
const SWAPI_URL = "https://swapi.dev/api/people";
const JSPH_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Swapi datapoints and titles to render in our template.
 * @type {array}
 */
const SWAPIDATAPOINTS = [
  {
    title: "Eye Color",
    keyName: "eye_color",
  },
  {
    title: "Birth Year",
    keyName: "birth_year",
  },
  {
    title: "Hair Color",
    keyName: "hair_color",
  },
  {
    title: "Height",
    keyName: "height",
  },
];

/**
 * JSPH datapoints and titles to render in our template.
 * @type {array}
 */
const JSPHDATAPOINTS = [
  {
    title: "Username",
    keyName: "username",
  },
  {
    title: "Email",
    keyName: "email",
  },
  {
    title: "Phone",
    keyName: "phone",
  },
  {
    title: "Website",
    keyName: "website",
  },
];

/**
 * Website css styles.
 * @type {object}
 */
const styles = {
  container: {
    display: "flex",
    fontFamily: ["Open Sans", "sans-serif"],
    padding: "10px",
  },

  column: {
    margin: "0 5px",
    width: "50%",
  },

  dataList: {
    margin: "0",
    padding: "0",
  },

  link: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "#000",
  },

  item: {
    border: "1px solid grey",
    borderRadius: "7px",
    listStyle: "none",
    marginBottom: "10px",
  },

  itemTitle: {
    backgroundColor: "teal",
    color: "#fff",
    margin: "0",
    padding: "15px",
  },

  itemContent: {
    padding: "0 15px",
  },

  itemDetail: {
    color: "grey",
  },
};

/**
 * Fetches content from both apis in parallel using Promise.all
 * @returns {Promise[]}
 */
function fetchContent() {
  const allRequests = [SWAPI_URL, JSPH_URL].map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((err) => console.log(err))
  );

  return Promise.all(allRequests);
}

/**
 * Main app function. Initiates fetching of content and appends data to dom.
 */
const App = () => {
  const [swapiData, setSwapiData] = useState([]);
  const [jsphData, setJsphData] = useState([]);

  useEffect(() => {
    const asyncFetch = async () => {
      const [apiSwapiData, apiJsphData] = await fetchContent();
      setSwapiData(apiSwapiData.results);
      setJsphData(apiJsphData);
    };

    asyncFetch();
  }, []);

  return (
    <main style={styles.container}>
      <div style={styles.column}>
        <h2>
          <a
            href="https://swapi.dev/api/people"
            target="blank"
            style={styles.link}
          >
            Swapi Data
          </a>
        </h2>
        <ul style={styles.dataList}>
          {swapiData.map((item) => (
            <li key={item.name} style={styles.item}>
              <h2 style={styles.itemTitle}>{item.name}</h2>
              <div style={styles.itemContent}>
                {SWAPIDATAPOINTS.map((point) => (
                  <p key={point.keyName} style={styles.itemDetail}>
                    {point.title}: {item[point.keyName]}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.column}>
        <h2>
          <a
            href="https://jsonplaceholder.typicode.com/users"
            target="blank"
            style={styles.link}
          >
            JSPH Data
          </a>
        </h2>
        <ul style={styles.dataList}>
          {jsphData.map((item) => (
            <li key={item.name} style={styles.item}>
              <h2 style={styles.itemTitle}>{item.name}</h2>
              <div style={styles.itemContent}>
                {JSPHDATAPOINTS.map((point) => (
                  <p key={point.keyName} style={styles.itemDetail}>
                    {point.title}: {item[point.keyName]}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
