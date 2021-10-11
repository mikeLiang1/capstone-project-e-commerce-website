from flask import Flask, app
from flask_restful import Api, Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app, storage
import random

# Initialize Firestore DB
cred = credentials.Certificate('key.json')

default_app = initialize_app(cred, {
    'storageBucket': 'nocta-tech.appspot.com'
}, name='mystery_box')
db = firestore.client(default_app)


# bucket = storage.bucket(app=default_app)
# blob = bucket.blob('nocta.png')
# policy = bucket.get_iam_policy(requested_policy_version=3)
# policy.bindings.append(
#     {"role": "roles/storage.objectViewer", "members": {"allUsers"}}
# )
# bucket.set_iam_policy(policy)
# print(blob.public_url)

class mystery_box(Resource):
    def get(self, box_name):
        doc_ref = db.collection(u'mystery_box').document(box_name)
        doc = doc_ref.get()
        if doc.exists:
            return {"box data": doc.to_dict()}
            
        else:
            return {"error" : "box doesnt exist"}, 400

class mystery_box_open(Resource):
    def get(self, box_name):
        doc_ref = db.collection(u'mystery_box').document(box_name)
        doc = doc_ref.get()
        if doc.exists:
            info = doc.to_dict().get('Products')
            item_list = []
            weights = []
            for item in info:
                item_list.append(item)
                weights.append(info[item])
            return {"opened": random.choices(item_list, weights, k=1), "possible": item_list}
            
        else:
            return {"error" : "box doesnt exist"}, 400
         