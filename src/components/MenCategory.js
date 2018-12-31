import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from './Loading';
import { menCategoryURL } from '../../utils/Endpoints';

class MenCategory extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            page: 1,
            seed: 1,
            isLoading: true,
            refreshing: false
        }
    }

    detailNavigator = (id) => {
        this.props.navigation.navigate('MenSubCategory', { id })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.productContainer}>
                <TouchableOpacity style={styles.productWrapper} onPress={() => this.detailNavigator([item.sub_category_id])}>
                    <View style={styles.imageProductWrapper}>
                        <Image
                            source={{ uri: item.icon }}
                            style={styles.imageProductStyle}
                        />
                    </View>
                    <View style={styles.productTextContainer}>
                        <Text style={styles.productTextStyle}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }



    dataRequest() {
        const url = menCategoryURL

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [...this.state.dataSource, ...responseJson.datasub],
                    isLoading: false,
                    refreshing: false
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    componentDidMount() {
        this.dataRequest()
    }


    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true,
                seed: this.state.seed + 1,
            }, () => {
                this.dataRequest();
            }
        )
    }

    render() {
        return (
            this.state.isLoading
                ?
                <Loading />
                :
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    numColumns={3}
                />

        )
    }

}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        paddingHorizontal: 7,
        paddingVertical: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    productWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageProductWrapper: {
        paddingVertical: 9,
    },
    imageProductStyle: {
        width: 106,
        height: 140
    },
    productTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    productTextStyle: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center'
    }
})

export default MenCategory;