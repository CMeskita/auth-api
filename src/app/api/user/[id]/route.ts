

import prisma from '@/lib/prisma';
import { user } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { NextResponse, NextRequest } from 'next/server';


type FindById = {
	id : string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
	try {
		const users: user = await prisma.user.findUniqueOrThrow({
			where: {
			id : String(context.params.id ),
			},
		});

		return new NextResponse(JSON.stringify(users), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).message;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}
export async function PUT(request: NextRequest, context: { params: FindById }) {
	const newUserData: user = await request.json();

	try {
		const updatedUser: user = await prisma.user.update({
			where: {
				id : String(context.params.id ),
			},
			data: newUserData,
		});

		return new NextResponse(JSON.stringify(updatedUser), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}
export async function DELETE(
	request: NextRequest,
	context: { params: FindById }
) {
	try {
		await prisma.user.delete({
			where: {
				id : String(context.params.id),
			},
		});

		return new NextResponse(null, {
			status: 204,
			statusText: 'No Content',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}