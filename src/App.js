import { useState, useEffect } from "react";
import "./App.css";
import Graph from "./components/Graph";
function App() {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState();

  console.log(response, error);

  useEffect(() => {
    const input = {
      age: 40,
      salary_before_tax: 500000,
      current_pension: 500000,
      pension_saving_rate: 16,
      payout_as_procentage_of_salary: 66,
      pension_investment_risk: 3,
      pension_age: 70,
    };
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
        .then((res) =>
          setResponse({ ...res, array_output: res.Array, Array: undefined })
        )
        .catch((err) => setError(err));
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="container">
        {response && <Graph output={response}></Graph>}
      </div>
    </div>
  );
}

export default App;
