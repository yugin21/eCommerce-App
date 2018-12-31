import React, { Component } from 'react';
import { ScrollView, AsyncStorage, ToastAndroid, WebView, View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import _ from 'lodash';
import Loading from './Loading';
import { cartURL } from '../../utils/Endpoints';

class Order extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            name: '',
            product_id: '',
            size: '',
            loading: false,
            token: ''
        }
    }


    renderItem = ({ item }) => {
        let dataSize = []
        let dataStock = 0
        if (_.isArray(item.sizes)) {
            item.sizes.forEach(element => {
                dataSize.push({ value: element })
            });
            item.stocks.forEach(element => {
                dataStock += parseInt(element)
            })
        }
        this.setState({ product_id: item.product_id })

        return (
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.contentWrapper}>
                    <Image
                        style={styles.imageProduct}
                        source={{ uri: item.image }}
                    />
                    <View style={styles.descWrapper}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </View>

                    <View style={styles.sizeWrapper}>
                        <Dropdown
                            label='Select Size'
                            data={dataSize}
                            onChangeText={(value) => this.setState({ size: value })}
                        />
                    </View>

                    <View style={styles.descWrapper}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ color: 'grey' }}>Views: {item.hit_views}</Text>
                            <Text style={{ color: '#3478C0', fontSize: 15, paddingBottom: 10 }}>Stocks: {dataStock}</Text>
                        </View>
                        <TouchableOpacity style={styles.orderButton} onPress={() => this.postDataCart()}>
                            <Text style={styles.orderButtonText}>Add to Shopping Bag</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.descWrapper}>
                    <Text style={[styles.productMaterialTitle, { paddingBottom: 10 }]}>DETAIL</Text>
                    <ScrollView>
                        <WebView
                            ref={'webview'}
                            automaticallyAdjustContentInsets={false}
                            style={styles.productMaterial}
                            source={{ html: item.description }} />
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }



    dataRequest() {
        const id = this.props.navigation.state.params.id[0]
        const url = `http://e-commerce-rest-api.herokuapp.com/product/${id}`

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [responseJson],
                    isLoading: false,
                    name: responseJson.name
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    componentDidMount() {
        this.dataRequest()
        AsyncStorage.getItem('token').then(value => { this.setState({ token: value }) })
    }

    postDataCart = () => {
        const url = cartURL
        this.setState({ loading: true })
        if (this.state.token) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.state.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: this.state.product_id,
                    size: this.state.size
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    ToastAndroid.show('Added to Shoping Bag', ToastAndroid.SHORT)
                    this.detailCart(this.state.product_id)
                })
                .catch(err => {
                    console.log(err)
                    ToastAndroid.show('Failed add to Shoping Bag', ToastAndroid.SHORT)
                })
        } else {
            this.props.navigation.navigate('Authorization')
        }
    }

    detailCart = (id) => {
        this.props.navigation.navigate('Cart', { id })
    }


    render() {
        console.log(this.state)
        return (
            this.state.isLoading
                ?
                <Loading />
                :
                <View style={{ flex: 1, paddingTop: 15 }}>
                    <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        <Text style={styles.productTitle}>{this.state.name}</Text>
                    </View>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </View>

        )
    }

}

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        paddingTop: 5,
    },
    imageProduct: {
        width: '100%',
        height: 350
    },
    productName: {
        fontSize: 25,
        paddingBottom: 5,
    },
    productPrice: {
        fontSize: 25,
        color: '#3478C0'
    },
    descWrapper: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
    },
    productMaterialTitle: {
        fontSize: 13,
        color: 'grey'
    },
    productMaterial: {
        height: 90
    },
    orderButton: {
        backgroundColor: '#3478C0',
        paddingVertical: 15,
        borderRadius: 11,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        fontSize: 15,
        color: '#fff'
    },
    sizeWrapper: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
    },
    productTitle: {
        fontSize: 19,
    }
})

export default Order;