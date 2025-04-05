
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import os
from models import Database, User, Strategy

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret')  # Change in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

# Initialize database
db = Database()
user_model = User(db)
strategy_model = Strategy(db)

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "API is running"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = user_model.authenticate(username, password)
    
    if user:
        access_token = create_access_token(identity=user['id'])
        return jsonify({
            "token": access_token,
            "user": {
                "id": user['id'],
                "username": user['username'],
                "email": user['email'],
                "role": user['role']
            }
        }), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400
    
    existing_user = user_model.get_user_by_username(username)
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409
    
    user = user_model.create_user(username, email, password)
    
    if user:
        access_token = create_access_token(identity=user['id'])
        return jsonify({
            "token": access_token,
            "user": {
                "id": user['id'],
                "username": user['username'],
                "email": user['email'],
                "role": user['role']
            }
        }), 201
    else:
        return jsonify({"error": "User creation failed"}), 500

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    user_id = get_jwt_identity()
    user = user_model.get_user_by_id(user_id)
    
    if not user or user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    users = user_model.get_all_users()
    return jsonify({"users": users}), 200

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = user_model.get_user_by_id(current_user_id)
    
    if not current_user or current_user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    success = user_model.delete_user(user_id)
    
    if success:
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"error": "User deletion failed"}), 404

@app.route('/api/strategies', methods=['GET'])
@jwt_required()
def get_strategies():
    user_id = get_jwt_identity()
    strategies = strategy_model.get_all_strategies()
    return jsonify({"strategies": strategies}), 200

@app.route('/api/strategies/<int:strategy_id>', methods=['GET'])
@jwt_required()
def get_strategy(strategy_id):
    strategy = strategy_model.get_strategy_by_id(strategy_id)
    
    if strategy:
        return jsonify({"strategy": strategy}), 200
    else:
        return jsonify({"error": "Strategy not found"}), 404

@app.route('/api/user/strategies', methods=['GET'])
@jwt_required()
def get_user_strategies():
    user_id = get_jwt_identity()
    strategies = strategy_model.get_user_strategies(user_id)
    return jsonify({"strategies": strategies}), 200

@app.route('/api/user/strategies/<int:strategy_id>', methods=['POST'])
@jwt_required()
def subscribe_to_strategy(strategy_id):
    user_id = get_jwt_identity()
    success = strategy_model.subscribe_to_strategy(user_id, strategy_id)
    
    if success:
        return jsonify({"message": "Successfully subscribed to strategy"}), 200
    else:
        return jsonify({"error": "Subscription failed"}), 400

@app.route('/api/user/strategies/<int:strategy_id>', methods=['DELETE'])
@jwt_required()
def unsubscribe_from_strategy(strategy_id):
    user_id = get_jwt_identity()
    success = strategy_model.unsubscribe_from_strategy(user_id, strategy_id)
    
    if success:
        return jsonify({"message": "Successfully unsubscribed from strategy"}), 200
    else:
        return jsonify({"error": "Unsubscription failed"}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
