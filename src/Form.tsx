import * as React from 'react';
import LoanTerm from "./LoanTerm";
import OptionalPayment from "./OptionalPayment";

export default class Form extends React.Component<IProps, IState> {
    private static decimalAdjust(type: string, value: number, exp?: number) {
        // Если степень не определена, либо равна нулю...
        if (exp === undefined || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(exp % 1 === 0)) {
            return undefined;
        }
        // Сдвиг разрядов
        let valueStr;
        valueStr = value.toString().split('e');
        valueStr = Math[type](+(valueStr[0] + 'e' + (valueStr[1] ? (+valueStr[1] - exp) : -exp)));
        // Обратный сдвиг
        valueStr = valueStr.toString().split('e');
        return +(valueStr[0] + 'e' + (valueStr[1] ? (+valueStr[1] + exp) : exp));
    }

    private static round2Decimals(value: number) {
        return Form.decimalAdjust('round', value, -2);
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            additionalPayment: 0,
            interestRate: 15,
            loanAmount: 100000,
            loanAmountWithAdditional: 100000,
            loanTermInMonths: 12,
            paymentPerMonth: 9025.83,
            totalInterestPaid: 8309.97,
            totalPaid: 108309.97,
            zeroPayment: 0
        };

        this.handleLoanAmountChange = this.handleLoanAmountChange.bind(this);
        this.handleTermInMonthsChange = this.handleTermInMonthsChange.bind(this);
        this.handleInterestRateChange = this.handleInterestRateChange.bind(this);
        this.handleZeroPaymentChange = this.handleZeroPaymentChange.bind(this);
        this.handleAdditionalPaymentChange = this.handleAdditionalPaymentChange.bind(this);
        this.handlePaymentPerMonthChange = this.handlePaymentPerMonthChange.bind(this);
        this.updatePaymentPerMonth = this.updatePaymentPerMonth.bind(this);
        this.updateTotalPaid = this.updateTotalPaid.bind(this);
        this.updateLoanAmountWithAdditional = this.updateLoanAmountWithAdditional.bind(this);
    }

    public render() {
        const colXSmBegin = "col-12";
        const colXSmEnd = "col-12";

        const colSmBegin = "col-sm-5";
        const colSmEnd = "col-sm-7";

        const colMdBegin = "col-md-4";
        const colMdEnd = "col-md-8";

        const colLgBegin = "col-lg-3";
        const colLgEnd = "col-lg-9";

        const colXlBegin = "col-xl-2";
        const colXlEnd = "col-xl-10";

        const colBeginWithoutAdditionalClasses = colXSmBegin + " " + colSmBegin + " " + colMdBegin + " " + colLgBegin + " " + colXlBegin;
        const colBegin = colBeginWithoutAdditionalClasses + " col-form-label";
        const colEnd = colXSmEnd + " " + colSmEnd + " " + colMdEnd + " " + colLgEnd + " " + colXlEnd;

        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="inputLoanAmount" className={colBegin}>Loan Amount</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="inputLoanAmount"
                                   placeholder="Loan Amount" value={this.state.loanAmount}
                                   onChange={this.handleLoanAmountChange}/>
                        </div>
                    </div>
                </div>

                <LoanTerm colBegin={colBegin} colEnd={colEnd} loanTermInMonths={this.state.loanTermInMonths}
                          onChange={this.handleTermInMonthsChange}/>

                <div className="form-group row">
                    <label htmlFor="inputRate" className={colBegin}>Interest Rate per Year</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">%</div>
                            </div>
                            <input type="number" className="form-control" id="inputRate"
                                   placeholder="Interest Rate per Year" value={this.state.interestRate}
                                   onChange={this.handleInterestRateChange}/>
                        </div>
                    </div>
                </div>

                <OptionalPayment id="inputZeroPayment" label="Zero payment" checkBoxName="Add" enabled={false}
                                 onChange={this.handleZeroPaymentChange} colBegin={colBegin} colEnd={colEnd}
                                 colBeginWithoutAdditionalClasses={colBeginWithoutAdditionalClasses}/>

                <OptionalPayment id="inputAdditionalPayment" label="Additional payment"
                                 checkBoxName="Add (additional insurance, etc)" enabled={false}
                                 onChange={this.handleAdditionalPaymentChange} colBegin={colBegin} colEnd={colEnd}
                                 colBeginWithoutAdditionalClasses={colBeginWithoutAdditionalClasses}/>

                <div className="form-group row">
                    <label htmlFor="inputTotalLoanAmount" className={colBegin}>Total Loan Amount</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="inputTotalLoanAmount"
                                   placeholder="Total Loan Amount" value={this.state.loanAmountWithAdditional}
                                   disabled={true} readOnly={true}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputPaymentPerMonth" className={colBegin}>Payment per Month</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="inputPaymentPerMonth"
                                   placeholder="Payment per Month" value={this.state.paymentPerMonth}
                                   onChange={this.handlePaymentPerMonthChange}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputTotalPaid" className={colBegin}>Total Paid</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="inputTotalPaid"
                                   placeholder="Total Paid" disabled={true} value={this.state.totalPaid}
                                   readOnly={true}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputTotalInterestPaid" className={colBegin}>Total Interest
                        Paid</label>
                    <div className={colEnd}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="inputTotalInterestPaid"
                                   placeholder="Total Interest Paid" disabled={true}
                                   value={this.state.totalInterestPaid} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    private updateLoanAmountWithAdditional(afterStateUpdate?: () => void) {
        let loanAmountWithAdditional = Number(this.state.loanAmount);
        if (loanAmountWithAdditional !== undefined) {
            if (this.state.zeroPayment !== undefined) {
                loanAmountWithAdditional -= Number(this.state.zeroPayment)
            }
            if (this.state.additionalPayment !== undefined) {
                loanAmountWithAdditional += Number(this.state.additionalPayment)
            }
            loanAmountWithAdditional = Form.round2Decimals(loanAmountWithAdditional)
        }

        this.setState({loanAmountWithAdditional}, () => {
            if (afterStateUpdate !== undefined) {
                afterStateUpdate()
            }
        });
    }

    private handleLoanAmountChange(event: any) {
        const loanAmount = event.target.value;

        this.setState({loanAmount}, () => {
            this.updateLoanAmountWithAdditional(() => {
                this.updatePaymentPerMonth(() => {
                    this.updateTotalPaid();
                });
            });
        });
    }

    private handleTermInMonthsChange(loanTermInMonths?: number) {
        this.setState({loanTermInMonths}, () => {
            this.updatePaymentPerMonth(() => {
                this.updateTotalPaid();
            });
        });
    }

    private handleZeroPaymentChange(zeroPayment?: number) {
        this.setState({zeroPayment}, () => {
            this.updateLoanAmountWithAdditional(() => {
                this.updatePaymentPerMonth(() => {
                    this.updateTotalPaid();
                });
            });
        });
    }

    private handleAdditionalPaymentChange(additionalPayment?: number) {
        this.setState({additionalPayment}, () => {
            this.updateLoanAmountWithAdditional(() => {
                this.updatePaymentPerMonth(() => {
                    this.updateTotalPaid();
                });
            });
        });
    }

    private handleInterestRateChange(event: any) {
        this.setState({interestRate: event.target.value}, () => {
            this.updatePaymentPerMonth(() => {
                this.updateTotalPaid();
            });
        });
    }

    private handlePaymentPerMonthChange(event: any) {
        const paymentPerMonth = event.target.value;
        let loanAmountWithAdditional;
        let loanAmount;

        if (paymentPerMonth !== undefined && this.state.interestRate !== undefined &&
            this.state.loanTermInMonths !== undefined) {
            const interestRatePerMonth = (this.state.interestRate / (100 * 12));

            loanAmountWithAdditional = paymentPerMonth *
                (1 - Math.pow(1 + interestRatePerMonth, -this.state.loanTermInMonths)) / interestRatePerMonth;

            loanAmount = loanAmountWithAdditional;
            if (this.state.additionalPayment !== undefined) {
                loanAmount = loanAmount - this.state.additionalPayment
            }
            if (this.state.zeroPayment !== undefined) {
                loanAmount = loanAmount + this.state.zeroPayment
            }

            loanAmountWithAdditional = Form.round2Decimals(loanAmountWithAdditional);
            loanAmount = Form.round2Decimals(loanAmount);
        }
        this.setState({paymentPerMonth, loanAmountWithAdditional, loanAmount}, () => {
            this.updateTotalPaid();
        });
        return;
    }

    private updatePaymentPerMonth(afterStateUpdate?: () => void) {
        let paymentPerMonth;

        if (this.state.interestRate !== undefined && this.state.loanAmountWithAdditional !== undefined &&
            this.state.loanTermInMonths !== undefined) {
            const interestRatePerMonth = (this.state.interestRate / (100 * 12));
            paymentPerMonth = (this.state.loanAmountWithAdditional * interestRatePerMonth) /
                (1 - Math.pow(1 + interestRatePerMonth, -this.state.loanTermInMonths));

            paymentPerMonth = Form.round2Decimals(paymentPerMonth);
        } else {
            paymentPerMonth = undefined;
        }

        this.setState({paymentPerMonth}, () => {
            if (afterStateUpdate !== undefined) {
                afterStateUpdate()
            }
        })
    }

    private updateTotalPaid() {
        let totalPaid: number | undefined;
        if (this.state.paymentPerMonth !== undefined && this.state.loanTermInMonths !== undefined) {
            totalPaid = this.state.paymentPerMonth * this.state.loanTermInMonths;
        } else {
            totalPaid = undefined;
        }

        if (this.state.zeroPayment !== undefined && totalPaid !== undefined) {
            totalPaid = Number(totalPaid) + Number(this.state.zeroPayment);
        }

        let totalInterestPaid;
        if (totalPaid !== undefined && this.state.loanAmount !== undefined) {
            totalInterestPaid = totalPaid - this.state.loanAmount;

            totalInterestPaid = Form.round2Decimals(totalInterestPaid);
        } else {
            totalInterestPaid = undefined;
        }

        if (totalPaid !== undefined) {
            totalPaid = Form.round2Decimals(totalPaid);
        }

        this.setState({totalPaid, totalInterestPaid})
    }
}

interface IProps {
    someProp?: any
}

interface IState {
    additionalPayment?: number
    interestRate?: number
    loanAmount?: number
    loanAmountWithAdditional?: number
    loanTermInMonths?: number
    paymentPerMonth?: number
    totalPaid?: number
    totalInterestPaid?: number
    zeroPayment?: number
}