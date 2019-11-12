import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from './App';
import { initializeIcons } from 'office-ui-fabric-react';

initializeIcons();
// Mount root component.
const domRoot = document.querySelector("#react-root");
ReactDOM.render(<App /> , domRoot);

// When you need to delete the component before the page unloads,
// make sure to unmount the component so the necessary cleanup are done.
// (including lifecycle methods)

// ReactDOM.unmountComponentAtNode(domRoot);
