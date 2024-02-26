// import { Button, IconBookOpen } from "@supabase/ui";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute">
      <Button
        style={{ fontWeight: 'bold', color: 'black' }}
        onClick={() => {
          navigate('/');
        }}
        type="text"
        size={'large'}
        icon={<BookOutlined />}
      >
        Library
      </Button>
    </div>
  );
};

export default Logo;
