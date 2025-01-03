import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import logo from "../../public/logo.svg"

export default function Logo() {
    return (
        <Link href="/" className='font-bold text-xl sm:text-2xl flex items-center'>
            <Image src={logo} alt="NSACC Logo" width={30} height={30} className='pointer-events-none' />
            <span>osiva</span>
        </Link>
    )
}
