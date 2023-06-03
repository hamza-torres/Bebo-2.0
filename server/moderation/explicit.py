def detect_safe_search_uri(uri):
    """Detects unsafe features in the file located in Google Cloud Storage or
    on the Web."""
    from google.cloud import vision
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
        


if __name__ == '__main__':
    # Code to be executed when the file is run directly
    uri = "https://www.asisonline.org/globalassets/security-management/today-in-security/2022/0922-tis-mexico-atrocities.jpg"
    detect_safe_search_uri(uri)    
    pass