import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

import prisma from "@/libs/prisma";
import { PrismaClient, Prisma } from '@prisma/client'

type Params = {
  id: string
}



export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions)

  console.log({
    api_headers: headers(),
    api_cookies: cookies().getAll(),
    api_session: session
  });

  if(!session) return sessionError();

  //return new NextResponse('(GET) Hello, Next.js!')

  // DB全件取得
  // データ取得
  try {
    const data = await prisma.sample.findMany();
    //const data = {id:999, value:"test"}
    return NextResponse.json(data, { status: 200 });
  }catch (e:any) {
    return dbError(e.code, e.message);
  }
  
}



export async function POST(_req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  return new NextResponse('(POST) Hello, Next.js!')
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  return new NextResponse(null, { status: 204 })
}

export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  return new NextResponse(null, { status: 204 })
}

function sessionError(){
  return new NextResponse(
    JSON.stringify({ message: "You are not logged in" }),
    { status: 401 }
  )
}

function dbError(code:string, msg:string){
  return new NextResponse(
    JSON.stringify({ message: msg }),
    { status: 501 }
  )
}