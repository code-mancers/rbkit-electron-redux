#Setup

This app is a client that connects to a profiler [Rbkit](https://github.com/code-mancers/rbkit).

To use this app, first clone the [Rbkit repository](https://github.com/code-mancers/rbkit) and in the shell, run `ruby experiments/using_rbkit.rb`. The profiler is now running and can be send and receive data and commands.

Now start this app by running `npm start && npm install`. Run `cmd + opt + I` to open the dev tools. Refresh the app to see data in the console that is being recevied from Rbkit.

To know what data is being received, please refer to log statements in `componentDidMount()` function in `/app/components/Layout.js`.
