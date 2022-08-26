import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ChatBoxProps = {
  user: "pacient" | "professional",
  message: string;
}

type Props = {
  data: ChatBoxProps;
}

// import { Container } from './styles';

const ChatBoxMessage = ({data}: Props) => {
  return(
    <View style={[styles.container, data.user === "pacient" ? { borderBottomLeftRadius: 15, borderBottomEndRadius: 0, backgroundColor: "#8B97FF"} : {borderBottomLeftRadius: 0, borderBottomEndRadius: 15, backgroundColor: "#EEEEEE"}]}>
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