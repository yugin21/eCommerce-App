import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid, StyleSheet, Text, View, Button, Image, ActivityIndicator, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { uploadImageURL } from '../../utils/Endpoints';

export default class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            srcImage: '',
            uri: '',
            fileName: '',
            loading: '',
            token: null
        }
    }

    choosePicture = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response.fileName)
                this.setState({
                    srcImage: { uri: response.uri },
                    uri: response.uri,
                    fileName: response.fileName
                });
            }
        });
    };

    uploadPicture = () => {
        console.log('start upload')
        this.setState({ loading: true })

        const data = new FormData()
        data.append('image', {
            uri: this.state.uri,
            type: 'image/jpeg',
            name: this.state.fileName
        })
        const url = uploadImageURL
        const token = this.state.token
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false })
                ToastAndroid.show('Avatar Changed', ToastAndroid.SHORT)
                this.props.navigation.navigate('Profile')
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(value => {
            this.setState({ token: value })
        })
    }

    render() {
        return (
            <View style={styles.conMain}>
                {
                    (this.state.loading === true) &&
                    (
                        <Modal
                            animationType='none'
                            transparent={true}
                            visible={this.state.loading}
                            onRequestClose={() => {
                                alert('Modal has been closed')
                            }}
                        >
                            <ActivityIndicator
                                animating={true}
                                style={styles.indicator}
                                size="large"
                                color='white'
                            />
                        </Modal>
                    )
                }

                <View style={styles.conHeader}>
                    <Text style={styles.textHeader}>Upload Photo</Text>
                </View>
                <View style={styles.conPreview}>
                    {(this.state.srcImage != '') &&
                        (<Image source={this.state.srcImage} style={styles.uploadAvatar} />)
                    }
                </View>
                <View style={styles.conButton}>
                    <Button
                        onPress={() => this.choosePicture()}
                        title='Select photo'
                    />
                    <Button
                        onPress={() => this.uploadPicture()}
                        title='Upload photo'
                    />
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    conMain: {
        flex: 1,
    },
    conHeader: {
        flex: 1,
        backgroundColor: '#3478C0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 20,
        color: 'white'
    },
    conPreview: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    uploadAvatar: {
        height: 400,
        width: 400
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
    }
})