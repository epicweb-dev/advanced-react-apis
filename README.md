<div>
  <h1 align="center"><a href="https://epicreact.dev/advanced-hooks">🔥 Advanced React Hooks 🚀 EpicReact.Dev</a></h1>
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
[![All Contributors][all-contributors-badge]](#contributors)
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
[![Gitpod ready-to-code][gitpod-badge]](https://gitpod.io/#https://github.com/kentcdodds/advanced-react-hooks)
<!-- prettier-ignore-end -->

## Prerequisites

- You should be experienced with `useState`, `useEffect`, and `useRef`.

> NOTE: The EpicReact.dev videos were recorded with React version ^16.13 and all
> material in this repo has been updated to React version ^18. Differences are
> minor and any relevant differences are noted in the instructions.

## Additional Resources

- Videos
  [Getting Closure on React Hooks by Shawn Wang](https://www.youtube.com/watch?v=KJP1E-Y-xyo)
  (26 minutes)

## Quick start

It's recommended you run everything in the same environment you work in every
day, but if you don't want to set up the repository locally, you can get started
in one click with [Gitpod](https://gitpod.io),
[CodeSandbox](https://codesandbox.io/s/github/kentcdodds/advanced-react-hooks),
or by following the [video demo](https://www.youtube.com/watch?v=gCoVJm3hGk4)
instructions for [GitHub Codespaces](https://github.com/features/codespaces).

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kentcdodds/advanced-react-hooks)

For a local development environment, follow the instructions below

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `>=16`
- [npm][npm] v8.16.0 or greater

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

> If you want to commit and push your work as you go, you'll want to
> [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)
> first and then clone your fork rather than this repo directly.

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```shell
git clone https://github.com/kentcdodds/advanced-react-hooks.git
cd advanced-react-hooks
node setup
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier.

If you get any errors, please read through them and see if you can find out what
the problem is. If you can't work it out on your own then please [file an
issue][issue] and provide _all_ the output from the commands you ran (even if
it's a lot).

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```shell
npm install
npm run validate
```

If you are still unable to fix issues and you know how to use Docker 🐳 you can
setup the project with the following command:

```shell
docker-compose up
```

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

### Helpful Emoji 🐨 💰 💯 📝 🦉 📜 💣 💪 🏁 👨‍💼 🚨

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala** 🐨 will tell you when there's something specific you should
  do
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code)
  along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you
  finish the exercises early.
- **Nancy the Notepad** 📝 will encourage you to take notes on what you're
  learning
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a
  link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation
- **Berry the Bomb** 💣 will be hanging around anywhere you need to blow stuff
  up (delete code)
- **Matthew the Muscle** 💪 will indicate that you're working with an exercise
- **Chuck the Checkered Flag** 🏁 will indicate that you're working with a final
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
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3?s=100" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kentcdodds" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://frankcalise.com"><img src="https://avatars0.githubusercontent.com/u/374022?v=4?s=100" width="100px;" alt="Frank Calise"/><br /><sub><b>Frank Calise</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=frankcalise" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zara603"><img src="https://avatars1.githubusercontent.com/u/4918423?v=4?s=100" width="100px;" alt="Zara603"/><br /><sub><b>Zara603</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Zara603" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/michaelfriedman"><img src="https://avatars3.githubusercontent.com/u/17555926?v=4?s=100" width="100px;" alt="Michael Friedman"/><br /><sub><b>Michael Friedman</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=michaelfriedman" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bitwise.cool"><img src="https://avatars1.githubusercontent.com/u/20847518?v=4?s=100" width="100px;" alt="Brandon Newton"/><br /><sub><b>Brandon Newton</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=btnwtn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JonathanBruce"><img src="https://avatars3.githubusercontent.com/u/1743411?v=4?s=100" width="100px;" alt="Jonathan Bruce"/><br /><sub><b>Jonathan Bruce</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=JonathanBruce" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://team.thebrain.pro"><img src="https://avatars1.githubusercontent.com/u/4002543?v=4?s=100" width="100px;" alt="Łukasz Gandecki"/><br /><sub><b>Łukasz Gandecki</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=lgandecki" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4?s=100" width="100px;" alt="Justin Dorfman"/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://motdde.com"><img src="https://avatars1.githubusercontent.com/u/12215060?v=4?s=100" width="100px;" alt="Oluwaseun Oyebade"/><br /><sub><b>Oluwaseun Oyebade</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=motdde" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://kevinostafinski.com"><img src="https://avatars0.githubusercontent.com/u/28754130?v=4?s=100" width="100px;" alt="Kevin Ostafinski"/><br /><sub><b>Kevin Ostafinski</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kevscript" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Snaptags"><img src="https://avatars1.githubusercontent.com/u/1249745?v=4?s=100" width="100px;" alt="Markus Lasermann"/><br /><sub><b>Markus Lasermann</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Snaptags" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Snaptags" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://zacjones.io"><img src="https://avatars2.githubusercontent.com/u/6188161?v=4?s=100" width="100px;" alt="Zac Jones"/><br /><sub><b>Zac Jones</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=zacjones93" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ricardobusquet.com"><img src="https://avatars1.githubusercontent.com/u/7198302?v=4?s=100" width="100px;" alt="Ricardo Busquet"/><br /><sub><b>Ricardo Busquet</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=rbusquet" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kylereblora.github.io/"><img src="https://avatars2.githubusercontent.com/u/33372538?v=4?s=100" width="100px;" alt="Kyle Matthew Reblora"/><br /><sub><b>Kyle Matthew Reblora</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kylereblora" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/marcosvega91"><img src="https://avatars2.githubusercontent.com/u/5365582?v=4?s=100" width="100px;" alt="Marco Moretti"/><br /><sub><b>Marco Moretti</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=marcosvega91" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nywleswoey"><img src="https://avatars3.githubusercontent.com/u/28249994?v=4?s=100" width="100px;" alt="Selwyn Yeow"/><br /><sub><b>Selwyn Yeow</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=nywleswoey" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gugol2"><img src="https://avatars0.githubusercontent.com/u/4933016?v=4?s=100" width="100px;" alt="Watchmaker"/><br /><sub><b>Watchmaker</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=gugol2" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=gugol2" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fonstack.dev/"><img src="https://avatars3.githubusercontent.com/u/35873992?v=4?s=100" width="100px;" alt="Carlos Fontes"/><br /><sub><b>Carlos Fontes</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/issues?q=author%3Afonstack" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/pritamsangani/"><img src="https://avatars3.githubusercontent.com/u/22857896?v=4?s=100" width="100px;" alt="Pritam Sangani"/><br /><sub><b>Pritam Sangani</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=PritamSangani" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://wbeuil.com"><img src="https://avatars1.githubusercontent.com/u/8110579?v=4?s=100" width="100px;" alt="William BEUIL"/><br /><sub><b>William BEUIL</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=wbeuil" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/emzoumpo"><img src="https://avatars2.githubusercontent.com/u/2103443?v=4?s=100" width="100px;" alt="Emmanouil Zoumpoulakis"/><br /><sub><b>Emmanouil Zoumpoulakis</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=emzoumpo" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://peter.hozak.info/"><img src="https://avatars0.githubusercontent.com/u/1087670?v=4?s=100" width="100px;" alt="Peter Hozák"/><br /><sub><b>Peter Hozák</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Aprillion" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/joemaffei"><img src="https://avatars1.githubusercontent.com/u/9068746?v=4?s=100" width="100px;" alt="Joe Maffei"/><br /><sub><b>Joe Maffei</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=joemaffei" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://magrippis.com"><img src="https://avatars0.githubusercontent.com/u/3502800?v=4?s=100" width="100px;" alt="Johnny Magrippis"/><br /><sub><b>Johnny Magrippis</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=jmagrippis" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.rphuber.com"><img src="https://avatars0.githubusercontent.com/u/8245890?v=4?s=100" width="100px;" alt="Ryan Huber"/><br /><sub><b>Ryan Huber</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=rphuber" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=rphuber" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dominicchapman.com"><img src="https://avatars2.githubusercontent.com/u/7607007?v=4?s=100" width="100px;" alt="Dominic Chapman"/><br /><sub><b>Dominic Chapman</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=dominicchapman" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/imalbert"><img src="https://avatars1.githubusercontent.com/u/12537973?v=4?s=100" width="100px;" alt="imalbert"/><br /><sub><b>imalbert</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=imalbert" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Huuums"><img src="https://avatars1.githubusercontent.com/u/9745322?v=4?s=100" width="100px;" alt="Dennis Collon"/><br /><sub><b>Dennis Collon</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Huuums" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jrozbicki"><img src="https://avatars3.githubusercontent.com/u/35103924?v=4?s=100" width="100px;" alt="Jakub Różbicki"/><br /><sub><b>Jakub Różbicki</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=jrozbicki" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://vk.com/vasilii_kovalev"><img src="https://avatars0.githubusercontent.com/u/10310491?v=4?s=100" width="100px;" alt="Vasilii Kovalev"/><br /><sub><b>Vasilii Kovalev</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/issues?q=author%3Avasilii-kovalev" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://alexfertel.netlify.app"><img src="https://avatars3.githubusercontent.com/u/22298999?v=4?s=100" width="100px;" alt="Alexander Gonzalez"/><br /><sub><b>Alexander Gonzalez</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=alexfertel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.daleseo.com"><img src="https://avatars1.githubusercontent.com/u/5466341?v=4?s=100" width="100px;" alt="Dale Seo"/><br /><sub><b>Dale Seo</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=DaleSeo" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=DaleSeo" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4?s=100" width="100px;" alt="Michaël De Boey"/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=MichaelDeBoey" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thegoodsheppard"><img src="https://avatars1.githubusercontent.com/u/13774377?v=4?s=100" width="100px;" alt="Greg Sheppard"/><br /><sub><b>Greg Sheppard</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=thegoodsheppard" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://bobbywarner.com"><img src="https://avatars0.githubusercontent.com/u/554961?v=4?s=100" width="100px;" alt="Bobby Warner"/><br /><sub><b>Bobby Warner</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=bobbywarner" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jwm0"><img src="https://avatars0.githubusercontent.com/u/28310983?v=4?s=100" width="100px;" alt="Jakub Majorek"/><br /><sub><b>Jakub Majorek</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=jwm0" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://suddenlyGiovanni.dev"><img src="https://avatars2.githubusercontent.com/u/15946771?v=4?s=100" width="100px;" alt="Giovanni Ravalico"/><br /><sub><b>Giovanni Ravalico</b></sub></a><br /><a href="#ideas-suddenlyGiovanni" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://juliosoto.dev"><img src="https://avatars.githubusercontent.com/u/32543746?v=4?s=100" width="100px;" alt="Julio Soto"/><br /><sub><b>Julio Soto</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=jsberlanga" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jmtes.github.io"><img src="https://avatars.githubusercontent.com/u/38450133?v=4?s=100" width="100px;" alt="Juno Tesoro"/><br /><sub><b>Juno Tesoro</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=jmtes" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.andresosante.com"><img src="https://avatars.githubusercontent.com/u/37124700?v=4?s=100" width="100px;" alt="Andrés Osante"/><br /><sub><b>Andrés Osante</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=aosante" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IanVS"><img src="https://avatars.githubusercontent.com/u/4616705?v=4?s=100" width="100px;" alt="Ian VanSchooten"/><br /><sub><b>Ian VanSchooten</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=IanVS" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/giancarlol"><img src="https://avatars.githubusercontent.com/u/33439343?v=4?s=100" width="100px;" alt="Giancarlo Brusca"/><br /><sub><b>Giancarlo Brusca</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=giancarlol" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tsargent"><img src="https://avatars.githubusercontent.com/u/173215?v=4?s=100" width="100px;" alt="Tyler Sargent"/><br /><sub><b>Tyler Sargent</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=tsargent" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://pavlos.dev"><img src="https://avatars.githubusercontent.com/u/100233?v=4?s=100" width="100px;" alt="Pavlos Vinieratos"/><br /><sub><b>Pavlos Vinieratos</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=pvinis" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Hillsie"><img src="https://avatars.githubusercontent.com/u/17975287?v=4?s=100" width="100px;" alt="Hills"/><br /><sub><b>Hills</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=Hillsie" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/diegotc86"><img src="https://avatars.githubusercontent.com/u/23508800?v=4?s=100" width="100px;" alt="Diego Torres"/><br /><sub><b>Diego Torres</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=diegotc86" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://icyjoseph.dev/"><img src="https://avatars.githubusercontent.com/u/21013447?v=4?s=100" width="100px;" alt="Joseph"/><br /><sub><b>Joseph</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=icyJoseph" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/marioleed"><img src="https://avatars.githubusercontent.com/u/1763448?v=4?s=100" width="100px;" alt="Mario Sannum"/><br /><sub><b>Mario Sannum</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=marioleed" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wdj82"><img src="https://avatars.githubusercontent.com/u/37749088?v=4?s=100" width="100px;" alt="wdj82"/><br /><sub><b>wdj82</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=wdj82" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ssmkhrj"><img src="https://avatars.githubusercontent.com/u/49264891?v=4?s=100" width="100px;" alt="Som Shekhar Mukherjee"/><br /><sub><b>Som Shekhar Mukherjee</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=ssmkhrj" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DarkHorse1997"><img src="https://avatars.githubusercontent.com/u/22052923?v=4?s=100" width="100px;" alt="Tanmoy Das"/><br /><sub><b>Tanmoy Das</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=DarkHorse1997" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/maheshjag"><img src="https://avatars.githubusercontent.com/u/1705603?v=4?s=100" width="100px;" alt="MJ"/><br /><sub><b>MJ</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=maheshjag" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://stackoverflow.com/users/5411817/sherylhohman?tab=topactivity"><img src="https://avatars.githubusercontent.com/u/8204778?v=4?s=100" width="100px;" alt="Sheryl Hohman"/><br /><sub><b>Sheryl Hohman</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=SherylHohman" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mdsbzalam.dev"><img src="https://avatars.githubusercontent.com/u/6962565?v=4?s=100" width="100px;" alt="Mohammad Shahbaz Alam"/><br /><sub><b>Mohammad Shahbaz Alam</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=shahbaz17" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anabellaspinelli"><img src="https://avatars.githubusercontent.com/u/7825875?v=4?s=100" width="100px;" alt="Anabella"/><br /><sub><b>Anabella</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=anabellaspinelli" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lucasminter.dev"><img src="https://avatars.githubusercontent.com/u/26470581?v=4?s=100" width="100px;" alt="Lucas Minter"/><br /><sub><b>Lucas Minter</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=lsminter" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leggsimon"><img src="https://avatars.githubusercontent.com/u/11544418?v=4?s=100" width="100px;" alt="Simon Legg"/><br /><sub><b>Simon Legg</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=leggsimon" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kenneth-gray"><img src="https://avatars.githubusercontent.com/u/10341832?v=4?s=100" width="100px;" alt="Kenny Gray"/><br /><sub><b>Kenny Gray</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=kenneth-gray" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alexsurelee"><img src="https://avatars.githubusercontent.com/u/11603625?v=4?s=100" width="100px;" alt="Alex Lee"/><br /><sub><b>Alex Lee</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=alexsurelee" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/plumcoding"><img src="https://avatars.githubusercontent.com/u/88927709?v=4?s=100" width="100px;" alt="plumcoding"/><br /><sub><b>plumcoding</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=plumcoding" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/CNate"><img src="https://avatars.githubusercontent.com/u/13683291?v=4?s=100" width="100px;" alt="Nathan"/><br /><sub><b>Nathan</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=CNate" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GavinOsborn"><img src="https://avatars.githubusercontent.com/u/581588?v=4?s=100" width="100px;" alt="Gavin Osborn"/><br /><sub><b>Gavin Osborn</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=GavinOsborn" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://creador.dev"><img src="https://avatars.githubusercontent.com/u/40248406?v=4?s=100" width="100px;" alt="Pawan Kumar"/><br /><sub><b>Pawan Kumar</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-hooks/commits?author=creador-dev" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
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
[build-badge]: https://img.shields.io/github/workflow/status/kentcdodds/advanced-react-hooks/validate/main?logo=github&style=flat-square
[build]: https://github.com/kentcdodds/advanced-react-hooks/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/advanced-react-hooks/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod
[coc]: https://github.com/kentcdodds/advanced-react-hooks/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/kentcdodds/advanced-react-hooks?color=orange&style=flat-square
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/advanced-react-hooks/issues/new
<!-- prettier-ignore-end -->
