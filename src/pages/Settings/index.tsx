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
    TextInput,
} from "react-native";
import Header from "../../components/Header";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
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

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const Settings: React.FC = () => {
    const navigation = useNavigation<propsScreens>();

    const { user } = useContext(AuthContext);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [cpf, setCpf] = useState(user.cpf);
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

    const [degreeDescription, setDegreeDescription] = useState(
        user.degree.description
    );
    const [degreeCrp, setDegreeCrp] = useState(user.degree.crp);
    const [clinicName, setClinicName] = useState(user.clinicName);
    const [skills, setSkills] = useState(user.skills);

    const [addressStreet, setAddressStreet] = useState(user.address.street);
    const [addressNumber, setAddressNumber] = useState(user.address.number);
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

    function goBack() {
        navigation.navigate("home.index");
    }
    function findPhoto() {
        Alert.alert('Ainda não implementado', 'Aqui vai abrir pra escolher uma foto ou tirar uma foto');
    }
    return (
        <Background>
            <KeyboardAwareScrollView contentContainerStyle={{alignItems: "center"}}>
                <Header
                    titlePage={"Perfil"}
                    fontSize={28}
                    color="#8B97FF"
                    buttonLeft={{
                        isIcon: false,
                        label: "Voltar",
                        onPress: goBack,
                    }}
                />
                <View style={styles.contentPrimary}>
                    {profilePhoto ? (
                        <>
                            <TouchableOpacity style={styles.contentPhoto} onPress={findPhoto}>
                                <Image
                                    style={[
                                        styles.imageStyled,
                                        { display: loadingImage ? "none" : "flex" },
                                    ]}
                                    source={{ uri: profilePhoto } as ImageSourcePropType}
                                    onLoad={() => setLoadingImage(false)}
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
                    ) : (
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
                    {user.role == "professional" && (
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
                    )}
                </View>
            </KeyboardAwareScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    contentPrimary: {
        width: "90%",
        borderRadius: 10,
        height: 250,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#8B97FF22",
        padding: 10,
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
        height: 600,
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
        marginBottom: 20,
        fontWeight: "bold",
    },
    inputMaterial: {
        backgroundColor: "#8B97FF22",
    },
});

export default Settings;
