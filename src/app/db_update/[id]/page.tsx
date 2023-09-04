import React from "react";
import Link from 'next/link'

import { redirect } from 'next/navigation'

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { fetchUrl, getAllCookies } from "@/libs/utils";

import Update from './Update'
import BackBtn from '../../component/BackBtn'

type Params = {
  id: string
}

export default async function Page({ params }:{ params:Params }) {

  // セッションの存在チェック
  const session = await getServerSession(authOptions);
  if(!session) redirect('/login')

  // クッキーを取得
  const cookieStr = getAllCookies();
  const options: RequestInit = {
    method: 'GET',
    headers: {
      cookie: cookieStr,
    },
    cache: "no-store",  // キャッシュを使用しない
  };
  const res = await fetch(fetchUrl(`/api/sample/${params.id}`), options)

  let data = res.status == 200 ? await res.json() : null;
  if(data == null) redirect('/error')

  // console.log("====================================================")
  // console.log("params", params)
  // console.log("data", data)
  // console.log("====================================================")

  return (
    <>
      <h1>DB 表示ページ</h1>
      <div className="p-5">
        <BackBtn></BackBtn>
        <Update data={data}></Update>
      </div>



    </>
  );
}

async function getList(){

}
