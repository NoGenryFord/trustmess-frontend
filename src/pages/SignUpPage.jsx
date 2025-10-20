import { Button, SignUpForm } from '@components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

// Import google material icons
import 'material-icons/iconfont/material-icons.css';
// Import SCSS
import '/src/scss/_pages//_signup_page.scss';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='signup_page' id='signupPage'>
      {/* Theme switch */}
      <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
        <span className='material-icons'>{theme + '_mode'}</span>
      </Button>

      <SignUpForm />

      <Button className={'btn back_btn'} onClick={() => navigate('/')}>
        <span className='material-icons'>arrow_back_ios_new</span>
      </Button>
    </div>
  );
};
