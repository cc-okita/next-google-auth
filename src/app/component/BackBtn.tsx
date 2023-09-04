"use client"
import { useParams, useRouter } from 'next/navigation';

const classNames = (...classes:string[]) => {
    return classes.filter(Boolean).join(' ')
}

export default function BackBtn() {

    const router = useRouter()

    const back = () => {
        router.refresh()
        router.push('/db')
    }

    return(
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <Btn label="戻る" first={true} onClick={back}></Btn>
            <Btn label="Settings" last={true}></Btn>
            {/* <Btn label="戻る"></Btn> */}
        </div>
    )

}


function Btn({label, onClick, first=false, last=false}:{label:string, onClick?:()=> void, first?:boolean, last?:boolean}){
    return(
        <button 
            type="button" 
            onClick={onClick}
            className={classNames(
                "px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white",
                first==false && last==false ? "border-t border-b" : "border",
                first==true ? "rounded-l-md" : "",
                last==true ? "rounded-r-md" : ""
                )}
        >
            {label}
        </button>
    )
}

