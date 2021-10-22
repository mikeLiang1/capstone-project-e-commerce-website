from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

import pyrebase

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='user')
db = firestore.client(default_app)

parser = reqparse.RequestParser()
parser.add_argument('uid', type=str, help='User ID required', required=True)
parser.add_argument('fname', type=str)
parser.add_argument('lname', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)
parser.add_argument('address', type=str)
parser.add_argument('purchaseHistory', type= list)
parser.add_argument('productId', type=str)
parser.add_argument('productQuantity', type=int)
parser.add_argument('productImage', type=str)
parser.add_argument('productName', type=str)
parser.add_argument('productPrice', type=int)

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

class User_Get(Resource):
    # Get user info
    def get(self, uid):

        info = authP.get_account_info(uid)
        
        email = info['users'][0]['email']

        doc_ref = db.collection(u'users').document(email)
        
        if user_exists(doc_ref):
            return {"id": doc_ref.get().id, "content": doc_ref.get().to_dict()}
        else:
            return {"message": "User ID is not valid"}, 400

class User(Resource):
    
    # Update User Info
    def put(self):
        
        args = parser.parse_args()
        
        info = authP.get_account_info(args.uid)
        
        email = info['users'][0]['email']
        
        doc_ref = db.collection(u'users').document(email)
        doc = doc_ref.get()
        if doc.exists is not True:
            return {'error': 'User ID is not valid'}, 404
            
        if args.fname != None:
            doc_ref.update({
                u'first': args.fname
            })
        
        if args.lname != None:
            doc_ref.update({
                u'last': args.lname
            })
        
        if args.email != None:
            doc_ref.update({
                u'email' : args.email
            })
        
        if args.address != None:
            doc_ref.update({
                u'adress' : args.address
            })
    
        if args.purchaseHistory != None:
            doc_ref.update({
                u'purchase history': args.purchaseHistory
            })

        return {'message' : 'User updated successfully'}
        
class User_add_productID(Resource):
    # given a productid, add to users purchase history
    def post(self, productID):
        args = parser.parse_args()
        
        info = authP.get_account_info(args.uid)
        
        email = info['users'][0]['email']
        
        doc_ref = db.collection(u'users').document(email)

        if user_exists(doc_ref):
            doc_ref.update({u'purchase_history': firestore.ArrayUnion([productID])})

            return {"message": "Success"}

        else:
            return {"message": "User ID is not valid"}, 400

class User_get_cart(Resource):
    def get(self, uid):
        # Get the user's information
        info = authP.get_account_info(uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            cart = doc.to_dict().get('cart')
            return {"cart": cart}

# Requires:
# uid, productId, productQuantity
class User_cart(Resource):
    def post(self):
        args = parser.parse_args()
        # Get the user's information
        info = authP.get_account_info(args.uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            cart = doc.to_dict().get('cart')
            # Confirms that the product has been added/updated in the user's cart
            addConfirmed = False
            # Check if product exists in the user's cart
            for item in cart:
                # If the product exists in the user's cart, update the quantity
                if item.get("product") == args.productId:
                    # Add the new quantity to the existing quantity in the cart
                    # Since there is currently no way to update a single array element (let alone a field in a specific
                    # dictionary in an array of dictionaries - which in this case "cart" is an array of dictionaries),
                    # we must first delete the array element corresponding to the product (that exists in the cart), 
                    # and then add it back with the new quantity
                    # 1. Save the existing quantity of the product that already exists in the cart
                    existingQuantity = item['quantity']
                    # 2. Delete the array element (the product from the cart)
                    doc_ref.update({u"cart": firestore.ArrayRemove([{"product": args.productId, "quantity": existingQuantity,
                    "name": args.productName, "image": args.productImage, "price": args.productPrice}])})
                    # doc_ref.update({u"cart": filter(lambda itemId: itemId != args.productId,doc.get('cart'))})
                    # 3. Add the product back to the cart with the updated quantity
                    newQuantity = existingQuantity + args.productQuantity
                    doc_ref.update({u"cart": firestore.ArrayUnion([{"product": args.productId, "quantity": newQuantity}])})
                    addConfirmed = True
            # The product doesn't exist in the user's cart, so add it to the user's cart
            if addConfirmed == False:
                doc_ref.update({u"cart": firestore.ArrayUnion([{"product": args.productId, "quantity": args.productQuantity,
                "name": args.productName, "image": args.productImage, "price": args.productPrice}])})
                addConfirmed = True
            return {"message": "Added to Cart!"}
        else:
            return {"message": "User ID is not valid"}, 400

    def delete(self):
        args = parser.parse_args()
        # Get the user's information
        info = authP.get_account_info(args.uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            cart = doc.to_dict().get('cart')
            # Confirms that the product has been removed from the user's cart
            removeConfirmed = False
            # Check if product exists in the user's cart
            for item in cart:
                # If the product exists in the user's cart, update the quantity
                if item.get("product") == args.productId:
                    # Save the existing quantity of the product that already exists in the cart
                    existingQuantity = item['quantity']
                    # Remove the item from the cart
                    doc_ref.update({u"cart": firestore.ArrayRemove([{"product": args.productId, "quantity": existingQuantity, 
                    "name": args.productName, "image": args.productImage, "price": args.productPrice}])})
                    removeConfirmed = True
                    return {"message": "Removed from Cart!"}
            # The product doesn't exist in the user's cart, so failed to remove
            if removeConfirmed == False:
                return {"message": "Error! Failed to remove item from the cart."}, 400

def user_exists(doc_ref):
    doc = doc_ref.get()
    return doc.exists
