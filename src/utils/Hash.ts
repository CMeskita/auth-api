
import { createHash} from 'crypto'
//cria senha hash
export function criatedHash(senha:string){
    return createHash('sha256').update(senha).digest('hex')
    }
