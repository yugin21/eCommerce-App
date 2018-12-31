import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from './Loading';
import _ from 'lodash';

class MenSubCategory extends Component {
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

    detailOrder = (id) => {
        this.props.navigation.navigate('Order', { id })
    }

    renderItem = ({ item }) => {
        let sizes = []
        if (_.isArray(item.sizes)) {
            item.sizes.forEach(size => {
                sizes.push(size + ' ')
            })
        }
        return (
            <View style={{ flex: 1, }}>
                <TouchableOpacity style={styles.imageProductWrapper} onPress={() => this.detailOrder([item.product_id])}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.imageProductStyle}
                    />
                </TouchableOpacity>

                <View style={styles.descContainer}>
                    <TouchableOpacity style={styles.descWrapper} onPress={() => this.detailOrder([item.product_id])}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={styles.productSizeWrapper}>
                            <Text style={styles.productSize}>{sizes}</Text>
                        </View>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderButtonStyle} onPress={() => this.detailOrder([item.product_id])}>
                        <Text style={styles.orderTextStyle}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }



    dataRequest() {
        const id = this.props.navigation.state.params.id[0]
        const url = `http://e-commerce-rest-api.herokuapp.com/product/category/1?idSub=${id}`

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [...this.state.dataSource, ...responseJson],
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
                <View style={{ flex: 1, paddingTop: 15 }}>
                    <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        <Text style={styles.productTitle}>Men Products</Text>
                    </View>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View>
        )
    }

}

const styles = StyleSheet.create({
    productTitle: {
        fontSize: 21
    },
    imageProductStyle: {
        width: '100%',
        height: 350
    },
    imageProductWrapper: {
        flex: 1,
        paddingTop: 5,
    },
    descContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    descWrapper: {
        paddingLeft: 15,
        paddingVertical: 10,
        width: '67%'
    },
    productName: {
        fontSize: 17,
        paddingBottom: 5
    },
    productSize: {
        fontSize: 13,
        color: 'grey'
    },
    productSizeWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 17,
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 19,
    },
    orderButtonStyle: {
        width: '27%',
        backgroundColor: '#3478C0',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 45,
        borderRadius: 5,
        marginTop: 15,
        right: 15,
        paddingHorizontal: 15,
    },
    orderTextStyle: {
        fontSize: 17,
        color: '#fff'
    }
})

export default MenSubCategory;