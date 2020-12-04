import { Line } from "react-chartjs-2";
import output from "../output.json";
import "chartjs-plugin-dragdata";
import "chartjs-plugin-annotation";

const colors = {
  main: "#00912B",
  mainOff: "#52B46F",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#9E9E9E",
};
const mainData = output.array_output.map((x) =>
  Math.min(x.expected_savings, x.expenses)
);
const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, colors.mainOff);
  gradient.addColorStop(1, "#FFFFFF");
  return {
    labels: output.array_output.map((x) => x.age),
    datasets: [
      {
        label: "My First dataset",
        fill: true,
        lineTension: 0.1,
        backgroundColor: gradient,
        borderColor: colors.main,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colors.main,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.mainOff,
        pointHoverBorderColor: colors.grey,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
        data: mainData,
      },
    ],
  };
};
function Graph() {
  console.log(output);
  const max = Math.max.apply(Math, mainData);
  return (
    <Line
      data={data}
      options={{
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: output.expected_pension,
              borderColor: colors.main,
              borderDash: [10, 10],
              label: {
                content: "Forventet Pension",
                enabled: true,
                position: "top",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: { enabled: true },
        scales: {
          xAxes: [
            {
              gridLines: { display: false },
              ticks: {
                autoSkip: false,
                fontColor: "#3C3C3C",
                fontSize: 16,
                min: output.array_output[0].age,
                max: 100,
                callback: function (value, index, values) {
                  if (
                    index == 0 ||
                    value == output.expected_pension ||
                    value == output.max_pension_age ||
                    value == output.min_pension_age ||
                    index == mainData.length - 1
                  ) {
                    return value;
                  }
                  return;
                },
              },
            },
          ],
          yAxes: [
            {
              gridLines: { display: false },
              ticks: {
                max: max * 1.1,
                min: 0,
              },
            },
          ],
        },
        gridLines: {
          display: false,
          offsetGridLines: true,
          color: "3C3C3C",
          tickMarkLength: 4,
        },
        responsive: true,
        dragData: true,
        dragDataRound: 1,
        dragOptions: {
          showTooltip: true,
        },
        onDragStart: function (e, element) {
          const index = element._index;
          if (index != 0 && index != mainData.length - 1) {
            return false;
          }
        },
        onDrag: function (e, datasetIndex, index, value) {
          e.target.style.cursor = "grabbing";
          //console.log(datasetIndex, index, value);
        },
        onDragEnd: function (e, datasetIndex, index, value) {
          e.target.style.cursor = "default";
          //console.log(datasetIndex, index, value);
        },
        hover: {
          onHover: function (e, element) {
            const point = this.getElementAtEvent(e);
            if (point.length) e.target.style.cursor = "grab";
            else e.target.style.cursor = "default";
          },
        },
      }}
    />
  );
}
export default Graph;
