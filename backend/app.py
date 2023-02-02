import os
from flask import Flask, jsonify
from urls import urlpatterns
from models import db
from serializers import serializers
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('SQLALCHEMY_DATABASE_URI')
db.init_app(app)
urlpatterns(app)
serializers.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
io = SocketIO(app)

@app.route('/')
def endpoints():
    data = ['/api/v1/users', '/api/v1/messages']

    return jsonify(data)

if __name__ == '__main__':
    io.run(app)