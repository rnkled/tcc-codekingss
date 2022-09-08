import { firebase } from '@react-native-firebase/database';

export const database = firebase.app().database("https://app-codekingss-default-rtdb.firebaseio.com/").ref("/chats")