# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 

from moderation.explicit import detect_safe_search_uri
from firebase import process_post_image, process_all_posts

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/process-image', methods=['POST'])
def process_image():
    # Retrieve the postId and userId from the request payload
    data = request.get_json()
    postId = data.get('postId')
    userId = data.get('userId')

    # Process the postId and userId as needed
    result = process_post_image(postId, userId)

    # Return the result as a JSON response
    return jsonify(result), 201


@app.route('/process_posts', methods=['GET'])
def process_posts_endpoint():
    process_all_posts()
    return 'Posts processed successfully'


# Running app
if __name__ == '__main__':
	app.run(debug=True)