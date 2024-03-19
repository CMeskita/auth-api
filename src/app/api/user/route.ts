
import { criatedHash } from "@/lib/Hash";
import prisma from "@/lib/prisma";
import { user ,account, Prisma} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
	
	const newUser: user = await request.json();
	try {
		debugger;
	const accounts: account = await prisma.account.findFirstOrThrow({
		where: {
			email : String(newUser.email),
		},
	
	});

	newUser.account_id=accounts.account_id;
	newUser.senha=criatedHash(newUser.senha);
	newUser.data_desabilitado=null;
	

	const createdUser: user = await prisma.user.create({
		data: newUser,
	});
	return new NextResponse(JSON.stringify(createdUser), {
		status: 201,
		statusText: 'Created',
	});
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
export async function GET() {
	const users: user[] = await prisma.user.findMany();

	return new NextResponse(JSON.stringify(users), {
		status: 200,
		statusText: 'OK',
	});
}
