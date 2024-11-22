from flask import Blueprint, request, jsonify, render_template, session, redirect, url_for
from ..database.db import db

admin = Blueprint('admin', __name__)

@admin.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        dados = request.json

        if (not 'usuario' in dados) or (not 'senha' in dados):
            return jsonify({'ok': False, 'mensagem': 'Parâmetro obrigatório não especificado.'}), 400 
        
        usuario = db.query('SELECT * FROM administradores WHERE usuario = %s AND senha = SHA2(%s, 256);', dados['usuario'], dados['senha'])

        if not usuario:
            return jsonify({'ok': False, 'mensagem': 'Usuário não encontrado ou senha incorreta.'}), 403 
        
        session['usuario'] = usuario[0]['usuario']

        return jsonify({'ok': True, 'mensagem': 'Usuário autenticado.'}), 200

    return render_template('login.html')

@admin.route('/newsletter')
def newsletter():
    if not 'usuario' in session:
        return redirect(url_for('admin.login'))
    return render_template('newsletter-menu.html')

@admin.route('/newsletter/e-mail/<int:id>')
def email(id):
    return render_template('e-mail.html')