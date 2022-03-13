import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: NextPage = ({ children }) => {
  const router = useRouter();

  return (
    <nav className='flex items-center gap-8 px-12 py-4 text-2xl shadow-md'>
      <img src='/mv-emblem.png' />
      <h1 className='font-bold'>Ministry of Youth and Sports</h1>
      {router.pathname != '/' && (
        <Link href='/'>
          <a className='ml-auto text-2xl text-gray-400'>Home</a>
        </Link>
      )}
      {children}
    </nav>
  );
};

export default Navbar;
