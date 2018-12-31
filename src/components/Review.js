import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from './Loading';
import { checkoutURL } from '../../utils/Endpoints';

class Review extends Component {
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
            qty: '',
            shippingCost: '',
            customer: '',
            address: '',
            city: '',
            province: '',
            zip: '',
            phone: '',
        }
    }


    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, }} >
                <View style={styles.shippingInputContainer}>
                    <View style={styles.bagedSection}>
                        <View style={styles.bagedWrapper}>
                            <Image
                                source={{ uri: item.product_image }}
                                style={styles.thumbProduct}
                            />
                            <View style={styles.descContainer}>
                                <View style={styles.descWrapper}>
                                    <Text style={{ fontSize: 15, }}>{item.product_name}</Text>
                                    <Text style={{ color: 'grey' }}>{item.size}</Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{item.price}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.subTotalWrapper}>
                            <Text style={{ fontSize: 17, }}>Subtotal</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{item.price}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    dataRequest() {
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
                console.log(responseJson)
                this.setState({
                    dataSource: [...responseJson.items.data],
                    isLoading: false,
                    refreshing: false,
                    totalPrice: responseJson.cart.total,
                    qty: responseJson.cart.qty,
                    shippingCost: responseJson.cart.shipping_cost,
                    customer: responseJson.shipping.received_name,
                    address: responseJson.shipping.address,
                    city: responseJson.shipping.city,
                    province: responseJson.shipping.province,
                    zip: responseJson.shipping.zip,
                    phone: responseJson.shipping.phone,
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }

    dataProcessCheckout() {
        this.props.navigation.navigate('Invoice')
    }

    componentDidUpdate() {
        this.dataRequest()
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
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.paymentContainer}>
                        <View style={styles.shippingTitleWrapper}>
                            <Text style={styles.shippingTitle}>Shoping Data Confirmation</Text>
                        </View>
                        <Text style={styles.totalItem}>Total {this.state.qty} Item(s)</Text>
                        <FlatList
                            data={this.state.dataSource}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.shipCostContainer}>
                                <Text style={{ fontSize: 13, color: 'grey', paddingBottom: 20 }}>SHIPPING COST</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.shippingCost}</Text>
                            </View>

                            <View style={styles.totalCostContainer}>
                                <View style={styles.shipCostWrapper}>
                                    <Text style={{ fontSize: 15, }}>Total</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{this.state.totalPrice}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.shippingInputContainer}>
                            <View style={styles.selectedAddressSection}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9' }}>
                                    <Text style={styles.totalItem}>Address</Text>
                                </View>
                                <View style={styles.selectedAddressWrapper}>
                                    <Text style={styles.addressText}>Customer: {this.state.customer}</Text>
                                    <Text style={styles.addressText}>Address: {this.state.address}</Text>
                                    <Text style={styles.addressText}>City: {this.state.city}</Text>
                                    <Text style={styles.addressText}>Province: {this.state.province}</Text>
                                    <Text style={styles.addressText}>Zip Code: {this.state.zip}</Text>
                                    <Text style={styles.addressText}>Phone: {this.state.phone}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.dataProcessCheckout()}>
                            <Text style={styles.buttonTextStyle}>Process</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    paymentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 15,
        marginHorizontal: 15,
        marginVertical: 10
    },
    shippingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3478C0'
    },
    shippingTitleWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    shippingInputContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        marginHorizontal: 15,
        marginVertical: 15
    },
    shipCostContainer: {
        backgroundColor: '#fff',
        height: 100,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    shipCostWrapper: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-between',
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
        width: '60%',
        paddingLeft: 5,
        justifyContent: 'space-between',
    },
    priceWrapper: {
        width: '30%',
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
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 1,
        marginTop: 15,
        marginHorizontal: 15
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
    },
    totalCostContainer: {
        backgroundColor: '#fff',
        height: 70,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    thumbProduct: {
        height: 85,
        width: 85,
        marginRight: 5,
    },
    totalItem: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingVertical: 10
    },
    selectedAddressSection: {
        width: '100%',
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    selectedAddressWrapper: {
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    addressText: {
        fontSize: 15,
        color: 'grey',
        paddingVertical: 10
    }

})

export default Review;