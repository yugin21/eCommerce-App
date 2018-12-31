import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage, FlatList, StyleSheet } from 'react-native';
import Loading from './Loading';
import { orderReceivedURL } from '../../utils/Endpoints';

class OrderReceived extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            page: 1,
            seed: 1,
            isLoading: true,
            refreshing: false,
            token: null,
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.shippingInputContainer}>
                <View style={styles.selectedPaymentSection}>
                    <View style={{ borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#dfe6e9' }}>
                        <Text style={styles.totalItem}>Order Received</Text>
                    </View>
                    <View style={styles.selectedAddressWrapper}>
                        <View style={styles.selectedAddressWrapper}>
                            <Text style={styles.addressText}>Invoice: <Text style={{ fontSize: 15, color: 'red' }}>{item.invoice}</Text></Text>
                            <Text style={styles.addressText}>Total Cost: {item.total_payment}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    dataRequest() {
        const url = orderReceivedURL
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
                    dataSource: [...responseJson.data],
                    isLoading: false,
                    refreshing: false,
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
                <ScrollView>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    shippingInputContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 5,
    },
    selectedPaymentSection: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    totalItem: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingVertical: 10,
        color: '#3478C0'
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
})

export default OrderReceived;