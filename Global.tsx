import { createContext, useContext, useState, ReactNode } from 'react'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'

export interface GeoCoords {
    lat: number
    lon: number
}

export interface WeatherListItem {
    id: string
    name: string
    country: string
    coords: GeoCoords
}

export const AppID = Constants.expoConfig.extra.apiKey
export const ScreenDimensions = Dimensions.get('window')

export const Spacing = 20
export const ButtonSize = 48
export const AnimationLength = 200

export const Locations = createContext({ data: [] as WeatherListItem[], setData: (data: (data: WeatherListItem[]) => WeatherListItem[]) => { } })
export const SingleView = createContext({ singleView: { id: '', name: '', country: '', coords: { lat: 0, lon: 0 } }, setSingleView: (d: (d: WeatherListItem) => WeatherListItem) => { } })

interface IListViewContext {
    showAddView: boolean
    setShowAddView: (show: (show: boolean) => boolean) => void
    searchText: string
    setSearchText: (searchText: (searchText: string) => string) => void
    searchResult: WeatherListItem[]
    setSearchResult: (searchResult: (searchResult: WeatherListItem[]) => WeatherListItem[]) => void
    finalData: WeatherListItem[]
    setFinalData: (searchResult: (searchResult: WeatherListItem[]) => WeatherListItem[]) => void
}

const ListViewContext = createContext<IListViewContext | null>(null)

export function useListViewContext() {
    const context = useContext(ListViewContext)
    if (!context) throw new Error('The useListViewContext() hook was used outside of ListViewContextProvider.')
    return context
}

export function ListViewContextProvider({ children }: { children: ReactNode }) {
    const [showAddView, setShowAddView] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState([] as WeatherListItem[])
    const [finalData, setFinalData] = useState([] as WeatherListItem[])

    return (
        <ListViewContext.Provider value={{ showAddView, setShowAddView, searchText, setSearchText, searchResult, setSearchResult, finalData, setFinalData }}>
            {children}
        </ListViewContext.Provider>
    )
}
