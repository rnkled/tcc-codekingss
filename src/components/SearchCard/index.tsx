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
    dataProfessional: userInterface,
}

const SearchCard = ({ dataProfessional } :CardPrams) => {

    let [loadingImage, setLoadingImage] = useState(true);

    const navigation = useNavigation<propsScreens>();

    function goToProfessional() {
        navigation.navigate("professionalProfile", {id_professional: dataProfessional._id});
    }

  return ( 
    <TouchableOpacity onPress={goToProfessional}>
        <LinearGradient colors={['#8B97FFDD', '#8B97FF','#8B97FFDD' ]} style={styles.container}>
            <View style={styles.image}>
                { dataProfessional.profilePhoto ? (<>
                    <Image 
                        style={[styles.imageStyled, {display: (loadingImage ? 'none' : 'flex')}]} 
                        source={{uri: dataProfessional.profilePhoto } as ImageSourcePropType} 
                        onLoad={() => setLoadingImage(false)}
                    /> 
                    <ActivityIndicator
                        color={'#0C015088'}
                        size={30}
                        style={{ display: (loadingImage ? 'flex' : 'none') }}
                    /> 
                    </>) : ( 
                    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                        <Ionicons name="person-circle-outline" size={80} color="#0C0150" />
                    </View> )} 
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{dataProfessional.name}</Text>
                <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={dataProfessional.rate}
                isDisabled={true}
                selectedColor={"#FFB84E"}
                size={16}
            />
                <Text numberOfLines={1} style={styles.address}>{dataProfessional.address.street}, {dataProfessional.address.number}, {dataProfessional.address.neighborhood}, {dataProfessional.address.postalCode}</Text>
                <Text numberOfLines={1} style={styles.address}>{dataProfessional.address.city}</Text>
            </View>
        </LinearGradient>
    </TouchableOpacity>);
}

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
        borderColor: "#0C0150",
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
export default SearchCard;