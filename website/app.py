import os
from flask import Flask, render_template, request

app = Flask(__name__)
BUG_MODE = os.getenv("BUG_MODE", "1") != "0"

@app.context_processor
def inject_mode():
    return {"bug_mode": BUG_MODE}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tasks")
def tasks():
    return render_template("tasks.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("register.html")

@app.route("/resources")
def resources():
    return render_template("resources.html")

@app.route("/broken")
def broken():
    return render_template("not_found.html"), 404

if __name__ == "__main__":
    print(f"StudentHub starting in {'BUGGY' if BUG_MODE else 'FIXED'} mode")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
