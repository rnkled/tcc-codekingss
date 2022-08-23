import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Background from '../../components/Background';
import Button from '../../components/Button';

// import { Container } from './styles';

const RateCallVideo: React.FC = () => {
  return(
    <View style={styles.container}>
      <View style={styles.contentPrimary}>
        <View style={styles.rateContainer}>
          <AirbnbRating
            showRating={false}
            count={5}
            starContainerStyle={{width: "50%", justifyContent: "space-between"}}
            defaultRating={5}
            size={24}
          />
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.titleMessage}>Avalie este atendimento</Text>

          <Text style={styles.message}>
            Sua avaliacao é importante para o 
            nosso servico pois ela nos permite mantermos a 
            qualidade sempre em primeiro lugar!
          </Text>

        </View>
        <View style={styles.contentButtons}>
          <Button onPress={() => {}} label='Eu amei o atendimento!'/>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Text style={styles.labelButton}>
              Teve problemas técnicos? Nos avise!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Text style={styles.labelButton}>
              Avaliar depois
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B97FF"
  },
  
  contentPrimary: {
    width: "95%",
    height: "auto",
    backgroundColor: "#0C0150",
    paddingHorizontal: 10,
    paddingTop:  10,
    paddingBottom: 20,
    borderRadius: 8
  },
  rateContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },

  messageContent: {
    width: "100%",
    height: "auto",
    
  },
  
  titleMessage: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Inter_500Medium",
    color: "#FFF"
  },
  
  message: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    color: "#FFF",
    paddingVertical: 25,
  },

  contentButtons: {
    height: "auto",
    width: "100%",
    alignItems: "center",
  },

  labelButton: {
    fontSize: 16,
    color: "#8B97FF",
    fontFamily: "Inter_600SemiBold",
    marginTop: 20,
  }

})

export default RateCallVideo;