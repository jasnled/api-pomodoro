
const userData = () => {
    const userEmail = `${document.querySelector('.input-email').value}`;
    const userPassword = `${document.querySelector('.input-password').value}`;
    return{ 
        email: `${userEmail}`,
        password: `${userPassword}` 
    };
}

async function fetchData(url, user){

    await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json; charset=UTF-8"},
        mode: "cors"
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.token));
        }
    )

    .catch(err => console.log(err));
    
}

const createAccount = async () => {
    
    const user = userData();
    const url = 'http://localhost:3005/api/v1/users/auth/login';
    
    await fetchData(url, user); 

    const token = await JSON.parse(localStorage.getItem("token"));

    console.log(`eltoken guardado en local storage: ${token}`);
    
}



