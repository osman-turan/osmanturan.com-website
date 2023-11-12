# osmanturan.com-website

[![wercker status](https://app.wercker.com/status/6c4288f68ab606b409ead7303b951382/s/ "wercker status")](https://app.wercker.com/project/byKey/6c4288f68ab606b409ead7303b951382)

Website for [osmanturan.com](https://osmanturan.com) which is built with [Next.js](https://nextjs.org/) and deployed with [Netlify](https://www.netlify.com/) + [Wercker](https://app.wercker.com/).

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Getting Started

Run the following command in a directory to clone the repository:

```bash
git clone https://github.com/osman-turan/osmanturan.com-website.git
```

After cloning the repository, run the following command at the project root to install missing dependencies:

```bash
yarn install
```

And finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Deployment Environments

There are 2 deployment environments:

- **Development:** [Netlify](https://www.netlify.com/) backed deployments are tracked with `develop` branch. All pull-requests should be created against this branch. After a successful build, an auto generated preview address will be provided for your pull-request.
- **Production:** [Wercker](https://app.wercker.com/) backed deployments are tracked with `master` branch. You shouldn't create pull-requests against this branch. Only successful branches which are merged into `develop` branch will be merged into `master` branch and eventually deployed into [production environment](http://osmanturan.com/).

## Contributing

Please create an issue in [the GitHub repository](https://github.com/osman-turan/osmanturan.com-website) for suggestions and questions. Pull-requests are much appreciated. But, please make sure you have created an issue before working on any pull-requests.

## Authors

- [Osman Turan](https://osmanturan.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
