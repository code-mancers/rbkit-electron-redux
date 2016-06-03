# Rbkit Client (using Electron + React + Redux)

This app is a client that connects to a profiler [Rbkit](https://github.com/code-mancers/rbkit).
Once this is feature complete for Rbkit server's master branch, this client
will replace the official Qt client.

## Development

```
cp config/config.js.example config/config.js
```

Now start this app by running `npm install && npm start`. Run `cmd + opt + I` to open the dev tools. Refresh the app to see data in the console that is being recevied from Rbkit.

Now setup the Rbkit client:
```
$ git clone https://github.com/code-mancers/rbkit-electron-redux.git
$ cd rbkit-electron-redux
$ nmp install
$ npm start
```

This starts the Rbkit client in development environment.


## Debugging

To know what data is being received, please refer to log statements in `componentDidMount()` function in `app/components/Layout.js`.
