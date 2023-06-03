import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from moderation.explicit import detect_safe_search_uri 


# Use a service account.
cred = credentials.Certificate('serviceAccountKey.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

def process_post_image(post_id, user_id):
    # Get the Firestore document reference
    doc_ref = db.collection('posts').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        # Retrieve the posts array
        posts_array = doc.to_dict().get('posts', [])

        # Find the post with the given post_id
        target_post = next((post for post in posts_array if post.get('postId') == post_id), None)

        if target_post:
            # Get the URL of the picture
            picture_url = target_post.get('picture')

            # Pass the picture URL to the detect_safe_search_uri function
            result = detect_safe_search_uri(picture_url)

            # Create the tags array if it doesn't exist
            if 'tags' not in target_post:
                target_post['tags'] = []

            # Update the tags array of the post with the safe search results
            target_post['tags'] = result

            # Update the Firestore document with the modified posts array
            doc_ref.update({'posts': posts_array})
            return result
        else:
            print("Post not found.")
    else:
        print("Document not found.")
        
        
if __name__ == '__main__':
    # Code to be executed when the file is run directly
    postId = "8f1c8e80-0507-465a-8c55-b1165ba2fed2"
    userId = "lIOkzPJBK1TpQAuXYETh2IPp1ec2"
    process_post_image(postId, userId)   
    pass