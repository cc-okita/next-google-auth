
//import { cookies, headers } from "next/headers";

export const test = (a:number, b:number) => {
    return a + b;
}

export const classNames = (...classes:string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const fetchUrl = (apiPath:string): string => {
    if (typeof window !== "undefined") {
        // クライアント
        const protocol = location.protocol
        const host = location.host
        const apiBase = `${protocol}//${host}`
        return `${apiBase}${apiPath}`
    } else {
        // サーバーサイド
        const { cookies, headers } = require("next/headers");
        const headersData = headers()
        const protocol = headersData.get('x-forwarded-proto')
        const host = headersData.get('host')
        const apiBase = `${protocol}://${host}`
        return `${apiBase}${apiPath}`
    }
}

export const getAllCookies  = (): string => {
    if (typeof window !== "undefined") {
        return ""
    }else{
        const { cookies, headers } = require("next/headers")
        const cookieStore = cookies()
        const cookie = cookieStore
          .getAll()
          .map((cookie:any) => `${cookie.name}=${cookie.value}`)
          .join(";")
        
        return cookie
    }

}
