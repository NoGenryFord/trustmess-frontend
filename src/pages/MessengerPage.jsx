import { useTheme } from '@contexts/ThemeContext';
import { Button, ContactCard } from '@components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsers } from '/src/api/requests';
import { useAuth } from '/src/contexts/AuthContext';
import { useWebSocket } from '/src/contexts/WebSocketContext';
// React-icons
import { MdDarkMode, MdLightMode } from 'react-icons/md';

// Import SCSS
import '/src/scss/_pages/_messenger_page.scss';

export const MessengerPage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { onlineUsers, isConnected } = useWebSocket();

  // Temporary for testing
  console.log('🟢 Online users:', onlineUsers);
  console.log('🔌 Connected:', isConnected);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setUsers(allUsers);
      } catch (error) {
        console.log('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='messenger_page'>
      <nav className='nav_line' id='navLine'>
        {/* User Logo */}
        <div className='auth_user_div'>{user?.username} </div>
        {/* Theme switch */}
        {/* Індикатор статусу */}
        <div className='online_status_div'>WebSocket: {isConnected ? 'Online' : 'Offline'}</div>
        <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
          {theme === 'dark' ? (
            <MdDarkMode className='theme_ico' />
          ) : (
            <MdLightMode className='theme_ico' />
          )}
        </Button>
        {/* Log out btn */}
        <Button
          className={'btn btn_log_out'}
          onClick={() => {
            logout();
            navigate('/');
          }}>
          Log out
        </Button>
      </nav>

      <main className='messenger_container'>
        <div className='contacts_panel'>
          {users.map((user) => (
            <ContactCard key={user.id} userName={user.username} />
          ))}
        </div>
        <div className='dialog_panel'></div>
      </main>
    </div>
  );
};
