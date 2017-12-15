# RUAC

> Registro Único de Artistas y Gestores Culturales

## Build Front-End Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm build

# build for production and view the bundle analyzer report
npm build --report
```

## Allow Node to use privileged ports

``` bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
