# NBA All Defensive Team Classifier 

This is a small project that uses a Random Forest model to make predictions on a player's chances to make an All Defensive Team solely from their rookie season data. A flask app makes up the backend and serves a React frontend. Currently the searchable players are the rookies of the 2019-20 season. 

The live website can be found [here](https://nba-all-defense.herokuapp.com/)

## Methodology 

Using [sklearn's](https://scikit-learn.org/stable/about.html#citing-scikit-learn) Random Forest Classifier, a model was developed. Training data consisted mainly around advanced defensive stats along with basic box score stats to potentially filter out outliers. 

The original dataset consists of around 1400 players and their rookie season data with an additional column indicating if they had made an all defensive team. The dataset was further filtered down to around 200 players. Of the selected 200 players, a little more than 50% consisted of players who did not make an all defensive team throughout thier playing career. This was done to introduce a bias in classyifing players to not make an all defensive team as the majority of players in the NBA do not make an all defensive team. 

Beyond this step the data was further filtered to reduce the amount of features through feature selection and grid search. The final step was to test out different models through testing methods like KFold, cross validation scoring and scaling features. The Random Forest Classifier provided the best results out of the tested models and was selected. More information on the training and selection of the model can be found in the [jupyter notebook](https://github.com/AmanRiat1/nba_all_defense_classifier/blob/master/data/data_exploration.ipynb) 

The model classifies a player as 1 or 0 which represents whether a player will make an all defensive team or not. The value returned to the frontend is the probability estimate which provides a better understanding as to the players chance to make an all defensive team. 

## General Structure
A flask server makes up the backend providing endpoints to get a list of the current years rookies, get player images, and provide model predictions. The React frontend is served as static files through the flask server and makes calls to the API endpoints. 

## Next Steps
The next step is to improve the model. The current training dataset consists of randomly selected players who did not make an all defensive team. This section of the dataset could potentially be filled with players who could skew the models results. For example, if the majority consists of players who did not play a huge amount of games/minutes, the model would be biased towards classifying players with similar stats as not making an all defensive team. 

Another improvement could be to add a model zoo which would provide more robust results. 
