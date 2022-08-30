import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from '../../context/AuthContext';

export type ChatBoxProps = {
  user_type: "pacient" | "professional",
  message: string;
  id_user: string;
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    maxWidth: 235,
    padding: 10,
    marginBottom: 10,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,

  },

  textMessage: {
    fontFamily: "Inter_400Regular",
    color: "#0C0150",
    fontSize: 16,
  }
})

export default ChatBoxMessage;