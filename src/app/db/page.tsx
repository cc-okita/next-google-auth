import React from "react";

import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

import { fetchUrl, getAllCookies } from "@/libs/utils";

import InsertBtn from "./InsertBtn";
import List from "./List";

type Props = {
  page:number
}

export default async function Page({params, searchParams}:{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  
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
  const res = await fetch(fetchUrl(`/api/sample?page=${searchParams?.page}`), options)

  let listData = res.status == 200 ? await res.json() : null;
  if(listData == null) redirect('/error')
  
  return (
    <>
      <div className="container p-5">
        <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">DB 確認ページ (List)</h1>
        <div className="pt-3">
          {/* <Link type="button" href="/db_entry" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">新規登録</Link> */}
          <InsertBtn></InsertBtn>
          <List listData={listData.data} count={listData.count}></List>
        </div>
      </div>
    </>
  );
}
