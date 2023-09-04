"use client"

import React from "react";
import { useForm } from "react-hook-form";

type Form = {
  id?: string
  name?: string
  created_at?:string
  updated_at?:string
};

export default function Dsip({data}:{data:Form}) {
  const [msg, setMsg] = React.useState<string | null>(null);
  const {register} = useForm<Form>({ defaultValues: data });

  return (
    <form className="space-y-6 pt-5 ">
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
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
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
            disabled
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
            {...register("name")}
            placeholder=""
          />
          {/* <div className="mt-1 ml-1 text-sm text-red-500">
            {errors.name?.message}
          </div> */}
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
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
            {...register("created_at")}
            placeholder=""
          />
        </div>

      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="NAME"
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
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 px-2"
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
      
    </form>
  );
}
