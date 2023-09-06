"use client";

import React from "react";

import { redirect, useRouter } from 'next/navigation'
import Btn from '@/app/component/Btn';



export default function InsertBtn() {
    const router = useRouter()

    const onInsert = () => {
        router.refresh()
        router.push('/db_entry')
    }

    const onBack = () => {
      router.refresh()
      router.push('/login')
  }

  return (
    <>
      <Btn label="戻る" onClick={onBack} />
      <Btn label="新規登録" onClick={onInsert} />
    </>
  );
}
