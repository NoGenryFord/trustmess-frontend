import { Button } from './Button';

// Import google material icons
import '/node_modules/material-icons/iconfont/material-icons.css';

export const LogInForm = () => {
  return (
    <>
      <form>
        <div className='form_title'>Enter login and password</div>

        <div className='login_label'>
          {/* <span>Login:</span> */}
          <input type='text' placeholder='Username' />
        </div>

        <div className='password_label'>
          {/* <span>Password:</span> */}
          <input type='password' placeholder='Password' />{' '}
        </div>

        <Button className={'btn log_in_btn'} onClick={() => alert('Button clicked!')}>
          Log In
        </Button>
      </form>
    </>
  );
};
