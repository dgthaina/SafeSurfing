from flask import Flask, request, render_template
import google.generativeai as genai
from .routes.home import home
from .routes.admin import admin
from .routes.api import api
import os

app = Flask(__name__)

app.register_blueprint(home)
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(api, url_prefix='/api')

app.secret_key = os.environ.get('SECRET_KEY')

@app.errorhandler(404)
def recurso_nao_encontrado(erro):
    return render_template('404.html'), 404

genai.configure(api_key=os.environ.get('GOOGLE_AI_API_KEY'))

with open('data/texto.txt', 'r', encoding="utf8") as arquivo:
    arquivo = arquivo.read()

app.model = genai.GenerativeModel('gemini-1.5-flash-002', system_instruction=os.environ.get('INSTRUCAO_SISTEMA') + arquivo)
app.chats = {}
