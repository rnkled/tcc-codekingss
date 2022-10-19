import { ImageSourcePropType } from "react-native";

interface commentaryInterface {
    profilePhoto?: ImageSourcePropType; //
    pacientName: string, //
    createdAt: string,
    _id: string,
    professionalId: string,
    userId: string,
    comment: string,
    updatedAt: string,
}

export default commentaryInterface;