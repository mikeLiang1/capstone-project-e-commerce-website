from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

from .Product import Product_get

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
parser.add_argument('productCategory', type=str)
parser.add_argument('orderPlaced', type=str)
parser.add_argument('deliveryInfo', type=str)
parser.add_argument('currentEmail', type=str)
parser.add_argument('newEmail', type=str)

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
                u'address' : args.address
            })
    
        if args.purchaseHistory != None:
            doc_ref.update({
                u'purchase history': args.purchaseHistory
            })

        return {'message' : 'User updated successfully'}
        
class User_add_productID(Resource):
    # given a productid, add to users purchase history
    def post(self):
        args = parser.parse_args()
        
        info = authP.get_account_info(args.uid)
        
        email = info['users'][0]['email']
        
        doc_ref = db.collection(u'users').document(email)

        if user_exists(doc_ref):
            doc_ref.update({u"purchase_history": firestore.ArrayUnion([{"product": args.productId, "quantity": args.productQuantity,
                "name": args.productName, "image": args.productImage, "price": args.productPrice, "orderPlaced": args.orderPlaced, "deliveryInfo": args.deliveryInfo, "category": args.productCategory}])})

            return {"message": "Success"}

        else:
            return {"message": "User ID is not valid"}, 400

class User_purchase_history(Resource):
    def get(self, uid):
        info = authP.get_account_info(uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            purchase_history = doc.to_dict().get('purchase_history')
            return {"purchase_history": purchase_history}


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

class User_cart(Resource):
    # When the user adds additional quantities of a product (already in their cart) to their cart again
    # Requires:  uid, productId, productQuantity, productName, productImage, productPrice   
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
            # Checks if the user has a mystery box in their cart
            containsMysteryBox = False
            # Check if the user is trying to add another mystery box to their cart when they already have one
            for item in cart:
                if item.get("category") == "Mystery Box":
                    containsMysteryBox = True
            # Check if the product is a mystery box, if it is, return a 400 error, because a user can only have 
            # ONE Mystery Box in their cart at a time.
            if containsMysteryBox == True and args.productCategory == "Mystery Box":
                return {"message": "Failed to add to cart! You already have a Mystery Box in your cart. Only one mystery box can be in the cart at a time"}, 400
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
                    "name": args.productName, "image": args.productImage, "price": args.productPrice, "category": args.productCategory}])})
                    # doc_ref.update({u"cart": filter(lambda itemId: itemId != args.productId,doc.get('cart'))})
                    # 3. Add the product back to the cart with the updated quantity
                    newQuantity = existingQuantity + args.productQuantity
                    doc_ref.update({u"cart": firestore.ArrayUnion([{"product": args.productId, "quantity": newQuantity,
                "name": args.productName, "image": args.productImage, "price": args.productPrice, "category": args.productCategory}])})
                    addConfirmed = True
            # The product doesn't exist in the user's cart, so add it to the user's cart
            if addConfirmed == False:
                doc_ref.update({u"cart": firestore.ArrayUnion([{"product": args.productId, "quantity": args.productQuantity,
                "name": args.productName, "image": args.productImage, "price": args.productPrice, "category": args.productCategory}])})
                addConfirmed = True
            return {"message": "Added to Cart!"}
        else:
            return {"message": "User ID is not valid"}, 400

    # When the user changes the quantity of an item in their cart on the CART PAGE
    # Requires: uid, productId, productQuantity
    def put(self):
        args = parser.parse_args()
        # Get the user's information
        info = authP.get_account_info(args.uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            cart = doc.to_dict().get('cart')
            # Confirms that the product has been added/updated in the user's cart
            changeConfirmed = False
            # Check if product exists in the user's cart
            for item in cart:
                # If the product exists in the user's cart, update the quantity
                if item.get("product") == args.productId:
                    # Save details of product
                    productId = item['product']
                    productName = item['name']
                    productImage = item['image']
                    productPrice = item['price']
                    productCategory = item['category']
                    # Update the new quantity of the product
                    # 1. Delete the array element (the product from the cart)
                    doc_ref.update({u"cart": firestore.ArrayRemove([{"product": item['product'], "quantity": item['quantity'],
                    "name": item['name'], "image": item['image'], "price": item['price'], "category": item['category']}])})
                    # 2. Add the product back to the cart with the updated quantity
                    newQuantity = args.productQuantity
                    doc_ref.update({u"cart": firestore.ArrayUnion([{"product": productId, "quantity": newQuantity,
                "name": productName, "image": productImage, "price": productPrice, "category": productCategory}])})
                    changeConfirmed = True
                    return {"message": "Successfully updated quantity of the product!"}
        if changeConfirmed == False:
            return {"message": "Failed to update quantity of product!"}


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
                # If the product exists in the user's cart, remove from cart
                if item.get("product") == args.productId:
                    # Remove the item from the cart
                    doc_ref.update({u"cart": firestore.ArrayRemove([{"product": args.productId, "quantity": item['quantity'], 
                    "name": item["name"], "image": item['image'], "price": item['price'], "category": item['category']}])})
                    removeConfirmed = True
                    return {"message": "Removed from Cart!"}
            # The product doesn't exist in the user's cart, so failed to remove
            if removeConfirmed == False:
                return {"message": "Error! Failed to remove item from the cart."}, 400

class get_recommend(Resource):
    #get users purchase history and return list of products with same tags/categories
    def get(self, uid): 
        
        recommended = []
        categories = {}
        # get users purchase history
        info = authP.get_account_info(uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            purchase_history = doc.to_dict().get('purchase_history')

        # for each in purchase history, add their category and id to dict {"charger": "asdn34234"}    
        for each in purchase_history:
            # If the product is a mystery box, skip it, as it is not in the "products" collection
            if each["category"] == "Mystery Box":
                continue
            doc_ref = db.collection(u'products').document(each["product"])
            doc = doc_ref.get()      
            if doc.to_dict().get("category") not in categories:
                categories[doc.to_dict().get("category")] = []
            categories[doc.to_dict().get("category")].append(doc.id)
            
        # for every product, check if product is same category as categories, and doesnt already exist
        docs = db.collection(u'products').stream()
        for doc in docs:
            # we found a product with same catefgory add to array
            if doc.get("category") in categories and doc.id not in categories[doc.get("category")]:
                recommended.append({"content": doc.to_dict(), "id": doc.id})
            
        print(recommended)
        return {"recommended_items": recommended}


class add_free_item(Resource):
    def post(self):
            
        args = parser.parse_args()
        productGet = Product_get()
        productInfo = productGet.get(args.productId)['data']
        # Get the user's information
        info = authP.get_account_info(args.uid)
        email = info['users'][0]['email']
        
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc = doc_ref.get()
            cart = doc.to_dict().get('cart')

            doc_ref.update({u"cart": firestore.ArrayUnion([{"product": args.productId, "quantity": 1,
            "name": '[Mystery Box] ' + productInfo['name'], "image": productInfo['image'], "price": 0, "category": productInfo["category"]}])})
            
            return {"message": "Added to Cart!"}
        else:
            return {"message": "User ID is not valid"}, 400

def user_exists(doc_ref):
    doc = doc_ref.get()
    return doc.exists

class remove_cart(Resource):
    def delete(self):
        args = parser.parse_args()
        # Get the user's information
        info = authP.get_account_info(args.uid)
        email = info['users'][0]['email']
        doc_ref = db.collection(u'users').document(email)
        if user_exists(doc_ref):
            doc_ref.update({u'cart': firestore.DELETE_FIELD})
            doc_ref.update({u'cart': []})

            return {"message": "cart successfully removed"}

class update_email(Resource):
    def post(self):
        args = parser.parse_args()
        # Get the user's data from their current email
        doc_ref = db.collection(u'users').document(args.currentEmail)
        doc = doc_ref.get()
        # Create a new document with their new email as the primary key, and put the data
        # from their current email into this
        doc_ref = db.collection(u'users').document(args.newEmail)
        doc_ref.set(doc.to_dict())
        # Delete the old email's data
        db.collection(u"users").document(args.currentEmail).delete()
