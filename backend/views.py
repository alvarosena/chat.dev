import os
from flask import Blueprint, request, jsonify, redirect
from models import db, User, Message
import requests
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from serializers import UserSchema, MessageSchema
import app

GITHUB_CLIENT_ID = os.environ.get('GITHUB_CLIENT_ID')
GITHUB_CLIENT_SECRET = os.environ.get('GITHUB_CLIENT_SECRET')

api_view = Blueprint('api_view', __name__)

@api_view.route('/github')
def github():
    return redirect(f'https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}')

@api_view.route('/users', methods=['POST'])
def auth_user():   
    code = request.json['code']

    url = 'https://github.com/login/oauth/access_token'
    params = {  
        'client_id': GITHUB_CLIENT_ID,
        'client_secret': GITHUB_CLIENT_SECRET,
        'code': code
    }

    r = requests.post(url, params=params, headers={
        'Accept': 'application/json'
    })

    data = r.json()
    access_token = data['access_token']

    github_user = requests.get('https://api.github.com/user', headers={
        'Authorization': f'bearer {access_token}'
    }) 

    user_data = github_user.json()
    
    user = User.query.filter_by(github_id=user_data['id']).first()

    if not user:
        user = User(
            name=user_data['name'],
            profile_pic=user_data['avatar_url'],
            email=user_data['email'],
            github_id=user_data['id']
        )

        db.session.add(user)
        db.session.commit()

    token = create_access_token(identity=user.id)

    serializer = UserSchema()

    result = {
        'developer': serializer.dump(user),
        'access_token': token
    }        

    return jsonify(result), 201

@api_view.route('/messages', methods=['POST'])
@jwt_required()
def message_create():
    user_id = get_jwt_identity()
    text = request.json['text']

    message = Message(text=text, author_id=user_id)
    db.session.add(message)
    db.session.commit()
    serializer = MessageSchema()

    result = serializer.dump(message)

    app.io.emit('new_message', result)

    return result
