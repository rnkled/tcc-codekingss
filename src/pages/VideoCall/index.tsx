import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Header from '../../components/Header';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/native';
import {VideoRenderMode} from 'react-native-agora';


const VideoCall: React.FC = () => {
  const navigation = useNavigation();

  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '885ca3cade8f4a3e81c7550a827300a2',
    channel: 'test',
  };
  
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
    
  };
  

  return videoCall ? (
    <AgoraUIKit styleProps={{
        remoteBtnStyles: {
          muteRemoteAudio: { display: "none", },
          muteRemoteVideo: { display: "none" },

          
        },
    
        minViewStyles: { height: 200, width: 150 },
        overlayContainer: {
          width: 150,
          height: 50,
          paddingRight: 90,
        },
      }}   
      settings={{
        mode: 1,
        role: 1,
        activeSpeaker: false,
        initialDualStreamMode: 1,
        dual: true

      }}
      connectionData={connectionData} 
      rtcCallbacks={rtcCallbacks} 
    />
  ) : (
    <Text onPress={()=>setVideoCall(true)}>Start Call</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0150"
  },

  contentPrimary: {
    flex: 1,
    justifyContent: "center"
  }
})

export default VideoCall;