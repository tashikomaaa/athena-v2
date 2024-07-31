export const GET_ALL_REGISTRATIONS = `
query listAllRegistrations($searchOptions: SearchOptions){
	listAllRegistrations(searchOptions: $searchOptions){
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
        commentary
        newsletter
        status
        rd {
            firstname
            name
        }
	}
}
`;
