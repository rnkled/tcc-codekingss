import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, ActivityIndicator } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import userInterface from '../../interfaces/userInterface';
import { RouteStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient, } from 'expo-linear-gradient';
import Loading from '../Loading';
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';
import api from '../../services/api';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>

type CardPrams = {
    data: userInterface,
    type_user?: string;
}

const SearchCard = ({ data, type_user="professional" } :CardPrams) => {
    const {theme} = useContext(ThemeContext);
    const styles = React.useMemo(
        () => createStyles(theme),
        [theme]
    );

    let [loadingImage, setLoadingImage] = useState(true);

    const navigation = useNavigation<propsScreens>();

    function goTo() {
        if(type_user === "professional"){
            navigation.navigate("professionalProfile", {id_professional: data._id});
        }else{
            navigation.navigate("chat", {id_professional: null, id_pacient: data._id, pushNotification: data.tokenPush, name: data.name});
        }
    }

    const [rating, setRating] = useState(0.00);
    
    async function getRating(){
        api.get(`/rate/list/${data._id}`).then(response => {       
            setRating(parseFloat(response.data.averageRate) || 0.00);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRating();
    }, [])

  return ( 
    <TouchableOpacity onPress={goTo}>
        <LinearGradient colors={[theme.searchFirst, theme.searchSecond, theme.searchThird]} style={styles.container}>
            <View style={styles.image}>
                { data.profilePhoto ? (<>
                    <Image 
                        style={[styles.imageStyled, {display: (loadingImage ? 'none' : 'flex')}]} 
                        source={{uri: data.profilePhoto } as ImageSourcePropType} 
                        onLoad={() => setLoadingImage(false)}
                    /> 
                    <ActivityIndicator
                        color={theme.secondary88}
                        size={30}
                        style={{ display: (loadingImage ? 'flex' : 'none') }}
                    /> 
                    </>) : ( 
                    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                        <Ionicons name="person-circle-outline" size={80} color={theme.secondary} />
                    </View> )} 
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{data.name}</Text>
                {type_user === "professional" && <>
                    <AirbnbRating
                    showRating={false}
                    count={5}
                    defaultRating={rating}
                    isDisabled={true}
                    selectedColor={theme.stars}
                    size={16}
                    />
                    <Text numberOfLines={1} style={styles.address}>{data.address.street}, {data.address.number}, {data.address.neighborhood}, {data.address.postalCode}</Text>
                    <Text numberOfLines={1} style={styles.address}>{data.address.city}</Text>
                </>}
            </View>
        </LinearGradient>
    </TouchableOpacity>);
}
const createStyles = (theme :Theme) => {

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 90,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 5,
            borderRadius: 8,
        },
        image: {
            width: '25%',
            height: '100%',
            padding: 5,
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
            width: "100%",
            height: "100%",
            borderRadius: 180/2,
            borderColor: theme.secondary,
            borderWidth: 1,
        },
        title: {
            fontSize: 20,
            fontWeight: '500',
        },
        address:{
            fontSize: 12,
            fontWeight: '500',
            flexWrap: 'nowrap',
        }
    });
    return styles;
}
export default SearchCard;