import React from 'react'
import { Button } from '../ui/button'
import { CalendarPlus } from 'lucide-react'
import Link from 'next/link'

export default function EnrollButton({ variant = "default" }: { variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" }) {
    return (
        <Button size="lg" className="w-full sm:w-auto" variant={variant} asChild>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSemQ9RaKmBG_Sa4_cuZHoLmFWtGILqaOeqvJIx5IYCtO-hfLg/viewform?usp=dialog" target="_blank">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Register Now for FREE!
            </Link>
        </Button>
    )
}
