import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { ListBorrowed } from '../components/List/ListBorrowed'

export default function HomeScreen() {
    return (
        <View>
            <ListBorrowed />
        </View>
    )
}