import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FormEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useState,
} from 'react';

export const Form = ({ formData }: { formData: FormData }) => {
  const [formState, setFormState] = useState(() => createFormState(formData));

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      switch (e.type) {
        case 'checkbox':
          return setFormState((formState) => ({
            ...formState,
            [e.target.name]: e.target.checked,
          }));
      }
    },
    [setFormState]
  );

  return (
    <form onSubmit={submitForm} className='grid grid-cols-4 gap-x-6 gap-y-10'>
      {formData.sections.map(({ title, fields }, i) => (
        <>
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
        </>
      ))}
      {formData.decleration && (
        <div className='col-span-4 bg-gray-100 border border-gray-300 rounded-lg p-6'>
          <h2 className='text-2xl mb-4'>{formData.decleration.title}</h2>
          <p className='text-lg mb-4'>{formData.decleration.text}</p>
          <input
            required
            id='decleration'
            type='checkbox'
            className='w-6 h-6'
            onChange={onChange}
          />
          <label htmlFor='decleration' className='ml-4'>
            I agree
          </label>
        </div>
      )}
    </form>
  );
};

function createFormState(
  formData: FormData
): Record<string, string | number | boolean | Date> {
  // create blank state object to use in useState for the form template
  return Object.fromEntries(
    formData.sections.flatMap(({ fields }) =>
      fields.map(({ name }) => [name, ''])
    )
  );
}

export interface FormData {
  endpoint: string;
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

function FormFieldComponent({
  value,
  onChange,
  ...field
}: FormField & {
  value: string | number | boolean | Date;
  onChange: ChangeEventHandler;
}): ReactElement {
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
            value={value as string} // slack over typescript here
            onChange={onChange}
          />
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
            className={INPUT_CLASSNAME}
            name={field.name}
            id={field.name}
            value={value as string}  // slack over typescript here
            onChange={onChange}
          >
            {field.placeholder && (
              <option value='' className='text-gray-400'>
                {field.placeholder}
              </option>
            )}
            {field.options.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
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
            value={value as string}  // slack over typescript here
            onChange={onChange}
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
            value={value as string}  // slack over typescript here
            onChange={onChange}
          />
        </div>
      );
  }
}

const LABEL_CLASSNAME = 'block text-lg mb-4';
const INPUT_CLASSNAME =
  'block text-lg rounded-md border border-gray-300 px-4 py-3 w-full bg-white';
