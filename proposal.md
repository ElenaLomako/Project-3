# Visualizing Electricity Usage and Rates
#### Authors:
###### Andrew Cheng, Paul Samaniego, Elena Lomako, Riya Gajjar, Madeline Cruz

## Introduction
The US Energy Information Administration (EIA) hosts and collects information gathered across different energy sectors and jurisdictions to promote sound policymaking, efficient markets and public understanding of energy and its interactions with the economy and environment.

Using the [Sales (consumption), revenue, prices & customers annual dataset](https://www.eia.gov/electricity/data.php#sales), we aim to create a webpage containing interactive visualization elements to assist in the public understanding of electricity usage and price, and how these features change over time.

Technologies and API's
* Python 
  * Pandas
  * Flask
* Javascript
  * Leaflet
  * D3
  * Tabulator
* SQL

## Scope and Responsibilities
* Andrew
  *  Data inspection and subset
  *  README/ proposal setup
  *  Build HTML/ CSS 
  *  Extraneous interactive web elements (js-d3)
* Riya
  * Bar plot visualization (js-plotly)
  * Bubble chart visualization (js-plotly)
* Paul
  *  Spatial Heatmap (js-leaflet)
* Elena:
  *  Setup SQL Database (sql)
  *  Flask local server setup (py)
* Madeline:
  *  Data filters and bubble chart (js)


Data source: https://www.eia.gov/electricity/data.php#sales

## Project Pipeline
* ~~Split main dataframe into multiple tables~~
* ~~Schema setup in SQL~~
* Build flask API
* Set up HTML webpage
* Javascript scripts
  * Use leaflet to create interactive spatial heatmap
  * Use Plotly to visualize price/ states using bubble plot (TBD)
  * Use Plotly to visualize price/ states/ usage overtime

## Data Sources
[Sales (consumption), revenue, prices & customers annual dataset](https://www.eia.gov/electricity/data.php#sales)