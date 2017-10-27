# RUAC

> Registro Único de Artistas y Gestores Culturales

## Build Front-End Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```

## Allow Node to use privileged ports

``` bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
