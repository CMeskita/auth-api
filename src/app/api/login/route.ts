
import { criatedHash } from '@/lib/Hash';
import { getJwtSecretKey } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  const timeAcesstoken  = process.env.EXPIRATION_TIME_ACESSTOKEN;
  const timeRefreshtoken  = process.env.EXPIRATION_TIME_REFRESHTOKEN;
  const body = await request.json();
 
try {

  const users = await prisma.user.findFirstOrThrow({

    where: {email: body.email}

   });
  
    if (body.email === users.email && criatedHash(body.senha) === users.senha) {
      const accessToken = await new SignJWT({
        email: body.email,
        random:users.account_id})
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(`${timeAcesstoken}`) //6hs
          .sign(getJwtSecretKey());
   
      const refreshtoken = await new SignJWT({
        token: accessToken})
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(`${timeRefreshtoken}`) //9hs
          .sign(getJwtSecretKey());
      const response = NextResponse.json(       
        {sucess:true,accessToken:accessToken,refreshtoken:refreshtoken},
        { status: 200, headers: { "content-type": "application/json" ,"Authorization":`${accessToken}`} }
       
      );    
      response.cookies.set({
        name: "refreshtoken",
        value: refreshtoken,
        path: "/",
      });
      return response;
    }
    return NextResponse.json({ success: false });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === 'P2002') {
      console.log(
        'Há uma violação de restrição exclusiva. Um novo usuário não pode ser criado com este e-mail'
      )
    }
      }
      throw e
}
 
}