import { jwtVerify,decodeJwt } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("A chave secreta JWT não corresponde");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token:string) {
  try {
    debugger;
 
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
   
  } catch (e) {
  
    return null
  }

}
export function decodifcarJwtToken(token:any) {
   debugger;
 
    const user = decodeJwt(token);
    const usuarioLogado=JSON.stringify(user,['email','random']);
    const obj=JSON.parse(usuarioLogado);

   return obj;
 
}

