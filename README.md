## Pulse.FM
Requires a server running for accessing venues.json locally over HTTP (due to cross-origin security policies within browsers).

SASS is also used for CSS organization and must be compiled into CSS.

#### Getting Started on OSX
Install Compass for compiling CSS
```console
gem install compass
```
#### Changing the CSS
Before making changes to the CSS, run the following command inside the root directory of the project:
```console
compass watch
```
Pressing `ctrl+c` will kill the process.

#### Running the app
 From inside the root folder of the project, run the following command:
 ```console
 python -m SimpleHTTPServer
 ```

In your browser, navigate to:
```
http://0.0.0.0:8000
```

Voila! Pulse.FM should be visible & working.