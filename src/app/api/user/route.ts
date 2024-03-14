
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const newUser: User = await request.json();
	const createdUser: User = await prisma.user.create({
		data: newUser,
	});

	return new NextResponse(JSON.stringify(createdUser), {
		status: 201,
		statusText: 'Created',
	});
}
export async function GET() {
	const users: User[] = await prisma.user.findMany();

	return new NextResponse(JSON.stringify(users), {
		status: 200,
		statusText: 'OK',
	});
}
