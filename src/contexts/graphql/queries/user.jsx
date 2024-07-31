// eslint-disable-next-line import/no-extraneous-dependencies

export const GET_USER_ME = `
    query getUserMe{
        getUserMe{
            email,
            isAdmin,
            name,
            firstname,
            createdBy,
            isActive,
            registrationDate,
            lastLogin,
            assoId,
            uuid,
            phoneNumber
            pp,
        }
    }
`;


export const LIST_ALL_USERS = `
query listAllUsers{
	listAllUsers{
        _id
		email,
		isAdmin,
		name,
		firstname,
		createdBy,
		isActive
        assoId,
		registrationDate
		lastLogin
		uuid
        status
		pp
        phoneNumber
	}
}
`;