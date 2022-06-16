import jwt from 'jsonwebtoken';

const decodeToken=() =>{
    if(localStorage.getItem('x-auth')){
        const token=localStorage.getItem('x-auth');
        const tokenData=jwt.decode(token,'secret123');
        tokenData.token=token;
        return tokenData
    }else{
        return null;
    }
}

export default decodeToken;