import { useState, useEffect } from "react";
import "./App.css";
import DescriptionInput from "./components/DescriptionInput";
import Graph from "./components/Graph";
function App() {
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [response, setResponse] = useState();
  const [input, setInput] = useState({
    age: 40,
    salary_before_tax: 40000,
    current_pension: 500000,
    pension_saving_rate: 16,
    payout_as_procentage_of_salary: 66,
    pension_investment_risk: 3,
    pension_age: 70,
  });
  console.log(response, error);
  const onChangeInput = (prop, value) => {
    console.log(prop, value);
    setInput({ ...input, [prop]: value });
  };
  useEffect(() => {
    console.log("FETCH", input);
    async function fetchData() {
      const res = await fetch("https://api.businesslogic.online/execute", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "6fec21760f7e46ceb999ec538304a43a",
        },
        body: JSON.stringify(input),
      });
      res
        .json()
        .then((res) => {
          console.log("RES", res, res[0]?.error_strings);
          if (res[0]?.error_strings || res.errors) {
            setResponse(undefined);
            if (res[0]?.error_strings) {
              setError(res[0].error_strings[0]);
              setInputError(res[0].error_strings[0]);
            }
            if (res.errors) {
              if ((res.errors[0].code = 404)) {
                setError("404 - Kunne ikke finde service");
              } else {
                setError("Der er en fejl i Business Logic Servicen");
              }
            }
          } else {
            console.log("set", res);
            setResponse({ ...res, array_output: res.Array, Array: undefined });
          }
        })
        .catch((err) => {
          console.log("ERR", err);
          setError(err);
        });
    }
    fetchData(input);
  }, [input]);
  return (
    <div className="App">
      {response ? (
        <div className="content">
          <div className="graph-container">
            <Graph output={response} onChangeInput={onChangeInput}></Graph>
          </div>
          <div className="help-text">
            Tipas eksemplet til din konkrete situation ved at klikke og ændre på
            de grønne tal fra neden.
          </div>
          <div className="description-container">
            <DescriptionInput
              input={input}
              onChangeInput={onChangeInput}
            ></DescriptionInput>
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="error-container">
            <h4>Beklager! Der skette en fejl...</h4>
            <div
              className="error"
              style={{ height: inputError ? "" : "700px" }}
            >
              {error}
            </div>
          </div>
          {inputError && (
            <div className="description-container">
              <DescriptionInput
                input={input}
                onChangeInput={onChangeInput}
              ></DescriptionInput>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
