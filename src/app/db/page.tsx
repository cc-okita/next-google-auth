import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies, headers } from "next/headers";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { fetchUrl, getAllCookies } from "@/libs/utils";

import List from "./List";


export default async function Page() {
  console.log("server component");

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
  const res = await fetch(fetchUrl('/api/sample'), options)

  let listData = res.status == 200 ? await res.json() : null;
  if(listData == null) redirect('/error')

  console.log("listData", listData);

  return (
    <>
      <h1>DB 確認ページ</h1>

      <h2>一覧</h2>
      <div className="p-5">
        <Link type="button" href="/db_entry" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">新規登録</Link>
        <List datas={listData}></List>
      </div>



    </>
  );
}

async function getList(){

}
