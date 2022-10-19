import React, { useContext, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';
import commentaryInterface from '../../interfaces/commentaryInterface';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
// import { Container } from './styles';



type Props = {
  data: commentaryInterface
  updateData?: () => void
  managementMode?: boolean
}

const CardComment = ({ data, updateData, managementMode }: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );

  const [loadingImage, setLoadingImage] = useState(true);

  function getDate() {
    function padNumber(number : Number) {
        if (number < 10) {
            return String('0' + number);
        } else {
            return String(number);
        }
    }
  
    let itemDate = new Date(data.createdAt);
    let d = itemDate.getDate();
    let m = itemDate.getMonth() + 1;
    let y = itemDate.getFullYear();
    let h = itemDate.getHours();
    let min = itemDate.getMinutes();

    return padNumber(d) + '/' + padNumber(m) + '/' + padNumber(y) + ' ' + padNumber(h) + ':' + padNumber(min);
  }

  function handleDeleteComment() {
    Alert.alert('ATENÇÃO!', 'Deseja realmente apagar este comentário?', [
      {
          text: 'Cancelar',
      },
      {
          text: 'Sim',
          onPress: () => {

              api.delete(`/comment/delete/${data._id}`).then((response) => {
                  Alert.alert("Sucesso", "Agendamento removido com sucesso!",
                  [
                    { text: "OK", onPress: () => updateData() }
                  ])
              }).catch((error) => {
                  console.log(error.response.data);
                  Alert.alert("Erro", "Erro ao remover o Agendamento!");
                  updateData();
              });

          }
      }
  ])
  }
  return(
    <View style={styles.container}>
      <View style={styles.contentImage}>
        { data.user.profilePhoto ? (<>
          <Image 
              style={[styles.imageStyle, {display: (loadingImage ? 'none' : 'flex')}]} 
              source={{uri: data.user.profilePhoto } as ImageSourcePropType} 
              onLoad={() => setLoadingImage(false)}
          /> 
          <ActivityIndicator
              color={theme.secondary88}
              size={30}
              style={{ display: (loadingImage ? 'flex' : 'none') }}
          /> 
          </>) : ( 
          <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Ionicons name="person-circle-outline" size={60} color={theme.cardLitePerson} />
          </View> )} 
      </View>
      <View style={styles.contentDescription}>
        <View style={styles.contentInformationComment}>
          <Text style={styles.labelName}>{data.user.name}</Text>
          <Text style={styles.labelTime}>{getDate()}</Text>
          {managementMode && 
            <TouchableOpacity onPress={handleDeleteComment}>
              <FontAwesome name="remove" size={20} style={{top: 5}} color={theme.primaryVariant88} />
            </TouchableOpacity>}
        </View>
        <Text style={styles.labelComment}>{data.comment}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme :Theme) => {

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
      backgroundColor: 'transparent',
      borderRadius: 10,
      marginRight: 15,
    },

    labelName: {
      fontSize: 18,
      color: theme.textVariant,
      fontFamily: "Inter_500Medium",
      maxWidth: "50%"
    },
    
    labelComment: {
      fontSize: 14,
      color: theme.textVariant,
      marginTop: 2,
      fontFamily: "Inter_400Regular"
    },

    labelTime: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: theme.textVariant8,
      top: 5
    },

    contentDescription: {
      width: "75%",
      maxWidth: "75%",
      height: "auto",
    },

    contentInformationComment: {
      justifyContent: "space-between",
      flexDirection: "row",
    },

    imageStyle: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    }
  })
  return styles;
};

export default CardComment;