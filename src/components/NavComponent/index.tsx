import React, { useContext, useState } from 'react';
import { FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tab, Text as TextTab, TabView } from '@rneui/themed';
import CardComment, { PropsCardComment } from '../CardComment';
import { Feather } from '@expo/vector-icons';
import userInterface from '../../interfaces/userInterface';
// import { Container } from './styles';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';


type Props = {
  dataProfessional: userInterface,
  dataComments: PropsCardComment[],
}


const NavComponent = ({dataComments, dataProfessional}: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  
  const [index, setIndex] = useState(0);
  

  async function openGps(){
  
  await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${dataProfessional.address}`);
}

  return(
    <>
    <Tab 
      value={index}
      onChange={(e) => setIndex(e)}
      variant="primary"
      containerStyle={styles.container}
      indicatorStyle={{display: "none"}}
    >
      <Tab.Item
        title="Avaliações"
        size='sm'
        titleStyle={{ fontSize: 18, color: `${index === 0 ? theme.primaryVariant : theme.textVariantGray}`, fontFamily: "Inter_500Medium", top: -2.5 }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 0 ? theme.backgroundProfileVariant : theme.backgroundProfileDisable}`}]}
        
        /> 
      <Tab.Item
        title="Informações"
        size='sm'
        titleStyle={{ fontSize: 18, color: `${index === 1 ? theme.primaryVariant : theme.textVariantGray}`, fontFamily: "Inter_500Medium", top: -2.5 }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 1 ? theme.backgroundProfileVariant : theme.backgroundProfileDisable}`}]}   
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.contentDescription}>
          <FlatList
            data={dataComments}
            renderItem={({item}) => (
                <CardComment data={item}/>
              )
            }          
          />
          
        </TabView.Item>
        <TabView.Item style={styles.contentDescription}>
          <ScrollView style={styles.containerInformationPersonal}>
            <Text style={styles.labelTitleInformation}>Formação Acadêmica</Text>
            <Text style={[styles.descriptionInformation, {marginBottom: 10,}]}>
              {dataProfessional.degree.description}
            </Text>
            
            <Text style={styles.labelTitleInformation}>Competências e responsabilidades</Text>
            <Text style={[styles.descriptionInformation, {marginBottom: 10,}]}>
              {dataProfessional.description}
            </Text>

            <Text style={styles.labelTitleInformation}>Atendimento presencial</Text>
            <Text style={styles.descriptionInformation}>{dataProfessional.clinicName}</Text>
            <Text style={styles.descriptionInformation}>{dataProfessional.address.street}, {dataProfessional.address.number}, {dataProfessional.address.neighborhood}, {dataProfessional.address.postalCode}</Text>
            
            <View style={styles.contentRowLocale}>
              <Text style={[styles.descriptionInformation, {marginRight: 10}]}>{dataProfessional.address.city}</Text>
              <TouchableOpacity onPress={openGps}>
                <Feather name="map-pin" size={24} color={theme.primaryVariant} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TabView.Item>
    </TabView>
     </>
      
  );
}

const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundProfileDisable,
      height: 50,
      borderRadius: 100,
    
    },

    buttonNav: {
      backgroundColor: theme.backgroundProfileDisable,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.backgroundProfileDisable,
      justifyContent: "center",
      alignItems: "center",
      
    },

    contentDescription: {
      flex: 1,
      width: "100%",
      padding: 10,
    },

    containerInformationPersonal: {
      width: '100%',
      paddingHorizontal: 4,
      height: "auto",
    },

    labelTitleInformation: {
      fontSize: 20,
      fontFamily: "Inter_500Medium",
      color: theme.textVariant,
      marginBottom: 3,
      fontWeight: "bold",
    },

    descriptionInformation: {
      fontSize: 16,
      fontFamily: "Inter_400Regular",
      color: theme.primary,
    },

    contentRowLocale: {
      width: "auto",
      flexDirection: "row",
      height: "auto",
      alignItems: "center"
    }


  })
  return styles;
};

export default NavComponent;