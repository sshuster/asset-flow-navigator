
import sqlite3
import json
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Database:
    def __init__(self, db_path="trading_strategies.db"):
        self.db_path = db_path
        self.create_tables()
    
    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def create_tables(self):
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            registration_date TEXT,
            last_login TEXT,
            status TEXT DEFAULT 'active'
        )
        ''')
        
        # Create strategies table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS strategies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            assets TEXT NOT NULL,
            performance TEXT NOT NULL,
            risk TEXT NOT NULL,
            creator TEXT NOT NULL,
            description TEXT,
            historical_data TEXT,
            creation_date TEXT
        )
        ''')
        
        # Create user_strategies table for many-to-many relationship
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_strategies (
            user_id INTEGER,
            strategy_id INTEGER,
            subscription_date TEXT,
            PRIMARY KEY (user_id, strategy_id),
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (strategy_id) REFERENCES strategies (id)
        )
        ''')
        
        # Create user preferences table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_preferences (
            user_id INTEGER PRIMARY KEY,
            asset_preferences TEXT,
            risk_tolerance TEXT,
            notification_settings TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        conn.commit()
        
        # Insert mock users if they don't exist
        self.insert_mock_data()
        
        conn.close()
    
    def insert_mock_data(self):
        # Check if mock users exist
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM users WHERE username IN ('muser', 'mvc')")
        count = cursor.fetchone()[0]
        
        if count < 2:
            # Insert mock users
            now = datetime.now().isoformat()
            
            # Insert 'muser' with role 'user'
            cursor.execute(
                "INSERT OR IGNORE INTO users (username, email, password_hash, role, registration_date, last_login, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                ('muser', 'muser@example.com', generate_password_hash('muser'), 'user', now, now, 'active')
            )
            
            # Insert 'mvc' with role 'admin'
            cursor.execute(
                "INSERT OR IGNORE INTO users (username, email, password_hash, role, registration_date, last_login, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                ('mvc', 'mvc@example.com', generate_password_hash('mvc'), 'admin', now, now, 'active')
            )
            
            conn.commit()
        
        # Check if strategies exist
        cursor.execute("SELECT COUNT(*) FROM strategies")
        strategy_count = cursor.fetchone()[0]
        
        if strategy_count == 0:
            # Insert mock strategies
            mock_strategies = [
                {
                    "name": "Global Macro Diversification",
                    "type": "Multi-Asset",
                    "assets": json.dumps(["Stocks", "Bonds", "Commodities", "FX"]),
                    "performance": json.dumps({
                        "daily": 0.3,
                        "weekly": 1.7,
                        "monthly": 5.2,
                        "yearly": 24.8
                    }),
                    "risk": "medium",
                    "creator": "Quant Team Alpha",
                    "description": "A global macro strategy that allocates across different asset classes based on economic indicators and market trends.",
                    "historical_data": json.dumps([{"date": "2023-01-01", "value": 100}, {"date": "2023-04-01", "value": 124.8}]),
                    "creation_date": now
                },
                {
                    "name": "Tech-Commodities Rotation",
                    "type": "Sector Rotation",
                    "assets": json.dumps(["Tech Stocks", "Energy Commodities", "Precious Metals"]),
                    "performance": json.dumps({
                        "daily": -0.2,
                        "weekly": 2.1,
                        "monthly": 6.7,
                        "yearly": 31.2
                    }),
                    "risk": "high",
                    "creator": "Sector Specialists",
                    "description": "Rotates between technology stocks and commodities based on economic cycles and inflation expectations.",
                    "historical_data": json.dumps([{"date": "2023-01-01", "value": 100}, {"date": "2023-04-01", "value": 131.2}]),
                    "creation_date": now
                },
                {
                    "name": "Fixed Income Fortress",
                    "type": "Income",
                    "assets": json.dumps(["Government Bonds", "Corporate Bonds", "High-Yield Bonds"]),
                    "performance": json.dumps({
                        "daily": 0.1,
                        "weekly": 0.5,
                        "monthly": 1.8,
                        "yearly": 8.7
                    }),
                    "risk": "low",
                    "creator": "Bond Masters",
                    "description": "A conservative strategy focused on generating stable income through a diversified bond portfolio.",
                    "historical_data": json.dumps([{"date": "2023-01-01", "value": 100}, {"date": "2023-04-01", "value": 108.7}]),
                    "creation_date": now
                }
            ]
            
            for strategy in mock_strategies:
                cursor.execute(
                    """INSERT INTO strategies 
                       (name, type, assets, performance, risk, creator, description, historical_data, creation_date) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        strategy["name"], 
                        strategy["type"], 
                        strategy["assets"], 
                        strategy["performance"], 
                        strategy["risk"], 
                        strategy["creator"], 
                        strategy["description"], 
                        strategy["historical_data"], 
                        strategy["creation_date"]
                    )
                )
            
            conn.commit()
            
            # Assign strategies to users
            cursor.execute("SELECT id FROM users WHERE username = 'muser'")
            muser_id = cursor.fetchone()[0]
            
            cursor.execute("SELECT id FROM users WHERE username = 'mvc'")
            mvc_id = cursor.fetchone()[0]
            
            # Get strategy ids
            cursor.execute("SELECT id FROM strategies")
            strategy_ids = [row[0] for row in cursor.fetchall()]
            
            # Assign all strategies to mvc (admin)
            for strategy_id in strategy_ids:
                cursor.execute(
                    "INSERT OR IGNORE INTO user_strategies (user_id, strategy_id, subscription_date) VALUES (?, ?, ?)",
                    (mvc_id, strategy_id, now)
                )
            
            # Assign first and third strategies to muser
            if len(strategy_ids) >= 3:
                cursor.execute(
                    "INSERT OR IGNORE INTO user_strategies (user_id, strategy_id, subscription_date) VALUES (?, ?, ?)",
                    (muser_id, strategy_ids[0], now)
                )
                cursor.execute(
                    "INSERT OR IGNORE INTO user_strategies (user_id, strategy_id, subscription_date) VALUES (?, ?, ?)",
                    (muser_id, strategy_ids[2], now)
                )
            
            conn.commit()
        
        conn.close()


class User:
    def __init__(self, db):
        self.db = db
    
    def get_all_users(self):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, email, role, registration_date, last_login, status FROM users")
        users = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return users
    
    def get_user_by_id(self, user_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, email, role, registration_date, last_login, status FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        conn.close()
        return dict(user) if user else None
    
    def get_user_by_username(self, username):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        conn.close()
        return dict(user) if user else None
    
    def create_user(self, username, email, password):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        now = datetime.now().isoformat()
        
        try:
            cursor.execute(
                "INSERT INTO users (username, email, password_hash, registration_date, last_login, status) VALUES (?, ?, ?, ?, ?, ?)",
                (username, email, generate_password_hash(password), now, now, 'active')
            )
            conn.commit()
            
            # Get the newly created user
            cursor.execute("SELECT id, username, email, role, registration_date, last_login, status FROM users WHERE username = ?", (username,))
            user = cursor.fetchone()
            conn.close()
            return dict(user) if user else None
        except sqlite3.IntegrityError:
            conn.close()
            return None
    
    def authenticate(self, username, password):
        user = self.get_user_by_username(username)
        if user and check_password_hash(user['password_hash'], password):
            # Update last login time
            conn = self.db.get_connection()
            cursor = conn.cursor()
            now = datetime.now().isoformat()
            cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user['id']))
            conn.commit()
            conn.close()
            
            # Return user info without password hash
            user.pop('password_hash', None)
            return user
        return None
    
    def delete_user(self, user_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_strategies WHERE user_id = ?", (user_id,))
        cursor.execute("DELETE FROM user_preferences WHERE user_id = ?", (user_id,))
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        changes = conn.total_changes
        conn.commit()
        conn.close()
        return changes > 0


class Strategy:
    def __init__(self, db):
        self.db = db
    
    def get_all_strategies(self):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM strategies")
        
        strategies = []
        for row in cursor.fetchall():
            strategy = dict(row)
            strategy['assets'] = json.loads(strategy['assets'])
            strategy['performance'] = json.loads(strategy['performance'])
            strategy['historical_data'] = json.loads(strategy['historical_data'])
            strategies.append(strategy)
        
        conn.close()
        return strategies
    
    def get_strategy_by_id(self, strategy_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM strategies WHERE id = ?", (strategy_id,))
        
        row = cursor.fetchone()
        if row:
            strategy = dict(row)
            strategy['assets'] = json.loads(strategy['assets'])
            strategy['performance'] = json.loads(strategy['performance'])
            strategy['historical_data'] = json.loads(strategy['historical_data'])
        else:
            strategy = None
        
        conn.close()
        return strategy
    
    def get_user_strategies(self, user_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT s.* FROM strategies s
            JOIN user_strategies us ON s.id = us.strategy_id
            WHERE us.user_id = ?
        """, (user_id,))
        
        strategies = []
        for row in cursor.fetchall():
            strategy = dict(row)
            strategy['assets'] = json.loads(strategy['assets'])
            strategy['performance'] = json.loads(strategy['performance'])
            strategy['historical_data'] = json.loads(strategy['historical_data'])
            strategies.append(strategy)
        
        conn.close()
        return strategies
    
    def subscribe_to_strategy(self, user_id, strategy_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        now = datetime.now().isoformat()
        
        try:
            cursor.execute(
                "INSERT INTO user_strategies (user_id, strategy_id, subscription_date) VALUES (?, ?, ?)",
                (user_id, strategy_id, now)
            )
            conn.commit()
            conn.close()
            return True
        except sqlite3.IntegrityError:
            conn.close()
            return False
    
    def unsubscribe_from_strategy(self, user_id, strategy_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM user_strategies WHERE user_id = ? AND strategy_id = ?",
            (user_id, strategy_id)
        )
        changes = conn.total_changes
        conn.commit()
        conn.close()
        return changes > 0
