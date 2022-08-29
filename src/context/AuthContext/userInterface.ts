
interface UserInterface {
    "_id": string,
    "cpf": string,
    "name": string,
    "email": string,
    "profilePhoto": string,
    "degree": {
        "description": string,
        "crp": string
    },
    "description": string,
    "clinicName": string,
    "address": {
        "street": string,
        "number": number,
        "complement": string,
        "neighborhood": string,
        "city": string,
        "state": string,
        "postalCode": string
    },
    "rate": number,
    "active": false,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": number,
    "role": string
}

export default UserInterface;