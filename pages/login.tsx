import type { VALUE_TYPES } from '@/components/Form';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { DotsThree, MagnifyingGlass, PencilLine, Trash } from 'phosphor-react';
import { FormEvent, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';

interface User {
  isLoggedIn: boolean;
  email: string;
}

const Login: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [forms, setForms] = useState<Record<string, VALUE_TYPES>[]>([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

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
  async function deleteForm(formId: string) {
    const res = await fetch(`/api/forms?formId=${formId}`, {
      method: 'DELETE',
    });
    const { success } = await res.json();
    if (success) {
      setForms(forms.filter((f) => f._id != formId));
    }
  }

  // clear error message of input change
  useEffect(() => setError(''), [email, password]);

  // auto login by using the cookie
  useEffect(() => {
    fetch('/api/login').then(async (res) => {
      const data: User = await res.json();
      if (data.isLoggedIn) {
        setUser(data);
      }
    });
  }, []);

  // load forms from api on successfull login
  useEffect(() => {
    if (user?.isLoggedIn) {
      fetch('/api/forms').then(async (res) => {
        const data: typeof forms = await res.json();
        if (Array.isArray(data)) {
          setForms(data);
        }
      });
    } else {
      setForms([]);
    }
  }, [user]);

  const searchResults = useMemo(() => {
    if (search) {
      // split the search string into words for each word can be search seperately
      // user uppercase so search is case insensitive
      const searchWords = search.toUpperCase().split(' ');
      return forms.filter((f) => {
        // combine all the values of the fields in the form to a single string
        const formValues = Object.values(f).join(' ').toUpperCase();
        // filter the forms which has all the words atleast somewhere
        return searchWords.every((word) => formValues.includes(word));
      });
    } else {
      // return all the forms if the search string is blank
      return forms;
    }
  }, [search, forms]);

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

      <div className='absolute -z-10 inset-0 bg-gray-100 min-h-screen w-full' />
      <main className='container'>
        {user?.isLoggedIn ? (
          <>
            <h1 className='font-medium text-4xl my-10'>All Submissions</h1>
            <div className='bg-white rounded-lg shadow-lg'>
              <div className='flex px-6 py-4 items-center border-b border-gray-200'>
                <h2 className='font-medium text-2xl mr-auto'>
                  Submissions Summary
                </h2>
                <div className='ml-auto relative max-w-md'>
                  <input
                    className={INPUT_CLASSNAME}
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <MagnifyingGlass
                    className='text-gray-400 absolute right-2.5 top-2.5 pointer-events-none'
                    size={32}
                  />
                </div>
              </div>
              <table className='w-full table-auto text-gray-700'>
                <thead>
                  <tr className='border-b border-black'>
                    <th className='px-6 py-4 font-medium text-left'>Name</th>
                    <th className='px-6 py-4 font-medium text-left'>Email</th>
                    <th className='px-6 py-4 font-medium text-left'>
                      Service type
                    </th>
                    <th className='px-6 py-4 font-medium text-left'>Date</th>
                    <th className='px-6 py-4 font-medium text-left'>Time</th>
                    <th
                      className='px-6 py-4 font-medium text-right'
                      align='right'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((f) => (
                    <tr key={f._id as string}>
                      <td className='px-6 py-4'>{f.name}</td>
                      <td className='px-6 py-4'>{f.email}</td>
                      <td className='px-6 py-4'>{f.serviceType}</td>
                      <td className='px-6 py-4'>
                        {format(new Date(f.date as Date), 'dd MMM yyyy')}
                      </td>
                      <td className='px-6 py-4 uppercase'>
                        {format(new Date(f.date as Date), 'hh:mm aaaa')}
                      </td>
                      <td className='px-6 py-4 relative' align='right'>
                        <Menu>
                          <Menu.Button>
                            <DotsThree size={32} className='text-gray-700' />
                          </Menu.Button>
                          <Menu.Items className='absolute z-10 top-10 shadow-lg rounded-lg'>
                            <Menu.Item>
                              <Link
                                href={`${
                                  f.serviceType == 'Club Registration'
                                    ? 'club-registration'
                                    : 'tournament-registration'
                                }?formId=${f._id}`}
                              >
                                <a className='bg-white text-black rounded-t-lg flex items-center gap-4 text-lg p-2'>
                                  <PencilLine size={24} />
                                  Edit
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                className='bg-gray-100 text-red-600 rounded-b-lg flex items-center gap-4 text-lg p-2'
                                onClick={() => deleteForm(f._id as string)}
                              >
                                <Trash size={24} />
                                Delete
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='fixed bottom-0 bg-blue-800 px-12 py-6 flex items-center w-full inset-x-0 text-white text-2xl'>
              <p>
                Showing{' '}
                {searchResults.length == forms.length
                  ? `all ${forms.length}`
                  : `${searchResults.length} of ${forms.length}`}{' '}
                results
              </p>
              <Link href='/'>
                <a className='ml-auto border rounded-lg px-8 py-4'>
                  Add New Submission
                </a>
              </Link>
            </div>
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
