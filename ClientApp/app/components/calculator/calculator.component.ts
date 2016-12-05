import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service'

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
	private errorString: string = 'ERR';
	private defaultFormula: string = ' ';

	private _displayText: string;
	private _formula: string;
	private _operation: string;
	private _displayOperation: string;
	private _lastValue: number;
	private _hasDecimal: boolean;
	private _clearOnInput: boolean;

	constructor(private calcService: CalculatorService) {
		this.reset();
	}

	public get displayText(): string {
		return this._displayText;
	}

	public get formula(): string {
		return this._formula;
	}

	public zero() {
		this.input('0');
	}

	public one() {
		this.input('1');
	}

	public two() {
		this.input('2');
	}

	public three() {
		this.input('3');
	}

	public four() {
		this.input('4');
	}

	public five() {
		this.input('5');
	}

	public six() {
		this.input('6');
	}

	public seven() {
		this.input('7');
	}

	public eight() {
		this.input('8');
	}

	public nine() {
		this.input('9');
	}

	public decimal() {
		if (this._hasDecimal) {
			return;
		}

		this._hasDecimal = true;

		if (this._clearOnInput ||
			this._displayText == null) {
			this.input('0.');
		}
		else {
			this.input('.');
		}
	}

	public add() {
		this.operate('Add', '+');
	}

	public subtract() {
		this.operate('Subtract', '-');
	}

	public divide() {
		this.operate('Divide', '/');
	}

	public multiply() {
		this.operate('Multiply', '*');
	}

	public delete() {
		if (this._displayText == null) {
			return;
		}

		if (this._clearOnInput) {
			this._displayText = null;
			this._formula = this.defaultFormula;
			this._clearOnInput = false;
		}
		else if (this._displayText.length === 1 ||
				 this._displayText === '0.') {
			this._displayText = null;
		}
		else {
			this._displayText = this._displayText.substring(0, this._displayText.length - 1);
		}
	}

    public equals() {
		if (this._lastValue == null ||
			this._operation == null) {
			return;
		}

		let currentValue = this.getCurrentValue();

        let result = this.calcService
			.calculate(
				this._operation,
				this._lastValue,
				currentValue)
			.subscribe(
				result => {
					let formula = `${this._lastValue} ${this._displayOperation} ${currentValue} =`;

					this.reset();

					this._displayText = result.result.toString();
					this._formula = formula;
					this._clearOnInput = true;
				},
				err => {
					// Log errors if any
					console.log(err);

					this.reset();
					this._displayText = this.errorString;
					this._clearOnInput = true;
				});
    }

	public reset() {
		this._displayText = null;
		this._formula = this.defaultFormula;
		this._operation = null;
		this._displayOperation = null;
		this._lastValue = null;
		this._hasDecimal = false;
		this._clearOnInput = false;
	}

	private input(value: string) {
		if (this._clearOnInput) {
			this._displayText = value;
			this._formula = this.defaultFormula;
			this._clearOnInput = false;
		}
		else if (this._displayText == null) {
			this._displayText = value;
		}
		else {
			this._displayText = this._displayText + value;
		}
	}

	private operate(operation: string, displayOperation: string) {
		if (this._displayText === this.errorString) {
			return;
		}

		let currentValue = this.getCurrentValue();

		this.reset();

		this._lastValue = currentValue;
		this._operation = operation;
		this._displayOperation = displayOperation;
		this._formula = `${this._lastValue} ${this._displayOperation}`;
	}

	private getCurrentValue(): number {
		let currentValue = 0;
		let displayText = this._displayText;

		if (displayText != null) {
			currentValue = Number(displayText)
		}

		return currentValue;
	}

}
