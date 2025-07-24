import boto3
import os

def lambda_handler(event, context):
    # Event should include S3 key
    s3_key = event['s3_key']
    bucket = os.environ['S3_BUCKET']

    textract = boto3.client('textract')
    response = textract.detect_document_text(
        Document={'S3Object': {'Bucket': bucket, 'Name': s3_key}}
    )

    text = ""
    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            text += item["Text"] + "\n"

    return {
        'statusCode': 200,
        'body': text
    }