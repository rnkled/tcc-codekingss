import React, { memo, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from '../../context/AuthContext';
import moment from "moment";

export type ChatBoxProps = {
  user_type: "pacient" | "professional",
  message: string;
  id_user: string;
  sent: string;
}

type Props = {
  data: ChatBoxProps;
  user_role: string;
}

// import { Container } from './styles';

const ChatBoxMessage = ({data, user_role}: Props) => {
  return(
    <View style={[styles.container, data.user_type === user_role ? { borderBottomLeftRadius: 15, borderBottomEndRadius: 0, backgroundColor: "#8B97FF"} : {borderBottomLeftRadius: 0, borderBottomEndRadius: 15, backgroundColor: "#EEEEEE"}]}>
      <Text style={styles.textMessage}>
        {data.message}
      </Text>
      <Text style={styles.labelData}>
        {/* {moment(String(data.sent).split("-")[1], "HH:mm:ss" ).format("HH:mm")} */}
        {String(data.sent).split("-")[1]}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    maxWidth: 235,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5, 
    marginBottom: 10,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,

  },

  textMessage: {
    fontFamily: "Inter_400Regular",
    color: "#0C0150",
    fontSize: 16,
    marginRight: 55,
  },

  labelData: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "right",
    bottom: 3,


  }
})

export default memo(ChatBoxMessage);