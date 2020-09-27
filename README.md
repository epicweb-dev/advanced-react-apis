<div>
  <h1 align="center"><a href="https://epicreact.dev">🔥 Advanced React Hooks 🚀 EpicReact.Dev</a></h1>
  <strong>
    Learn the more advanced React hooks and different patterns to enable great
    developer APIs for custom hooks.
  </strong>
  <p>
    We’ll look at some of the more advanced hooks and ways they can be used to
    optimize your components and custom hooks. We’ll also look at several
    patterns you can follow to make custom hooks that provide great APIs for
    developers to be productive building applications.
  </p>

  <a href="https://epicreact.dev">
    <img
      alt="Learn React from Start to Finish"
      src="https://kentcdodds.com/images/epicreact-promo/er-1.gif"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![AppVeyor Build Status][win-build-badge]][win-build]
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## Prerequisites

- You should be experienced with `useState`, `useEffect`, and `useRef`.

## System Requirements

- [git][git] v2 or greater
- [NodeJS][node] v10 or greater
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```
git clone https://github.com/kentcdodds/advanced-react-hooks.git
cd advanced-react-hooks
npm run setup --silent
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier.

If you get any errors, please read through them and see if you can find out what
the problem is. If you can't work it out on your own then please [file an
issue][issue] and provide _all_ the output from the commands you ran (even if
it's a lot).

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://create-react-app.dev/) application.

You can also open
[the deployment of the app on Netlify](https://advanced-react-hooks.netlify.app/).

## Running the tests

```shell
npm test
```

This will start [Jest](https://jestjs.io/) in watch mode. Read the output and
play around with it. The tests are there to help you reach the final version,
however _sometimes_ you can accomplish the task and the tests still fail if you
implement things differently than I do in my solution, so don't look to them as
a complete authority.

### Exercises

- `src/exercise/00.md`: Background, Exercise Instructions, Extra Credit
- `src/exercise/00.js`: Exercise with Emoji helpers
- `src/__tests__/00.js`: Tests
- `src/final/00.js`: Final version
- `src/final/00.extra-0.js`: Final version of extra credit

The purpose of the exercise is **not** for you to work through all the material.
It's intended to get your brain thinking about the right questions to ask me as
_I_ walk through the material.

### Helpful Emoji 🐨 💪 🏁 💰 💯 🦉 📜 💣 👨‍💼 🚨

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala** 🐨 will tell you when there's something specific you should
  do
- **Matthew the Muscle** 💪 will indicate what you're working with an exercise
- **Chuck the Checkered Flag** 🏁 will indicate that you're working with a final
  version
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code)
  along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you
  finish the exercises early.
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a
  link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation
- **Berry the Bomb** 💣 will be hanging around anywhere you need to blow stuff
  up (delete code)
- **Peter the Product Manager** 👨‍💼 helps us know what our users want
- **Alfred the Alert** 🚨 will occasionally show up in the test failures with
  potential explanations for why the tests are failing.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://frankcalise.com"><img src="https://avatars0.githubusercontent.com/u/374022?v=4" width="100px;" alt=""/><br /><sub><b>Frank Calise</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=frankcalise" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Zara603"><img src="https://avatars1.githubusercontent.com/u/4918423?v=4" width="100px;" alt=""/><br /><sub><b>Zara603</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Zara603" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/michaelfriedman"><img src="https://avatars3.githubusercontent.com/u/17555926?v=4" width="100px;" alt=""/><br /><sub><b>Michael Friedman</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=michaelfriedman" title="Documentation">📖</a></td>
    <td align="center"><a href="https://bitwise.cool"><img src="https://avatars1.githubusercontent.com/u/20847518?v=4" width="100px;" alt=""/><br /><sub><b>Brandon Newton</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JonathanBruce"><img src="https://avatars3.githubusercontent.com/u/1743411?v=4" width="100px;" alt=""/><br /><sub><b>Jonathan Bruce</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=JonathanBruce" title="Code">💻</a></td>
    <td align="center"><a href="http://team.thebrain.pro"><img src="https://avatars1.githubusercontent.com/u/4002543?v=4" width="100px;" alt=""/><br /><sub><b>Łukasz Gandecki</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=lgandecki" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt=""/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="http://motdde.com"><img src="https://avatars1.githubusercontent.com/u/12215060?v=4" width="100px;" alt=""/><br /><sub><b>Oluwaseun Oyebade</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=motdde" title="Documentation">📖</a></td>
    <td align="center"><a href="http://kevinostafinski.com"><img src="https://avatars0.githubusercontent.com/u/28754130?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Ostafinski</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kevscript" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Snaptags"><img src="https://avatars1.githubusercontent.com/u/1249745?v=4" width="100px;" alt=""/><br /><sub><b>Markus Lasermann</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Snaptags" title="Code">💻</a></td>
    <td align="center"><a href="https://zacjones.io"><img src="https://avatars2.githubusercontent.com/u/6188161?v=4" width="100px;" alt=""/><br /><sub><b>Zac Jones</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=zacjones93" title="Documentation">📖</a></td>
    <td align="center"><a href="https://ricardobusquet.com"><img src="https://avatars1.githubusercontent.com/u/7198302?v=4" width="100px;" alt=""/><br /><sub><b>Ricardo Busquet</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=rbusquet" title="Code">💻</a></td>
    <td align="center"><a href="https://kylereblora.github.io/"><img src="https://avatars2.githubusercontent.com/u/33372538?v=4" width="100px;" alt=""/><br /><sub><b>Kyle Matthew Reblora</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kylereblora" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/marcosvega91"><img src="https://avatars2.githubusercontent.com/u/5365582?v=4" width="100px;" alt=""/><br /><sub><b>Marco Moretti</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=marcosvega91" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nywleswoey"><img src="https://avatars3.githubusercontent.com/u/28249994?v=4" width="100px;" alt=""/><br /><sub><b>Selwyn Yeow</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=nywleswoey" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/gugol2"><img src="https://avatars0.githubusercontent.com/u/4933016?v=4" width="100px;" alt=""/><br /><sub><b>Watchmaker</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=gugol2" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=gugol2" title="Documentation">📖</a></td>
    <td align="center"><a href="https://fonstack.dev/"><img src="https://avatars3.githubusercontent.com/u/35873992?v=4" width="100px;" alt=""/><br /><sub><b>Carlos Fontes</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/issues?q=author%3Afonstack" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## Workshop Feedback

Each exercise has an Elaboration and Feedback link. Please fill that out after
the exercise and instruction.

At the end of the workshop, please go to this URL to give overall feedback.
Thank you! https://kcd.im/arh-ws-feedback

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/travis/kentcdodds/advanced-react-hooks.svg?style=flat-square&logo=travis
[build]: https://travis-ci.org/kentcdodds/advanced-react-hooks
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/advanced-react-hooks/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/advanced-react-hooks/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/advanced-react-hooks/issues/new
[win-build-badge]: https://img.shields.io/appveyor/ci/kentcdodds/advanced-react-hooks.svg?style=flat-square&logo=appveyor
[win-build]: https://ci.appveyor.com/project/kentcdodds/advanced-react-hooks
<!-- prettier-ignore-end -->
