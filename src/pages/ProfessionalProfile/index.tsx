import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import ImageProfissional from "../../assets/th.jpg"
import { AirbnbRating } from 'react-native-ratings';
import NavComponent, { DataProfileProfessional } from '../../components/NavComponent';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { PropsCardComment } from '../../components/CardComment';

// import { Container } from './styles';

const ProfessionalProfile: React.FC = () => {
  const navigation = useNavigation();
  const [dataProfessional, setDataProfessional] = useState<DataProfileProfessional>({} as DataProfileProfessional);
  const [dataComments, setDataComments] = useState<PropsCardComment[]>([
    {comment: "Amei, vou fazer mais novas consultas com ela!", pacientName: "Maria", published_at: "10min atrás"}, 
    {comment: "Gostei demais!!", pacientName: "Jubiscleide", published_at: "Há 10d"}, 
    {comment: "Hoje sou outra pessoa gracas a ela!", pacientName: "Josefina", published_at: "Há 1h"}, 
  ])
  function goToHome(){
    navigation.navigate("home.index")
  }

  return(
    <View style={styles.container}>
      <Header buttonLeft={{label: "Voltar", onPress: goToHome}} titlePage='Profissional' color='#0C0150' fontSize={30} />
      <View style={styles.contentPrimary}>
        <View style={styles.contentPhoto}>
          <Image style={styles.imageStyled} source={ImageProfissional}/>
        </View>  
      </View>
      <View style={styles.contentSecondary}>
        <View style={styles.rateContent}>

          <AirbnbRating
            showRating={false}
            count={5}
            starContainerStyle={styles.rateStyled}
            defaultRating={4}
            isDisabled={true}
            selectedColor={"#FFB84E"}
            size={24}
          />
        </View>
        <View style={styles.contentMotivational}>
          <Text style={styles.labelProfessionalName}>Victoria Robertson</Text>
          <Text style={styles.motivationalDescription}>
            Seja você a maior inspiração do mundo!
          </Text>
        </View>
        <View style={styles.contentDescription}>
          <NavComponent dataProfessional={dataProfessional} dataComments={dataComments}/>
        </View>
        <Button onPress={() => {}} label='Entrar em contato'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#8B97FF",
  },
  
  contentPrimary: {
    width: "100%",
    height: "20%",
    backgroundColor: "#8B97FF",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  contentSecondary: {
    width: "100%",
    flex: 1,
    backgroundColor: "#0C0150",
    padding: 15,
    zIndex: -10, 
  },

  contentPhoto: {
    width: 180,
    height: 180,
    borderRadius: 180/2,
    bottom: -35,
    zIndex: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  imageStyled: {
    width: "100%",
    height: "100%",
    borderRadius: 180/2,
    borderColor: "#0C0150",
    borderWidth: 4,
  },

 

  rateContent: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },

  rateStyled: {
    width: "50%", 
    justifyContent: "space-between"
  },

  contentMotivational: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  labelProfessionalName: {
    fontSize: 26,
    fontFamily: "Inter_500Medium",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 5,
  },
  
  motivationalDescription: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
  },

  contentDescription: {
    width: "100%",
    paddingTop: 15,
    flex: 1,
  },

  contentEvaluation: {
    width: "100%",
    flex: 1,
    backgroundColor: "red"
  },

  labelButton: {
    fontSize: 16,
    color: "#8B97FF",
    fontFamily: "Inter_600SemiBold",
    marginTop: 20,
    textAlign: "center"
  },
})

export default ProfessionalProfile;