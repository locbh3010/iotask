import clsx, { ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...arg: ClassArray) => twMerge(clsx(arg))
