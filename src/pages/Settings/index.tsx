import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
  ImageSourcePropType,
  PermissionsAndroid,
  TextInput,
} from "react-native";
import Header from "../../components/Header";
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";
import AuthContext from "../../context/AuthContext";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteStackParamList } from "../../routes";
import TextInputMaterial from "../../components/TextInputMaterial";
import TextAreaMaterial from "../../components/TextAreaMaterial";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "../../services/api";
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import ThemeContext from "../../context/ThemeContext";
import { Theme } from "../../interfaces/themeInterface";
import SwitchWithIcons from "react-native-switch-with-icons";
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const Settings: React.FC = () => {
  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<propsScreens>();

  const { user, updateLocalUser } = useContext(AuthContext);

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [cpf, setCpf] = useState<string>(user.cpf);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [degreeDescription, setDegreeDescription] = useState<string>(
    user.degree.description
  );
  const [degreeCrp, setDegreeCrp] = useState<string>(user.degree.crp);
  const [clinicName, setClinicName] = useState<string>(user.clinicName);
  const [skills, setSkills] = useState<string>(user.skills);

  const [addressStreet, setAddressStreet] = useState<string>(
    user.address.street
  );
  const [addressNumber, setAddressNumber] = useState<string>(
    String(user.address.number ? user.address.number : "")
  );
  const [addressComplement, setAddressComplement] = useState<string>(
    user.address.complement
  );
  const [addressNeighborhood, setAddressNeighborhood] = useState<string>(
    user.address.neighborhood
  );
  const [addressCity, setAddressCity] = useState<string>(user.address.city);
  const [addressState, setAddressState] = useState<string>(user.address.state);
  const [addressPostalCode, setAddressPostalCode] = useState<string>(
    user.address.postalCode
  );

  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const [openProfissionalInfo, setOpenProfissionalInfo] =
    useState<boolean>(false);
  const [openAddressInfo, setOpenAddressInfo] = useState<boolean>(false);

  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    getPhotoFirestore();
  }, []);

  async function handleSave() {
    setLoadingSave(true);

    let data = {
      cpf: cpf,
      name: name,
      email: email.toLowerCase().trim(),
      degree: {
        description: degreeDescription,
        crp: degreeCrp,
      },
      description: degreeDescription,
      clinicName: clinicName,
      address: {
        street: addressStreet,
        number: parseInt(addressNumber),
        complement: addressComplement,
        neighborhood: addressNeighborhood,
        city: addressCity,
        state: addressState,
        postalCode: addressPostalCode,
      },
      skills: skills,
      profilePhoto: profilePhoto,
    };

    api
      .put("/user/update/" + user._id, data)
      .then((response) => {
        updateLocalUser();
        setLoadingSave(false);
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        navigation.navigate("home");
      })
      .catch((error) => {
        setLoadingSave(false);
        console.log(error.response.data);
        Alert.alert("Erro", "Erro ao atualizar dados!");
      });
  }

  function goBack() {
    navigation.navigate("home");
  }

  function findPhoto() {
    Alert.alert("Upload de imagem", "Por onde deseja carregar sua foto?", [
      { text: "Cancelar", onPress: () => {}, style: "cancel" },
      {
        text: "Câmera",
        onPress: () => getPermissionCamera(),
        style: "destructive",
      },
      {
        text: "Galeria",
        onPress: () => getPermissionGalery(),
        style: "default",
      },
    ]);
  }

  async function getPermissionCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissao da câmera",
          message: "O app precisa acessar sua câmera",
          buttonNeutral: "Me pergunte depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options: CameraOptions = {
          mediaType: "photo",
          maxHeight: 180,
          maxWidth: 180,
          saveToPhotos: true,
          presentationStyle: "fullScreen",
        };

        await launchCamera(options, async (response) => {
          if (response.errorCode) {
            return Alert.alert("Alerta", "Não foi possível carregar sua foto!");
          }

          if (response.didCancel) {
            return console.log("cancelado");
          }

          if (response.assets && response.assets.length > 0) {
            const { uri } = response?.assets[0];
            if (!!uri) {
              console.log("chamando aqqqq");
              await savePhotoFireStore(uri);

              setLoadingImage(false);
            }
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn("aa " + err);
    }
  }

  async function getPermissionGalery() {
    let options: ImageLibraryOptions = {
      mediaType: "photo",
      maxHeight: 180,
      maxWidth: 180,
      presentationStyle: "fullScreen",
    };

    await launchImageLibrary(options, async (response) => {
      if (response.errorCode) {
        return Alert.alert("Alerta", "Não foi possível carregar sua foto!");
      }
      if (response.assets && response.assets.length > 0) {
        const { uri } = response?.assets[0];
        if (!!uri) {
          await savePhotoFireStore(uri);
          setLoadingImage(false);
        }
      }
    });
  }

  async function savePhotoFireStore(uri: string) {
    const reference = storage().ref(`/images/${user._id}/img_profile.png`);
    await reference.putFile(uri);

    await getPhotoFirestore();
  }

  async function getPhotoFirestore() {
    try {
      setLoadingImage(true);

      const reference = storage().ref(`/images/${user._id}/img_profile.png`);
      let url = await reference.getDownloadURL();

      if (!!url) {
        setProfilePhoto(url);
      } else {
        setProfilePhoto("");
      }
    } catch (err) {
      Alert.alert("Alerta", "Não foi possível carregar sua foto de perfil!");
    } finally {
      setLoadingImage(false);
    }
  }

  return (
    <Background>
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Header
          titlePage={"Configurações"}
          fontSize={26}
          color={theme.primaryVariant}
          buttonLeft={{
            isIcon: false,
            label: "Voltar",
            onPress: goBack,
          }}
        />
        <SwitchWithIcons
          value={mode == "dark" ? true : false}
          onValueChange={toggleTheme}
          style={styles.darkModeSwitch}
          // noIcon={false}
          icon={{
            true: moon,
            false: sun,
          }}
          iconColor={{
            true: "#005",
            false: "#ffcc04",
          }}
          trackColor={{
            true: theme.backgroundVariantColor,
            false: theme.backgroundVariantColor,
          }}
          thumbColor={{
            true: "#fff",
            false: "#0052",
          }}
        />
        <View style={styles.contentPrimary}>
          {loadingImage && !profilePhoto && (
            <>
              <TouchableOpacity style={styles.contentPhoto} onPress={findPhoto}>
                <ActivityIndicator
                  color={theme.appoimentColor2}
                  size={100}
                  style={{
                    display: loadingImage ? "flex" : "none",
                    backgroundColor: theme.secondary,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
          {!!profilePhoto && (
            <>
              <TouchableOpacity style={styles.contentPhoto} onPress={findPhoto}>
                <Image
                  style={[
                    styles.imageStyled,
                    { display: loadingImage ? "none" : "flex" },
                  ]}
                  source={{ uri: profilePhoto } as ImageSourcePropType}
                  // onLoad={() => setLoadingImage(false)}
                />
                <ActivityIndicator
                  color={theme.appoimentColor2}
                  size={100}
                  style={{
                    display: loadingImage ? "flex" : "none",
                    backgroundColor: theme.secondary,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
          {!loadingImage && !profilePhoto && (
            <TouchableOpacity
              onPress={findPhoto}
              style={[
                styles.contentPhoto,
                { backgroundColor: theme.primaryVariant, borderRadius: 100 },
              ]}
            >
              <Feather name="camera-off" size={100} color={theme.titleButton} />
            </TouchableOpacity>
          )}
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputName}
            placeholder="Nome"
          />
          {/* <Text style={styles.instructions}>Toque na imagem ou nome para alterá-los</Text> */}
        </View>
        <View style={styles.contentSecondary}>
          <TextInputMaterial
            value={email}
            setValue={setEmail}
            label="Email"
            containerStyle={styles.inputMaterial}
            textColor={theme.textInputVariant}
            baseColor={theme.primaryVariant}
            editable={false}
          />
          <TextInputMaterial
            value={cpf}
            setValue={setCpf}
            label="CPF"
            containerStyle={styles.inputMaterial}
            textColor={theme.textInputVariant}
            baseColor={theme.primaryVariant}
          />
          {user.role == "professional" && (
            <View style={styles.frame}>
              <TouchableOpacity
                style={styles.showBox}
                onPress={() => {
                  setOpenProfissionalInfo(!openProfissionalInfo);
                }}
              >
                <Text style={styles.showBoxTitle}>
                  Informações Profissionais
                </Text>
                {openProfissionalInfo ? (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={24}
                    color="white"
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="white"
                  />
                )}
              </TouchableOpacity>
              {openProfissionalInfo && (
                <>
                  <TextInputMaterial
                    value={degreeCrp}
                    setValue={setDegreeCrp}
                    label="CRP"
                    containerStyle={styles.inputMaterial}
                    textColor={theme.textInputVariant}
                    baseColor={theme.primaryVariant}
                  />
                  <TextInputMaterial
                    value={clinicName}
                    setValue={setClinicName}
                    label="Nome da clínica"
                    containerStyle={styles.inputMaterial}
                    textColor={theme.textInputVariant}
                    baseColor={theme.primaryVariant}
                  />
                  <TextAreaMaterial
                    value={degreeDescription}
                    setValue={setDegreeDescription}
                    label="Formação Acadêmica"
                    containerStyle={styles.inputMaterial}
                    textColor={theme.textInputVariant}
                    baseColor={theme.primaryVariant}
                  />
                  <TextAreaMaterial
                    value={skills}
                    setValue={setSkills}
                    label="Competências e responsabilidades"
                    containerStyle={styles.inputMaterial}
                    textColor={theme.textInputVariant}
                    baseColor={theme.primaryVariant}
                  />
                </>
              )}
            </View>
          )}
          <View style={styles.frame}>
            <TouchableOpacity
              style={styles.showBox}
              onPress={() => {
                setOpenAddressInfo(!openAddressInfo);
              }}
            >
              <Text style={styles.showBoxTitle}>Informações de Endereço</Text>
              {openAddressInfo ? (
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={24}
                  color="white"
                />
              ) : (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="white"
                />
              )}
            </TouchableOpacity>
            {openAddressInfo && (
              <>
                <TextInputMaterial
                  value={addressStreet}
                  setValue={setAddressStreet}
                  label="Rua"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressNumber}
                  setValue={setAddressNumber}
                  label="Número"
                  keyboardType="numeric"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressComplement}
                  setValue={setAddressComplement}
                  label="Complemento"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressNeighborhood}
                  setValue={setAddressNeighborhood}
                  label="Bairro"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressCity}
                  setValue={setAddressCity}
                  label="Cidade"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressState}
                  setValue={setAddressState}
                  label="Estado"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
                <TextInputMaterial
                  value={addressPostalCode}
                  setValue={setAddressPostalCode}
                  label="CEP"
                  keyboardType="numeric"
                  containerStyle={styles.inputMaterial}
                  textColor={theme.textInputVariant}
                  baseColor={theme.primaryVariant}
                />
              </>
            )}
          </View>
          <Button
            label="Salvar"
            onPress={handleSave}
            loading={loadingSave}
            containerStyle={{ marginVertical: 30 }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    contentPrimary: {
      width: "90%",
      borderRadius: 10,
      height: "auto",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.primaryVariant22,
      padding: 10,
    },
    instructions: {
      color: theme.primaryVariant88,
      fontSize: 12,
      textAlign: "center",
    },
    contentBorderButton: {
      width: 175,
      height: 175,
      borderRadius: 175 / 2,
      backgroundColor: "transparent",
      borderWidth: 1.9,
      borderColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center",
    },

    contentSecondary: {
      width: "100%",
      paddingHorizontal: 20,
      height: "auto",
    },

    titleHome: {
      color: theme.textVariant,
      fontSize: 22,
      fontFamily: "Inter_600SemiBold",
    },
    contentPhoto: {
      width: 180,
      height: 180,
      backgroundColor: "transparent",

      justifyContent: "center",
      alignItems: "center",
    },
    imageStyled: {
      width: "100%",
      height: "100%",
      borderRadius: 180 / 2,
      borderColor: theme.secondary,
      borderWidth: 2,
    },
    inputName: {
      width: "100%",
      height: 50,
      textAlign: "center",
      backgroundColor: "transparent",
      borderRadius: 10,
      paddingHorizontal: 20,
      fontSize: 28,
      fontFamily: "Inter_400Regular",
      color: theme.textVariant,
      fontWeight: "bold",
    },
    inputMaterial: {
      backgroundColor: theme.primaryVariant22,
    },
    showBox: {
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 10,
    },
    showBoxTitle: {
      color: theme.textVariant,
      fontSize: 18,
    },
    frame: {
      width: "100%",
      height: "auto",
      backgroundColor: theme.primaryVariant22,
      borderRadius: 10,
      marginTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    darkModeSwitch: {
      position: "absolute",
      top: 45,
      right: "5%",
    },
  });
  return styles;
};

export default Settings;
