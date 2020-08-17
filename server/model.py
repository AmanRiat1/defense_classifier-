import pickle

class DefenseClassifier:
    """Class to load the pickled model and perform operations"""
    def __init__(self):
        
        self.model = pickle.load( open( "rf_model.p", "rb" ))
        self.input_features = ['BLK%','BPM','DBPM','DRB%','DWS','FTr','G', 'MP','TOV%','VORP']
    
    def predict(self, player_df):
        """Calculates the models confidence rating on given players classification"""

        predict_df = player_df.loc[:, self.input_features]
        prediction = int(self.model.predict_proba(predict_df)[0][1]*100)
        return str(prediction)
        
