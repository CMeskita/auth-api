import { Prisma, user } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken,decodifcarJwtToken, gerarAcessToken } from "@/lib/auth";

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
           const newaccessToken=gerarAcessToken(email as string ,account_id as string) 
           return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            statusText: 'Token Expirado',
            headers:{ "content-type": "application/json" ,"Authorization":`${newaccessToken}`}
           
        });
           
        }
    
     // return response;  { status: 401, headers:'Access Denied. No token provided'}
}

return NextResponse.json({ email:email,account:account_id});
      
 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
          return new NextResponse(JSON.stringify({ message: e.message }), {
              status: 500,
              statusText: 'Error',
          });
      }
      throw e
  }
   
  }

