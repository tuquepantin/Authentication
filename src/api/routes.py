"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(password_hash, password, salt):
    return check_password_hash(password_hash, f"{password}{salt}")


@api.route('/user', methods=['POST'])
def add_user():

    if request.method == "POST":
        body = request.json
        email= body.get('email', None)
        password= body.get('password', None)

        if email is None or password is None:
            return jsonify({"msg": "porfavor rellenar datos"}), 400
        
        else:
            salt= 1
            user= User(email=email, password=password, salt=salt)
            db.session.add(user)
            try:
                db.session.commit()
                return jsonify({"msg": "user created"}), 201
            except Exception as err:
                print(err.args)
                db.session.rollback()
                return jsonify({"msg": f"{err.args}"}), 500