
import { getJwtSecretKey } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  const body = await request.json();

  const users: User = await prisma.user.findUniqueOrThrow({
	where: {
		email: body.email,
	},
});
  if (body.email === users.email && body.senha === users.senha) {
    const token = await new SignJWT({
      email: body.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("3600s") 
      .sign(getJwtSecretKey());
    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });
    return response;
  }
  return NextResponse.json({ success: false });
}