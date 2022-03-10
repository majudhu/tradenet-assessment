import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: NextPage = () => {
  const router = useRouter();

  return (
    <nav className='flex items-center gap-8 px-12 py-4 text-2xl font-bold shadow-md'>
      <img src='/mv-emblem.png' />
      <h1>Ministry of Youth and Sports</h1>
      {router.pathname != '/' && (
        <Link href='/'>
          <a className='text-2xl font-bold text-gray-400'>Home</a>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
