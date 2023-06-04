from google.cloud import vision, language_v1
    
def detect_safe_search_uri(uri):
    """Detects unsafe features in the file located in Google Cloud Storage or
    on the Web."""
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.safe_search_detection(image=image)
    safe = response.safe_search_annotation

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    print('Safe search:')

    # print(f'adult: {likelihood_name[safe.adult]}')
    # print(f'medical: {likelihood_name[safe.medical]}')
    # print(f'spoofed: {likelihood_name[safe.spoof]}')
    # print(f'violence: {likelihood_name[safe.violence]}')
    # print(f'racy: {likelihood_name[safe.racy]}')
    
    results = {
        'adult': likelihood_name[safe.adult],
        'medical': likelihood_name[safe.medical],
        'spoofed': likelihood_name[safe.spoof],
        'violence': likelihood_name[safe.violence],
        'racy': likelihood_name[safe.racy]
    }
    print(results)

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    return results
        
def get_sentiment_interpretation(score, magnitude):
    if score < -0.25:
        sentiment = "Negative"
    elif score > 0.25:
        sentiment = "Positive"
    else:
        sentiment = "Neutral"

    if magnitude < 0.5:
        sentiment += " (Weak)"
    elif magnitude > 0.75:
        sentiment += " (Strong)"

    return sentiment
    # if score >= 0.5:
    #     return 'Very Positive'
    # elif score >= 0.3:
    #     return 'Positive'
    # elif score >= 0:
    #     return 'Neutral'
    # elif score > -0.3:
    #     return 'Negative'
    # else:
    #     return 'Very Negative'

def analyze_text(text):
    # Imports the Google Cloud client library
    from google.cloud import language_v1

    # Instantiates a client
    client = language_v1.LanguageServiceClient()

    document = language_v1.types.Document(
        content=text, type_=language_v1.types.Document.Type.PLAIN_TEXT
    )

    # Detects the sentiment of the text
    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment
    # print(f"Text: {text}")
    # print(f"Sentiment: {sentiment.score}, {sentiment.magnitude}")
    result = {
        'result': {
            'score': sentiment.score,
            'magnitude': sentiment.magnitude
        },
        'interpretation': get_sentiment_interpretation(sentiment.score, sentiment.magnitude)
    }
    print(result)
    return result





if __name__ == '__main__':
    # Code to be executed when the file is run directly
    # uri = "https://www.asisonline.org/globalassets/security-management/today-in-security/2022/0922-tis-mexico-atrocities.jpg"
    # detect_safe_search_uri(uri)
    text = "I am so happy and joyful today"    
    analyze_text(text)
    
    pass