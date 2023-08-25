import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies, headers } from "next/headers";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default async function Page() {
  console.log("server component");

  const session = await getServerSession(authOptions);
  if(!session) redirect('/login')

  console.log({
    headers: Object.fromEntries(headers()),
    //cookies: cookies().getAll(),
  });

  console.log("process.env", process.env)
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/sample",{ 
    cache: 'no-cache',
    method: "GET",
    headers: headers()
  })
  
  console.log("res.status", res.status)
  console.log("res.body", res.body)
  
  let data = null;
  if(res.status == 200){
    data = await res.json();
  }else{
    redirect('/error')
  }

  return (
    <>
      <h1>DB 確認ページ</h1>

      
      <h2>一覧</h2>

    </>
  );
}

async function getList(){

}
