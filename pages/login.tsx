import Navbar from '@/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

interface User {
  isLoggedIn: boolean;
  email: string;
}

const Login: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [forms, setForms] = useState<[]>([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data: User = await res.json();
    if (data.isLoggedIn) {
      setUser(data);
    } else {
      setError('login failed');
    }
  }
  async function logout() {
    await fetch('/api/login', { method: 'DELETE' });
    setUser(null);
  }

  // clear error message of input change
  useEffect(() => setError(''), [email, password]);

  useEffect(() => {
    fetch('/api/login').then(async (res) => {
      const data: User = await res.json();
      if (data.isLoggedIn) {
        setUser(data);
      }
    });
  }, []);

  useEffect(() => {
    if (user?.isLoggedIn) {
      fetch('/api/forms').then(async (res) => {
        const data: [] = await res.json();
        if (Array.isArray(data)) {
          setForms(data);
        }
      });
    }
  }, [user]);

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
      <Navbar>
        {user && (
          <>
            <p className='font-normal text-lg text-gray-400'>{user.email}</p>
            <button
              onClick={logout}
              className='text-sm rounded-lg px-1 border border-red-600 text-red-600'
            >
              logout
            </button>
          </>
        )}
      </Navbar>

      <main className='container '>
        {user?.isLoggedIn ? (
          <>
            <h1 className='font-medium text-4xl my-10'>All Submissions</h1>
          </>
        ) : (
          <form
            onSubmit={login}
            className='max-w-2xl bg-white my-30 shadow-lg rounded-lg px-28 py-20 mx-auto my-32'
          >
            <h1 className='font-medium text-4xl mb-12'>Sign In</h1>
            <label htmlFor='email' className={LABEL_CLASSNAME}>
              Email
            </label>
            <input
              required
              className={INPUT_CLASSNAME + ' mb-10'}
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              value={email} // slack over typescript here
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='email' className={LABEL_CLASSNAME}>
              Password
            </label>
            <input
              required
              className={INPUT_CLASSNAME}
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              value={password} // slack over typescript here
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='bg-blue-600 text-white rounded-lg text-2xl py-4 w-full mt-12'
              type='submit'
            >
              Sign in
            </button>
            <p className='text-center text-red-600 mt-8 h-6'>{error}</p>
          </form>
        )}
      </main>
    </>
  );
};

export default Login;

const LABEL_CLASSNAME = 'block text-lg mb-4';
const INPUT_CLASSNAME =
  'block text-lg rounded-md border border-gray-300 px-4 py-3 w-full bg-white';
