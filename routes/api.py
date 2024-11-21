from flask import Blueprint
from .chat import chat

api = Blueprint('api', __name__)

api.register_blueprint(chat, url_prefix='/chat')
