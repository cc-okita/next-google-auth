

import { classNames } from '@/libs/utils';

export default function Btn({label, onClick}:{label:string, onClick?:()=> void}){
    return(
        <button 
            type="button" 
            onClick={onClick}
            className={classNames(
                "text-white text-sm font-medium",
                "bg-blue-700 hover:bg-blue-800",
                "dark:bg-blue-600 dark:hover:bg-blue-700",
                "rounded-lg  px-5 py-2.5 mr-2 mb-2",
                "focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
                )}
        >
            {label}
        </button>
    )
  }