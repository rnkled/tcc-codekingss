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
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
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
import {launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const Settings: React.FC = () => {
    const navigation = useNavigation<propsScreens>();

    const { user, updateLocalUser } = useContext(AuthContext);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [cpf, setCpf] = useState(user.cpf);
    const [profilePhoto, setProfilePhoto] = useState("");

    const [degreeDescription, setDegreeDescription] = useState(
        user.degree.description
    );
    const [degreeCrp, setDegreeCrp] = useState(user.degree.crp);
    const [clinicName, setClinicName] = useState(user.clinicName);
    const [skills, setSkills] = useState(user.skills);

    const [addressStreet, setAddressStreet] = useState(user.address.street);
    const [addressNumber, setAddressNumber] = useState(String(user.address.number));
    const [addressComplement, setAddressComplement] = useState(
        user.address.complement
    );
    const [addressNeighborhood, setAddressNeighborhood] = useState(
        user.address.neighborhood
    );
    const [addressCity, setAddressCity] = useState(user.address.city);
    const [addressState, setAddressState] = useState(user.address.state);
    const [addressPostalCode, setAddressPostalCode] = useState(
        user.address.postalCode
    );

    const [loadingImage, setLoadingImage] = useState(true);

    const [openProfissionalInfo, setOpenProfissionalInfo] = useState(false);
    const [openAddressInfo, setOpenAddressInfo] = useState(false);

    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        getPhotoFirestore();
    }, [])

    function save() {
        setLoadingSave(true);

        let data = {
            "cpf": cpf,
            "name": name,
            "email": email,
            "degree": {
                "description": degreeDescription,
                "crp": degreeCrp
            },
            "description": degreeDescription,
            "clinicName": clinicName,
            "address": {
                "street": addressStreet,
                "number": parseInt(addressNumber),
                "complement": addressComplement,
                "neighborhood": addressNeighborhood,
                "city": addressCity,
                "state": addressState,
                "postalCode": addressPostalCode 
            },
            "skills": skills,
            "profilePhoto": profilePhoto
        }

        if(profilePhoto !== user.profilePhoto){
            savePhotoFireStore()
        }

        api.put("/user/update/"+user._id, data).then((response) => {
            updateLocalUser();
            setLoadingSave(false);
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
            navigation.navigate('home')
        }).catch((error) => {
            setLoadingSave(false);
            console.log(error.response.data);
            Alert.alert("Erro", "Erro ao atualizar dados!");
        });
    }

    function goBack() {
        navigation.navigate("home");
    }

    function findPhoto() {
        Alert.alert('Upload de imagem', "Por onde deseja carregar sua foto?", [
            {text: "Cancelar", onPress: () => {}, style: "cancel"},
            {text: "Câmera", onPress: () => getPermissionCamera(), style: "destructive"},
            {text: "Galeria", onPress: () => getPermissionGalery(), style: "default"},

        ]);
    }

    async function getPermissionCamera(){
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Permissao da câmera",
                message:"O app precisa acessar sua câmera",
                buttonNeutral: "Me pergunte depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                let options: CameraOptions = {
                    mediaType: "photo",
                    maxHeight: 180,
                    maxWidth: 180,
                    saveToPhotos: true,            
                    presentationStyle: "fullScreen"
                }

                await launchCamera(options, (response) => {
                    console.log('Response = ', response);
                        if(response.errorCode){
                            console.log(response.errorMessage);
                        }

                        const { uri, type, fileName, fileSize } = response.assets[0];
                        if(!!uri){
                            setProfilePhoto(uri)
                            setLoadingImage(false);
                        }

                });
        
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async function getPermissionGalery(){
        let options: ImageLibraryOptions = {
            mediaType: "photo",
            maxHeight: 180,
            maxWidth: 180,
            presentationStyle: "fullScreen",  
        };

        await launchImageLibrary(options, (response) => {
            if(response.errorCode){
                console.log(response.errorMessage);
            }

            const { uri, type, fileName, fileSize } = response.assets[0];
            if(!!uri){
                console.log({uri});
                
                setProfilePhoto(uri)
                setLoadingImage(false);
            }
        })
    };

    async function savePhotoFireStore(){
        console.log("enviando");
        
        const reference = storage().ref(`/images/${user._id}/img_profile.png`);
        await reference.putFile(profilePhoto);
    }

    async function getPhotoFirestore(){
        const reference = storage().ref(`/images/${user._id}/`);

        await reference.listAll().then(result => {
            result.items.forEach(async (ref) => {
                let url = await ref.getDownloadURL();
                if(!!url){
                    setProfilePhoto(url);
                }else{
                    setProfilePhoto(user.profilePhoto)
                }
                setLoadingImage(false);
            });

            
        })
 
    }
    
    return (
        <Background>
            <KeyboardAwareScrollView nestedScrollEnabled={true} contentContainerStyle={{alignItems: "center"}}>
                <Header
                    titlePage={"Configurações"}
                    fontSize={28}
                    color="#8B97FF"
                    buttonLeft={{
                        isIcon: false,
                        label: "Voltar",
                        onPress: goBack,
                    }}
                />
                <View style={styles.contentPrimary}>
                    {loadingImage && (
                        <>
                            <TouchableOpacity style={styles.contentPhoto} onPress={findPhoto}>
                                
                                <ActivityIndicator
                                    color={"#8B97FF"}
                                    size={100}
                                    style={{
                                        display: loadingImage ? "flex" : "none",
                                        backgroundColor: "#0C0150",
                                        borderRadius: 100,
                                    }}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                    {profilePhoto && (
                        <>
                            <TouchableOpacity style={styles.contentPhoto} onPress={findPhoto}>
                                <Image
                                    style={[
                                        styles.imageStyled,
                                        { display: loadingImage ? "none" : "flex" },
                                    ]}
                                    source={{ uri: profilePhoto, } as ImageSourcePropType}
                                    // onLoad={() => setLoadingImage(false)}
                                />
                                <ActivityIndicator
                                    color={"#8B97FF"}
                                    size={100}
                                    style={{
                                        display: loadingImage ? "flex" : "none",
                                        backgroundColor: "#0C0150",
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
                                { backgroundColor: "#8B97FF", borderRadius: 100 },
                            ]}
                        >
                            <Feather
                                name="camera-off"
                                size={100}
                                color="#0C0150"
                                style={{ marginLeft: 10 }}
                            />
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
                        textColor="#fff"
                        baseColor="#8B97FF"
                    />
                    <TextInputMaterial
                        value={cpf}
                        setValue={setCpf}
                        label="CPF"
                        containerStyle={styles.inputMaterial}
                        textColor="#fff"
                        baseColor="#8B97FF"
                    />
                    {user.role == "professional" && 
                        <View style={styles.frame}>
                            <TouchableOpacity style={styles.showBox} onPress={() => {setOpenProfissionalInfo(!openProfissionalInfo)}}>
                                <Text style={styles.showBoxTitle}>Informações Profissionais</Text>
                                {
                                    openProfissionalInfo ? (
                                        <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
                                    ) : (
                                        <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                                    )
                                }
                            </TouchableOpacity>
                            {openProfissionalInfo &&    
                                <>
                                    <TextInputMaterial
                                        value={degreeCrp}
                                        setValue={setDegreeCrp}
                                        label="CRP"
                                        containerStyle={styles.inputMaterial}
                                        textColor="#fff"
                                        baseColor="#8B97FF"
                                    />
                                    <TextInputMaterial
                                        value={clinicName}
                                        setValue={setClinicName}
                                        label="Nome da clínica"
                                        containerStyle={styles.inputMaterial}
                                        textColor="#fff"
                                        baseColor="#8B97FF"
                                    />
                                    <TextAreaMaterial
                                        value={degreeDescription}
                                        setValue={setDegreeDescription}
                                        label="Formação Acadêmica"
                                        containerStyle={styles.inputMaterial}
                                        textColor="#fff"
                                        baseColor="#8B97FF"
                                    />
                                    <TextAreaMaterial
                                        value={skills}
                                        setValue={setSkills}
                                        label="Competências e responsabilidades"
                                        containerStyle={styles.inputMaterial}
                                        textColor="#fff"
                                        baseColor="#8B97FF"
                                    />
                                </>
                            }  
                        </View>
                    } 
                    <View style={styles.frame}>
                        <TouchableOpacity style={styles.showBox} onPress={() => {setOpenAddressInfo(!openAddressInfo)}}>
                            <Text style={styles.showBoxTitle}>Informações de Endereço</Text>
                            {
                                openAddressInfo ? (
                                    <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
                                ) : (
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                                )
                            }
                        </TouchableOpacity>
                        {openAddressInfo &&    
                            <>
                                <TextInputMaterial
                                    value={addressStreet}
                                    setValue={setAddressStreet}
                                    label="Rua"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressNumber}
                                    setValue={setAddressNumber}
                                    label="Número"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressComplement}
                                    setValue={setAddressComplement}
                                    label="Complemento"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressNeighborhood}
                                    setValue={setAddressNeighborhood}
                                    label="Bairro"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressCity}
                                    setValue={setAddressCity}
                                    label="Cidade"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressState}
                                    setValue={setAddressState}
                                    label="Estado"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                                <TextInputMaterial
                                    value={addressPostalCode}
                                    setValue={setAddressPostalCode}
                                    label="CEP"
                                    containerStyle={styles.inputMaterial}
                                    textColor="#fff"
                                    baseColor="#8B97FF"
                                />
                            </>
                        }  
                    </View>
                    <Button label="Salvar" onPress={save} loading={loadingSave} containerStyle={{marginTop: 40}}/>
                </View>
            </KeyboardAwareScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    contentPrimary: {
        width: "90%",
        borderRadius: 10,
        height: 'auto',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#8B97FF22",
        padding: 10,
    },
    instructions: {
        color: "#8B97FF88",
        fontSize: 12,
        textAlign: "center",
    },
    contentBorderButton: {
        width: 175,
        height: 175,
        borderRadius: 175 / 2,
        backgroundColor: "transparent",
        borderWidth: 1.9,
        borderColor: "#0C0150",
        justifyContent: "center",
        alignItems: "center",
    },

    contentSecondary: {
        width: "100%",
        paddingHorizontal: 20,
        height: 'auto',
    },

    titleHome: {
        color: "#FFF",
        fontSize: 24,
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
        borderColor: "#0C0150",
        borderWidth: 2,
        
    },
    inputName: {
        width: "100%",
        height: 50,
        textAlign: "center",
        backgroundColor: "#FFF0",
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 28,
        fontFamily: "Inter_400Regular",
        color: "#fff",
        fontWeight: "bold",
    },
    inputMaterial: {
        backgroundColor: "#8B97FF22",
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
        color: "#fff",
        fontSize: 18,
    },
    frame: {
        width: "100%",
        height: "auto",
        backgroundColor: "#8B97FF22",
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});

export default Settings;
