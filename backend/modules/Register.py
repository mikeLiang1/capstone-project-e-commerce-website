from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

import pyrebase

import re


# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='register')
db = firestore.client(default_app)

# Pyrebase
config = {
  "apiKey": "AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI",
  "authDomain": "nocta-tech.firebaseapp.com",
  "databaseURL": "https://nocta-tech.firebaseio.com",
  "storageBucket": "nocta-tech.appspot.com",
  "serviceAccount": "key.json"
}

firebase = pyrebase.initialize_app(config)
authP = firebase.auth()

registerParser = reqparse.RequestParser()
registerParser.add_argument('fname', type=str, help='First name required')
registerParser.add_argument('lname', type=str, help='Last name required', required=True)
registerParser.add_argument('email', type=str, help='Email required', required=True)
registerParser.add_argument('password', type=str, help='Password required', required=True)

class Register(Resource):
    
    # Register with email, password, first name and last name
    # Returns a token 
    def post(self):
        args = registerParser.parse_args()
        
        # Check if email has @
        if not re.match(r"[^@]+@[^@]+\.[^@]+", args.email):
            return {"message": "Email is not valid"}, 400
            
        # Change email to all lowercase
        args.email = args.email.lower()
        
        try:
            user = authP.create_user_with_email_and_password(args.email, args.password)
        except Exception as exc:
            print(exc)
            return {"message": "failed"}, 400
        
        # Put user information into database
        # Email is the primary key
        doc_ref = db.collection(u'users').document(args.email)
        doc_ref.set({
            u'first': args.fname,
            u'last': args.lname,
            u'address': None,
            u'purchase_history': [],
            u'admin': False,
            u"cart": []
        })
        
        # When registered, you are signed in
        user = authP.sign_in_with_email_and_password(args.email, args.password)
        print(user)
        
        return {"message" : "User created successfully", "idToken" : user['idToken']}