# Import flask and datetime module for showing date and time
from flask import Flask, request
from flask_cors import CORS
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 

from moderation.explicit import detect_safe_search_uri

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/analyse", methods=["GET", "POST"])
def analyze():
    print("Analyzing")
    # if request.method == "POST":
    #     print(request.files)
    #     if request.files:
    #         image = request.files["image"]
    #         image.save(os.path.join("images", image.filename))
    #         return {"status": "OK"}
    #     else:
    #         return {"status": "ERROR"}
    # else:
    #     return {"status": "ERROR"}



# Running app
if __name__ == '__main__':
	app.run(debug=True)