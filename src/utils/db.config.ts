import {
    createBrowserClient,
    createServerClient,
    type CookieOptions
} from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createDbServer = (_cookieStore: ReturnType<typeof cookies>) =>
    createServerClient(
        process.env.NEXT_PUBLIC_DB_URL!,
        process.env.NEXT_PUBLIC_DB_TOKEN!,
        {
            cookies: {
                get(name: string) {
                    return _cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        _cookieStore.set({ name, value, ...options })
                    } catch (error: any) {
                        throw new Error(error?.message)
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        _cookieStore.set({ name, value: '', ...options })
                    } catch (error: any) {
                        throw new Error(error?.message)
                    }
                }
            }
        }
    )

export const db = createBrowserClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_TOKEN!
)
