
import prisma from "@/lib/prisma";
import { Auth, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const newAuth: Auth = await request.json();
	const createdAuth: Auth = await prisma.auth.create({
		data: newAuth,
	});

	return new NextResponse(JSON.stringify(createdAuth), {
		status: 201,
		statusText: 'Created',
	});
}
export async function GET() {
	const auths: User[] = await prisma.user.findMany();

	return new NextResponse(JSON.stringify(auths), {
		status: 200,
		statusText: 'OK',
	});
}