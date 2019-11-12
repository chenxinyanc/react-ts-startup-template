import classNames from 'classnames';
import * as React from 'react';
import classes from './NumericUpDown.scss';

/**
 * Properties of NumericUpDown control.
 */
export interface INumericUpDownProps {
    value: number;
    min: number;
    max: number;
    step: number;
    allowFraction?: boolean;
    onValueChanged?: (value: number) => void;
}

/**
 * Internal states of NumericUpDown control.
 */
interface INumericUpDownStates {
    textBoxClass?: string;
    textBoxValue: string;
    error?: string;
}

export class NumericUpDown extends React.Component<INumericUpDownProps, INumericUpDownStates> {
    public static defaultProps: Partial<INumericUpDownProps> = { min: 0, step: 1 };
    private currentTimeoutId: number | undefined;
    private isFirstSpin = false;
    private spinDirection: "up" | "down" = "up";
    public constructor(props: Readonly<INumericUpDownProps>) {
        super(props);
        // Initialize state manually.
        this.state = {
            textBoxValue: String(props.value)
        };
    }
    private _spinValue = () => {
        let nextValue: number | undefined;
        if (this.spinDirection === "up") {
            nextValue = this.props.value + this.props.step;
        } else {
            nextValue = this.props.value - this.props.step;
        }
        if (nextValue >= this.props.min && nextValue <= this.props.max) {
            if (this.props.onValueChanged) {
                this.props.onValueChanged(nextValue);
            }
            this.currentTimeoutId = window.setTimeout(this._spinValue, this.isFirstSpin ? 500 : 100);
        } else {
            this.currentTimeoutId = undefined;
        }
        this.isFirstSpin = false;
    }
    private spinUp = () => {
        this.spinDirection = "up";
        this.isFirstSpin = true;
        this._spinValue();
        this.setState({ textBoxClass: classes.up });
    }
    private spinDown = () => {
        this.spinDirection = "down";
        this.isFirstSpin = true;
        this._spinValue();
        this.setState({ textBoxClass: classes.down });
    }
    private _spinStop = () => {
        if (this.currentTimeoutId != null) {
            window.clearTimeout(this.currentTimeoutId);
            this.currentTimeoutId = undefined;
        }
        this.setState({ textBoxClass: undefined });
    }
    private _onTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const value = this.props.allowFraction ? parseFloat(text) : parseInt(text);
        if (text === "" || isNaN(text as any)) {
            this.setState({ error: "Invalid numeric value." });
        } else if (value < this.props.min || value > this.props.max) {
            this.setState({ error: `Value is out of range. Expect ${this.props.min} to ${this.props.max}` });
        } else {
            this.props.onValueChanged && this.props.onValueChanged(value);
            this.setState({ error: undefined });
        }
        this.setState({ textBoxValue: text });
    }
    public render() {
        // Primary render function.
        return (<div className={classes.container}>
            <div className={classes.field}>
                <input
                    type="textbox"
                    className={classNames(classes.textBox, this.state.textBoxClass, this.state.error != null && classes.invalid)}
                    // Setting `value` makes a controlled <input>
                    // Setting `defaultValue` makes an uncontrolled <input>
                    value={this.state.textBoxValue}
                    onChange={this._onTextBoxChange}
                />
                <div className={classes.buttons}>
                    <button className={classes.spinUp} onPointerDown={this.spinUp} onPointerUp={this._spinStop}>^</button>
                    <button className={classes.spinDown} onPointerDown={this.spinDown} onPointerUp={this._spinStop}>v</button>
                </div>
            </div>
            {this.state.error != null && (<div className={classes.error}>{this.state.error}</div>)}
        </div>);
    }
    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<INumericUpDownProps>, nextStates: Readonly<INumericUpDownStates>) {
        // See https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
        // The function is not deprecated, but marked "UNSAFE".
        // However, we do not have better approach here.
        if (nextProps.value !== this.props.value) {
            // Reset text box content when value changes.
            this.setState({ textBoxValue: String(nextProps.value), error: undefined });
        }
    }
    public componentWillUnmount() {
        this._spinStop();
    }
}
