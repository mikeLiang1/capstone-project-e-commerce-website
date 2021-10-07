from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import auth

import re

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='register')
db = firestore.client(default_app)

registerParser = reqparse.RequestParser()
registerParser.add_argument('fname', type=str, help='First name required', required=True)
registerParser.add_argument('lname', type=str, help='Last name required', required=True)
registerParser.add_argument('email', type=str, help='Email required', required=True)
registerParser.add_argument('password', type=str, help='Password required', required=True)

class Register(Resource):
    
    # Sign in with email, password, first name and last name
    # Returns a token 
    def post(self):
        args = registerParser.parse_args()
        
        # Check if email has @
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", args.email):
            return {"message": "Email is not valid"}, 400
        
        user = auth.create_user(email = args.email, password = args.password, display_name = args.fname)
        
        # TODO: error handling
        
        # Put user information into database
        doc_ref = db.collection(u'users').document(user.uid)
        doc_ref.set({
            u'first': args.fname,
            u'last': args.lname,
            u'address': None,
            u'purchase history': [],
            u'admin': False
        })
        
        # When registered, you are signed in
        token = auth.create_custom_token(user.uid)
        
        return {"message" : "User created succesffuly", "id" : user.uid, "token": token.decode("utf-8")}