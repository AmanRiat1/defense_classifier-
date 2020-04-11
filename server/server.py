from flask import Flask, jsonify, make_response, send_from_directory
import os
os.chdir(os.getcwd() + '/server') 

from os.path import exists, join
from basketball_reference_scraper.players import get_stats
from model import DefenseClassifier
from constants import CONSTANTS
from flask_cors import CORS

app = Flask(__name__, static_folder='build')
CORS(app)
model = DefenseClassifier()

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])

@app.route('/predict/<name>')
def get_prediction(name):
    rookie_dataframe = get_stats(name, stat_type='ADVANCED', playoffs=False, career=False)
    player_classification = model.predict(rookie_dataframe.loc[0:0])
    return player_classification

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])