"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import Link from 'next/link'

export default function Page() {
  const { data: session } = useSession();

  
  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <Link href="/profile">Profile</Link>
            <br/>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  );
}
