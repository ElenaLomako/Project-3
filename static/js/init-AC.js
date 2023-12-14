// Initialize
function init(){
    generateDropDownMenus();
    optionChanged();
    // fetchDataAndUpdate("residential", 291);
}

function generateDropDownMenus() {
    let ddmYear = d3.select("#selDataYear");
    let ddmSector = d3.select("#selDataSector");
    let sectors = Object.keys(endpoints);

    for (let i = 0; i < 12; i++) {
        ddmYear.append("option").text(2010 + i).attr("value", 2010 + i);
    }
    ddmYear.append("option").text("None").attr("value", 20);

    sectors.forEach(sector => {
        ddmSector.append("option").text(sector).attr("value", sector);
    });

    ddmYear.on("change", () => optionChanged());
    ddmSector.on("change", () => optionChanged());
}


function optionChanged() {
    let selectedYear = d3.select("#selDataYear").property("value");
    let selectedSector = d3.select("#selDataSector").property("value");
    console.log(selectedSector, selectedYear)
    fetchDataAndUpdate(selectedSector, selectedYear);
}

let mapCounter = 0;
function fetchDataAndUpdate(selectedSector, selectedYear){
    let url = Baseurl + endpoints[selectedSector];
    // console.log(url)

    d3.json(url).then(function(data) {
        if (selectedYear) {
            data = data.filter(item => item.id.includes(selectedYear));
            // console.log(data)
        }
        // Generate all plots
        buildTable(data); // Andrew's Tabulator element

        yearHeat(data, selectedYear) // Pauls Heatmap
        // console.log(myMap)
        bubbleChart(data, selectedYear.toString()) // Mad's Bubble Chart
        // console.log(typeof(selectedYear))

        Promise.all([fetchData(url), fetchData(keysUrl)])
            .then(([sectorData, keysData]) => {
                // Specify the desired year
                const targetYear = parseInt(selectedYear); // You can change this to the desired year
                buildBarPlot(targetYear, sectorData, keysData);
                // console.log(targetYear, sectorData, keysData)
            })
    })
}

init()