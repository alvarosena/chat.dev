from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import uuid

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String)
    profile_pic = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    github_id = db.Column(db.String, unique=True)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    messages = db.relationship('Message')

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    text = db.Column(db.String)
    author_id = db.Column(db.String, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    
