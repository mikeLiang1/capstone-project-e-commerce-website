from flask import Flask
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

from modules.Register import Register
<<<<<<< HEAD
from modules.User import *
=======
from modules.User import User, User_Get, User_add_productID, User_cart, User_get_cart
>>>>>>> 410efaa77a65fabbc674904fd5842042513e93d2
from modules.SignIn import SignIn
from modules.mystery_box import *
from modules.Product import *
from modules.Admin_dashboard import *

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
api.add_resource(Product, "/product")
api.add_resource(Product_get, "/product/<string:productID>")
api.add_resource(User, "/auth/user")
api.add_resource(User_Get, "/auth/user/<string:uid>")
api.add_resource(SignIn, "/auth/signin")
api.add_resource(mystery_box, "/mystery_box/<string:box_name>")
api.add_resource(mystery_box_open, "/mystery_box/<string:box_name>/open")
api.add_resource(Product_range, "/product/<int:min>/<int:max>")
api.add_resource(User_add_productID, "/user/<string:productID>")
api.add_resource(Units_sold, "/units_sold")
api.add_resource(Total_revenue, "/total_revenue")
api.add_resource(Product_visited, "/product_visited/<string:productID>")
api.add_resource(Get_product_visited, "/product_visited")
api.add_resource(User_cart, "/cart")
api.add_resource(User_purchase_history, "/purchase_history/<string:uid>")
api.add_resource(User_get_cart, "/cart/<string:uid>")

if __name__ == "__main__":
    app.run(debug=True)