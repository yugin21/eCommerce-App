import React, { Component } from 'react';
import { View, ScrollView, ToastAndroid, Text, AsyncStorage, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from './Loading';
import { cartURL, checkoutURL } from '../../utils/Endpoints';
import Icon from 'react-native-fa-icons';

let width = Dimensions.get('window').width * 0.66

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            page: 1,
            seed: 1,
            isLoading: true,
            refreshing: false,
            token: null,
            totalPrice: '',
            qty: ''
        }
    }


    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, }}>
                <View style={styles.bagedSection}>
                    <View style={styles.bagedWrapper}>
                        <Image
                            source={{ uri: item.product_image }}
                            style={styles.thumbProduct}
                        />
                        <View style={styles.descContainer}>
                            <View style={styles.descWrapper}>
                                <Text style={{ fontSize: 17, }}>{item.product_name}</Text>
                                <Text style={{ color: 'grey' }}>{item.size}</Text>
                            </View>
                            <View style={styles.priceWrapper}>
                                <TouchableOpacity onPress={() => this.deleteProduct({ id: item.id })}>
                                    <Icon name="close" style={{ textAlign: 'right', fontSize: 20, }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 19, }}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.subTotalWrapper}>
                        <Text style={{ fontSize: 17, }}>Subtotal</Text>
                        <Text style={{ fontSize: 19, }}>{item.price}</Text>
                    </View>
                </View>
            </View>
        )

    }

    deleteProduct = ({ id }) => {
        const url = `http://e-commerce-rest-api.herokuapp.com/cart/${id}`
        const token = this.state.token
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.dataRequest()
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    dataRequest() {
        const url = cartURL
        const token = this.state.token
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [...responseJson.items.data],
                    isLoading: false,
                    refreshing: false,
                    totalPrice: responseJson.cart.amount,
                    qty: responseJson.cart.qty
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.dataRequest()
        })
    }


    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true,
                seed: this.state.seed - 1,
            }, () => {
                this.dataRequest();
            }
        )
    }

    loadMore = () => {
        this.setState({ page: this.state.page + 1 },
            () => { this.dataRequest() })
    }

    goCheckOut() {
        const url = checkoutURL
        const token = this.state.token
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    console.log(responseJson)
                    this.props.navigation.navigate('Review')
                } else {
                    console.log(responseJson)
                    if (this.state.qty == 0) {
                        ToastAndroid.show('Please order an item', ToastAndroid.SHORT)
                    } else {
                        this.props.navigation.navigate('Shipping')
                    }

                }
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    render() {
        return (
            this.state.isLoading
                ?
                <Loading />
                :
                <View style={{ flex: 1, paddingTop: 15 }}>
                    <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        <Text style={styles.productTitle}>Shoping Bag</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                            data={this.state.dataSource}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        // onEndReached={this.loadMore}
                        // onEndReachedThreshold={10}
                        />

                        <View style={styles.totalCostContainer}>
                            <View style={styles.shipCostWrapper}>
                                <Text style={{ fontSize: 15, }}>Total</Text>
                                <Text style={{ fontSize: 19, }}>{this.state.totalPrice}</Text>
                            </View>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.goCheckOut()}>
                                <Text style={styles.buttonTextStyle}>Next to Cashier</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

        )
    }

}

const styles = StyleSheet.create({
    thumbProduct: {
        height: 85,
        width: 85,
        marginRight: 5,
    },
    bagedSection: {
        width: '100%',
        height: 200,
        marginTop: 15,
        backgroundColor: '#fff',
    },
    bagedWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
    },
    descContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    descWrapper: {
        width: '65%',
        paddingLeft: 5,
        justifyContent: 'space-between',
    },
    priceWrapper: {
        width: '25%',
        justifyContent: 'space-between',
    },
    subTotalWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonContainer: {
        backgroundColor: '#3478C0',
        paddingVertical: 15,
        borderRadius: 11,
        elevation: 1,
        marginTop: 15
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
    },
    totalCostContainer: {
        backgroundColor: '#fff',
        height: 150,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginTop: 20,
    },
    productTitle: {
        fontSize: 21,
    },
    shipCostWrapper: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-between',
    },
})

export default Cart;