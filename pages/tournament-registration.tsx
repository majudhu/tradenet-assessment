import type { FormData } from '@/components/Form';
import { Form } from '@/components/Form';
import Navbar from '@/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';

const TournamentRegistrationPage: NextPage = () => {
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
      <main className='container py-2'>
        <h1 className='font-medium text-4xl my-10'>
          Tournament Registration Form
        </h1>

        <Form formData={tournamentForm} />
      </main>
    </>
  );
};

export default TournamentRegistrationPage;

const tournamentForm: FormData = {
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
          name: 'companyName',
          label: 'Company Name',
          htmlType: 'text',
          required: true,
          placeholder: 'Company Name',
          className: 'col-span-2',
        },
        {
          type: 'select',
          name: 'companyPosition',
          label: 'Position in Company',
          required: true,
          placeholder: 'Select Position',
          options: [
            'Chairman',
            'Managing Director',
            'Director',
            'Company Secretary',
            'Officer',
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
          name: 'island',
          label: 'Island/ City',
          required: true,
          placeholder: 'Select Island/ City',
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
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'email',
          label: 'Email',
          htmlType: 'email',
          required: true,
          placeholder: 'Email',
          className: 'col-span-2',
        },
        {
          type: 'text',
          name: 'website',
          label: 'Website',
          htmlType: 'text',
          required: false,
          placeholder: 'Tournament/Company Website',
          className: 'col-span-2',
        },
      ],
    },
    {
      title: 'Tournament Information',
      fields: [
        {
          type: 'text',
          name: 'tournamentTitle',
          label: 'Tournament Title',
          htmlType: 'text',
          required: true,
          placeholder: 'Tournament Name',
          className: 'col-span-2',
        },
        {
          type: 'select',
          name: 'sport',
          label: 'Sport',
          placeholder: 'Sport',
          required: true,
          options: ['Yes', 'No'],
          className: 'col-span-2',
        },
        {
          type: 'text',
          htmlType: 'date',
          name: 'startDate',
          label: 'Start Date',
          placeholder: '',
          required: true,
          className: 'col-span-2',
        },
        {
          type: 'text',
          htmlType: 'date',
          name: 'endDate',
          label: 'End Date',
          placeholder: '',
          required: true,
          className: 'col-span-2',
        },
        {
          type: 'textarea',
          name: 'tournamentPurpose',
          label: 'Purpose of the Tournament',
          required: false,
          placeholder:
            'Provide a brief description of the purpose and objectives of the tournament ...',
          className: 'col-span-4',
        },
        {
          type: 'text',
          name: 'tournamentVenue',
          label: 'Tournament Venue',
          htmlType: 'text',
          required: true,
          placeholder: 'Tournament Location',
          className: 'col-span-2',
        },
        {
          type: 'radio',
          name: 'venueAvailableForHire',
          label: 'Target Gender',
          required: true,
          options: ['Male', 'Female', 'Mixed'],
          className: 'col-span-2',
        },
      ],
    },
  ],
};
