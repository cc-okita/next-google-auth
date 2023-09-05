import React from "react";

import Input from "./Input";
import BackBtn from "../component/BackBtn";

export default async function Page() {
  return (
    <>
      <div className="container p-5">
        <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">DB 確認ページ (Entry)</h1>
        <div className="p-5">
          <BackBtn></BackBtn>
          <Input></Input>
        </div>
      </div>
    </>
  );
}
