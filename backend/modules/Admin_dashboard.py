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

# Get units sold for all products and mystery boxes
class Units_sold(Resource):
    def get(self): 
        docs = db.collection(u'products').stream()
        units_sold = 0
        for doc in docs:
            units_sold += doc.get("units_sold")
        
        docs = db.collection(u'mystery_box').stream()
        for doc in docs:
            units_sold += doc.get('units_sold')

        return {"units_sold": units_sold}

# Get total revenue
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

# Increment units sold of the product with given productID and quantity
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

# Get data required for admin dashboard graph
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
                last_month = 13

                if dt.year == datetime.now().year:
                    last_month = datetime.now().month + 1

                for i in range(1, last_month):
                    available[dt.year][calendar.month_name[i]] = {}
                    end_date = calendar.monthrange(dt.year, i)[1] + 1
                    if i == datetime.now().month and dt.year == datetime.now().year:
                        end_date = datetime.now().day + 1

                    for j in range(1, end_date):
                        available[dt.year][calendar.month_name[i]][j] = 0

            available[dt.year][calendar.month_name[dt.month]][dt.day] += price * quantity

        return { 'data': available }

# Increment units sold of the mystery box by 1, with given mystery box ID
class mystery_add_units_sold(Resource):
    def post(self, mysteryID):
        docs = db.collection(u'mystery_box').stream()
        for doc in docs:
            if doc.id == mysteryID:
                previous = doc.get("units_sold")
        previous += 1

        doc_ref = db.collection(u'mystery_box').document(mysteryID)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({u'units_sold': previous})

            return {"message": previous}

        else:
            return {"message": "mystery id doesnt exist"}, 400