"use client"

import React from "react";
import { useForm } from "react-hook-form";

type Form = {
  id?: string
  name?: string;
};

export default function Input() {
  const [msg, setMsg] = React.useState<string | null>(null);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { id: '0' } });

  // バリデーション処理がOKの場合に呼ばれる関数
  const isValid = async (data: Form) => {
    console.log(data);
    try {
        data.id = undefined
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",  // キャッシュを使用しない
            body: JSON.stringify({ data }),
        };
        const res = await fetch('/api/sample', options)
        const redData = await res.json()

        console.log(res.status)

        if (res.status === 200) {
            setMsg("登録完了")
            setValue("id", redData.Sample.id)
        } else {
            setMsg("登録エラー")
        }

    } catch (err) {
      console.log(err);
    }
  };

  // バリデーション処理がNGの場合に呼ばれる関数
  const isInValid = (erros: any) => {
    console.log(errors);
    console.log("Error [isInValid]");
  };

  return (
    <form className="space-y-6 pt-5 " onSubmit={handleSubmit(isValid, isInValid)}>
      <div>
        <label
          htmlFor="ID"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          ID
        </label>
        <div className="mt-2">
          <input
            id="id"
            type="text"
            autoComplete="off"
            disabled
            {...register("id")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 outline-none px-2"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="NAME"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
          >
            NAME
          </label>
        </div>
        <div className="mt-2">
          <input
            id="name"
            type="text"
            autoComplete="off"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 outline-none px-2"
            {...register("name", { required: "NAME を入力してください" })}
            placeholder=""
          />
          <div className="mt-1 ml-1 text-sm text-red-500">
            {errors.name?.message}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="mt-1 ml-1 text-sm text-red-500">{msg}</div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          登録
        </button>
      </div>
    </form>
  );
}
