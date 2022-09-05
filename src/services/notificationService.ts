import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import api from './api';


export const requestUserNotificationPermission = async (id: string) => {
  console.log("executing request permission notification");

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
    const response = await api.put(`/user/update/${id}`, { tokenPush: fcmToken });
    if (response.status == 200) {
      console.log("notificacao concedida");
      return fcmToken
    } else {
      console.log("notificacao não concedida");
    }
  }
}

export const removePermissionNotification = async (id: string) => {
  const response = await api.put(`/user/update/${id}`, { tokenPush: null });

  if (response.status == 200) {
    await messaging().deleteToken();
    console.log("notificacao removida");
  } else {
    console.log("notificacao não removida");
  }
}


export const sendNotificationTo = async (token: string, title: string, body: string, id_professional: string, id_pacient: string, type: string, name: string, tokenSecondary: string) => {
  if (token && title && body) {

    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: token,
        notification: {
          title: title,
          body: body,
          mutable_content: true,
        },
        data: {
          id_professional: id_professional,
          id_pacient: id_pacient,
          type: type,
          name: name,
          tokenPush: tokenSecondary
        },
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAzEg2BlA:APA91bEPsvKwgjwXPpKZjogA9IZADMZM4yRyWUWWQpgVs0nASgicHmP6xduacwTK_dQffL7DSoPLylut7Ze27oGNFWGGhL8ofk093YHy-XgD1FpaTQAp3IZ_AWg8tz8cIQ5HIC6iA6wX",
        },
      }
    );
  }
}
