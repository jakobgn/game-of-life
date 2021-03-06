import { useState, useEffect } from "react";
import "./App.css";
import DescriptionInput from "./components/DescriptionInput";
import Graph from "./components/Graph";
function App() {
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState();
  const [input, setInput] = useState({
    age: 40,
    salary_before_tax: 40000,
    current_pension: 500000,
    pension_saving_rate: 16,
    payout: 26400,
    pension_investment_risk: 3,
    pension_age: 70,
  });
  console.log(response, error);
  const onChangeInput = (prop, value) => {
    console.log(prop, value);
    setInput({ ...input, [prop]: value });
  };
  useEffect(() => {
    setLoading(true);
    console.log("FETCH", input);
    const mapped = {
      ...input,
      salary_before_tax: input.salary_before_tax * 12,
      payout_as_procentage_of_salary:
        input.salary_before_tax === 0
          ? 1
          : (input.payout / input.salary_before_tax) * 100,
    };
    console.log("FETCHm", mapped);

    async function fetchData() {
      const res = await fetch("https://api.businesslogic.online/execute", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "6fec21760f7e46ceb999ec538304a43a",
        },
        body: JSON.stringify(mapped),
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
            const output = {
              ...res,
              array_output: res.Array,

              Array: undefined,
            };
            console.log("set", output);
            setResponse(output);
          }
        })
        .catch((err) => {
          console.log("ERR", err);
          setError(err);
        })
        .finally(() => setLoading(false));
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
              output={response}
            ></DescriptionInput>
          </div>
        </div>
      ) : loading ? (
        <div />
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
                output={response}
              ></DescriptionInput>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
