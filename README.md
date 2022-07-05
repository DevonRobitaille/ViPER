# ViPER (Vendor Performance Evaluation Report)

### Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A product for teams that want full control over their own vendor performance evaluation reports.

### Why you should use ViPER?
* Ensuring secure E2E
* Simple & Intuitive UI

### Features
* Register users
* Login with secure "magic link" emails
* Create evaluation reports
* List & View all reports


### Technologies used
* tRPC
* TypeScript
* NextJS
* Prisma
* Zod - Schema validation and type generation
* nodemailer - Sending OTP emails and email verification


<br><br>

## Getting Started
___
### What you will need
* A running instance of a DB (Postgres, SQLlite, MYSQL)
* A server to host the package

### Setup
1. Clone repo
2. npm install
3. create .env file if one does not already exist
4. .env file should contain the following: <br>
`DATABASE_URL="mysql://username:password@url:port/project name"`<br>
`SECRET="some secret for JWT"`
5. Initialize database with: <br>
`npx prisma migrate dev`
6. Initialize base data set (i.e. roles): <br>
`npm run ts-node ./scripts/fill-db.ts`
7. Run dev server: <br>
`npm run dev`

### Easy Hosting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We recommend using **Vercel** to host the website and **PlanetScale** as your backend database.

<br>

## Screenshots
___
<p>https://url.com/setup</p>
<img src='./imgs/Setup Page.png'/>
<hr/>
<p>https://url.com/</p>
<img src='./imgs/Login Page.png'/>
<hr/>
<p>https://url.com/admin</p>
<img src='./imgs/Admin Page.png'/>
<hr/>
<p>https://url.com/setup - Showing off the 'Add Vendor' Option</p>
<img src='./imgs/Add Vendor.png'/>
<hr/>
<p>https://url.com/new</p>
<img src='./imgs/New Report Page.png'/>
<hr/>
<p>https://url.com/reports</p>
<img src='./imgs/Reports Page.png'/>
<hr/>
<p>https://url.com/report?id=...</p>
<img src='./imgs/Individual Report Page.png'/>
<hr/>

<br>

## Todo
___
- [x] tRPC: register-admin
- [x] tRPC: register-user
- [x] tRPC: verify-email
- [x] tRPC: request-otp
- [x] tRPC: verify-otp
- [x] page: login (page crashes when verifying otp)
- [x] Script: create a script to populate db with default values (i.e. roles)
- [x] page: navbar
- [x] page: admin (Section, Add & Edit Modals, Disable button)
- [x] page: new report
- [x] page: reports (all from everyone)
- [ ] page: report?id=... (show details of specific report)
- [ ] ZodError: format zod errors properly back to the client

### Quality of life improvements
- [ ] page: reports (allow to filter reports)
- [ ] page: analytics (allow to see the performance by either company or vendors by a graph?)
- [ ] page: admin (allow to filter content, i.e., vendor can be filtered by job title or company)
- [ ] page: admin (Complete logo upload section)
- [ ] Archive / History (created a way to make a history of changes to a report)