import Navbar from '@/components/Navbar';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { DocumentTextIcon } from '@heroicons/react/outline';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ forms }) => {
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
          {forms.map(({ _id, name, url }) => (
            <a
              download
              key={_id}
              href={url}
              className='flex my-4 text-blue-400 text-lg font-medium'
            >
              <DocumentTextIcon width='24' className='inline mr-4' />
              {name}
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  forms: Form[];
}> = async () => {
  return {
    props: {
      forms: [
        {
          _id: 1,
          name: 'Club Registration Form',
          url: '',
        },
        {
          _id: 2,
          name: 'Tourmament Resgistration Form',
          url: '',
        },
      ],
    },
  };
};

type Form = { _id: number; name: string; url: string };
