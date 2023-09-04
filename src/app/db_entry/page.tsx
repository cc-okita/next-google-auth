import React from "react";
import Link from 'next/link'

import Input from './Input'
import BackBtn from '../component/BackBtn'

export default async function Page() {

  return (
    <>
      <h1>DB 登録ページ</h1>
      <div className="p-5">
        <BackBtn></BackBtn>
        <Input></Input>
      </div>



    </>
  );
}


