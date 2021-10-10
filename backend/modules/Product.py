from flask_restful import Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='products')
db = firestore.client(default_app)

productParser = reqparse.RequestParser()
productParser.add_argument('name', type=str, help='Product name required', required=True)
productParser.add_argument('category', type=str)
# productParser.add_argument('sub-category', type=str)
productParser.add_argument('image', type=list, help='Product image required', required=True)    # List because there can be multiple images
productParser.add_argument('price', type=float, help='Product price required', required=True)
productParser.add_argument('reviews', type=list)
productParser.add_argument('description', type=str, help='Product description required', required=True)
productParser.add_argument('tag', type=str) #required? or can just pass empty list?
productParser.add_argument('original_stock', type=int, help='Product original stock required', required=True)
productParser.add_argument('current_stock', type=int, help='Product current stock required', required=True)

class Product(Resource):
    def get(self, product_id):  # GET PRODUCT INFO
        doc_ref = db.collection(u'products').document(product_id)
        doc = doc_ref.get()
        if doc.exists:
            return {'data': doc.to_dict()}
        else:
            return {'error': 'product doesn\'t exist'}, 400

    def post(self, product_id): # ADD PRODUCT
        doc_ref = db.collection(u'products')

        args = productParser.parse_args()
        doc_ref.add({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tag': args.tag,
            u'original_stock': args.original_stock,
            u'current_stock': args.current_stock
        })

        return {'message' : 'product added successfully : {0}'.format(args.name)}
    
    def put(self, product_id):  # EDIT PRODUCT
        doc_ref = db.collection(u'products').document(product_id)
        doc = doc_ref.get()
        if doc.exists is not True:
            return {'error': 'product doesn\'t exist'}

        args = productParser.parse_args()
        doc_ref.update({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tag': args.tag,
            u'original_stock': args.original_stock,
            u'current_stock': args.current_stock
        })

        return {'message' : 'product updated successfully : {0}'.format(args.name)}
    
    def delete(self, product_id):   # DELTE PRODUCT
        doc_ref = db.collection(u'products').document(product_id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.delete()
            return {'message': 'product deleted successfully'}
        else:
            return {'error': 'product doesn\'t exist'}, 400

# given a range (min, max), return a list of product id 
class Product_range(Resource):
    def get(self, min, max):
        product_list = []
        doc_ref = db.collection(u'products')
        first_query = doc_ref.limit(max-min)

        docs = first_query.stream()
        for doc in docs:
            product_list.append(doc.to_dict())        

        return {'products': product_list}
