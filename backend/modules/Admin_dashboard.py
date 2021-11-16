from flask_restful import Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from functools import cmp_to_key
from datetime import datetime, timedelta
from math import ceil

import calendar

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='admin_dashboard')
db = firestore.client(default_app)

class Units_sold(Resource):
    def get(self): 
        docs = db.collection(u'products').stream()
        units_sold = 0
        for doc in docs:
            units_sold += doc.get("units_sold")

        return {"units_sold": units_sold}

class Total_revenue(Resource):
    def get(self):
        docs = db.collection(u'products').stream()
        revenue = 0
        for doc in docs:
            current = doc.get("units_sold") * doc.get("price")
            revenue += current

        docs = db.collection(u'mystery_box').stream()
        for doc in docs:
            current = doc.get("units_sold") * doc.get("Price")
            revenue += current

        return {"total_revenue": revenue}

class add_to_units_sold(Resource):
    def post(self, productID, quantity):
        docs = db.collection(u'products').stream()
        for doc in docs:
            if doc.id == productID:
                previous = doc.get("units_sold")
        previous += quantity

        doc_ref = db.collection(u'products').document(productID)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({u'units_sold': previous})

            return {"message": previous}

        else:
            return {"message": "product id doesnt exist"}, 400

def week_of_month(dt):
    first_day = dt.replace(day=1)
    dom = dt.day
    adjusted_dom = dom + first_day.weekday()

    return int(ceil(adjusted_dom/7.0))

class Total_sales(Resource):
    def get(self):
        docs = db.collection(u'users').stream()
        arr = []
        for doc in docs:
            orders = doc.get(u'purchase_history')
            for order in orders:
                arr.append(order)
        
        # sort by order placed
        arr.sort(key=lambda r: datetime.strptime(r['orderPlaced'], "%d %B %Y"))

        # create dictionary: {'2021': {'January': {'1': number, ...}, ...}, ...}, ...}
        available = {}
        for order in arr:
            placed = order['orderPlaced']
            dt = datetime.strptime(placed, "%d %B %Y")
            price = order['price']
            quantity = order['quantity']
            
            if dt.year not in available:
                available[dt.year] = {}
                for i in range(1, datetime.now().month + 1):
                    available[dt.year][calendar.month_name[i]] = {}
                    end_date = calendar.monthrange(dt.year, i)[1] + 1
                    if i == datetime.now().month:
                        end_date = datetime.now().day + 1

                    for j in range(1, end_date):
                        available[dt.year][calendar.month_name[i]][j] = 0
            else:
                available[dt.year][calendar.month_name[dt.month]][dt.day] += price * quantity

        return { 'data': available }