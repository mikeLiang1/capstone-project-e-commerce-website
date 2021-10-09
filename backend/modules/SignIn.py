from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app
from urllib.error import HTTPError
from pprint import pprint

import pyrebase

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

parser = reqparse.RequestParser()
parser.add_argument('email', type=str, help='Email required', required=True)
parser.add_argument('password', type=str, help='Password required', required=True)

class SignIn(Resource):
    
    # Sign in with email, password
    # Returns a token 
    def post(self):
        args = parser.parse_args()
        
        try:
            user = authP.sign_in_with_email_and_password(args.email, args.password)
        except:
            # TODO: Send back actual message
            return {"message" : "Sign in failed"}, 400
        
        return {"message" : "User signed in successfully", "idToken" : user['idToken']}