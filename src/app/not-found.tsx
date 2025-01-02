"use client"
import Navbar from '@/components/navbar';
import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
    return (
        <Navbar>
            <div className='w-screen h-[90vh] flex justify-center items-center gap-4'>
                <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>
                        PAGE NOT FOUND - 404
                    </h1>
                    <p className='max-w-96 text-center my-2'>
                        This page does not exist! If you believe this is a mistake of some sort, 
                        please contact us. For now,
                    </p>
                    <Link className="text-purple-400 underline" href='/'>Return home</Link>

                </div>
            </div>
        </Navbar>
    );
};

export default ErrorPage;
