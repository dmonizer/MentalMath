import React, { FC, useEffect } from "react";
import { parse, MathNode, isOperatorNode, isConstantNode, isSymbolNode, isParenthesisNode } from "mathjs";

interface ExpressionProps {
  expression: string;
  answers: Record<string, number | null>;
  onAnswerChange: (subExpression: string, answer: number | null) => void;
  onFocus: (subExpression: string) => void;
  activeInput: string | null;
}

const Expression: FC<ExpressionProps> = ({ expression, answers, onAnswerChange, onFocus, activeInput }) => {

  useEffect(() => {
    if (activeInput && activeInput !== 'final') {
      setTimeout(() => {
        (document.querySelector(`[data-sub-expression="${activeInput}"]`) as HTMLInputElement)?.focus()
      }, 0);
    }
  }, [activeInput]);

  const node = parse(expression);

  const isSubExpressionCorrect = (subExpression: string, answer: number | null): boolean => {
    if (answer === null) {
      return false;
    }
    try {
      return parse(subExpression).evaluate() === answer;
    } catch {
      return false;
    }
  };

  const onSubAnswerChange = (subExpression: string, answer: number | null) => {
    onAnswerChange(subExpression, answer);
    const isCorrect = isSubExpressionCorrect(subExpression, answer);
    console.log(`Sub-expression ${subExpression} is ${isCorrect ? 'correct' : 'incorrect'}`);
  };

  const renderNode = (node: MathNode, isRoot = false): JSX.Element => {
    if (isConstantNode(node)) {
      return <span>{node.value}</span>;
    }

    if (isSymbolNode(node)) {
        return <span>{node.name}</span>;
      }

    if (isParenthesisNode(node)) {
        return (
            <span className="parenthesis-node" style={{ display: 'inline-flex', alignItems: 'center' }}>
                ({renderNode(node.content)})
            </span>
        )
    }

    if (isOperatorNode(node)) {
        const subExpression = node.toString();
        const subAnswer = answers[subExpression];

        return (
            <span className="expression-node" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.25em' }}>
              {!isRoot && <input
                type="text"
                inputMode="numeric"
                className="intermediary-answer"
                style={{
                  width: '3em',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginBottom: '0.25em'
                }}
                value={subAnswer ?? ""}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  const num = parseInt(value, 10);
                  onSubAnswerChange(subExpression, isNaN(num) ? null : num);
                }}
                onFocus={() => onFocus(subExpression)}
                data-sub-expression={subExpression}
              />}
              <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                {node.args.map((arg, i) => (
                  <React.Fragment key={i}>
                    {renderNode(arg)}
                    {i < node.args.length - 1 && <span style={{ margin: '0 0.5em' }}>{node.op}</span>}
                  </React.Fragment>
                ))}
              </span>
            </span>
          );
    }

    return <span>{node.toString()}</span>;
  };

  return <div className="expression">{renderNode(node, true)}</div>;
};

export default Expression;
