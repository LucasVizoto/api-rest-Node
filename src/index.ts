interface User{
    birthYear: number
}

function calculateUser(user: User){
    return new Date().getFullYear() - user.birthYear
}

//calculateUser('meu tipo é Any')
calculateUser({
    birthYear: 20
})

// runtime type checking, só consigo ver os errors depois que eu rodar