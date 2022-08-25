import React, { useState } from 'react';
import { Alert, FlatList, ImageSourcePropType, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tab, Text as TextTab, TabView } from '@rneui/themed';
import CardComment, { PropsCardComment } from '../CardComment';
import { Feather } from '@expo/vector-icons';

// import { Container } from './styles';

export type DataProfileProfessional = {
  college: string,
  course: string,
  when: string,
  address: string,
  city: string,
  skills: string,
  clinicName: string,
  name: string,
  legend: string,
  rate: number,
  urlImage: ImageSourcePropType;
}

type Props = {
  dataProfessional: DataProfileProfessional,
  dataComments: PropsCardComment[],
}


const NavComponent = ({dataComments, dataProfessional}: Props) => {
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
        titleStyle={{ fontSize: 18, color: `${index === 0 ? '#8B97FF' : '#828282'}`, fontFamily: "Inter_500Medium"  }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 0 ? "#0C0150" : "#EEE"}`}]}
        
        /> 
      <Tab.Item
        title="Informações"
        size='sm'
        titleStyle={{ fontSize: 18, color: `${index === 1 ? '#8B97FF' : '#828282'}`, fontFamily: "Inter_500Medium" }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 1 ? "#0C0150" : "#EEE"}`}]}   
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
              Formou-se na {dataProfessional.college} no curso de {dataProfessional.course} em {dataProfessional.when}.
            </Text>
            
            <Text style={styles.labelTitleInformation}>Competências e responsabilidades</Text>
            <Text style={[styles.descriptionInformation, {marginBottom: 10,}]}>
              {dataProfessional.skills}
            </Text>

            <Text style={styles.labelTitleInformation}>Atendimento presencial</Text>
            <Text style={styles.descriptionInformation}>Consultório {dataProfessional.clinicName}</Text>
            <Text style={styles.descriptionInformation}>{dataProfessional.address}</Text>
            
            <View style={styles.contentRowLocale}>
              <Text style={[styles.descriptionInformation, {marginRight: 10}]}>{dataProfessional.city}</Text>
              <TouchableOpacity onPress={openGps}>
                <Feather name="map-pin" size={24} color="#8B97FF" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TabView.Item>
    </TabView>
     </>
      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    height: 50,
    borderRadius: 100,
  
  },

  buttonNav: {
    backgroundColor: "#EEEE",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EEE",
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
    color: "#FFF",
  },

  descriptionInformation: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#FFF",
  },

  contentRowLocale: {
    width: "auto",
    flexDirection: "row",
    height: "auto",
    alignItems: "center"
  }


})

export default NavComponent;