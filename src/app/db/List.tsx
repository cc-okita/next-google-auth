"use client";

import React from "react";
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import ReactPaginate from 'react-paginate'


type Sample = {
    id: string;
    name: string | null;
    created_at: Date;
    updated_at: Date;
}


export default function List({listData, count}:{listData:Sample[], count:number}) {
  const router = useRouter()
  const [ offset, setOffset ] = React.useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数

  // クリック時のfunction
  const handlePageChange = (data:any) => {
     // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    let page_number = data['selected'];
    // offsetを変更し、表示開始するアイテムの番号を変更
    //setOffset(page_number*perPage);
    console.log(page_number)

    //router.refresh()
    router.push(`/db?page=${page_number}`)
  }

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
            {listData?.map((_data, _index) => (
                <tr key={_index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {_data.id}
                    </th>
                    <td className="px-6 py-4">{_data.name}</td>
                    <td className="px-6 py-4">{_data.created_at.toString()}</td>
                    <td className="px-6 py-4">{_data.updated_at.toString()}</td>
                    <td className="px-6 py-4">
                      <div className="p-1">
                        <Link href={`/db_display/${_data.id}`} prefetch={false} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">表示</Link>
                      </div>
                      <div className="p-1">
                        <Link href={`/db_update/${_data.id}`} prefetch={false} className="font-medium text-blue-600 dark:text-blue-500 hover:underline my-1">更新</Link>
                      </div>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div className="pt-2">
        {/* https://www.npmjs.com/package/react-paginate */}
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={Math.ceil(count/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
          marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
          pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
          onPageChange={handlePageChange} // クリック時のfunction
          containerClassName={'flex items-center -space-x-px h-8 text-sm'} // ページネーションであるulに着くクラス名

          // liにつくクラス名
          //pageClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} 
          // li -> a につくクラス名
          pageLinkClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
          
          // アクティブなページのliに着くクラス名
          //activeClassName={'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'} 
          // アクティブなページのli -> a に着くクラス名
          activeLinkClassName={'z-10 !text-blue-600 !border-blue-300 !bg-blue-50 !dark:bg-gray-700 !dark:text-white'} 
          
          // 「<」のliに着けるクラス名
          //previousClassName={'flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
          previousLinkClassName={'flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}

          // 「>」のliに着けるクラス名
          //nextClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} 
          nextLinkClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} 

          // 使用不可の「<,>」に着くクラス名
          //disabledClassName={'cursor-not-allowed'}
          disabledLinkClassName={'cursor-not-allowed'}
        />
      </div>
      </div>
    
  );
}

