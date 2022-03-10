import Navbar from '@/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FileText } from 'phosphor-react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ministry of Youth and Sports</title>
        <meta
          name='description'
          content='Ministry of Youth and Sports Online Registration Services'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <header>
        <img src='/home-hero.jpg' className='w-full' />
      </header>
      <main className='container py-2'>
        <h1 className='font-medium text-4xl my-10'>Welcome</h1>
        <p className='text-2xl my-10'>
          Please choose a form from below for your required purpose
        </p>
        <div className='bg-gray-100 border border-gray-300 rounded-lg px-8 py-10 my-10'>
          <h2 className='text-2xl mb-6'>Forms</h2>
          <FormLink href='/club-registration' name='Club Registration Form' />
          <FormLink
            href='/tournament-registration'
            name='Tourmament Resgistration Form'
          />
        </div>
      </main>
    </>
  );
};

const FormLink = ({ href, name }: { href: string; name: string }) => (
  <Link href={href}>
    <a className='flex my-4 text-blue-400 text-lg font-medium'>
      <FileText size={24} className='inline mr-4' />
      {name}
    </a>
  </Link>
);
export default Home;
