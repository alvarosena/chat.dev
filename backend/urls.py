from views import api_view

def urlpatterns(app):
    app.register_blueprint(api_view, url_prefix='/api/v1')