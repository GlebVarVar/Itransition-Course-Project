import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { userRegistraionAPI } from '../../services/Users';

import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { Layout } from '../Layout/main';

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
}

export const Registration = () => {
  const [errorReg, setErrorReg] = useState({
    errorMessage: '',
    error: false,
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationForm>();
  const onSubmit: SubmitHandler<RegistrationForm>   = async (data) => {
    console.log(data);

    await userRegistraionAPI(registerEmail, username);
    
    navigate('/');
  };

  const { t } = useTranslation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (context) navigate('/');
  //   return;
  // }, [context]);

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">{t('username')}</label>
        <input type="text" id="username" {...register('username')} />

        <label htmlFor="email">{t('enterEmail')}</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="password">{t('password')}</label>
        <input type="password" id="password" {...register('password')} />

        <input type="submit" value={t('signup')} />
      </form>
    </Layout>
  );
};
