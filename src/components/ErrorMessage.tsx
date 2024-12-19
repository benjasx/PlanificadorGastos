import { ReactNode } from "react"

type errorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: errorMessageProps) {
  return (
    <p className="bg-red-400 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}
