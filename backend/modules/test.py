from flask_restful import Resource, reqparse
from flask_restful import Api, Resource, reqparse

testParser = reqparse.RequestParser()
testParser.add_argument('name', type=str, help='Product name required', required=True)
testParser.add_argument('category', type=str, help='Category name required', required=True)
testParser.add_argument('image', type=str, help='Image name required', required=True)
testParser.add_argument('price', type=str, help='Product name required', required=True)
testParser.add_argument('description', type=str,help='Description name required', required=True)
testParser.add_argument('tag', type=str, help='Tag name required', required=True)


class Test(Resource):

    def post(self): # ADD PRODUCT
        print("hello")

        args = testParser.parse_args()
        
        print(args)
        
        return