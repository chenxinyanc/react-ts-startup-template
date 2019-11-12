import * as React from 'react';
import { DefaultButton, SpinButton, Customizer } from 'office-ui-fabric-react';
import { AzureCustomizationsLight } from '@uifabric/azure-themes';

/**
 * React root component.
 * This is a function component.
 * @see https://reactjs.org/docs/components-and-props.html#function-and-class-components
 */
export const App: React.FC = () => {
    // https://reactjs.org/docs/hooks-reference.html#basic-hooks
    const [offset, setOffset] = React.useState(0);
    const [offsetSpinnerVisible, setOffsetSpinnerVisible] = React.useState(false);
    function onSpinButtonIncrement() {
        const newOffset = offset + 1;
        if (offset <= 100) {
            setOffset(newOffset);
        }
    }
    function onSpinButtonDecrement() {
        const newOffset = offset - 1;
        if (offset >= -50) {
            setOffset(newOffset);
        }
    }
    // Core render part.
    return (<Customizer {...AzureCustomizationsLight}>
        <h1>App</h1>
        <p style={{ position: 'relative', left: offset }}>From App.tsx!</p>
        <DefaultButton onClick={() => setOffsetSpinnerVisible(!offsetSpinnerVisible)}>{offsetSpinnerVisible ? "Hide" : "Show"} spin button</DefaultButton>
        {offsetSpinnerVisible && <SpinButton
            min={-50} max={100} value={offset + "px"}
            style={{ width: '200px' }}
            onIncrement={onSpinButtonIncrement}
            onDecrement={onSpinButtonDecrement}
        />}
    </Customizer>);
}
App.displayName = "App";
