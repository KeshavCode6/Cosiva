"use client"
import Navbar from '@/components/navbar/navbar'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import React from 'react'

export default function Dashboard() {
    const { firebaseUser } = useFirebaseAuth();

    return (
        <Navbar protectedRoute className='pt-24'>
        </Navbar>
    )
}
