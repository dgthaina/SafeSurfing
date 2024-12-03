from flask import Blueprint, jsonify, request
from ..database.db import db

email = Blueprint('e-mail', __name__)

@email.route('/<int:id>')
def buscar_email(id):
    resultado = db.query('SELECT * FROM emails WHERE id = %s;', id)

    if not resultado:
        return jsonify({'ok': False, 'mensagem': 'Recurso não encontrado'}), 404
    
    return jsonify({'ok': True, 'resultado': resultado[0]}), 200

@email.route('/', methods=['POST'])
def criar_email():
    dados = request.json

    if 'titulo' not in dados:
        return jsonify({'ok': False, 'mensagem': 'Parâmetro obrigatório não informado.'}), 400
    
    db.query('INSERT INTO emails (titulo) VALUES (%s);', dados['titulo'])

    id = db.query('SELECT id FROM emails ORDER BY id DESC LIMIT 1;')[0]['id']

    return jsonify({'ok': True, 'id': id}), 201