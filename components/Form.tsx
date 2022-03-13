import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowCounterClockwise, CalendarBlank, Check } from 'phosphor-react';
import type {
  ChangeEventHandler,
  DetailedHTMLProps,
  FormEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';

export const Form = ({ formData }: { formData: FormData }) => {
  const router = useRouter();
  const [formState, setFormState] = useState(() => createFormState(formData));
  const [success, setSuccess] = useState(false);

  const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    if (data.success) {
      setSuccess(true);
    }
  };

  const sectionProgress = formData.sections.map((s) =>
    s.fields.every((f) => !f.required || formState[f.name] != '')
  );

  const onChange = useCallback<ChangeEventHandler<any>>((e) => {
    switch (e.target.type) {
      /* currently only checkbox seems to need a different onchange handler
         boolean radios could use a special strategy have their values set as boolean,
         but kept it as stringy 'Yes' and 'No' for now, as then radios would need to
         have a seperate binary and multi type */
      case 'checkbox':
        return setFormState((formState) => {
          return {
            ...formState,
            [e.target.name]: e.target.checked,
          };
        });
      default:
        return setFormState((formState) => {
          return {
            ...formState,
            [e.target.name]: e.target.value,
          };
        });
    }
  }, []);

  // if url has formid query param, load the existing form data from api
  useEffect(() => {
    if (router.query?.formId) {
      fetch(`/api/forms?formId=${router.query?.formId}`)
        .then(async (response) => {
          const data = await response.json();
          setFormState(data);
        })
        // clear query if api call fails, such as when an authorized user is not logged in
        .catch(() =>
          router.replace(router.pathname, undefined, { shallow: true })
        );
    }
  }, [router]);

  return (
    <>
      <form
        onSubmit={submitForm}
        className='grid grid-cols-4 gap-x-6 gap-y-10 pb-56 text-lg'
        onReset={() => setFormState(createFormState(formData))}
      >
        {formData.sections.map(({ title, fields }, i) => (
          <Fragment key={i}>
            {i !== 0 && <hr className='col-span-4 border-t-gray-600' />}
            <h2 className='col-span-4 text-2xl'>{title}</h2>
            {fields.map((field) => (
              <FormFieldComponent
                key={field.name}
                value={formState[field.name]}
                onChange={onChange}
                {...field}
              />
            ))}
          </Fragment>
        ))}
        {formData.decleration && (
          <div className='col-span-4 bg-gray-100 border border-gray-300 rounded-lg p-6'>
            <h2 className='text-2xl mb-4'>{formData.decleration.title}</h2>
            <p className='text-lg mb-4'>{formData.decleration.text}</p>
            <input
              required
              id='decleration'
              name='decleration'
              type='checkbox'
              className='w-6 h-6'
              onChange={onChange}
            />
            <label htmlFor='decleration' className='ml-4'>
              I agree
            </label>
          </div>
        )}
        <div className='fixed inset-x-0 bottom-0 px-12 py-6 flex items-center bg-blue-800 gap-4'>
          {sectionProgress.map((completed, i) => (
            <div
              key={i}
              className={`h-5 rounded-[4px] min-w-[147px] border border-green ${
                completed ? 'bg-green' : ''
              }`}
            />
          ))}
          <button
            type='reset'
            className='ml-auto p-3.5 border border-white rounded-lg'
          >
            <ArrowCounterClockwise className='text-white w-8 h-8' size={32} />
          </button>
          <button
            type='submit'
            className='bg-green text-white py-4 px-12 text-2xl rounded-lg'
          >
            Submit
          </button>
        </div>
      </form>
      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        className='fixed z-50 inset-0 h-screen w-full flex items-center'
      >
        <Dialog.Overlay />
        <div className='bg-white text-center rounded-lg shadow-lg max-w-2xl mx-auto py-12 px-36'>
          <div className='mx-auto rounded-full w-20 h-20 bg-green mb-8 p-5'>
            <Check className='text-white w-10 h-10' />
          </div>
          <Dialog.Title className='text-4xl mb-4'>Success!</Dialog.Title>
          <Dialog.Description className='text-2xl mb-6'>
            Your submission has been saved.
          </Dialog.Description>

          <button
            className='mx-auto block text-lg text-blue-600 mb-4'
            onClick={() => {
              setSuccess(false);
              setFormState(createFormState(formData));
            }}
          >
            Submit a new response
          </button>

          <Link href='/login'>
            <a className='text-gray-400 text-lg'>View Submissions</a>
          </Link>
        </div>
      </Dialog>
    </>
  );
};

type VALUE_TYPES = string | number | boolean | Date;

function createFormState(formData: FormData): Record<string, VALUE_TYPES> {
  // create blank state object to use in useState for the form template

  const blankFormData = Object.fromEntries<VALUE_TYPES>(
    formData.sections.flatMap((s) => s.fields.map(({ name }) => [name, '']))
  );

  blankFormData.serviceType = formData.serviceType;
  if (formData.decleration) {
    blankFormData.decleration = false;
  }
  return blankFormData;
}

export interface FormData {
  serviceType: string;
  sections: FormSection[];
  decleration?: { title: string; text: string };
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

interface BaseFormField {
  className?: string;
  type?: string;
  label: string;
  placeholder?: string;
  name: string;
  required: boolean;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export type FormField =
  | TextField
  | TextArea
  | SelectField
  | RadioField
  | Checkbox;

export interface TextField extends BaseFormField {
  type: 'text';
  htmlType: HTMLInputTypeAttribute;
}

export interface SelectField extends BaseFormField {
  type: 'select';
  options: string[];
}

export interface RadioField extends BaseFormField {
  type: 'radio';
  options: string[];
}

export interface Checkbox extends BaseFormField {
  type: 'checkbox';
  options: string[];
}
export interface TextArea extends BaseFormField {
  type: 'textarea';
}

/**
 * Generate form fields according to the type and htmlType
 * should have refactored each component type as a seperate react component,
 * but I will just leave it as it is for now
 * simple text inputs use the htmlType to set their input type as in the html spec
 * select, radio, checkboxes, etc... each have specialized component to set their
 * styling consistent with the text input fields
 */
function FormFieldComponent({
  value,
  onChange,
  ...field
}: FormField & {
  value: string | number | boolean | Date;
  onChange: ChangeEventHandler;
}) {
  switch (field.type) {
    case 'text':
      return (
        <div key={field.name} className={`relative ${field.className ?? ''}`}>
          <label htmlFor={field.name} className={LABEL_CLASSNAME}>
            {field.label}
          </label>
          <input
            required={field.required}
            className={`${INPUT_CLASSNAME} ${value ? '' : 'text-gray-400'}`}
            name={field.name}
            id={field.name}
            type={field.htmlType ?? 'text'}
            placeholder={field.placeholder}
            value={value as string} // slack over typescript here
            onChange={onChange}
          />
          {field.htmlType == 'date' && (
            <CalendarBlank
              className='absolute right-2.5 bottom-3.5 w-6 h-6 text-gray-400 pointer-events-none'
              size={32}
            />
          )}
        </div>
      );
    case 'select':
      return (
        <div key={field.name} className={field.className}>
          <label htmlFor={field.name} className={LABEL_CLASSNAME}>
            {field.label}
          </label>
          <select
            required={field.required}
            className={`${INPUT_CLASSNAME} py-4 ${
              value == '' ? 'text-gray-400' : ''
            }`}
            name={field.name}
            id={field.name}
            value={value as string} // slack over typescript here
            onChange={onChange}
          >
            {field.placeholder && (
              <option value='' className='text-gray-400'>
                {field.placeholder}
              </option>
            )}
            {field.options.map((value) => (
              <option key={value} value={value} className='text-black'>
                {value}
              </option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div key={field.name} className={field.className}>
          <p className={LABEL_CLASSNAME}>{field.label}</p>
          <div className='flex flex-wrap gap-10'>
            {field.options.map((value: any) => (
              <div key={value} className='flex gap-4'>
                <input
                  type='checkbox'
                  className='w-6 h-6'
                  name={`${field.name}-${value}`}
                  id={`${field.name}-${value}`}
                  onChange={onChange}
                  defaultChecked={false}
                />
                <label htmlFor={`${field.name}-${value}`}>{value}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'radio':
      return (
        <div key={field.name} className={field.className}>
          <p className={LABEL_CLASSNAME}>{field.label}</p>
          <div className='flex flex-wrap gap-10 p-3.5'>
            {field.options.map((option: any) => (
              <div key={option} className='flex gap-4'>
                <input
                  type='radio'
                  className='w-6 h-6'
                  name={field.name}
                  id={`${field.name}-${value}`}
                  value={option}
                  checked={option == value}
                  onChange={onChange}
                />
                <label htmlFor={`${field.name}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'textarea':
      return (
        <div key={field.name} className={field.className}>
          <label htmlFor={field.name} className={LABEL_CLASSNAME}>
            {field.label}
          </label>
          <textarea
            required={field.required}
            className={INPUT_CLASSNAME}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            value={value as string} // slack over typescript here
            onChange={onChange}
          />
        </div>
      );
    default:
      return null;
  }
}

const LABEL_CLASSNAME = 'block text-lg mb-4';
const INPUT_CLASSNAME =
  'block text-lg rounded-md border border-gray-300 px-4 py-3 w-full bg-white';
