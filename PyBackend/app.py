from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['get'])
def api():
    value = [
        {
            'name': 'Argentina',
            'capital': 'Buenos Aires',
        },
        {
            'name': 'Peru',
            'capital': 'Lima'
        }
    ]
    
    return jsonify(value)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)