# Installation

    # Install dependencies
    yarn install

    # Start the project
    npm run nodemon

    # Build project env dev
    yarn build

# Dev guide

- Typescript ESM
- Đặt tên class theo tên folder
- Viêt theo hướng tách module thành lib để re-use. Lưu ý:
  - Dependency Injection
  - Truyền params thông qua constructor, set hoặc function

#MongoQueue
reference https://www.mongodb.com/docs/manual/core/index-partial/
https://stackoverflow.com/questions/35178356/create-a-conditional-ttl-in-mongo

Ex:
db.email.createIndex( {createdDate: 1}, {
    expireAfterSeconds: 172800, // 2 days
    partialFilterExpression: {
        scheduledDate: 0
    }
});
### Make local package install

tham khảo https://terodox.tech/using-npm-link-for-package-development/
Ví dụ:

1. Mỗi lib phải có file package.json để mô tả lib
2. Tới thư mục lib .../partnership/server/modules/auths
   Chạy npm link
   Cho kết quả /home/bao/.nvm/versions/node/v12.22.1/lib/node_modules/auths -> /home/bao/Private/Demo/partnership/server/modules/auths
3. Sử dụng cho project
   Vào thư mục .../partnership/server
   Chạy npm link auths
   Cho kết quả /home/bao/Private/Demo/partnership/server/node_modules/auths -> /home/bao/.nvm/versions/node/v12.22.1/lib/node_modules/auths -> /home/bao/Private/Demo/partnership/server/modules/auths
   Sửa lại các import
   import {Auth...} from '../../auths' -> import {Auth} from 'auths'
4. Xóa liên kết
   Vào lại thư mục .../partnership/server/modules/auths
   Chạy lệnh npm unlink
   Vào lại thư mục .../partnership/server
   Chạy lệnh npm unlink auths

### Unit Test with Jest

jest
@types/jest
ts-jest
supertest

setup
npm install --save-dev libname

# Add script to package.json

"test": "jest --coverage --passWithNoTests"
"test:watch": "jest --watch"

# jest.config.ts

import type {Config} from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
verbose: true,
testMatch: [ //cấu hình các thư mục test
'<rootDir>/tests/**/*.test.tsx',
'<rootDir>/modules/**/*.test.ts',
],
transform: {
'^.+\.(ts|tsx|js)$': 'ts-jest',
},
}
export default config

# Run test

npm run test

Kết quả tương tự như sau
PASS modules/auths/index.test.ts (5.69 s)
test
✓ get getLoginURL from config is not empty (1 ms)
✓ get login URL contructor (342 ms)
✓ get login URL get set (3 ms)

---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
All files | 41.86 | 15.62 | 34.54 | 41.66 |  
 auths/haravan_auth | 51.81 | 31.25 | 60 | 53.6 |  
 haravan_auth.constant.ts | 100 | 100 | 100 | 100 |  
 haravan_auth.service.ts | 46.39 | 31.25 | 58.33 | 48.23 | 58,83-85,92-109,133-157,171-195,211-235  
 index.ts | 88.88 | 100 | 66.66 | 87.5 | 14  
 configs | 76.92 | 32.78 | 45.45 | 76.56 |  
 config.constant.ts | 100 | 100 | 100 | 100 |  
 index.ts | 76.56 | 32.78 | 45.45 | 76.19 | 53,74,87,96,107-114,124,128,132,136,140  
 configs/developments | 100 | 100 | 100 | 100 |  
 worker.config.ts | 100 | 100 | 100 | 100 |  
 logs | 24.62 | 0 | 17.24 | 23.11 |  
 index.ts | 100 | 100 | 100 | 100 |  
 log.constant.ts | 100 | 100 | 100 | 100 |  
 log.service.ts | 37.03 | 0 | 20 | 36.36 | 17-25,40-44,48-52,56-60  
 log.util.ts | 63.63 | 100 | 20 | 100 |  
 static_log.service.ts | 14.56 | 0 | 5.88 | 13.42 | 31,38-47,59-76,88-107,122-124,132-149,153-170,180-184,192-213,217-218,222-239,245-263,269-320
---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
Test Suites: 1 passed, 1 total
Tests: 3 passed, 3 total
Snapshots: 0 total
Time: 5.941 s
Ran all test suites.

#Make npm library
reference: https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe#adding-rollup

Step1: install rollup
npm install rollup @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-commonjs rollup-plugin-dts --save-dev

Step2: add rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

Step3 npm run rollup

Step4 publish
  git init
  add .gitignore
  update package.json
    {
    "name": "@YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME",
    "publishConfig": {
        "registry": "https://npm.pkg.github.com/YOUR_GITHUB_USERNAME"
    },
    ...  
    }
  add root/.npmrc
  registry=https://registry.npmjs.org/
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
