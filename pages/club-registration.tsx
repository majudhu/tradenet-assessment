import { Form, FormData } from '@/components/Form';
import Navbar from '@/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ministry of Youth and Sports - Club Registration Form</title>
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
        <h1 className='font-medium text-4xl my-10'>Club Registration Form</h1>

        <Form formData={registrationForm} />
      </main>
    </>
  );
};

export default Home;

const registrationForm: FormData = {
  endpoint: '',
  sections: [
    {
      title: 'General Information',
      fields: [
        {
          type: 'text',
          name: 'name',
          label: 'Name',
          htmlType: 'text',
          required: true,
          placeholder: 'Full name',
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'clubName',
          label: 'Club Name',
          htmlType: 'text',
          required: true,
          placeholder: 'Club Name',
          className: 'col-span-2',
        },
        {
          type: 'select',
          name: 'clubPosition',
          label: 'Position in Club',
          required: true,
          placeholder: 'Select Position',
          options: [
            'President',
            'Vice president',
            'Secretary',
            'Organising secretary',
            'Treasurer',
            'Support staff',
          ],
          className: 'col-span-2',
        },
        {
          type: 'select',
          name: 'sport',
          label: 'Sport',
          required: true,
          placeholder: 'Select Sport',
          options: [
            'Football',
            'Basketball',
            'Volleyball',
            'Netball',
            'Handball',
            'Cricket',
            'Table Tennis',
            'Badminton',
            'Tennis',
            'Swimming',
            'Athletics',
            'Surfing',
          ],
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'address',
          label: 'Street Address',
          htmlType: 'text',
          required: true,
          placeholder: 'House/Apartment, Road',
          className: 'col-span-2',
        },
        {
          type: 'select',
          name: 'sport',
          label: 'Sport',
          required: true,
          placeholder: 'Select Sport',
          options: [
            'Malé City',
            'Addu City',
            'Fuvahmulah City',
            'Kulhudhuffushi City',
            'Th. Thimarafushi',
            'V. Felidhoo',
            'HDh. Hanimaadhoo',
          ],
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'contactNumber',
          label: 'Contact Number',
          htmlType: 'text',
          required: true,
          placeholder: 'Contact Number',
        },
        {
          type: 'text',
          name: 'email',
          label: 'Email',
          htmlType: 'email',
          required: true,
          placeholder: 'Email',
        },
        {
          type: 'text',
          name: 'clubWebsite',
          label: 'Club Website',
          htmlType: 'text',
          required: true,
          placeholder: 'Club Website',
          className: 'col-span-2',
        },
      ],
    },
    {
      title: 'Venue Information',
      fields: [
        {
          type: 'radio',
          name: 'hasVenue',
          label: 'Does your club have a clubhouse or purpose built facility?',
          required: true,
          options: ['Yes', 'No'],
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'trainingFacilityAddress',
          label: 'If not, where do you train/compete?',
          htmlType: 'text',
          required: false,
          placeholder: 'Address of training/ competition facility ',
          className: 'col-span-2',
        },
        {
          type: 'radio',
          name: 'venueIsPublic',
          label: 'Are the facilities available accessible to all?',
          required: false,
          options: ['Yes', 'No'],
          className: 'col-span-2',
        },
        {
          type: 'radio',
          name: 'venueAvailableForHire',
          label: 'Is it available for hire??',
          required: false,
          options: ['Yes', 'No'],
          className: 'col-span-2',
        },
      ],
    },
    {
      title: 'Coaches',
      fields: [
        {
          type: 'radio',
          name: 'coachesProvided',
          label: 'Does you club provide coaching?',
          required: true,
          options: ['Yes', 'No'],
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'trainingFacilityAddress',
          label: 'How many coaches do you have? ',
          htmlType: 'number',
          required: false,
          placeholder: 'Number of Coaches',
          className: 'col-span-2',
        },
        {
          type: 'textarea',
          name: 'venueIsPublic',
          label: 'What level qualifications do you coaches have?',
          required: false,
          placeholder:
            'Provide a brief description of the qualifications your coaches have ...',
          className: 'col-span-4',
        },
      ],
    },
  ],
};
