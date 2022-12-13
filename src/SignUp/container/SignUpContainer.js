import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignUpView from '../view/SignUpView';
import * as API from '../../util/Api';
import * as Util from '../../util/Util';
import firebaseConfig from '../../Common/FirebaseConfig';

import * as FirebaseApp from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';

export default function SignUpContainer() {
  // * set firebase
  useEffect(() => {
    FirebaseApp.initializeApp(firebaseConfig);
  }, []);

  const [isCertHpNo, SetIsCertHpNo] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({});
  const validateMap = {
    email: '이메일을 입력해주세요.',
    pw: '비밀번호를 입력해주세요.',
    userName: '이름을 입력해주세요.',
    hpNo: '휴대전화 번호를 입력해주세요.',
    isCertHpNo: '휴대전화 인증을 진행해주세요.',
  };

  const pw = useRef({});
  pw.current = watch('pw', '');

  const onSubmit = (data) => {
    for (const key in validateMap) {
      if (key === 'isCertHpNo') {
        if (!isCertHpNo) return alert(validateMap[key]);
      } else {
        if (!data[key]) return alert(validateMap[key]);
      }
    }

    API.createUser({
      email: data.email,
      pw: data.pw,
      userName: data.userName,
      hpNo: data.hpNo,
    })
      .then(() => {
        window.location.href = '/login';
      })
      .catch((err) => Util.axiosErrorHandler(err));
  };

  const onClickSendCertCode = () => {
    const hpNo = watch('hpNo');
    const auth = FirebaseAuth.getAuth();
    auth.languageCode = 'ko';
    window.recaptchaVerifier = new FirebaseAuth.RecaptchaVerifier('recaptcha-container', {}, auth);
    const appVerifier = window.recaptchaVerifier;
    FirebaseAuth.signInWithPhoneNumber(auth, Util.convertInternationalPhoneNumber(hpNo), appVerifier)
      .then((confirmationResult) => {
        document.querySelector('#recaptcha-container').replaceChildren();
        window.confirmationResult = confirmationResult;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickCertHpNo = () => {
    const code = watch('code');
    window.confirmationResult.confirm(code).then((res) => {
      SetIsCertHpNo(true);
    });
  };

  return (
    <SignUpView
      register={register}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      pw={pw}
      onSubmit={onSubmit}
      errors={errors}
      isCertHpNo={isCertHpNo}
      onClickSendCertCode={onClickSendCertCode}
      onClickCertHpNo={onClickCertHpNo}
    />
  );
}
