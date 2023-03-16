# Custom plugins

A custom Strapi plugin has been developed in order to solve some CCG specific needs in the Strapi UI (at the time of writing (2023-03-15), a field displaying the vuid of the content your browsing in the Strapi UI).

There are good resources online on how these work. [Strapi's official documentation](https://docs.strapi.io/dev-docs/plugins-development) for it, for instance.
As stated in Strapi's documentation, the plugin can be viewed as a separate application, and has its own dependencies. Since we're running TypeScript in this project, we have to remember to follow the step with `npm install`:ing and `npm run build`:ing the plugin itself, as mentioned in the documentation link above.
