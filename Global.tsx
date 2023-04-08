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

export interface SearchItemProps {
    id: string,
    name: string,
    country: string,
    coords: GeoCoords
}

export const AppID = Constants.expoConfig.extra.apiKey
export const ScreenDimensions = Dimensions.get('window')

export const Spacing = 20
export const ButtonSize = 48
export const AnimationLength = 200

export const Cities = createContext({ data: [] as WeatherListItem[], setData: (data: (data: WeatherListItem[]) => WeatherListItem[]) => { } })
export const ShowAddView = createContext({ show: false, setShow: (show: (show: boolean) => boolean) => { } })
export const SearchText = createContext({ text: '', setText: (text: (text: string) => string) => { } })
export const SearchData = createContext({ searchData: [] as SearchItemProps[], setSearchData: (data: (data: SearchItemProps[]) => SearchItemProps[]) => { } })
