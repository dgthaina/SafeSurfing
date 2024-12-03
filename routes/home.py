from flask import Blueprint, render_template, request, jsonify
from ..database.db import db
import uuid
import re

home = Blueprint('home', __name__)

@home.route('/')
def home_handler():
    return render_template('index.html')

@home.route('/newsletter', methods=['POST'])
def cadastrar_email():
    dados = request.json

    if 'e-mail' not in dados:
        return jsonify({'ok': False, 'mensagem': 'Parâmetro "e-mail" não especificado.'}), 400

    padrao_email = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"

    if not re.match(padrao_email, dados['e-mail']):
        return jsonify({'ok': False, 'mensagem': 'E-mail inválido.'}), 400
    
    inscritos = db.query('SELECT * FROM inscritos WHERE email = %s;', dados['e-mail'])

    if inscritos:
        return jsonify({'ok': False, 'mensagem': 'E-mail já inscrito.'}), 400

    try:
        db.query('INSERT INTO inscritos VALUES (%s, %s);', dados['e-mail'], uuid.uuid4())
    except:
        return jsonify({'ok': False, 'mensagem': 'Houve um erro ao tentar realizar a inscrição.'}), 500
    
    return jsonify({'ok': True, 'mensagem': 'E-mail inscrito.'}), 201
