import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Header from '../../components/Header';
import AgoraUIKit, {VideoRenderMode} from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/native';



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
        // iconSize: 30,
        // theme: "#0C0150",
        // borderColor: "#8B97FF"
        localBtnStyles:{
          muteLocalAudio: {backgroundColor: "#8B97FF", borderWidth: 0 },
          muteLocalVideo: {backgroundColor: "#8B97FF", borderWidth: 0 },
          switchCamera: {backgroundColor: "#8B97FF", borderWidth: 0 },
          endCall: {backgroundColor: '#f66', borderWidth: 0},

        },
        localBtnContainer: {
          backgroundColor: '#0C0150',
          bottom: 0,
          paddingVertical: 10,
          height: 80,
        },
        
        UIKitContainer: {height: '94%'},
      //   minViewContainer: {
      //   bottom: 80,
      //   top: undefined,
      //   backgroundColor: '#fff',
      //   borderWidth: 4,
      //   height: '100%',
      // },
  
        iconSize: 30,
        videoMode: {
          max: VideoRenderMode.Hidden,
          min: VideoRenderMode.Hidden,
        },
        
        // videoPlaceholderContainer: {backgroundColor: 'red'}


        
    
        
      }}   
      settings={{
        mode: 2,
        role: 1, // analisar o acesso do psicologo aqui
        activeSpeaker: false,
        initialDualStreamMode: 1,
        dual: true,
        

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