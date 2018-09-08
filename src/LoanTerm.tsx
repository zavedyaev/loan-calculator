import * as React from 'react';

export default class LoanTerm extends React.Component<IProps, IState> {
    private static convertMonthsIntoYears(months?: number) {
        if (months === undefined) {
            return undefined
        }
        return months / 12
    }

    private static convertYearsIntoMonths(years?: number) {
        if (years === undefined) {
            return undefined
        }
        return years * 12
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            loanTermInMonths: props.loanTermInMonths,
            loanTermInYears: LoanTerm.convertMonthsIntoYears(props.loanTermInMonths)
        };

        this.handleTermInMonthsChange = this.handleTermInMonthsChange.bind(this);
        this.handleTermInYearsChange = this.handleTermInYearsChange.bind(this);
    }

    public render() {
        return (
            <div>
                <div className="form-group row">
                    <label htmlFor="inputLoanTermYears" className={this.props.colBegin}>Loan Term in Years</label>
                    <div className={this.props.colEnd}>
                        <input type="number" className="form-control" id="inputLoanTermYears"
                               placeholder="Loan Term in Years" min="0" max={100} step="1"
                               value={this.state.loanTermInYears} onChange={this.handleTermInYearsChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLoanTermMonths" className={this.props.colBegin}>Loan Term in Months</label>
                    <div className={this.props.colEnd}>
                        <input type="number" className="form-control" id="inputLoanTermMonths"
                               placeholder="Loan Term in Months" min="1" max={100 * 12} step="1"
                               value={this.state.loanTermInMonths} onChange={this.handleTermInMonthsChange}/>
                    </div>
                </div>
            </div>
        );
    }

    private handleTermInMonthsChange(event: any) {
        const loanTermInMonths = event.target.value;
        this.setState({
            loanTermInMonths,
            loanTermInYears: LoanTerm.convertMonthsIntoYears(loanTermInMonths)
        });

        if (this.props.onChange !== undefined) {
            this.props.onChange(loanTermInMonths)
        }
    }

    private handleTermInYearsChange(event: any) {
        const loanTermInMonths = LoanTerm.convertYearsIntoMonths(event.target.value);

        this.setState({
            loanTermInMonths,
            loanTermInYears: event.target.value
        });

        if (this.props.onChange !== undefined) {
            this.props.onChange(loanTermInMonths)
        }
    }
}

interface IProps {
    colBegin: string;
    colEnd: string;
    loanTermInMonths?: number;
    onChange?: (loanTermInMonths?: number) => void;
}

interface IState {
    loanTermInMonths?: number;
    loanTermInYears?: number;
}
