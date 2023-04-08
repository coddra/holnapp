import { View, Text } from 'react-native-ui-lib'

export function Header() {
    return (
        <View centerV left paddingH-s6 style={{ height: 120 }}>
            <Text style={{ fontSize: 34, fontWeight: '600' }}>Holnapp</Text>
        </View>
    )
}
