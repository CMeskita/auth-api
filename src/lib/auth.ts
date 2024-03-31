import { jwtVerify,decodeJwt } from "jose";

import { criatedHash } from "@/lib/Hash";;
import prisma from "@/lib/prisma";
import { user ,Prisma} from "@prisma/client";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface UserData {
  sub: string
}

interface InewTokwn{
  email:string
  account_id:string
}

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

export  function gerarAcessToken(email:string,account_id:string) {
  const accessToken =  new SignJWT({
    email: email,
    random:account_id
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("21600s") //6hs
    .sign(getJwtSecretKey());

 return accessToken;
  
}

export  function gerarRefreshtoken(email:string,account_id:string) {

  const accesstoken=gerarAcessToken(email,account_id);
 
  const refreshtoken =  new SignJWT({
    token: accesstoken        
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("32400s") //9hs
    .sign(getJwtSecretKey());

    return refreshtoken;
  
}

