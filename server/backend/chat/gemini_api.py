import httpx

GEMINI_API_URL = "https://gemini.example.com/api"

def fetch_gemini_data():
    response = httpx.get(GEMINI_API_URL)
    response.raise_for_status()
    return response.json()

def process_gemini_data():
    data = fetch_gemini_data()
    # Process data as needed
    return data
