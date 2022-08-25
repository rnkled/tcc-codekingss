import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import imagePacient from "../../assets/th.jpg";
// import { Container } from './styles';

// type Props = {
//   dataComment: {
//     pacientName: string;
//     sourceImg: ImageSourcePropType;
//     description: string;
//     timesTamp: string;
//   }
// }

const CardComment = ({ dataComment }: Props) => {
  return(
    <View style={styles.container}>
      <View style={styles.contentImage}>
        <Image style={styles.imageStyle} source={imagePacient} />
      </View>
      <View style={styles.contentDescription}>
        <View style={styles.contentInformationComment}>
          <Text style={styles.labelName}>Maria</Text>
          <Text style={styles.labelTimer}>8m atrás</Text>
        </View>
        <Text style={styles.labelComment}>Amei sua consulta!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center"
  },

  contentImage: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 15,
  },

  labelName: {
    fontSize: 20,
    color: "#FFF",
    fontFamily: "Inter_500Medium"
  },
  
  labelComment: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 30,
    fontFamily: "Inter_400Regular"
  },

  labelTimer: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#828282",
  },

  contentDescription: {
    width: "75%",
    maxWidth: "75%",
    height: "auto",
  },

  contentInformationComment: {
    justifyContent: "space-between",
    flexDirection: "row"
  },

  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  }
})

export default CardComment;