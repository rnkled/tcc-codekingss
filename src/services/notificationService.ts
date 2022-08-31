import messaging from '@react-native-firebase/messaging';
import axios from "axios";


export const requestUserNotificationPermission = async (id: string) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);

    // console.log('Authorization status:', authStatus);
  }
}

export const removePermissionNotification = (id: string) => {

}

export const sendNotificationTo = async () => {
  await axios.post(
    "https://fcm.googleapis.com/fcm/send",
    {
      to: "",
      notification: {
        title: "Vistoria remota",
        body: ``,
        mutable_content: true,
      },
      data: {
        id_professional: "",
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
