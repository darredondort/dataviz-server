const xlabels = [];
const ylabels = [];
let mlabels = [];
chartIt();

async function chartIt() {
  await getData();

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    // type: 'bar',
    backgroundColor: "rgba(0, 0, 0, 1)",
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: xlabels,
      datasets: [
        {
          label: "Incendios Bosque de la Primavera 2019",
          // data: [12, 19, 3, 5, 2, 3],
          data: ylabels,
          fill: false,
          backgroundColor: "rgba(240, 150, 100, 1)",

          // backgroundColor: [
          //     'rgba(255, 99, 132, 0.2)',
          //     'rgba(54, 162, 235, 0.2)',
          //     'rgba(255, 206, 86, 0.2)',
          //     'rgba(75, 192, 192, 0.2)',
          //     'rgba(153, 102, 255, 0.2)',
          //     'rgba(255, 159, 64, 0.2)'
          // ],
          borderColor: "rgba(240, 150, 100, 1)",
          // borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)"
          // ],
          borderWidth: 3
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      tooltips: {
        tooltipItem: {
          value: "HOLAAAA"
        },
        callbacks: {
          labelColor: function(tooltipItem, chart) {
            return {
              borderColor: "rgb(255, 0, 0)",
              backgroundColor: "rgba(240, 150, 100, 1)"
            };
          },
          labelTextColor: function(tooltipItem, chart) {
            return "rgb(240, 150, 100, 1)";
          }
        }
      }
    }
  });
}

async function getData() {
  const response = await fetch(
    "../data/incendios_primavera-ene-abril-2019.csv"
  );
  console.log(response);
  const data = await response.text();
  console.log(data);

  const rows = data.split("\n").slice(1);
  rows.pop();
  console.log(rows);
  let municipios = [];
  for (let i = 0; i < rows.length; i++) {
    const col = rows[i].split(",");
    const fecha = col[8];
    const municipio = col[4];
    const superficie = col[16];
    xlabels.push(fecha);
    ylabels.push(superficie);

    // if (!municipios.includes(municipio)) {
    //   municipios.push(municipio);
    // }

    console.log("fecha:");
    console.log(fecha);
    console.log("municipio:");
    console.log(municipio);
    console.log("superficie (ha):");
    console.log(superficie);
  }
  // console.log(municipios);
  // mlabels = municipios;
  // console.log(municipios);
}
