  // URL
    let dataUrl = "Resources/sales_annual_residential.csv";
    let stateNames = "Resources/state_long_names.csv";

    // Use D3 to fetch the csv file
    d3.csv(dataUrl).then(function (data) {
      // console.log(data);
      dropdownYear();
      dropdownSector();
      bubbleChart(data, 2020);
    });

// *** DROPDOWNS FOR THE YEARS AND SECTORS***//

// Function to populate the year dropdown
    function dropdownYear() {
      let dropdownMenu = d3.select("#selDataset");
      
      dropdownMenu.html(""); // Clears out dropdown selection

      // Loop to add options for the years in the dropdown
      for (let i = 0; i < 12; i++) {
          dropdownMenu.append("option").text(2010+i).attr("value", 2010+i);
        }
      };    


    function dropdownSector() {
      let dropdownMenu = d3.select("#selDatasector");
      
      dropdownMenu.html(""); // Clears out dropdown selection

      sectors = ["residential", "commercial", "industrial", "transportation", "all_sectors_combined"];

      for (let i = 0; i < sectors.length; i++) {
          dropdownMenu.append("option").text(sectors[i]).attr("value", sectors[i]);
        }
      };
// *** DROPDOWNS FOR THE YEARS AND SECTORS***//

// *** BUBBLE CHART***//
function bubbleChart(a, year){

 
  let info = a.filter(yr => yr.id.slice(2,6) === year.toString()); 
  console.log(info);
 
  // Exclude a specific state
   info = info.filter(entry => entry.id.slice(0, 2) !== "US");

   // Sort the data based on price in descending order
  // info.sort((a, b) => parseFloat(b.revenue) - parseFloat(a.revenue));

  // Select the top 10 entries
  // let topTen = info.slice(0, 10);
  
  let results = [];

// *** author PS ** //
  d3.csv(stateNames).then(function(data) {
    // Loop through each entry in the topTen array
    info.forEach(entry => {
       // Extract the state abbreviation from the entry's id
      let stateAbv = entry.id.slice(0,2);

      // Find the corresponding state in the loaded stateNames data
      let state = data.find(item => item.state === stateAbv);      
     
      // If a matching state is found, push a new object to the results array
      if (state) {
        results.push({
          state: state.name,
          revenue: parseFloat(entry.revenue),
          customers: parseInt(entry.customers)
        });
      }
    });

    let minCustomers = d3.min(results, entry => entry.customers);
    let maxCustomers = d3.max(results, entry => entry.customers);
    let colorScale = d3.scaleLinear()
    .domain([minCustomers, maxCustomers])
    .range(["yellow", "red"]);

// *** author PS ** //

    // After populating the states array, create the trace
    let trace = {
      // x-axis values: State names from the results array
      x: results.map(entry => entry.state),
      
      // y-axis values: Prices from the results array
      y: results.map(entry => entry.revenue),
      mode: "markers",
      marker: {
        // Size of the bubbles based on the prices (scaled by 2 for visibility)
        size: results.map(entry => entry.revenue * 0.00001),

        // Color of the bubbles based on their index in the results array
        color: results.map(entry => colorScale(entry.customers)),
      }
    };

    // Layout configuration
    let layout = {
      title: "Revenue by State",
      // xaxis: {
      //   title: "States",
      //   tickangle: 40, // Rotate the x-axis labels by 40 degrees
      // },
      yaxis: {
        title: "Revenue",
      },
    };

    // Combine the trace into an array of plot data
    let plotData = [trace];

    // Create a new bubble chart using Plotly   
    Plotly.newPlot('bubble', plotData, layout);
  });
}
// *** BUBBLE CHART***//

// Define a function to set marker color based on depth
// function getMarkerColor(x){
//   if (x < 10){return "#00ff00";} // green
//   else if (x < 30){return "#ffff00";} // yellow
//   else if (x < 50){return "#ff9900";} // orange
//   else if (x < 70){return "#ff6600";} // dark orange
//   else if (x < 90){return "#ff3300";} // red
//   else {return "#990000";} // dark red
//       };












//     function dropdownState(info) {
//       let dropdownMenu = d3.select("#selDatastate");
      
//       dropdownMenu.html(""); // Clears out dropdown selection

//       states = [];

//       for (let i = 0; i < info.length; i++) {
//         let state = info[i].id.slice(0,2);
//         if (!states.includes(state)) {
//           states.push(state);
//           dropdownMenu.append("option").text(state).attr("value", state);
        
//     }
//   }
// };

// function dropdownYear(x) {
//   let dropdownMenu = d3.select("#selDataset");
  
//   dropdownMenu.html(""); // Clears out dropdown selection

//   years = [];

//   for (let i = 0; i < x.length; i++) {
//     let year = x[i].id.slice(2,6);
//     if (!years.includes(year)) {
//       years.push(year);
//       dropdownMenu.append("option").text(year).attr("value", year);
//     }
//   }     
  
// };
