import pandas as pd
import basketball_reference_scraper
from basketball_reference_scraper.players import get_stats, get_game_logs

from urllib.request import urlopen
from bs4 import BeautifulSoup
import math
import multiprocessing

# URL page we will scraping (see image above)
url = "https://www.basketball-reference.com/awards/all_defense_by_player.html"
# this is the HTML from the given URL
html = urlopen(url)
soup = BeautifulSoup(html, features="lxml")

rows = soup.findAll('tr')[1:]
all_defensive_names = [rows[i].findAll('td')[1].getText() for i in range(1, len(rows))]

players = pd.read_csv('nba_rookies.csv')
players = players.dropna()
rookie_names = players['Name'].values


def rookie_frame(range_list):
    rookie_dataframe = get_stats(rookie_names[range_list[0]], stat_type='ADVANCED', playoffs=False, career=False)[0:1]
    rookie_dataframe['Name'] = rookie_names[range_list[0]]
    
    if rookie_names[range_list[0]] in all_defensive_names:
        rookie_dataframe['all_defensive'] = 1
    else:
        rookie_dataframe['all_defensive'] = 0
    
    for rookie in range (range_list[0]+1, range_list[1]):
        try:
            rookie_stats = get_stats(rookie_names[rookie], stat_type='ADVANCED', playoffs=False, career=False).loc[0]
            rookie_stats['Name'] = rookie_names[rookie]
            if rookie_names[rookie] in all_defensive_names:
                rookie_stats['all_defensive'] = 1
            else:
                rookie_stats['all_defensive'] = 0
            rookie_dataframe = rookie_dataframe.append(rookie_stats, ignore_index=True)
        #Due to name formatting some players can't be found
        except:
            pass
    rookie_dataframe.to_csv(f'{range_list[0]}.csv')


if __name__ == '__main__':
    split = int(len(rookie_names)/5)
    names_split = [(0,split), (split, split*2), (split*2, split*3), (split*3, split*4), (split*4, 1538)]
    processes = []
    for name_range in names_split:
        manager = multiprocessing.Manager()
        return_dict = manager.dict()
        p = multiprocessing.Process(target=rookie_frame, args=(name_range,))
        processes.append(p)
        p.start()
    for process in processes:
        process.join()
