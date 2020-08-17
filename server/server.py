from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join
from basketball_reference_scraper.players import get_stats, get_player_headshot
from .model import DefenseClassifier
from .constants import CONSTANTS
from flask_cors import CORS
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json


os.chdir(os.getcwd() + '/server') 
app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)
model = DefenseClassifier()

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route('/')
def catch_all(path):
    return app.send_static_file('index.html')

@app.route('/api/predict/<name>')
def get_prediction(name):
    rookie_dataframe = get_stats(name, stat_type='ADVANCED', playoffs=False, career=False)
    player_classification = model.predict(rookie_dataframe.loc[0:0])
    return json.dumps({'playerPrediction':player_classification})

@app.route('/api/player-image/<name>')
def get_player_thumbnail(name):
    player_picture_url = get_player_headshot(name)
    return json.dumps({'imageLink':player_picture_url})

@app.route('/api/rookies')
def get_rookies():
    url = "https://www.basketball-reference.com/leagues/NBA_2020_rookies.html"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="lxml")
    rows = soup.findAll('tr')[1:]
    
    rookies = []
    for i in range (1,len(rows)):
        row_text = rows[i].findAll('td')
        if len(row_text) != 0:
            rookies.append(row_text[0].getText())
    
    return json.dumps({'rookies':rookies})

# Error Handler
@app.errorhandler(500)
def internal_error(error):
    return "500 error"

@app.errorhandler(404)
def not_found(error):
    return "404 error",404


if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])