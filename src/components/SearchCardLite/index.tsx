import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, ActivityIndicator } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import userInterface from '../../interfaces/userInterface';
import { RouteStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient, } from 'expo-linear-gradient';
import Loading from '../Loading';
import { Ionicons } from '@expo/vector-icons';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>

type CardPrams = {
    data: userInterface,
    type_user?: string;
    altFunction?: Function;
    marginTop?: number;
}

const SearchCardLite = ({ data, type_user="professional", altFunction, marginTop } :CardPrams) => {

    let [loadingImage, setLoadingImage] = useState(true);

    const navigation = useNavigation<propsScreens>();

    function goTo() {
        if(type_user === "professional"){
            navigation.navigate("professionalProfile", {id_professional: data._id});
        }else{
            navigation.navigate("chat", {id_professional: null, id_pacient: data._id, pushNotification: data.tokenPush, name: data.name});
        }
    }

  return ( 
    <TouchableOpacity onPress={() => altFunction ? altFunction() : goTo()}>
        <View style={{...styles.container, marginTop: marginTop ? marginTop : 0}}>
            <View style={styles.image}>
                { data.profilePhoto ? (<>
                    <Image 
                        style={[styles.imageStyled, {display: (loadingImage ? 'none' : 'flex')}]} 
                        source={{uri: data.profilePhoto } as ImageSourcePropType} 
                        onLoad={() => setLoadingImage(false)}
                    /> 
                    <ActivityIndicator
                        color={'#0C015088'}
                        size={30}
                        style={{ display: (loadingImage ? 'flex' : 'none') }}
                    /> 
                    </>) : ( 
                    <View style={{justifyContent: 'center', alignItems:'center'}}>
                        <Ionicons name="person-circle-outline" size={60} color="#8B97FF66" />
                    </View> )} 
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{data.name}</Text>
                {type_user === "professional" ? <>
                    <AirbnbRating
                    showRating={false}
                    count={5}
                    defaultRating={data.rate}
                    isDisabled={true}
                    selectedColor={"#FFB84E"}
                    size={16}
                    />
                </> : 
                <Text numberOfLines={1} style={styles.subTitle}>{data.cpf}</Text>}
            </View>
        </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#8B97FF22',
        borderRadius: 10,
    },
    image: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '75%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: 5,
    },
    imageStyled: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#8B97FF',
        marginLeft: 5,
    },
    subTitle:{
        fontSize: 12,
        fontWeight: '500',
        flexWrap: 'nowrap',
        color: '#8B97FFaa',
        marginLeft: 5,
    }
});
export default SearchCardLite;