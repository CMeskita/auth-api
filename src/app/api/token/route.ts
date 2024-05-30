import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken,decodifcarJwtToken,  getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";

export async function POST(request:NextRequest) {
   debugger;
     
  try {    
    const accessToken = request.headers.get('authorization')
    const refreshToken = request.cookies.get('refreshtoken')?.value
                       
    if (!accessToken && !refreshToken) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            statusText: 'Access Denied. No token provided',
        });
        }

        const userToken=decodifcarJwtToken(accessToken as string) 
         
        const email= `${userToken.email}`
        const account_id= `${userToken.random}`

    if (await verifyJwtToken(accessToken as string).then(result=>result===null)) {

        if (await verifyJwtToken(refreshToken as string).then(result=>result===null)) {

            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                statusText: 'Token Expirado',
            
            });
    }else
        {          
            const newaccessToken = await new SignJWT({
                email: email,
                random:account_id
              })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("21600s") //6hs
                .sign(getJwtSecretKey());
                return new NextResponse(JSON.stringify({ sucess: true }), {
                    status: 401,
                    statusText: 'Token Expirado',
                    headers: { "content-type": "application/json" ,"Authorization":`${newaccessToken}`} 
                
                });
        }
}

return NextResponse.json({ email:email,account:account_id});
}
 catch (e) {
   
          return new NextResponse(JSON.stringify({ message: "error" }), {
              status: 500,
              statusText: 'Error',
          });
      
      throw e
  }
   
  }

