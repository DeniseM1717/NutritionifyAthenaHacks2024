from flask import Flask, request, url_for, session, redirect, render_template

import spotipy
import requests
from spotipy.oauth2 import SpotifyOAuth
# from credentials import CLIENT_ID, CLIENT_SECRET, SECRET_KEY
import os



# Defining consts
CLIENT_ID = "b8231d68507f4c958859c34ebf054592"
CLIENT_SECRET = "b2f2e34f6fc945b798cb3a5eb1b82a74"
TOKEN_INFO = "token_info"
SECRET_KEY = "asdf"

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=url_for("redirectPage", _external=True),
        scope="user-top-read user-library-read"
    )

app = Flask(__name__)
app.secret_key = SECRET_KEY

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login")
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)


@app.route("/redirectPage")
def redirectPage():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info

    sp_oauth = SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=url_for("redirectPage", _external=True),
        scope="user-top-read user-libray-read"  
    )

    return redirect(url_for("receipt", external=True))
    

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    return token_info

@app.route("/receipt")
def receipt():
    user_token = get_token()
    sp = spotipy.Spotify(
        auth=user_token['access_token']
    )
    user_top_songs = sp.current_user_top_tracks(
        limit=10,
        offset=0,
        time_range="medium_term"
    )
    return str(user_top_songs['items'])