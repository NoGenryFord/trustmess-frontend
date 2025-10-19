import { SignUpForm } from '@components';

import '../scss/_pages/_signup_page.scss';

export const SignUpPage = () => {
  return (
    <div className='signup_page' id='signupPage'>
      <SignUpForm />
    </div>
  );
};
