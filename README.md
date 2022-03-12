# Tradenet assessment

## [Github repo](https://github.com/majudhu/tradenet-assessment)

## [Vercel demo](https://tradenet-assessment.vercel.app)

### extra dependencies

- '@node-rs/argon2' is used as the 'argon2' has issues installing on apple silicon, also I just really like Rust
- 'iron-session' is used as the http session management library because of its simplicity, ease of use, my own familiarity and seameless integration with nextjs
- no extra external API is used, as Nextjs's own API routes is enough
- set the MONGODB_URI in an .env.local to use a mongodb server other than localhost
  - Mongoose was just not used as it was not mentioned in the requirments, but Mongoose or any other ORM should be used to make optimal use of Typescript

### possible enhancements

- use a recaptcha for the registration forms
- or use a thrid-party sign-in service like Google sign-in
