"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { classNames } from '@/libs/utils';
import Btn from '@/app/component/Btn';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [first, setFirst] = React.useState(true)

  React.useEffect(() => {
	  // 初回だけ
    const sleep = async (num:number) => {
      await new Promise(resolve => setTimeout(resolve, num)) 
      setFirst(false)
    }
    sleep(1000);
  },[])

  if (first) return <FirstView />
  
  return (
    <>
      <div className="container p-5">
        {
          // セッションがある場合、ログアウトを表示
          session && (
            <>
              <h1>ようこそ, {session.user && session.user.email}</h1>
              <div className="pt-2">
                <Btn label="プロフィール" onClick={()=>{router.push("/profile")}}></Btn>
              </div> 
              <div className="pt-2">
                <Btn label="ログアウト" onClick={signOut}></Btn>
              </div>
              <div className="pt-2">
                <Btn label="DBページ" onClick={()=>{router.push("/db")}}></Btn>
              </div>              
            </>
          )
        }
        {
          // セッションがない場合、ログインを表示
          // ログインボタンを押すと、ログインページに遷移する
          !session && (
            <>
              <p>ログインしていません</p>
              <div className="pt-2">
                <Btn label="ログイン" onClick={signIn}></Btn>
              </div>
            </>
          )
        }
      </div>

    </>
  );
}


function FirstView(){
  return(
    <>
      <div role="status" className="max-w-sm animate-pulse p-5">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}


