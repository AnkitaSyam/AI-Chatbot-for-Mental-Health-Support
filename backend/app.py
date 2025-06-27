from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from model import get_response

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message", "")
    response = get_response(user_msg)

    with open("chatlog.json", "a") as f:
        f.write(json.dumps({"user": user_msg, "bot": response}) + "\n")

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)

