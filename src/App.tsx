import * as React from 'react';
import { NumericUpDown } from './components/NumericUpDown';

/**
 * React root component.
 * This is a function component.
 * @see https://reactjs.org/docs/components-and-props.html#function-and-class-components
 */
export const App: React.FC = () => {
    // https://reactjs.org/docs/hooks-reference.html#basic-hooks
    const [offset, setOffset] = React.useState(0);
    const [offsetSpinnerVisible, setOffsetSpinnerVisible] = React.useState(false);
    // Core render part.
    return (<React.Fragment>
        <h1>App</h1>
        <p style={{ position: 'relative', left: offset }}>From App.tsx!</p>
        <button onClick={() => setOffsetSpinnerVisible(!offsetSpinnerVisible)}>{offsetSpinnerVisible ? "Hide" : "Show"} spinner</button>
        {offsetSpinnerVisible && <NumericUpDown
            min={-50} max={100} value={offset}
            style={{ width: '200px' }}
            onValueChanged={v => setOffset(v)}
        />}
    </React.Fragment>);
}
App.displayName = "App";
