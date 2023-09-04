"use client";

import React from "react";
import prisma from "@/libs/prisma";
import Link from 'next/link'

type Sample = {
    id: string;
    name: string | null;
    created_at: Date;
    updated_at: Date;
}

type Props = {
    datas: Sample[] | null
}

export default function List({datas}:Props) {
  return (
    <div className="relative overflow-x-auto ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                id  
            </th>
            <th scope="col" className="px-6 py-3">
                name
            </th>
            <th scope="col" className="px-6 py-3">
                created_at
            </th>
            <th scope="col" className="px-6 py-3">
                updated_at
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
          </tr>
        </thead>
        <tbody>
            {datas?.map((data, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {data.id}
                    </th>
                    <td className="px-6 py-4">{data.name}</td>
                    <td className="px-6 py-4">{data.created_at.toString()}</td>
                    <td className="px-6 py-4">{data.updated_at.toString()}</td>
                    <td className="px-6 py-4">
                      <Link href={`/db_display/${data.id}`} prefetch={false}>表示</Link>
                      <br/>
                      <Link href={`/db_update/${data.id}`} prefetch={false}>更新</Link>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
