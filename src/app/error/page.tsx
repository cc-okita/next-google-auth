
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import Link from 'next/link'

export default function Page() {

  return (
    <>
    <h1>エラー</h1>
    <pre>エラーが発生しました</pre>
    </>
  );
}
