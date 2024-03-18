import { createCipheriv, randomBytes, createDecipheriv} from 'crypto'

export function Encrypt(password:string)
{
const key = randomBytes(32);
const vi = randomBytes(16);
const cipher = createCipheriv('aes256', key, vi);
const mensagemCifrada = cipher.update(password, 'utf-8', 'hex') + cipher.final('hex');

return mensagemCifrada;
}


// Decifrar a mensagem

export function Decryption(encryptedmessage:string)
{
    const key = randomBytes(32);
    const vi = randomBytes(16);
    const decipher = createDecipheriv('aes256', key, vi);
    const Decipheredmessage = decipher.update(encryptedmessage, 'hex', 'utf-8') + decipher.final('utf-8')

    return Decipheredmessage;
}


