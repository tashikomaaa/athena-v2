
export const UPDATE_REGISTRATION = `
    mutation updateRegistration($registrationInput: RegistrationInput!) {
        updateRegistration(registrationInput: $registrationInput) {
            _id
                createdBy
                customerInfos {
                    name
                    firstname
                    email
                    gender
                    phonenumber
                    address
                    birthdate
                    bankaccount {
                        iban
                        bic
                    }
                }
                payementvalue
                signature
                active
                createdAt
                assoId
                missionId
                newsletter
                rd {
                    email,
                    isAdmin,
                    name,
                    firstname,
                    createdBy,
                    isActive
                    registrationDate
                    lastLogin
                    uuid
                    status
                    pp
                    phoneNumber
                }
                status
                commentary
        }
    }
`;
