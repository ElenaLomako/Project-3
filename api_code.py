from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS, cross_origin

from flask import Flask, jsonify
from flask_cors import CORS

# SQL server password
from passwords import db_params

#################################################
# Database Setup
#################################################

# Create an engine
engine = create_engine(f"postgresql://{db_params['user']}:{db_params['password']}@{db_params['host']}:{db_params['port']}/{db_params['database']}")

# Reflect the database tables
Base = automap_base()
Base.prepare(engine, reflect=True)

# Print all the classes found by automap
print("Automap found the following classes:")
for class_name in Base.classes.keys():
    print(class_name)

# Save references to each table
Keys_table = Base.classes.key_data
Residential = Base.classes.residential
Commercial = Base.classes.commercial
Industrial = Base.classes.industrial
Transportation = Base.classes.transportation
Total= Base.classes.total   

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)

# Flask Routes
#################################################
@app.route("/")
@cross_origin()

def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/keys<br/>"
        f"/api/v1.0/residential<br/>"
        f"/api/v1.0/commercial<br/>"
        f"/api/v1.0/industrial<br/>"
        f"/api/v1.0/transportation<br/>"
        f"/api/v1.0/all_sectors_combined<br/>"
    )

@app.route("/api/v1.0/keys")
@cross_origin()
def keys_data():
     """Return data from the keys table."""
     results = session.query(Keys_table.id, Keys_table.year, Keys_table.state).all()
     # Create a list of id, year, state that will be appended with dictionary values for id, year, state queried above
     keys_data_query = []
     for id, year, state in results:
         key_dict = {}
         key_dict["id"] = id
         key_dict["year"] = year
         key_dict["state"] = state
         keys_data_query.append(key_dict)

     return jsonify(keys_data_query)




@app.route("/api/v1.0/residential")
def get_residential():
    """Return data from the residential table."""
    results = session.query(Residential.id, Residential.revenue, Residential.sales, Residential.customers, Residential.price).all()
     # Create a list of id, revenue, sales, customers, price that will be appended with dictionary values id, revenue, sales, customers, price queried above
    Residential_data_query = []
    for id, revenue, sales, customers, price in results:
        Residential_dict = {}
        Residential_dict["id"] = id
        Residential_dict["revenue"] = revenue
        Residential_dict["sales"] = sales
        Residential_dict["customers"] = customers
        Residential_dict["price"] = price
        Residential_data_query.append(Residential_dict)

    return jsonify(Residential_data_query)

@app.route("/api/v1.0/commercial")
def get_commercial():
    """Return data from the commercial table."""
    results = session.query(Commercial.id, Commercial.revenue, Commercial.sales, Commercial.customers, Commercial.price).all()
     # Create a list of id, revenue, sales, customers, price that will be appended with dictionary values id, revenue, sales, customers, price queried above
    Commercial_data_query = []
    for id, revenue, sales, customers, price in results:
        Commercial_dict = {}
        Commercial_dict["id"] = id
        Commercial_dict["revenue"] = revenue
        Commercial_dict["sales"] = sales
        Commercial_dict["customers"] = customers
        Commercial_dict["price"] = price
        Commercial_data_query.append(Commercial_dict)

    return jsonify(Commercial_data_query)

@app.route("/api/v1.0/industrial")
def get_industrial():
    """Return data from the industrial table."""
    results = session.query(Industrial.id, Industrial.revenue, Industrial.sales, Industrial.customers, Industrial.price).all()
    # Create a list of id, revenue, sales, customers, price that will be appended with dictionary values id, revenue, sales, customers, price queried above
    Industrial_data_query = []
    for id, revenue, sales, customers, price in results:
        Industrial_dict = {}
        Industrial_dict["id"] = id
        Industrial_dict["revenue"] = revenue
        Industrial_dict["sales"] = sales
        Industrial_dict["customers"] = customers
        Industrial_dict["price"] = price
        Industrial_data_query.append(Industrial_dict)

    return jsonify(Industrial_data_query)

@app.route("/api/v1.0/transportation")
def get_transportation():
    """Return data from the transportation table."""
    results = session.query(Transportation.id, Transportation.revenue, Transportation.sales, Transportation.customers, Transportation.price).all()
    Transportation_data_query = []
    for id, revenue, sales, customers, price in results:
        Transportation_dict = {}
        Transportation_dict["id"] = id
        Transportation_dict["revenue"] = revenue
        Transportation_dict["sales"] = sales
        Transportation_dict["customers"] = customers
        Transportation_dict["price"] = price
        Transportation_data_query.append(Transportation_dict)

    return jsonify(Transportation_data_query)

@app.route("/api/v1.0/all_sectors_combined")
@cross_origin()
def get_total():
    """Return data from the total table."""
    results = session.query(Total.id, Total.revenue, Total.sales, Total.customers, Total.price).all()
    Total_data_query = []
    for id, revenue, sales, customers, price in results:
        Total_dict = {}
        Total_dict["id"] = id
        Total_dict["revenue"] = revenue
        Total_dict["sales"] = sales
        Total_dict["customers"] = customers
        Total_dict["price"] = price
        Total_data_query.append(Total_dict)

    return jsonify(Total_data_query)


if __name__ == "__main__":
    app.run(debug=True, port=5007)

session.close()