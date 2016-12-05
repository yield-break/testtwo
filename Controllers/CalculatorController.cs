using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Testtwo.Controllers
{
    public class CalculatorController
    {
        private readonly ICalculator _calculator;

        public CalculatorController()
        {
            // TODO: Dependency injection.
            _calculator = new Calculator();
        }

        public CalculationResponse Calculate(CalculatorOperation operation, double first, double second)
        {
            var result = _calculator.Calculate(operation, first, second);
            return new CalculationResponse { Result = result };
        }
    }

    public class CalculationResponse
    {
        public double Result { get; set; }
    }

    public interface ICalculator
    {
        double Calculate(CalculatorOperation operation, double first, double second);
        double Add(double first, double second);
        double Subtract(double first, double second);
        double Multiply(double first, double second);
        double Divide(double first, double second);
    }

    public class Calculator : ICalculator
    {
        public double Calculate(CalculatorOperation operation, double first, double second)
        {
            switch (operation)
            {
                case CalculatorOperation.Add:
                    return Add(first, second);
                case CalculatorOperation.Subtract:
                    return Subtract(first, second);
                case CalculatorOperation.Multiply:
                    return Multiply(first, second);
                case CalculatorOperation.Divide:
                    return Divide(first, second);
                default:
                    throw new ArgumentOutOfRangeException(nameof(operation));
            }
        }

        public double Add(double first, double second)
        {
            return first + second;
        }

        public double Subtract(double first, double second)
        {
            return first - second;
        }

        public double Multiply(double first, double second)
        {
            return first * second;
        }

        public double Divide(double first, double second)
        {
            // Just allow divide by zero exception.
            return first / second;
        }
    }

    public enum CalculatorOperation
    {
        Add,
        Subtract,
        Multiply,
        Divide
    }
}
