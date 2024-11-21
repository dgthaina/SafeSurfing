from flask import Blueprint, render_template

admin = Blueprint('admin', __name__)

@admin.route('/login')
def login():
    return render_template('login.html')

@admin.route('/newsletter')
def newsletter():
    return render_template('newsletter-menu.html')

@admin.route('/newsletter/e-mail/<int:id>')
def email(id):
    return render_template('e-mail.html')