import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  FormEventHandler,
  HTMLInputTypeAttribute,
  ReactElement,
} from 'react';

export const Form = ({ formData }: { formData: FormData }) => {
  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitForm} className='grid grid-cols-4 gap-x-6 gap-y-10'>
      {formData.sections.map(({ title, fields }) => (
        <>
          <h2 className='col-span-4 text-2xl'>{title}</h2>
          {fields.map(createField)}
          <hr className='col-span-4 border-t-gray-600' />
        </>
      ))}
    </form>
  );
};

export interface FormData {
  endpoint: string;
  sections: FormSection[];
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
}
export interface TextArea extends BaseFormField {
  type: 'textarea';
}

function createField(field: FormField): ReactElement {
  switch (field.type) {
    case 'text':
      return (
        <div key={field.name} className={field.className}>
          <label htmlFor={field.name} className={LABEL_CLASSNAME}>
            {field.label}
          </label>
          <input
            required={field.required}
            className={INPUT_CLASSNAME}
            name={field.name}
            id={field.name}
            type='text'
            placeholder={field.placeholder}
          />
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
          />
        </div>
      );
    default:
      return (
        <div key={field.name} className={field.className}>
          <label htmlFor={field.name} className={LABEL_CLASSNAME}>
            {field.label}
          </label>
          <input
            required={field.required}
            className={INPUT_CLASSNAME}
            name={field.name}
            id={field.name}
            type='text'
            placeholder={field.placeholder}
          />
        </div>
      );
  }
}

const LABEL_CLASSNAME = 'block text-lg mb-4';
const INPUT_CLASSNAME =
  'block text-lg rounded-md border border-gray-300 px-4 py-3 w-full';
