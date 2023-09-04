
import { cookies, headers } from "next/headers";

export const test = (a:number, b:number) => {
    return a + b;
}

export const classNames = (...classes:string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const fetchUrl = (apiPath:string): string => {
    const headersData = headers()
    const protocol = headersData.get('x-forwarded-proto')
    const host = headersData.get('host')
    const apiBase = `${protocol}://${host}`
    
    return `${apiBase}${apiPath}`
}

export const getAllCookies  = (): string => {
    const cookieStore = cookies();
    const cookie = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join(";");
    
    return cookie;
}
