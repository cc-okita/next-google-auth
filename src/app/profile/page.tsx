"use client";

import React from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { classNames } from '@/libs/utils';
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession({ required: false });
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
          // セッションがある場合は、プロファイルを表示する
          session && (
            <>
            <div>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center py-5">
                    {session.user?.image && (
                      <div>
                        <Image src={session.user?.image} alt="" width={200} height={200} className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
                      </div>
                    )}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{session.user?.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                    <Btn label="DBページ" onClick={()=>{router.push("/db")}}></Btn>
                        <Btn label="ログアウト" onClick={() =>{signOut({ callbackUrl: "/login" })}}></Btn>
                    </div>
                </div>
              </div>
            </div>
            </>
          )
        }
        {
          // セッションがない場合は、ログインページに遷移する
          !session && (
            <>
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">ログインしていません。ログインしてから再度表示してください</span>
                </div>
                
              </div>
              <Btn label="ログイン" onClick={signIn}></Btn>
            </>
          )
        }
      </div>

    </>
  )
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


function Btn({label, onClick}:{label:string, onClick?:()=> void}){
  return(
      <button 
          type="button" 
          onClick={onClick}
          className={classNames(
              "text-white text-sm font-medium",
              "bg-blue-700 hover:bg-blue-800",
              "dark:bg-blue-600 dark:hover:bg-blue-700",
              "rounded-lg  px-5 py-2.5 mr-2 mb-2",
              "focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
              )}
      >
          {label}
      </button>
  )
}