from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from firebase_admin import credentials, firestore, initialize_app

from modules.HelloWorld import HelloWorld

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

class FireTest(Resource):
    def post(self):
        doc_ref = db.collection(u'users').document(u'clovelace')
        doc_ref.set({
            u'first': u'Mike',
            u'last': u'Lovelace',
            u'born': 1815
        })
        
        return {"message" : "Success"}


registerParser = reqparse.RequestParser()
registerParser.add_argument('fname', type=str, help='First name required', required=True)
registerParser.add_argument('lname', type=str, help='Last name required', required=True)
registerParser.add_argument('email', type=str, help='Email required', required=True)
registerParser.add_argument('password', type=str, help='Password required', required=True)

class Register(Resource):
    def post(self):
        args = registerParser.parse_args()
        return {"message" : args}


productParser = reqparse.RequestParser()
productParser.add_argument('name', type=str, help='Product name required', required=True)
productParser.add_argument('image', type=str, help='Product image required', required=True)
productParser.add_argument('price', type=float, help='Product price required', required=True)
productParser.add_argument('reviews', type=list)
productParser.add_argument('description', type=str, help='Product description required', required=True)
productParser.add_argument('tags', type=list) #required? or can just pass empty list?
productParser.add_argument('original_stock', type=int, help='Product original stock required', required=True)
productParser.add_argument('current_stock', type=int) #required?

class Product(Resource):
    # add product
    def post(self, product_id):
        # make abort_if_product_exists
        doc_ref = db.collection(u'products').document(product_id)   #?
        args = productParser.parse_args()
        doc_ref.set({
            u'name': args['name'],
            u'image': args['image'],
            u'price': args['price'],
            u'reviews': args['reviews'],
            u'description': args['description'],
            u'tags': args['tags'],
            u'original_stock': args['original_stock'],
            u'current_stock': args['current_stock']
        })

        return {"message" : "Success"}
    
    # edit product
    # def put

    # get product info
    # def get




api.add_resource(HelloWorld, "/helloworld/<string:name>")
api.add_resource(FireTest, "/firetest")
api.add_resource(Register, "/auth/register")
api.add_resource(Product, "/product/<string:product_id>")

if __name__ == "__main__":
    app.run(debug=True)