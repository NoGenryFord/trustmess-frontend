import { LogInForm } from '@components';

import '../scss/_pages/_login_page.scss';

export const LogInPage = () => {
  return (
    <div className='login_page' id='loginPage'>
      <LogInForm />
    </div>
  );
};
