import * as React from 'react';

export default class OptionalPayment extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            enabled: props.enabled,
            payment: props.payment
        };

        this.handleEnabledChange = this.handleEnabledChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
    }

    public render() {
        return (
            <div>
                <div className="form-group row">
                    <div className={this.props.colBeginWithoutAdditionalClasses}>{this.props.label}</div>
                    <div className={this.props.colEnd}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id={this.props.id + "Check"}
                                   onChange={this.handleEnabledChange} checked={this.state.enabled}/>
                            <label className="form-check-label" htmlFor={this.props.id + "Check"}>
                                {this.props.checkBoxName}
                            </label>
                        </div>
                    </div>
                </div>

                <div className={(this.state.enabled ? '' : 'd-none ') + "form-group row"}>
                    <label htmlFor={this.props.id} className={this.props.colBegin}>{this.props.label}</label>
                    <div className={this.props.colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id={this.props.id} min="0" step="1"
                                   placeholder={this.props.label} value={this.state.payment}
                                   onChange={this.handlePaymentChange}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleEnabledChange() {
        const enabled = !this.state.enabled;
        this.setState({enabled});
        let paymentForCallBack;
        if (!enabled) {
            paymentForCallBack = undefined;
        } else {
            paymentForCallBack = this.state.payment
        }

        if (this.props.onChange !== undefined) {
            this.props.onChange(paymentForCallBack)
        }
    }

    private handlePaymentChange(event: any) {
        const payment = event.target.value;
        this.setState({payment});
        if (this.props.onChange !== undefined) {
            this.props.onChange(payment)
        }
    }
}

interface IProps {
    colBegin: string;
    colBeginWithoutAdditionalClasses: string;
    colEnd: string;
    enabled: boolean;
    payment?: number;
    id: string;
    label: string;
    checkBoxName: string;
    onChange: (payment?: number) => void;
}

interface IState {
    enabled: boolean;
    payment?: number;
}
