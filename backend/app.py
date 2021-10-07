from flask import Flask
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import auth

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
        
        # Verify inputs are valid
        
        user = auth.create_user(email = args.email, password = args.password, display_name = args.fname)
        
        # Put user information into database
        doc_ref = db.collection(u'users').document(user.uid)
        doc_ref.set({
            u'first': args.fname,
            u'last': args.lname,
            u'address': None,
            u'purchase history': [],
            u'admin': False
        })
        
        return {"message" : "User created succesffuly : {0}".format(user.uid)}

api.add_resource(HelloWorld, "/helloworld/<string:name>")
api.add_resource(FireTest, "/firetest")
api.add_resource(Register, "/auth/register")

if __name__ == "__main__":
    app.run(debug=True)