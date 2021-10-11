from flask import Flask
from flask_restful import Api, Resource, reqparse
import pyrebase
from firebase_admin import credentials, firestore, initialize_app

from modules.HelloWorld import HelloWorld

app = Flask(__name__)
api = Api(app)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()


class FireTest(Resource):
    def post(self):
        doc_ref = db.collection(u'users').document(u'alovelace')
        doc_ref.set({
            u'first': u'Ada',
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
        

api.add_resource(HelloWorld, "/helloworld/<string:name>")
api.add_resource(FireTest, "/firetest")
api.add_resource(Register, "/auth/register")

if __name__ == "__main__":
    app.run(debug=True)