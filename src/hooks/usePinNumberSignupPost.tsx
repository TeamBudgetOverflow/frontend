import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../apis/client';

interface PinNumberSignupPostProps {
  id: number;
  pinNumber2: string;
}

const usePinNumberSignupPost = ({ id, pinNumber2 }: PinNumberSignupPostProps) => {
  const navigate = useNavigate();

  const { refetch } = useQuery(
    'postPinCode',
    () => {
      userAPI.postPinCode(id, pinNumber2);
    },
    {
      enabled: false,
      onSuccess: () => {
        localStorage.removeItem('isNewComer');
        navigate('/welcome');
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  return { refetch };
};

export default usePinNumberSignupPost;
