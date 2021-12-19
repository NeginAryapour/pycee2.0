from flask import Flask, request, jsonify
from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)

from main import main



def create_app():
    app = Flask(__name__)
    CORS(app)
    @app.route("/", methods=['POST', 'GET'])
    def home():
        code = str(request.json["code"])
        error = str(request.json["error"])
        result = main(error=error, code=code) 
        return result
    
    app.run()

    

    