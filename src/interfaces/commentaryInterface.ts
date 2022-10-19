import UserInterface from "./userInterface"
interface commentaryInterface {
    createdAt: string,
    _id: string,
    professionalId: string,
    userId: string,
    comment: string,
    updatedAt: string,
    user: UserInterface
}

export default commentaryInterface;