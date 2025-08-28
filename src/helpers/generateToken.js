export function generateToken(total){
    const characters=
    'QERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
    const length = total;
    let token='';

    for(let i=0;i<length;i++){
        token+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return token;
}