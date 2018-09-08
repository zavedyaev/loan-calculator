import * as React from 'react';
import Form from "./Form";
import './LoanCalculator.css';


class LoanCalculator extends React.Component {
    public render() {
        return (
            <div className="LoanCalculator">

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <header className="App-header">
                                <h1 className="App-title">Welcome to Loan Calculator</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Form/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LoanCalculator;
