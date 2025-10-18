import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const SignUpForm = () => {
  const navigate = useNavigate();

  // formik

  return (
    <>
      <form>
        <div className='form_title'>Create account</div>

        <div className='login_label'>
          {/* <span>Sign Up</span> */}
          <input type='text' placeholder='Username' />
        </div>

        <div className='password_label'>
          <input type='password' placeholder='Password' />
        </div>

        <div className='password_label'>
          <input type='password' placeholder='Confirm Password' />
        </div>

        <Button className={'btn sign_up_btn'} onClick={() => alert('Button clicked!')}>
          Sign Up
        </Button>

        {/* Temporary Debag Create User */}
        <Button className={'btn'} id={'debagCreate'} onClick={() => alert('Ok!')}>
          Debug Create
        </Button>
      </form>
      <Button className={'btn back_btn'} onClick={() => navigate('/')}>
        <img src='/public/back_ico.svg' alt='Back' />
      </Button>
    </>
  );
};
