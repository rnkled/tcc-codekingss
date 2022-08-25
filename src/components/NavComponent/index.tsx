import React, { useState } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tab, Text as TextTab, TabView } from '@rneui/themed';
import CardComment, { PropsCardComment } from '../CardComment';

// import { Container } from './styles';

export type DataProfileProfessional = {
  college: string,
  course: string,
  when: string,
  name: string,
  address: string,
  city: string,
  skills: string,
}

type Props = {
  dataProfessional: DataProfileProfessional,
  dataComments: PropsCardComment[],
}


const NavComponent = ({dataComments, dataProfessional}: Props) => {
  const [index, setIndex] = useState(0);
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
  }


})

export default NavComponent;