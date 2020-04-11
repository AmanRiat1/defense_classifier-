import pickle

class DefenseClassifier:
    def __init__(self):
        self.model = pickle.load( open( "rf_model.p", "rb" ))
        self.input_features = ['BLK%','BPM','DBPM','DRB%','DWS','FTr','G', 'MP','TOV%','VORP']
    
    def predict(self, player_df):
        predict_df = player_df.loc[:, self.input_features]
        prediction = int(self.model.predict_proba(predict_df)[0][1]*100)
        return str(prediction)
        
