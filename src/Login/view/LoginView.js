import React from 'react';

export default function LoginView() {
  return (
    <article>
      <section>
        <label htmlFor='id'>id</label>
        <input id='id' type='text' />
        <label htmlFor='pw'>pw</label>
        <input id='pw' type='password' />
      </section>
      <section></section>
    </article>
  );
}
