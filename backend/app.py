from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import auth

from modules.Product import Product
from modules.Register import Register

app = Flask(__name__)
api = Api(app)


"""

    localhost:5000/product
    
    Ideas of functions we might need:
        product 
            post -> add product 
            put -> edit product
            get -> get product info
            
                database:
                    ID PRIMARY
                    Name
                    Image
                    Price
                    Reviews [list of reviews]
                    Description
                    Tags
                    Original Stock
                    Current Stock
                    
                    
        buy/product --> probably sprint 2
        
        auth/user 
            post -> add user
            put -> edit user
            get -> get user info 
            
                database:
                    email -> should only be able make one account per email PRIMARY
                    first name
                    last name
                    password
                    credit card info?
                    address
                    product history
                    admin: boolean
    
        mysterybox
            get -> get box info
        
        mysterybox/open (id)
            get -> result
            
            return product id of the result
            
                database:
                    mystery box id PRIMARY
                    image
                    price
                    name
                    products [(id, probablity)] list of tuples
                            ^ links to product database
                    
            
    requirements.txt
        
        
"""


# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

api.add_resource(Register, "/auth/register")
api.add_resource(Product, "/product/<string:product_id>")


if __name__ == "__main__":
    app.run(debug=True)