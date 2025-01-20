"use client"
import Navbar from '@/components/navbar';
import { BanIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
    return (
        <Navbar>
            <div className='w-screen h-[90vh] flex justify-center items-center gap-4'>
                <div className='flex flex-col justify-center items-center'>

                    <BanIcon size={60}/>

                    <h1 className='text-3xl font-bold mt-6'>
                        404 - Page Not Found
                    </h1>
                    <span className='max-w-80 text-center my-2'>
                        This page does not exist! If you believe this is a mistake, 
                        please contact us. For now, <Link className="text-orange-400 underline" href='/'>return home</Link>.
                    </span>
                    
                </div>
            </div>
        </Navbar>
    );
};

export default ErrorPage;
