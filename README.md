# Rbkit Client (using Electron + React + Redux)

This app is a client that connects to a profiler [Rbkit](https://github.com/code-mancers/rbkit).
Once this is feature complete for Rbkit server's master branch, this client
will replace the official Qt client.

## Development

First setup Rbkit server and run the example script with the profiler turned on.
```
$ git clone https://github.com/code-mancers/rbkit.git
$ cd rbkit
$ rake compile
$ ruby experiments/using_rbkit.rb
```
The profiler is now running and can send and receive data and commands.

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
