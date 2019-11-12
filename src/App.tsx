import * as React from 'react';
import { NumericUpDown } from './components/NumericUpDown';

export const App: React.FC = () => {
    const [offset, setOffset] = React.useState(0);
    return (<React.Fragment>
        <h1>App</h1>
        <p style={{ position: 'relative', left: offset }}>From App.tsx!</p>
        <NumericUpDown min={-50} max={100} value={offset} onValueChanged={v => setOffset(v)} />
    </React.Fragment>);
}
App.displayName = "App";
