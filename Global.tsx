import { createContext } from 'react'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'

export interface GeoCoords {
    lat: number
    lon: number
}

export interface WeatherListItem {
    id: string
    name: string
    coords: GeoCoords
}

export const AppID = Constants.expoConfig.extra.apiKey
export const ScreenDimensions = Dimensions.get('window')
export const CardSpacing = 20

export const Cities = createContext({ data: [] as WeatherListItem[], setData: ((data: (data: WeatherListItem[]) => WeatherListItem[]) => { }) as ((data: (data: WeatherListItem[]) => WeatherListItem[]) => void) })
