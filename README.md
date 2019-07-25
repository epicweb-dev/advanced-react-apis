# Advanced React Hooks

👋 hi there! My name is [Kent C. Dodds](https://kentcdodds.com) and this is the
source material for
[Advanced React Hooks](https://kentcdodds.com/workshops/advanced-react-hooks)!

[![Travis Build Status][build-badge]][build]
[![AppVeyor Build Status][win-build-badge]][win-build]
[![GPL-3.0 License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

## Pre-Workshop Instructions/Requirements

In order for us to maximize our efforts during the workshop, please do the
following:

- [ ] Setup the project (follow the setup instructions below) (~5 minutes)
- [ ] Install and setup [Zoom](https://zoom.us) on the computer you will be
      using (~5 minutes)
- [ ] Watch
      [Use Zoom for KCD Workshops](https://egghead.io/lessons/egghead-use-zoom-for-kcd-workshops)
      (~8 minutes).
- [ ] Watch
      [Setup and Logistics for KCD Workshops](https://egghead.io/lessons/egghead-setup-and-logistics-for-kcd-workshops)
      (~24 minutes). Please do NOT skip this step.
- [ ] Watch [The Beginner's Guide to React](https://kcd.im/beginner-react)
      (available free on Egghead.io), or have the equivalent experience (77
      minutes)
- [ ] Watch my talk
      [Why React Hooks](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
      (35 minutes)
- [ ] Go through my
      [Learn React Hooks Workshop](https://kentcdodds.com/workshops/hooks), or
      have the equivalent basic experience of using hooks. You should be
      experienced with `useState`, `useEffect`, and `useRef`.

The more prepared you are for the workshop, the better it will go for you.

## Workshop Outline

You will be learning and using the following hooks: `useReducer`, `useContext`,
`useMemo`, `useCallback`, `useLayoutEffect`, `useImperativeHandle`, and
`useDebugValue`.

1. `useReducer`: simple Counter
2. `useReducer`: HTTP requests
3. `useContext`: simple Counter (covers `useMemo` and `useCallback` as well)
4. `useContext`: Caching response data in context (covers `useMemo` and
   `useCallback` as well)
5. `useLayoutEffect`: auto-growing textarea
6. `useImperativeHandle`: scroll to top/bottom
7. `useDebugValue`: useMedia

## System Requirements

- [git][git] v2 or greater
- [NodeJS][node] v8 or greater
- [yarn][yarn] v1 or greater (or [npm][npm] v6 or greater)

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
yarn --version # or npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

You should be able to work through the entire workshop in the browser. This is
actually the recommended approach as it requires absolutely no setup whatsoever.
Go to
[this codesandbox](https://codesandbox.io/s/github/kentcdodds/advanced-react-hooks)
and you should be good to go.

[![Edit advanced-react-hooks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/kentcdodds/advanced-react-hooks)

If you'd rather be able to work through the workshop on your own computer, then
follow the following instructions.

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```shell
# If you were given instructions for a specific branch to use, then use this command
# git clone --single-branch --branch <branchname> https://github.com/kentcdodds/advanced-react-hooks.git

# otherwise, this is fine:
git clone https://github.com/kentcdodds/advanced-react-hooks.git

# then do this:
cd advanced-react-hooks
npm run setup --silent
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier If you get any errors, please read through
them and see if you can find out what the problem is. You may also want to look
at [Troubleshooting](#troubleshooting). If you can't work it out on your own
then please [file an issue][issue] and provide _all_ the output from the
commands you ran (even if it's a lot).

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://github.com/facebook/create-react-app) application.

You can also open
[the deployment of the app on Netlify](https://advanced-react-hooks.netlify.com/).

## Running the tests

```shell
npm test
```

This will start [Jest](http://facebook.github.io/jest) in watch mode. Read the
output and play around with it.

## Working through it

This a very exercise-heavy workshop. You'll find the exercises in the
`src/exercises` directory. I recommend running the tests and the application.
When you start an exercise, pull up the exercises page in the app and the test
in the `src/__tests__` directory.

**Your goal will be to go into each test, swap the final version for the
exercise version in the import, and make the tests pass**

## Helpful Emoji 🐨 💰 💯 🦉 📜 💣 🚨

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala Bear** 🐨 will tell you when there's something specific you
  should do
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code)
  along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you
  finish the exercises early.
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a
  link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation
- **Berry the Bomb** 💣 will be hanging around anywhere you need to blow stuff
  up (delete code)
- **Alfred the Alert 🚨** may occasionally show up in the test failures with
  potential explanations for why the tests are failing.

## Troubleshooting

<details>

<summary>"npm run setup" command not working</summary>

Here's what the setup script does. If it fails, try doing each of these things
individually yourself:

```
# verify your environment will work with the project
node ./scripts/verify

# install dependencies
npm install

# verify the project is ready to run
npm run build
npm run test:coverage
```

If any of those scripts fail, please try to work out what went wrong by the
error message you get. If you still can't work it out, feel free to [open an
issue][issue] with _all_ the output from that script. I will try to help if I
can.

</details>

<details>

<summary>
  "Error: ENOSPC: System limit for number of file watchers reached" when running
  tests
</summary>

Try increasing your system's file watchers limit:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

> Read more about what’s happening at
> https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details

</details>

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://frankcalise.com"><img src="https://avatars0.githubusercontent.com/u/374022?v=4" width="100px;" alt="Frank Calise"/><br /><sub><b>Frank Calise</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=frankcalise" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Zara603"><img src="https://avatars1.githubusercontent.com/u/4918423?v=4" width="100px;" alt="Zara603"/><br /><sub><b>Zara603</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Zara603" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/michaelfriedman"><img src="https://avatars3.githubusercontent.com/u/17555926?v=4" width="100px;" alt="Michael Friedman"/><br /><sub><b>Michael Friedman</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=michaelfriedman" title="Documentation">📖</a></td>
    <td align="center"><a href="https://bitwise.cool"><img src="https://avatars1.githubusercontent.com/u/20847518?v=4" width="100px;" alt="Brandon Newton"/><br /><sub><b>Brandon Newton</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JonathanBruce"><img src="https://avatars3.githubusercontent.com/u/1743411?v=4" width="100px;" alt="Jonathan Bruce"/><br /><sub><b>Jonathan Bruce</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=JonathanBruce" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## License

This material is available for private, non-commercial use under the
[GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you
would like to use this material to conduct your own workshop, please contact me
at kent@doddsfamily.us

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com/
[build-badge]:
  https://img.shields.io/travis/kentcdodds/advanced-react-hooks.svg?style=flat-square&logo=travis
[build]: https://travis-ci.org/kentcdodds/advanced-react-hooks
[license-badge]:
  https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]:
  https://github.com/kentcdodds/advanced-react-hooks/blob/master/README.md#license
[prs-badge]:
  https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]:
  https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[coc-badge]:
  https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]:
  https://github.com/kentcdodds/advanced-react-hooks/blob/master/CODE_OF_CONDUCT.md
[github-watch-badge]:
  https://img.shields.io/github/watchers/kentcdodds/advanced-react-hooks.svg?style=social
[github-watch]: https://github.com/kentcdodds/advanced-react-hooks/watchers
[github-star-badge]:
  https://img.shields.io/github/stars/kentcdodds/advanced-react-hooks.svg?style=social
[github-star]: https://github.com/kentcdodds/advanced-react-hooks/stargazers
[twitter]:
  https://twitter.com/intent/tweet?text=Check%20out%20advanced-react-hooks%20by%20@kentcdodds%20https://github.com/kentcdodds/advanced-react-hooks%20%F0%9F%91%8D
[twitter-badge]:
  https://img.shields.io/twitter/url/https/github.com/kentcdodds/advanced-react-hooks.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[win-path]:
  https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/advanced-react-hooks/issues/new
[win-build-badge]:
  https://img.shields.io/appveyor/ci/kentcdodds/advanced-react-hooks.svg?style=flat-square&logo=appveyor
[win-build]: https://ci.appveyor.com/project/kentcdodds/advanced-react-hooks
[coverage-badge]:
  https://img.shields.io/codecov/c/github/kentcdodds/advanced-react-hooks.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/advanced-react-hooks
[watchman]: https://facebook.github.io/watchman/docs/install.html
