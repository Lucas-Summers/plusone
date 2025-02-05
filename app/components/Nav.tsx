"use client"
import React from 'react'
import { Nunito, Open_Sans } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const nunito = Nunito({ subsets: ["latin"] });

export default function Nav() {
    const pathName = usePathname();
    const { logout } = useAuth();

    return (
        <div className={'fixed top-0 left-0 w-48 min-h-screen bg-gray-300 p-4 flex flex-col space-y-4'}>
            <Link href="/">
                <h1 className={'text-4xl sm:text-5xl textGradient ' + nunito.className}>Plus+</h1>
            </Link>
            <hr className='my-4 border-t-2 border-gray-400' />
            <div className='flex-grow flex flex-col space-y-4'>
                <Link href="/dashboard/events" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/events' ? 'text-indigo-700 font-bold' : ''}`}>🗓️ Events</Link>
                <Link href="/dashboard/my-event" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/my-event' ? 'text-indigo-700 font-bold' : ''}`}>📍 My Event</Link>
                <Link href="/dashboard/people" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/people' ? 'text-indigo-700 font-bold' : ''}`}>👥 People</Link>
                <Link href="/dashboard/inbox" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/inbox' ? 'text-indigo-700 font-bold' : ''}`}>📥 Inbox</Link>
                <Link href="/dashboard/profile" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/profile' ? 'text-indigo-700 font-bold' : ''}`}>📱 Profile</Link>
                <Link href="/dashboard/reviews" className={'text-xl sm:text-2xl ' + `hover:text-indigo-500 ${pathName === '/dashboard/reviews' ? 'text-indigo-700 font-bold' : ''}`}>✍️ Reviews</Link>
            </div>
            <div className='mt-auto pb-6'>
                <Button text="Logout" dark full onClick={logout} />
            </div>
        </div>
    );
}
