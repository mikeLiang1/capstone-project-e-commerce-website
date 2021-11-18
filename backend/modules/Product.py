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
productParser.add_argument('image', type=str)
productParser.add_argument('price', type=float)
productParser.add_argument('reviews', type=dict, action='append')
productParser.add_argument('review', type=dict)
productParser.add_argument('description', type=str)
productParser.add_argument('tag', type=str)
productParser.add_argument('units_sold', type=int)
productParser.add_argument('review_ids', type=int)

# Helper function to check all args
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

class Product_get(Resource):
    def get(self, productID):  # GET PRODUCT INFO

        doc_ref = db.collection(u'products').document(productID)
        doc = doc_ref.get()
        if doc.exists:
            return {'data': doc.to_dict()}
        else:
            return {'error': 'product doesn\'t exist'}, 400


class Product(Resource):

    def post(self): # ADD PRODUCT
        args = productParser.parse_args()
        
        args_check = checkArgs(args)

        if args_check:
            return args_check
        
        if args.units_sold is None:
            args.units_sold = 0
        
        if args.reviews is None:
            args.reviews = []
            
        doc_ref = db.collection(u'products')
        result = doc_ref.add({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': args.reviews,
            u'description': args.description,
            u'tag': args.tag,
            u'units_sold': args.units_sold,
            u'review_ids': 0,
            u'visited': 0
        })
        
        return {'message' : 'product added successfully : {0}'.format(result[1].id)}
    
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
        
        if not args.reviews:
            newReviews = []
        else:
            newReviews = args.reviews

        if args.review is not None:
            if newReviews is None:
                newReviews = []
            newReviews.append(dict(args.review))

        doc_ref.update({
            u'name': args.name,
            u'category': args.category,
            u'image': args.image,
            u'price': args.price,
            u'reviews': newReviews,
            u'description': args.description,
            u'tag': args.tag,
            u'units_sold': args.units_sold,
            u'review_ids': args.review_ids
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
            return {'message': 'product deleted successfully'}
        else:
            return {'error': 'product doesn\'t exist'}, 400

# given a range (min, max), return a list of product id 
class Product_range(Resource):
    def get(self, min, max):
        product_list = []
        doc_ref = db.collection(u'products')
        first_query = doc_ref.limit(max-min)

        results = first_query.stream()
        for doc in results:
            product_list.append({"content": doc.to_dict(), "id": doc.id})        

        return {'products': product_list}

class Product_visited(Resource):
    # add 1 to visited
    def post(self, productID):
        previous = 0
        docs = db.collection(u'products').stream()
        for doc in docs:
            if doc.id == productID:
                previous = doc.get("visited")
        previous += 1

        doc_ref = db.collection(u'products').document(productID)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({u'visited': previous})

            return {"message": previous}

        else:
            return {"message": "product id doesnt exist"}, 400
    
class Get_product_visited(Resource):
    # gets 10 of the most visited products
    def get(self):
        product_list = []
        doc_ref = db.collection(u'products')
        query = doc_ref.order_by(u'visited', direction=firestore.Query.DESCENDING).limit(10)
        results = query.stream()

        for doc in results:
            product_list.append({"content": doc.to_dict(), "id": doc.id})        

        return {'products': product_list}
    
    # code to add visited to all products
    def post(self):
        array = []
        docs = db.collection(u'products')
        #print(docs.get())
        for doc in docs.get():
            array.append(doc.id)
            
        for doc in array:
            
            doc_ref = db.collection(u'products').document(doc)
            doc_ref.update({u'visited': 0})

class get_recommend_product(Resource):
    #get users purchase history and return list of products with same tags/categories
    def get(self, productID): 
        
        recommended = []
        categories = {}

        # for product, add category and id to dict {"charger": "asdn34234"}    
       
        doc_ref = db.collection(u'products').document(productID)
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

# Get all products
class Product_all(Resource):
    def get(self):
        product_list = []
        
        docs = db.collection('products').stream()
        
        for doc in docs:
            info = doc.to_dict()
            product_list.append({"category": info['category'], "id": doc.id, "title": info['name']}) 
        
        return {"products": product_list}
