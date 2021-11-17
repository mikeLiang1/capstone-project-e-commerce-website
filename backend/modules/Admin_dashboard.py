from flask_restful import Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from functools import cmp_to_key
from datetime import datetime, timedelta

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

class Total_sales(Resource):
    def get(self):
        docs = db.collection(u'users').stream()
        arr = []
        for doc in docs:
            orders = doc.get(u'purchase_history')
            for order in orders:
                arr.append(order)
                print(order['orderPlaced'])
        
        # sort by order placed
        arr.sort(key=lambda r: datetime.strptime(r['orderPlaced'], "%d %B %Y"))
        print(arr)

        # create dictionary {'date': total_sales, ...}
        data = {}
        prev = datetime.strptime(arr[0]['orderPlaced'], "%d %B %Y")
        for order in arr:
            placed = order['orderPlaced']
            placed_date = datetime.strptime(placed, "%d %B %Y")
            price = order['price']
            quantity = order['quantity']
            diff = placed_date - prev

            if diff > timedelta(days=1):
                while prev != placed_date:
                    print(placed_date)
                    prev += timedelta(days=1)
                    string = prev.strftime("%d %B %Y")
                    data[string] = 0

            if placed in data:
                data[placed] += price * quantity
            else:
                data[placed] = price * quantity

        return {'data': data }