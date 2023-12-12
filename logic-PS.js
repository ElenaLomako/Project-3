
// getting the data from the csv directly
let data = "http://127.0.0.1:5007/api/v1.0/residential";
let stateNames = "Resources/state_long_names.csv";
let jsonFile = "Resources/us-states.json";


d3.json(data).then(function(data){
    console.log(data);
   
    yearHeat(data, 2016);

});

// creating a function that takes the data and a year to create a map
function yearHeat(data, year) {
    // we'll take the section of data that matches the year inputed
    let sampleData = data.filter(sample => sample.id.slice(2,6) === year.toString());
    // to store the information
    let result = [];
    // since the data from our database excludes statenames, we'll need to get the names separately
    d3.csv(stateNames).then(function(stateNames){
        sampleData.forEach(item => {
        //    the id holds the state code and year - this gives the state code
            let state = item.id.slice(0,2);
        // we want state data, so this exclude the nation information
            if (state !== "US") {
                // matching the state code to the state name and data
                let stateInfo = stateNames.find(sample => sample.state === state);
                // storing everything in the results list, state name, state code, price, revenue and sales data
                if(stateInfo) {
                    result.push({
                        state_code: state,
                        price: parseFloat(item.price),
                        state_name: stateInfo.name,
                        revenue: item.revenue,
                        sales: item.sales,
                        customer: item.customers
                    });
                }
            }
        });
    
        // console.log(result);
        // found a json file online that provides all the coordinates necessary to map the US states
        d3.json(jsonFile).then(function (usStates) {
            // console.log(usStates)
            // creaates a base layer of the country
            let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        
            });
            // displaying the map
            let myMap = L.map("map", {
                center: [37.09, -93.71],
                zoom: 4,
                layers: [street]
            });
            // using choropleth to create a color range amongst States based on the price
            let geojson = L.choropleth(usStates, {
                valueProperty: function(feature){
                    let statename = feature.properties.name;
                    let stateData = result.find(item => item.state_name === statename);
                    return stateData ? stateData.price : 0;
                },
            // piggybacked of an activity for the color information
                scale: ["#ffffb2", "#b10026"],
                steps: 8,
                mode: "q",
                style: {
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.7
                },
                // creating the popups for each fo the States and display all available information
                onEachFeature: function(feature, layer) {
                    let statename = feature.properties.name;
                    let stateData = result.find(item => item.state_name === statename);
                
                    if (stateData) {
                        layer.bindPopup(
                            
                            "<h6><strong> State: </strong>" + stateData.state_name + "</h6>" +  
                            "<h6><strong> State Abbreviation: </strong>" + stateData.state_code + "</h6>" + "<br/> " +
                            "<h6><strong> Megawatt hours: </strong>" + numberFormat(stateData.sales) + "</h6>" +
                            "<h6><strong> Price per hour: </strong>" + currencyFormat(stateData.price/100) + "</h6>" +
                            "<h6><strong> Revenue: </strong>" + currencyFormat(stateData.revenue) + "</h6>" + "<br/> " +
                            "<h6><strong> Customer Count: </strong>" + numberFormat(stateData.customer) + "</h6>");

                    }
                }
            }).addTo(myMap);

            // Setting up a legend.
            let legend = L.control({ position: "bottomright" });
            legend.onAdd = function() {
            let div = L.DomUtil.create("div", "info legend");
            let limits = geojson.options.limits;
            let colors = geojson.options.colors;
            let labels = [];
            // to get the min and max for the legend - limits wasnt working for me
            let minLimit = 100000;
            let maxLimit = 0;

            result.forEach(item => {
                if (item.price < minLimit) {
                    minLimit = item.price;
                }
                if (item.price > maxLimit) {
                    maxLimit = item.price;
                }
            })

            // Add the minimum and maximum on the legend
            let legendInfo = "<h4 style='font-weight: bold;'>Price of Megawatts per Hour</h4>" + 
            "<div class=\"labels\">" +
            "<div class=\"min\">" + currencyFormat(minLimit/100) + "</div>" +
            "<div class=\"max\">" + currencyFormat(maxLimit/100) + "</div>" +
            "</div>";
            
            div.innerHTML = legendInfo;
            // Adds the colors from min to max
            limits.forEach(function(limit, index) {
                labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
              });
            
            div.innerHTML += "<ul>" + labels.join("") + "</ul>";
            
            return div;
            };

            // Adding the legend to the map
            legend.addTo(myMap);
            });
    });
}
// formatting some numbers for displaying purposes
function currencyFormat(number){
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', 
        minimumFractionDigits: 2
    }).format(number);
}
// formatting some numbers for displaying purposes
function numberFormat(number){
    return Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0
    }).format(number);
}
// formatting some numbers for displaying purposes - tho it is not used, its helpful to have
function priceFormat(number){
    return Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2
    }).format(number);
}

