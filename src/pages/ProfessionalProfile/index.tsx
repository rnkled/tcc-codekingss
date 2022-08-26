import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from '../../components/Header';
import ImageProfissional from "../../assets/th.jpg"
import { AirbnbRating } from 'react-native-ratings';
import NavComponent from '../../components/NavComponent';

// import { Container } from './styles';

const ProfessionalProfile: React.FC = () => {

  const [isButtonLeftPressed, setIsButtonLeftPressed] = useState(true);
  const [isButtonRightPressed, setIsButtonRightPressed] = useState(false);


  function handlePressLeftButton(){
    if(isButtonRightPressed){
      setIsButtonLeftPressed(true);
      setIsButtonRightPressed(false);
    }
  }

  function handlePressRightButton(){
    if(isButtonLeftPressed){
      setIsButtonRightPressed(true);
      setIsButtonLeftPressed(false);
    }

  }


  return(
    <View style={styles.container}>
      <Header titlePage='Profissional' color='#0C0150' fontSize={30} />
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
          <NavComponent 
            buttonLeftPressed={isButtonLeftPressed} 
            onPressButtonLeft={() => handlePressLeftButton()} 
            buttonRightPressed={isButtonRightPressed}
            onPressButtonRight={() => handlePressRightButton()}
          />
          {isButtonLeftPressed && (
            <View style={styles.contentEvaluation}>

            </View>
          )}
          {/* {isButtonRightPressed && ()} */}


        </View>
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
    marginBottom: 10,
  },

  rateStyled: {
    width: "50%", 
    justifyContent: "space-between"
  },

  contentMotivational: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    padding: 5,
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
  }
})

export default ProfessionalProfile;