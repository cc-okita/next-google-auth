"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from 'next/navigation';
import { fetchUrl } from "@/libs/utils";

type Form = {
  id?: string
  name?: string
  created_at?:string
  updated_at?:string
};

export default function Dsip({data}:{data:Form}) {
  const [msg, setMsg] = React.useState<string | null>(null);
  const params = useParams()
  const router = useRouter()
  
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Form>({ defaultValues: data });

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
        const res = await fetch(fetchUrl(`/api/sample/${params.id}`), options)
        const redData = await res.json()

        console.log(res.status)

        if (res.status === 200) {
            setMsg("更新完了")
            setValue("id", redData.Sample.id)
            setValue("updated_at", redData.Sample.updated_at)

            console.log("", redData)
        } else {
            setMsg("更新エラー")
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

  // 削除呼び出し
  const onClickDelete = async () => {

    if(window.confirm( '削除します。よろしいですか？')) {
      const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-store",  // キャッシュを使用しない
      };

      const res = await fetch(fetchUrl(`/api/sample/${params.id}`), options)
      const redData = await res.json()
      console.log(res.status)

      if (res.status === 200) {
        router.refresh()
        router.push('/db')
      } else {
          setMsg("削除エラー")
      }
    }
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
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
          <label
            htmlFor="created_at"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
          >
            created_at
          </label>
        </div>
        <div className="mt-2">
          <input
            id="created_at"
            type="text"
            autoComplete="off"
            disabled
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
            {...register("created_at")}
            placeholder=""
          />
        </div>

      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="updated_at"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
          >
            updated_at
          </label>
        </div>
        <div className="mt-2">
          <input
            id="updated_at"
            type="text"
            autoComplete="off"
            disabled
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
            {...register("updated_at")}
            placeholder=""
          />
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
          更新
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={onClickDelete}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          削除
        </button>
      </div>

    </form>
  );
}
