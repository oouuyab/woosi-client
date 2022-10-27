import React from 'react';
import { css } from '@emotion/css/macro';

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export default function SignUpView({ register, handleSubmit, isSubmitting, pw, onSubmit, errors }) {
  return (
    <article>
      <form className={flexColumn} onSubmit={(event) => event.preventDefault}>
        {/* email */}
        <label htmlFor='email'>이메일</label>
        <input id='email' type='email' placeholder='이메일을 입력해주세요' {...register('email', { required: true })} />
        {/* pw */}
        <label htmlFor='pw'>비밀번호</label>
        <input
          id='pw'
          type='password'
          placeholder='비밀번호를 입력해주세요'
          {...register('pw', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '8글자 이상으로 입력해주세요.',
            },
          })}
        />
        {errors.pw && <p>{errors.pw.message}</p>}
        <label htmlFor='pwRepeat'>비밀번호 확인</label>
        <input
          id='pwRepeat'
          type='password'
          placeholder='비밀번호 확인'
          {...register('pw_repeat', {
            validate: (value) => value === pw.current || '🚨 비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.pw_repeat && <p>{errors.pw_repeat.message}</p>}
        {/* 이름 */}
        <label htmlFor='userName'>이름</label>
        <input id='userName' type='text' placeholder='이름을 입력해주세요' {...register('userName')} />
        {/* hpNo */}
        <label htmlFor='hpNo'>휴대전화 번호</label>
        <input id='hpNo' type='tel' placeholder='휴대전화 번호를 입력해주세요' {...register('hpNo')} />
        {/* certHpNo */}
        {/* <label></label>
      <input /> */}
        <input type='submit' disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
      </form>
    </article>
  );
}
