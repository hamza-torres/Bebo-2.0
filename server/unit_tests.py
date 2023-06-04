import unittest
from unittest.mock import patch
import os
import sys
import inspect
import random

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from moderation.explicit import detect_safe_search_uri, analyze_text


class TestMathFunctions(unittest.TestCase):
    def test_safety(self):
        image_urls = [
            "https://picsum.photos/id/1/200/300",
            "https://picsum.photos/id/2/400/600",
            "https://picsum.photos/id/3/600/800",
            # Add more image URLs...
        ]

        expected_ratings = [
            {
                "adult": "VERY_UNLIKELY",
                "medical": "VERY_UNLIKELY",
                "spoof": "VERY_UNLIKELY",
                "violence": "VERY_UNLIKELY",
                "racy": "VERY_UNLIKELY",
            },
            {
                "adult": "POSSIBLE",
                "medical": "VERY_UNLIKELY",
                "spoof": "VERY_UNLIKELY",
                "violence": "LIKELY",
                "racy": "LIKELY",
            },
            {
                "adult": "VERY_UNLIKELY",
                "medical": "VERY_UNLIKELY",
                "spoof": "VERY_UNLIKELY",
                "violence": "VERY_UNLIKELY",
                "racy": "VERY_UNLIKELY",
            },
        ]

        for i in image_urls:
            result = detect_safe_search_uri(i)
            self.assertIsNotNone(result)


    def test_analyze_text(self):
        texts = [
            "",  # Empty text
            "Hello, world!",  # Simple sentence
            "Lorem ipsum dolor sit amet.",  # Classic Latin text
            "12345",  # Numeric characters
            "This is a test.",  # General text
            "Testing, testing, 1, 2, 3.",  # Text with punctuation and numbers
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",  # Longer text
            "Special characters: !@#$%^&*()",  # Text with special characters
            "URL: https://example.com",  # Text with a URL
            "Email: test@example.com",  # Text with an email address
            "🌟 Emoji test: 😃🔥💡",  # Text with emojis
            "New\nline",  # Text with newline character
            "Tabs\tand\tspaces",  # Text with tabs and spaces
        ]
        for text in texts:
            result = analyze_text(text)
            self.assertIsNotNone(result)



if __name__ == "__main__":
    unittest.main()
