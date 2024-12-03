from flask import Blueprint
from .chat import chat
from .email import email

api = Blueprint('api', __name__)

api.register_blueprint(chat, url_prefix='/chat')
api.register_blueprint(email, url_prefix='/e-mail')
