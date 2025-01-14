from flask import Blueprint, jsonify, request, json, render_template, session, redirect, url_for
from ..database.db import db
from ..services.email_server import smtp_server
import os

email = Blueprint('e-mail', __name__)

@email.route('/<int:id>')
def buscar_email(id):
    if 'usuario' not in session:
        return redirect(url_for('admin.login'))
    
    resultado = db.query('SELECT * FROM emails WHERE id = %s;', id)

    if not resultado:
        return jsonify({'ok': False, 'mensagem': 'Recurso não encontrado'}), 404
    
    resultado = resultado[0]

    if resultado['conteudo'] is not None:
        resultado['conteudo'] = json.loads(resultado['conteudo'])

    return jsonify({'ok': True, 'resultado': resultado}), 200

@email.route('/', methods=['POST'])
def criar_email():
    if 'usuario' not in session:
        return redirect(url_for('admin.login'))
    
    dados = request.json

    if 'titulo' not in dados:
        return jsonify({'ok': False, 'mensagem': 'Parâmetro obrigatório não informado.'}), 400
    
    db.query('INSERT INTO emails (titulo) VALUES (%s);', dados['titulo'])

    id = db.query('SELECT id FROM emails ORDER BY id DESC LIMIT 1;')[0]['id']

    return jsonify({'ok': True, 'id': id}), 201

@email.route('/', methods=['PUT'])
def atualizar_email():
    if 'usuario' not in session:
        return redirect(url_for('admin.login'))
    
    dados = request.json

    parametros = ['id', 'titulo', 'conteudo']

    for parametro in parametros:
        if parametro not in dados:
            return jsonify({'ok': False, 'mensagem': 'Parâmetro obrigatório não especificado.'}), 400

    db.query('UPDATE emails SET titulo = %s, conteudo = %s WHERE id = %s;', dados['titulo'], str(json.dumps(dados['conteudo'])), dados['id'])

    return jsonify({'ok': True}), 200

@email.route('/enviar', methods=['POST'])
def enviar():
    if 'usuario' not in session:
        return redirect(url_for('admin.login'))
    
    dados = request.json

    if 'id' not in dados:
        return jsonify({'ok': False, 'mensagem': 'Parâmetro obrigatório não especificado.'}), 400
    
    ids = [email['id'] for email in db.query('SELECT id FROM emails;')]
    
    if dados['id'] not in ids:
        return jsonify({'ok': False, 'mensagem': f'Não há e-mails identificados com "{dados['id']}".'}), 400
    
    inscritos = db.query('SELECT * FROM inscritos;')

    dados_email = db.query('SELECT * FROM emails WHERE id = %s;', dados['id'])[0]

    dados_email['conteudo'] = json.loads(dados_email['conteudo'])

    prefixo_site = os.environ.get('WEBSITE_PREFIX')

    try:
        for inscrito in inscritos:
            codigo_inscrito = inscrito['codigo']
            smtp_server.send_email(dados_email['titulo'], render_template('e-mail-template.html', dados_email=dados_email, prefixo_site=prefixo_site, codigo_inscrito=codigo_inscrito), inscrito['email'],)
    except:
        return jsonify({'ok': False, 'mensagem': 'Não foi possível enviar o e-mail.'}), 400

    db.query('UPDATE emails SET enviado = true WHERE id = %s;', dados['id'])

    return jsonify({'ok': True}), 200
    