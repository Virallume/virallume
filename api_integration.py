import requests
from config import *

# Function to call TikTok Scraper API

def call_tiktok_scraper():
    headers = {
        'x-rapidapi-host': TIKTOK_HOST,
        'x-rapidapi-key': TIKTOK_API_KEY
    }
    response = requests.get(TIKTOK_ENDPOINT, headers=headers)
    return response.json()

# Function to call Instagram Trends API

def call_instagram_trends(user_id):
    headers = {
        'x-rapidapi-host': INSTAGRAM_HOST,
        'x-rapidapi-key': INSTAGRAM_API_KEY
    }
    response = requests.get(INSTAGRAM_ENDPOINT.replace('13469889', str(user_id)), headers=headers)
    return response.json()

# Function to call Social Media Content Generator API

def call_content_generator():
    headers = {
        'x-rapidapi-host': CONTENT_GEN_HOST,
        'x-rapidapi-key': CONTENT_GEN_API_KEY
    }
    response = requests.get(CONTENT_GEN_ENDPOINT, headers=headers)
    return response.json()
