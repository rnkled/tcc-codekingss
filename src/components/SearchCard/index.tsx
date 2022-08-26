import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { DataProfileProfessional } from '../../components/NavComponent';
import { RouteStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type propsScreens = NativeStackNavigationProp<RouteStackParamList>

type CardPrams = {
    professionalData: DataProfileProfessional,
}

const SearchCard = ({ professionalData } :CardPrams) => {

    const navigation = useNavigation<propsScreens>();

    function goToProfessional() {
        navigation.navigate("professionalProfile", {id_professional: professionalData.id});
    }

  return ( 
    <TouchableOpacity onPress={goToProfessional}>
        <View style={styles.container}>
            <View style={styles.image}>
                <Image style={styles.imageStyled} source={professionalData.urlImage && professionalData.urlImage }/>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{professionalData.name}</Text>
                <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={professionalData.rate}
                isDisabled={true}
                selectedColor={"#FFB84E"}
                size={16}
            />
                <Text style={styles.address}>{professionalData.address}</Text>
                <Text style={styles.address}>{professionalData.city}</Text>
            </View>
        </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#8B97FF',
        marginBottom: 10,
        borderRadius: 10,
    },
    image: {
        width: '25%',
        height: '100%',
        padding: 5,
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
        borderWidth: 4,
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