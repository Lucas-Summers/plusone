import React from 'react'
import { Nunito } from 'next/font/google';
import Button from './Button';
import Link from 'next/link';

const nunito = Nunito({ subsets: ["latin"] });

export default function Hero() {
  return (
    <div className='py-4 md:py-12 flex flex-col gap-4 sm:gap-8 md:gap-10'>
		<h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + nunito.className}>
		Find your <span className='textGradient'>Plus One</span> today!
		</h1>
		<p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'>
		Easily <span className='font-semibold'>find people</span> to attend an event with you or <span className='font-semibold'>find events</span> you want to attend.
		</p>
		<div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
		<Link href='/dashboard'>
			<Button text="Signup" />
		</Link>
		<Link href='/dashboard'>
			<Button text="Login" dark />
		</Link>
		</div>
    </div>
  );
}
