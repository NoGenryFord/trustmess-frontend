import { Button } from './Button';
// Import formik & YUP (for validation)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation form
const signupSchema = Yup.object({
  username: Yup.string()
    .min(6, 'Use minimum 6 symbols')
    .max(20, 'Use max 20 symbols')
    .required('Enter login'),
  password: Yup.string()
    .min(6, 'Use minimum 6 symbols')
    .max(20, 'Use max 20 symbols')
    .required('Enter password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords is not same')
    .required('Confirm password'),
});

// Submit form
const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
  try {
    console.log('Sign Up values:', values);

    // API Request
    // POST reques
    // End API Request

    // Simulation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Tepmorary
    alert(`Account was created! Your login: ${values.username}, your password: ${values.password}`);

    // Clear form after successfull registration
    resetForm();
  } catch (error) {
    setErrors({ submit: 'Sign Up error. Try other login' });
  } finally {
    // Alwais on end
    setSubmitting(false);
  }
};

export const SignUpForm = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <div className='form_title'>Create account</div>

          {/* Username field */}
          <Field name='username'>
            {({ field, meta }) => (
              <div className={`login_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='text'
                  placeholder={meta.touched && meta.error ? meta.error : 'Username'}
                />
              </div>
            )}
          </Field>

          {/* Password field */}
          <Field name='password'>
            {({ field, meta }) => (
              <div className={`password_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='password'
                  placeholder={meta.touched && meta.error ? meta.error : 'Password'}
                />
              </div>
            )}
          </Field>

          {/* Confirm Password field */}
          <Field name='confirmPassword'>
            {({ field, meta }) => (
              <div className={`password_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='password'
                  placeholder={meta.touched && meta.error ? meta.error : 'Confirm Password'}
                />
              </div>
            )}
          </Field>

          {/* Base form error */}
          {errors.submit && <div className='error_message submit_error'>{errors.submit}</div>}

          {/* Submit button */}
          <Button className='btn sign_up_btn' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Registation...' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

// Old form
// return (
//   <>
//     <form>
//       <div className='form_title'>Create account</div>
//       <div className='login_label'>
//         {/* <span>Sign Up</span> */}
//         <input type='text' placeholder='Username' />
//       </div>
//       <div className='password_label'>
//         <input type='password' placeholder='Password' />
//       </div>
//       <div className='password_label'>
//         <input type='password' placeholder='Confirm Password' />
//       </div>
//       <Button className={'btn sign_up_btn'} onClick={() => alert('Button clicked!')}>
//         Sign Up
//       </Button>
//       {/* Temporary Debag Create User */}
//       <Button className={'btn'} id={'debagCreate'} onClick={() => alert('Ok!')}>
//         Debug Create
//       </Button>
//     </form>
//   </>
// );
