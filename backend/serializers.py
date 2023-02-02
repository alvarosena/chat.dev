from flask_marshmallow import Marshmallow

serializers = Marshmallow()

class UserSchema(serializers.Schema):
    class Meta:
        fields = ('id', 'name', 'profile_pic', 'email', 'github_id', 'created_at')

class MessageSchema(serializers.Schema):
    class Meta:
        fields = ('id', 'text', 'author_id', 'created_at')