import boto3
import json

def lambda_handler(event, context):
    book_text = event['book_text']
    bedrock = boto3.client('bedrock-runtime')
    response = bedrock.invoke_model(
        modelId='anthropic.claude-v2',
        contentType='application/json',
        body=json.dumps({
            "prompt": f"Summarise this book: {book_text}",
            "max_tokens": 1024,
            "temperature": 0.5
        })
    )
    summary = json.loads(response['body'])['completion']
    return {
        'statusCode': 200,
        'body': json.dumps({'summary': summary})
    }s