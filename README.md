# Particles Tweet 

> A live feed tweet about a specific hashtag

## Access to twitter API

Follow this link: https://auth0.com/docs/connections/social/twitter to get your acess and update the json in settings/settings.default.json

``` bash
  "twitter": {
    "consumer_key": "",
    "consumer_secret": "",
    "access_token_key": "",
    "access_token_secret": ""
  }
  ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```

## Modify Hashtag

The hashtag is located in /config/index.js
``` bash
    hashtag: '#championdumonde2018'
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
