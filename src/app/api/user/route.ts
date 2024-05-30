
import { criatedHash } from "@/lib/Hash";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
	
	const newUser = await request.json();
	try {
		debugger;

//verificar se usuario já cadastrado
			const result = await prisma.user.findFirst({
				where: {
					email : String(newUser.email),
				},
			
			});
			if(result){
				return new NextResponse(JSON.stringify({ message: "STATUS_CODE_DUPLICATE_RECORD"}), {
					status: 409,
					statusText: 'Registro de Email já existe',
				});
			}
//criando usuario
	newUser.senha=criatedHash(newUser.senha);
	newUser.data_desabilitado=null;
	const createdUser = await prisma.user.create({
		data: newUser,
		
	});
	return new NextResponse(JSON.stringify(createdUser), {
		status: 201,
		statusText: 'Created',
	});

} catch (e) {
	if (e instanceof PrismaClientKnownRequestError) {
		return new NextResponse(JSON.stringify({ message: e.message }), {
			status: 500,
			statusText: 'Error',
		});
	}
	throw e
  }
}
export async function GET() {
	const users  = await prisma.user.findMany();

	return new NextResponse(JSON.stringify(users), {
		status: 200,
		statusText: 'OK',
	});
}
