import React, { Component } from 'react'
import { Picker, AsyncStorage, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker'
import { transferConfirmURL, bankURL } from '../../utils/Endpoints';

export default class TransferConfirm extends Component {

    state = {
        token: '', date: "2016-05-15", invoice: '', accountName: '', amount: '',
        dataSource: [], bank_id: ''
    }

    postTransferData({ invoice, bank_id, accountName, amount, date }) {
        if (_.isString(invoice && bank_id && accountName && amount && date == '')) {
            ToastAndroid.show('Field is required', ToastAndroid.SHORT)
        } else {
            const url = transferConfirmURL
            const token = this.state.token
            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invoice: invoice,
                    to_bank: bank_id,
                    account_name: accountName,
                    amount: amount,
                    date: date,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log(data)
                        ToastAndroid.show('Thanks for shopping! :)', ToastAndroid.SHORT)
                        this.props.navigation.navigate('MainHome')
                    } else {
                        ToastAndroid.show('Invoice code is invalid', ToastAndroid.SHORT)
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }

    }


    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
            this.requestDataBank()
        })
        this.getCurrentDate()
    }

    getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        this.setState({ date: today })
    }

    requestDataBank() {
        const url = bankURL

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: [...responseJson],
                })
            })
            .catch(error => {
                this.setState({ error, isLoading: false, refreshing: false })
            })
    }


    renderItem = () => {
        const { invoice, bank_id, amount, date, accountName, dataSource } = this.state
        console.log(this.state)


        let listBank = []
        dataSource.forEach(element => {
            listBank.push(element.bank_name)
        });

        let listIdBank = []
        dataSource.forEach(element => {
            listIdBank.push(element.bank_id)
        });

        let pickerBank = listBank.map((s, i) => {
            return <Picker.Item key={i} value={listIdBank[i]} label={s} />
        });

        return (
            <ScrollView style={{ flex: 1, }} >
                <View style={styles.paymentContainer}>
                    <View style={styles.shippingTitleWrapper}>
                        <Text style={styles.shippingTitle}>Transfer Confirm</Text>
                    </View>

                    <View style={styles.shippingInputContainer}>
                        <Text style={styles.inputTitle}>Invoice</Text>
                        <TextInput
                            onChangeText={invoice => this.setState({ invoice })}
                            value={this.state.invoice}
                            style={styles.input}
                            returnKeyType="go"
                            autoCorrect={false}
                            blurOnSubmit={false}
                        />

                        <Text style={styles.inputTitle}>Select Bank</Text>
                        <Picker selectedValue={bank_id}
                            onValueChange={
                                (itemValue) => this.setState({ bank_id: itemValue })
                            }>
                            {pickerBank}

                        </Picker>

                        <Text style={styles.inputTitle}>Account Name</Text>
                        <TextInput
                            onChangeText={accountName => this.setState({ accountName })}
                            value={this.state.accountName}
                            style={styles.input}
                            returnKeyType='next'
                            autoCorrect={false}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.refs.txtAmount.focus()}
                        />

                        <Text style={styles.inputTitle}>Amount</Text>
                        <TextInput
                            onChangeText={amount => this.setState({ amount })}
                            value={this.state.amount}
                            style={styles.input}
                            returnKeyType="next"
                            autoCorrect={false}
                            blurOnSubmit={false}
                            keyboardType={"number-pad"}
                            ref={"txtAmount"}
                        />

                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2018-01-01"
                            maxDate="2021-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />

                        <TouchableOpacity style={styles.orderButton} onPress={() => this.postTransferData({ invoice, bank_id, amount, date, accountName })}>
                            <Text style={styles.orderButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            this.renderItem()
        )
    }
}
const styles = StyleSheet.create({
    paymentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 15,
        paddingVertical: 10
    },
    shippingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3478C0'
    },
    shippingTitleWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#dfe6e9',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    inputTitle: {
        fontSize: 15,
        color: 'grey',
        paddingBottom: 5
    },
    shippingInputContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    input: {
        height: 40,
        backgroundColor: '#ecf0f1',
        color: '#000',
        marginBottom: 10,
        borderRadius: 3,
        paddingHorizontal: 10
    },
    addressInput: {
        height: 100,
        backgroundColor: '#ecf0f1',
        color: '#000',
        marginBottom: 10,
        borderRadius: 3,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    dropdownTitle: {
        fontSize: 15,
        color: 'grey',
        paddingTop: 10,
    },
    orderButton: {
        backgroundColor: '#3478C0',
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    orderButtonText: {
        fontSize: 19,
        color: '#fff'
    },
})