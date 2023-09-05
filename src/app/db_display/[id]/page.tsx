import React from "react";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { fetchUrl, getAllCookies } from "@/libs/utils";

import Dsip from './Dsip'
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

  console.log("====================================================")
  console.log("params", params)
  console.log("data", data)
  console.log("====================================================")

  return (
    <>
      <div className="container p-5">
        <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">DB 確認ページ (Display)</h1>
        <div className="p-5">
          <BackBtn></BackBtn>
          <Dsip data={data}></Dsip>
        </div>
      </div>

    </>
  );
}


