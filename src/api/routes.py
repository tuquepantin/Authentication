"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


@api.route('/user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)

        if email is None or password is None:
            return jsonify("You need an email and a password"), 400

        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            user = User(email=email, password=password, salt=salt)
            db.session.add(user)
            try:
                db.session.commit()
                return jsonify({"message": "User created"}), 201
            except Exception as err:
                print(err.args)
                db.session.rollback()
                return jsonify({"message": f"error: {err.args}"}), 500


@api.route("/user", methods=["GET"])
@jwt_required()
def get_user_data():

    user_id= get_jwt_identity()
    user= User.query.get(user_id)
    return jsonify({"user": user.serialize()}), 200


@api.route("/login", methods=["POST"])
def handle_login():
    if request.method == "POST":
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)

        if email is None or password is None:
            return jsonify("You need an email and a password"), 400
        else:
            user = User.query.filter_by(email=email).one_or_none()
            if user is None:
                return jsonify({"message": "Bad credentials"}), 400
            else:
                if check_password(user.password, password, user.salt):
                    token = create_access_token(identity=user.id)
                    return jsonify({"token": token}), 200
                else:
                    return jsonify({"message": "Bad credentials"}), 400