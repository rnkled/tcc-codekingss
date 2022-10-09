interface UserInterface {
    "_id": string,
    "cpf"?: string,
    "name": string,
    "email": string,
    "profilePhoto"?: string,
    "degree"?: {
        "description": string,
        "crp": string
    },
    "description"?: string,
    "clinicName"?: string,
    "address": {
        "street": string,
        "number": number,
        "complement": string,
        "neighborhood": string,
        "city": string,
        "state": string,
        "postalCode": string
    },
    "rate"?: number,
    "active": boolean,
    "createdAt": Date,
    "updatedAt": Date,
    "role": "user" | "admin" | "professional",
    "tokenPush"?: string;
    "skills"?: string;
}

export default UserInterface;