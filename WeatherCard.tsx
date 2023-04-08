import { Component } from 'react'
import { Platform } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import axios from 'axios'

import * as Global from './Global'

const padding = 12

interface WeatherCardProps {
    name: string
    coords: Global.GeoCoords
}

const iconNames = {
    '01d': 'weather-sunny',
    '01n': 'weather-night',
    '02d': 'weather-partly-cloudy',
    '02n': 'weather-night-partly-cloudy',
    '03d': 'weather-cloudy',
    '03n': 'weather-cloudy',
    '04d': 'weather-cloudy',
    '04n': 'weather-cloudy',
    '09d': 'weather-pouring',
    '09n': 'weather-pouring',
    '10d': 'weather-partly-rainy',
    '10n': 'weather-rainy',
    '11d': 'weather-lightning',
    '11n': 'weather-lightning',
    '13d': 'weather-snowy-heavy',
    '13n': 'weather-snowy-heavy',
    '50d': 'weather-fog',
    '50n': 'weather-fog',
};

function getIconName(weatherCode: string): string {
    return iconNames[weatherCode] ?? 'weather-sunny';
}

export class WeatherCard extends Component<WeatherCardProps> {
    state = {
        temperature: null,
        weather: null,
        icon: null,
    }

    componentDidMount() {
        const { coords } = this.props
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${Global.AppID}`).then(response => {
            this.setState({
                temperature: Math.round(response.data.main.temp),
                weather: response.data.weather[0].description,
                icon: getIconName(response.data.weather[0].icon),
            })
        }).catch(error => {
            this.setState({ weather: error.response.status + ': ' + error.response.statusText })
        })
    }

    render() {
        const { name } = this.props;

        return (
            <View br20
                style={{
                    width: Global.ScreenDimensions.width - 2 * Global.Spacing, height: 150,
                    backgroundColor: '#fff',
                    padding: padding,
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000', shadowOffset: { width: 1, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4,
                        },
                        android: {
                            elevation: 4,
                        },
                    })
                }}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>{name}</Text>
                {this.state.weather && <Text>{this.state.weather}</Text>}
                {this.state.temperature && <Text style={{ fontSize: 28, fontWeight: '600', position: 'absolute', bottom: padding, right: padding }}>{this.state.temperature} °C</Text>}
                {this.state.icon && <MaterialCommunityIcons name={this.state.icon} style={{ fontSize: 44, position: 'absolute', top: padding, right: padding }} />}
            </View>
        )
    }
}
