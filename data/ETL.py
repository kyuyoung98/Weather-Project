import requests
import pandas as pd
from datetime import datetime, timedelta
import json
import os
from config import api_key

class WeatherDataCollector:
    def __init__(self):
        self.api_key = api_key
        if not self.api_key:
            raise ValueError("API key not found. Please set OPENWEATHER_API_KEY environment variable.")
        
        json_file_path = "./files/korean_cities.json"
        with open(json_file_path, encoding="utf-8") as json_file:
            self.city_data = json.load(json_file)

    def extract_weather_data(self, city):
        base_url = "http://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": city,
            "appid": self.api_key,
        }

        response = requests.get(base_url, params=params)
        data = response.json()

        return data

    def transform_weather_data(self, data):
        timestamp = data['dt']
        dt = datetime.utcfromtimestamp(timestamp)
        formatted_datetime = dt.strftime('%Y-%m-%d %H:%M:%S')

        timezone_offset_seconds = 9 * 3600
        adjusted_datetime = dt + timedelta(seconds=timezone_offset_seconds)
        formatted_adjusted_datetime = adjusted_datetime.strftime('%Y-%m-%d %H:%M:%S')

        selected_data = {
            'City ID': data['id'],
            'City Name': data['name'],
            'Lon': data['coord']['lon'],
            'Lat': data['coord']['lat'],
            'Weather ID': data['weather'][0]['id'],
            'Weather Main': data['weather'][0]['main'],
            'Temperature (K)': data['main']['temp'],
            'Humidity (%)': data['main']['humidity'],
            'Visibility (m)': data['visibility'],
            'Wind Speed (m/s)': data['wind']['speed'],
            'Clouds (%)': data['clouds']['all'],
            'Date (Unix)': formatted_datetime,
            'Timezone (s)': formatted_adjusted_datetime,
        }

        return selected_data

    def load_weather_data(self, data):
        today_data = []

        for city in data:
            weather_data = self.extract_weather_data(city)
            transformed_data = self.transform_weather_data(weather_data)
            today_data.append(transformed_data)

        df = pd.DataFrame(today_data)
        
        current_date = datetime.now().strftime("%Y%m%d")

        file_name = f"./files/{current_date}_Weather.csv"
        df.to_csv(file_name, index=False)

    def run_pipeline(self):
        cities = self.city_data

        self.load_weather_data(cities)

def main():
    weather_collector = WeatherDataCollector()
    weather_collector.run_pipeline()

if __name__ == "__main__":
    main()