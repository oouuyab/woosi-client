import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import SignUpView from '../view/SignUpView';
import * as API from '../../util/api';

export default function SignUpContainer() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({});

  const pw = useRef({});
  pw.current = watch('pw', '');

  const onSubmit = (data) => {
    API.createUser({
      email: data.email,
      pw: data.pw,
      userName: data.userName,
      hpNo: data.hpNo,
    })
      .then(() => {
        window.location.href = '/login';
      })
      .catch((err) => alert(err));
  };

  return (
    <SignUpView
      register={register}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      pw={pw}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
}
