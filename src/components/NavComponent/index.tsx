import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tab, Text as TextTab, TabView } from '@rneui/themed';
import CardComment from '../CardComment';

// import { Container } from './styles';

type Props = {
  data?: {
    informationPersonal: {

    },
    evaluations: []
  }
}


const NavComponent = ({data} : Props) => {
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
        titleStyle={{ fontSize: 18, color: `${index === 0 ? '#8B97FF' : '#828282'}`, fontFamily: "Inter_400Regular"  }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 0 ? "#0C0150" : "#EEE"}`}]}
        
        /> 
      <Tab.Item
        title="Informações"
        size='sm'
        titleStyle={{ fontSize: 18, color: `${index === 1 ? '#8B97FF' : '#828282'}`, fontFamily: "Inter_400Regular" }}
        containerStyle={[styles.buttonNav, {backgroundColor: `${index === 1 ? "#0C0150" : "#EEE"}`}]}   
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.contentDescription}>
          <>
            <CardComment />
            <CardComment />
          </>
          
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