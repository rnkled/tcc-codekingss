import React, { useContext } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

// import { Container } from './styles';

export type PropsCardComment = {
  sourceImg?: ImageSourcePropType;
  pacientName: string,
  published_at: string,
  comment: string,
}

type Props = {
  data: PropsCardComment
}

const CardComment = ({ data }: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <View style={styles.container}>
      <View style={styles.contentImage}>
        <Image style={styles.imageStyle} source={data.sourceImg && data.sourceImg} />
      </View>
      <View style={styles.contentDescription}>
        <View style={styles.contentInformationComment}>
          <Text style={styles.labelName}>{data.pacientName}</Text>
          <Text style={styles.labelTime}>{data.published_at}</Text>
        </View>
        <Text style={styles.labelComment}>{data.comment}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme :Theme) => {

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      flexDirection: "row",
      paddingTop: 10,
      alignItems: "center"
    },

    contentImage: {
      width: 60,
      height: 60,
      backgroundColor: theme.textVariant,
      borderRadius: 10,
      marginRight: 15,
    },

    labelName: {
      fontSize: 18,
      color: theme.textVariant,
      fontFamily: "Inter_500Medium"
    },
    
    labelComment: {
      fontSize: 14,
      color: theme.textVariant,
      marginTop: 2,
      fontFamily: "Inter_400Regular"
    },

    labelTime: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: theme.textVariant8,
      top: 5
    },

    contentDescription: {
      width: "75%",
      maxWidth: "75%",
      height: "auto",
    },

    contentInformationComment: {
      justifyContent: "space-between",
      flexDirection: "row"
    },

    imageStyle: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    }
  })
  return styles;
};

export default CardComment;