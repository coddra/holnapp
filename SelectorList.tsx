import { FlatList } from 'react-native'

import { WeatherListItem } from './Global'
import { SelectorItem } from './SelectorItem'

interface SelectorListProps {
    data: WeatherListItem[]
}

export function SelectorList({ data }: SelectorListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SelectorItem {...item} />}
        />

    )
}
