// https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/session.ts
// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: 'not a very secret password that is atleast 32 characters long',
  cookieName: 'iron-session/examples/next.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  export interface IronSessionData {
    isLoggedIn: boolean;
    email: string;
  }
}
