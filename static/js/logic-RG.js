// API endpoints
const sectorUrl = "http://127.0.0.1:5007/api/v1.0/commercial";
const keysUrl = "http://127.0.0.1:5007/api/v1.0/keys";

// Function to fetch data using D3.json
function fetchData(url) {
  return d3.json(url);
}

// Function to build bar plot using Plotly
function buildBarPlot(year, allSectorsDir, keysData) {
  // Merge data based on the common key 'id'
  const mergedData = allSectorsDir.map(s => {
    const keyData = keysData.find(k => k.id === s.id);
    return { ...s, ...keyData };
  });

  // Filter data for the specified year
  const yearData = mergedData.filter(entry => entry.year === year);

  // Sort data by state
  //const sortedData = yearData.sort((a, b) => d3.ascending(a.state, b.state));
  const sortedData = yearData.sort((a, b) => d3.descending(a.price, b.price));


  // Extract data for plotting
  const states = sortedData.map(entry => entry.state);
  const prices = sortedData.map(entry => entry.price);

  // Define trace for the bar chart
  const trace = {
    x: states,
    y: prices,
    type: "bar",
    orientation: "v"
  };

  // Define layout for the bar chart
  const layout = {
    title: `Prices for Year ${year}`,
    width: 900,
    height: 350,
    yaxis: { title: "Price per kwH (in cents)" },
    // xaxis: { title: "State" }
  };

  // Create the bar chart using Plotly
  Plotly.newPlot(`bar`, [trace], layout);
}

// Fetch data from API endpoints
Promise.all([fetchData(sectorUrl), fetchData(keysUrl)])
  .then(([sectorData, keysData]) => {
    // Specify the desired year
    const targetYear = 2021; // You can change this to the desired year
    buildBarPlot(targetYear, sectorData, keysData);
  })
  .catch(error => console.error("Error fetching data:", error));
