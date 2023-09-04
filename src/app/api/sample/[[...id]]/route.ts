import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getToken } from "next-auth/jwt"

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client'



type Params = {
  id?: string
}

type SearchParams = {
  id: string
}

export async function GET(_req: NextRequest, { params }: { params:Params }) {
  const session = await getServerSession(authOptions)
  if(!session) return sessionError();

  let pId:string | null = null;

  // Getパラメータの場合
  //pId = _req.nextUrl.searchParams?.get('id')

  // Dynamic Routingの場合
  if(params.id) pId = params.id[0];

  // デバッグ
  console.log(`==== ${_req.url} ======`)
  console.log(`method`, _req.method)
  console.log(`params`, params)
  console.log(`pId`, pId)
  console.log("=".repeat( 4 + 1 + _req.url.length + 1 + 6 ))

  // データ取得
  try {
    let data = null;
    if(pId == null) {
      // DB全件取得
      data = await prisma.sample.findMany();
    } else {
      // ID指定で取得
      data = await prisma.sample.findUnique({
        where: {
          id: pId,
        },
      })
    }
    
    return NextResponse.json(data, { status: 200 });
  }catch (e:any) {
    return dbError(e.code, e.message);
  }
  
}

type PostBody = {
  data: {
    name:string
  }
}

export async function POST(_req: NextRequest, { params }: { params:Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  let pId:string | null = null;

  // Getパラメータの場合
  //pId = _req.nextUrl.searchParams?.get('id')

  // Dynamic Routingの場合
  if(params.id) pId = params.id[0];

  // デバッグ
  console.log(`==== ${_req.url} ======`)
  console.log(`method`, _req.method)
  console.log(`params`, params)
  console.log(`pId`, pId)
  console.log("=".repeat( 4 + 1 + _req.url.length + 1 + 6 ))

  // Bodyを取得
  const body:PostBody = await _req.json()

  // 登録処理
  let Sample = null;
  if (pId) {
    // 更新
    Sample = await prisma.sample.update({
      where: {
        id: pId,
      },
      data: {
        name: body.data.name
      }
    });

  } else {
    // 新規登録
    Sample = await prisma.sample.create({
      data: {
        name:body.data.name
      }
    });
  }

  // ちょっと遅延処理を入れてみる
  // await new Promise(resolve => setTimeout(resolve, 2000)) 

  
  return new NextResponse(JSON.stringify({ Sample }))
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  // 未使用

  return new NextResponse(null, { status: 204 })
}

export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if(!session) return sessionError();

  // 変数初期化
  let pId:string | null = null;

  // Dynamic Routingの場合
  if(params.id) pId = params.id[0];

  // デバッグ
  console.log(`==== ${_req.url} ======`)
  console.log(`method`, _req.method)
  console.log(`params`, params)
  console.log(`pId`, pId)
  console.log("=".repeat( 4 + 1 + _req.url.length + 1 + 6 ))

  if(pId == null) return parmError("parameter not found");

  try {
    // 削除
    let Sample = await prisma.sample.delete({
      where: {
        id: pId,
      }
    });

    // ちょっと遅延処理を入れてみる
    // await new Promise(resolve => setTimeout(resolve, 2000)) 

    return NextResponse.json(Sample, { status: 200 });
  }catch (e:any) {
    return dbError(e.code, e.message);
  }

  //return new NextResponse(null, { status: 204 })
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

function parmError(msg:string){
  return new NextResponse(
    JSON.stringify({ message: msg }),
    { status: 502 }
  )
}