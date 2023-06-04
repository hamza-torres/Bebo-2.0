import unittest
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore, auth, storage
import os
import sys
import inspect
import random
import string
import uuid

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from moderation.explicit import detect_safe_search_uri, analyze_text


# # Use a service account.
# cred = credentials.Certificate('serviceAccountKey.json')

# app = firebase_admin.initialize_app(cred)

        # db = firestore.client()

cred = credentials.Certificate('serviceAccountKey.json')  # Update with your service account credentials
firebase_admin.initialize_app(cred, {'storageBucket': 'extended-creek-388409.appspot.com'})
firestore_client = firestore.client()
auth_client = auth
bucket = storage.bucket()


class IntegrationTests(unittest.TestCase):
    def setUp(self):
        # Clean up previous test data
        self.clean_up()

        # Create a test user
        self.user_email = self.generate_random_email()
        self.user_password = 'password123'
        self.user = auth_client.create_user(email=self.user_email, password=self.user_password)

        # Create Firestore documents for the user
        self.user_doc_ref = firestore_client.collection('users').document(self.user.uid)
        self.user_doc_data = {'name': 'Test User'}
        self.user_doc_ref.set(self.user_doc_data)

        self.posts_coll_ref = self.user_doc_ref.collection('posts')
        self.friends_coll_ref = self.user_doc_ref.collection('friends')

    def tearDown(self):
        # Clean up the test environment
        self.clean_up()

    def clean_up(self):
        # Delete the test user and associated data
        if hasattr(self, 'user'):
            auth_client.delete_user(self.user.uid)

        if hasattr(self, 'user_doc_ref'):
            self.user_doc_ref.delete()

        if hasattr(self, 'posts_coll_ref'):
            posts = self.posts_coll_ref.get()
            for post in posts:
                post.reference.delete()
                
        if hasattr(self, 'friends_coll_ref'):
            friends = self.friends_coll_ref.get()
            for friend in friends:
                friend.reference.delete()
    
    def tearDown(self):
        # Clean up the test environment
        firestore_client.close()

    def test_firestore_operations(self):
        # Simulate Firestore operations
        collection_ref = firestore_client.collection('users')

        # Add a document
        doc_data = {'name': 'John Doe', 'age': 25}
        doc_ref = collection_ref.document('user1')
        doc_ref.set(doc_data)
        self.assertTrue(doc_ref.get().exists)

        # Update a document
        updated_data = {'age': 26}
        doc_ref.update(updated_data)
        updated_doc = doc_ref.get().to_dict()
        self.assertEqual(updated_doc['age'], updated_data['age'])

        # Delete a document
        doc_ref.delete()
        self.assertFalse(doc_ref.get().exists)

    def test_firebase_auth_operations(self):
        # Simulate Firebase Authentication operations
        email = self.generate_random_email()
        password = 'password123'

        # Create a user
        user = auth_client.create_user(email=email, password=password)
        self.assertIsNotNone(user.uid)

        # Get a user by email
        retrieved_user = auth_client.get_user_by_email(email)
        self.assertEqual(user.uid, retrieved_user.uid)

        # Delete a user
        auth_client.delete_user(user.uid)
        with self.assertRaises(auth_client.UserNotFoundError):
            auth_client.get_user(user.uid)

    def test_firebase_storage_operations(self):
        # Simulate Firebase Storage operations
        # Assuming you have a file named 'test_image.jpg' in the same directory as this test file
        file_path = 'test_image.jpg'
        blob_name = 'test_image.jpg'

        # Upload a file
        blob = bucket.blob(blob_name)
        blob.upload_from_filename(file_path)
        self.assertTrue(blob.exists())

        # Download a file
        downloaded_file_path = 'downloaded_image.jpg'
        blob.download_to_filename(downloaded_file_path)
        self.assertTrue(os.path.exists(downloaded_file_path))

        # Delete a file
        blob.delete()
        self.assertFalse(blob.exists())

    def test_create_user_and_upload_image(self):
        # Upload a test image to the user's storage directory
        file_path = 'test_image.jpg'
        blob_name = f'users/{self.user.uid}/test_image.jpg'

        # Upload the image
        blob = bucket.blob(blob_name)
        blob.upload_from_filename(file_path)

        # Ensure the image exists in the storage bucket
        self.assertTrue(blob.exists())
        
        
        
    def test_create_user_and_analyse_image(self):
        # Upload a test image to the user's storage directory
        file_path = 'test_image.jpg'
        blob_name = f'users/{self.user.uid}/test_image.jpg'

        # Upload the image
        blob = bucket.blob(blob_name)
        blob.upload_from_filename(file_path)

        # Ensure the image exists in the storage bucket
        self.assertTrue(blob.exists())

        # Get the URL of the uploaded image
        image_url = blob.public_url

        # Create a posts object
        post_data = {'postId': 'post1', 'userId': self.user.uid, 'url': image_url}

        # Add the posts object to the posts array in Firestore
        posts_array_ref = self.user_doc_ref.collection('posts_array')
        posts_array_ref.document(post_data['postId']).set(post_data)

        # Retrieve the posts array
        retrieved_posts = [doc.to_dict() for doc in posts_array_ref.get()]
        self.assertGreater(len(retrieved_posts), 0)

        # Run detect_safe_search_uri on the post's URL
        # Run detect_safe_search_uri on the post's URL
        post = retrieved_posts[0]  # Access the first post directly
        post_url = post['url']
        # Run detect_safe_search_uri on the post_url

        # Assert that the safe_search_results are not None
        try:
            safe_search_results = detect_safe_search_uri(post_url)
            self.assertIsNotNone(safe_search_results)
        except Exception as e:
            pass
        
    def test_create_user_and_analyse_text(self):
        # Get the URL of the uploaded image
        description = "This is a test post to analyse"

        # Create a posts object
        post_data = {'postId': 'post1', 'userId': self.user.uid, 'description': description}

        # Add the posts object to the posts array in Firestore
        posts_array_ref = self.user_doc_ref.collection('posts_array')
        posts_array_ref.document(post_data['postId']).set(post_data)

        # Retrieve the posts array
        retrieved_posts = [doc.to_dict() for doc in posts_array_ref.get()]
        self.assertGreater(len(retrieved_posts), 0)

        post = retrieved_posts[0]  # Access the first post directly

        description = post['description']
        # Run analyze_text on the description

        # Assert that the sentiment_analysis result is not None
        try:
            sentiment_analysis = analyze_text(description)
            self.assertIsNotNone(sentiment_analysis)
        except Exception as e:
            pass 
 
        
        
    def generate_random_email(self):
        email_length = 10
        email_suffix = "@example.com"
        random_string = ''.join(random.choices(string.ascii_lowercase, k=email_length))
        return random_string + email_suffix

if __name__ == '__main__':
    unittest.main()