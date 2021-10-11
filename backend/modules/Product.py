from flask_restful import Resource, reqparse
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred, name='products')
db = firestore.client(default_app)

productParser = reqparse.RequestParser()
productParser.add_argument('product_id', type=str)
productParser.add_argument('name', type=str, help='Product name required')
productParser.add_argument('category', type=str)
# productParser.add_argument('sub-category', type=str)
productParser.add_argument('image', type=list)    # List because there can be multiple images
productParser.add_argument('price', type=float)
productParser.add_argument('reviews', type=list)
productParser.add_argument('description', type=str)
productParser.add_argument('tag', type=str)
productParser.add_argument('units_sold', type=int)

def checkArgs(args):
    if args.name is None:
        return {'error': 'product name required'}
    if args.category is None:
        return {'error': 'product category required'}
    if args.image is None:
        return {'error': 'product image required'}
    if args.price is None:
        return {'error': 'product price required'}
    if args.description is None:
        return {'error': 'product description required'}
    if args.tag is None:
        return {'error': 'product tag required'}
    return

class Product(Resource):
    def get(self):  # GET PRODUCT INFO
        args = productParser.parse_args()
        if args.product_id is None:
            return {'error': 'product id required'}

        doc_ref = db.collection(u'products').document(args.product_id)
        doc = doc_ref.get()
        if doc.exists:
            return {'data': doc.to_dict()}
        else:
            return {'error': 'product doesn\'t exist'}, 400

    def post(self): # ADD PRODUCT
        doc_ref = db.collection(u'products')
        args = productParser.parse_args()
        args_check = checkArgs(args)

        if args_check:
            return args_check
        
        if args.units_sold is None:
            args.units_sold = 0
        
        if args.reviews is None:
            args.reviews = []

        doc_ref.add({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tag': args.tag,
            u'units_sold': args.units_sold
        })

        return {'message' : 'product added successfully : {0}'.format(args.name)}
    
    def put(self):  # EDIT PRODUCT
        args = productParser.parse_args()
        if args.product_id is None:
            return {'error': 'product id required'}
        
        args_check = checkArgs(args)
        if args_check:
            return args_check

        doc_ref = db.collection(u'products').document(args.product_id)
        doc = doc_ref.get()
        if doc.exists is not True:
            return {'error': 'product doesn\'t exist'}

        doc_ref.update({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tag': args.tag,
            u'units_sold': args.units_sold
        })

        return {'message' : 'product updated successfully : {0}'.format(args.name)}
    
    def delete(self):   # DELTE PRODUCT
        args = productParser.parse_args()
        if args.product_id is None:
            return {'error': 'product id required'}

        doc_ref = db.collection(u'products').document(args.product_id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.delete()
            # also need to delete images
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
