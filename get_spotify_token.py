import requests
import base64
import urllib.parse
import webbrowser

def get_refresh_token():
    print("--- SPOTIFY REFRESH TOKEN GENERATOR ---\n")
    
    # 1. INPUTS
    client_id = input("Enter your Spotify Client ID: ").strip()
    client_secret = input("Enter your Spotify Client Secret: ").strip()
    redirect_uri = "http://127.0.0.1:3000" # Must match Spotify Dashboard exactly

    # 2. AUTHORIZE URL
    # We need these scopes to see what you are playing
    scopes = "user-read-currently-playing user-read-playback-state user-read-recently-played"
    
    auth_url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode({
        'response_type': 'code',
        'client_id': client_id,
        'scope': scopes,
        'redirect_uri': redirect_uri,
    })

    print(f"\n1. I am opening your browser to authorize this app...")
    print(f"(If it doesn't open, copy this link: {auth_url})")
    webbrowser.open(auth_url)

    # 3. CAPTURE THE CODE
    print("\n2. After you click 'Agree', you will be redirected to a page that might look like an error (localhost).")
    print("Look at the URL bar. It will look like: http://localhost:3000/?code=MQCbtWK...")
    redirected_url = input("\nPaste the FULL URL you were redirected to here: ").strip()

    try:
        # Extract the 'code' part from the URL
        parsed = urllib.parse.urlparse(redirected_url)
        code = urllib.parse.parse_qs(parsed.query)['code'][0]
    except:
        print("Error: Could not find the 'code' in that URL. Please try again.")
        return

    # 4. EXCHANGE CODE FOR TOKEN
    print("\n3. Exchanging code for Refresh Token...")

    # Encode Client ID and Secret
    auth_header = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

    token_url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri
    }

    response = requests.post(token_url, headers=headers, data=data)
    response_data = response.json()

    # 5. OUTPUT
    if 'refresh_token' in response_data:
        print("\n" + "="*40)
        print("SUCCESS! HERE IS YOUR REFRESH TOKEN:")
        print("="*40)
        print(response_data['refresh_token'])
        print("="*40)
        print("\nSave this token in your .env.local file as SPOTIFY_REFRESH_TOKEN")
    else:
        print("\nError fetching token:")
        print(response_data)

if __name__ == "__main__":
    get_refresh_token()