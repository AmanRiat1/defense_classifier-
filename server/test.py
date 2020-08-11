from flask import Flask, jsonify, make_response, send_from_directory
import os
os.chdir(os.getcwd() + '/server') 
from os.path import exists, join
from basketball_reference_scraper.players import get_stats, get_player_headshot
from model import DefenseClassifier
from constants import CONSTANTS
from flask_cors import CORS
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json

print (get_player_headshot("RJ Barrett"))