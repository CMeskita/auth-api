

import prisma from '@/lib/prisma';
//import {Prisma, user } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { Prisma, user } from '../../../../../prisma/generated/client';


type FindById = {
	id : string
};

export async function GET(request: NextRequest, context: { params: FindById }) {
	debugger;

	try {
		const users: user = await prisma.user.findUniqueOrThrow({
			where: {
				user_id : String(context.params.id ),
			},
		});

		return new NextResponse(JSON.stringify(users), {
			status: 200,
			statusText: 'OK',
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
export async function PUT(request: NextRequest, context: { params: FindById }) {
	
	const newUserData = await request.json();

	try {
		const updatedUser = await prisma.user.update({
			where: {
				user_id : String(context.params.id ),
			},
			data: newUserData,
		});

		return new NextResponse(JSON.stringify(updatedUser), {
			status: 200,
			statusText: 'OK',
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
export async function DELETE(request: NextRequest,context: { params: FindById }) {
	try {
		await prisma.user.delete({
			where: {
				user_id : String(context.params.id),
			},
		});

		return new NextResponse(null, {
			status: 204,
			statusText: 'No Content',
		});
	} catch (e) {		
		
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new NextResponse(JSON.stringify({ message: e.message }), {
				status: 500,
				statusText: 'Error',
			});
		}
		throw e
		
		throw e
	}
}