from flask import Blueprint, request, jsonify, session, current_app
import os
import uuid

chat = Blueprint('chat', __name__)

@chat.route('/perguntar', methods=['POST'])
def perguntar():
    dados = request.json
    
    if not 'pergunta' in dados:
        return jsonify({'ok': False, 'mensagem': 'Parâmetro "pergunta" não especificado.'}), 400

    if (not 'chat' in session) or (not session['chat'] in current_app.chats):
        id = str(uuid.uuid4())
        current_app.chats[id] = current_app.model.start_chat()
        session['chat'] = id

    chat = current_app.chats[session['chat']]

    resposta = chat.send_message([dados['pergunta']])

    return jsonify({'ok': True, 'mensagem': 'Resposta gerada.', 'resposta': resposta.text})
