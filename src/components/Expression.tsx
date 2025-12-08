import React, { FC, useState } from "react";
import { parse, MathNode, isOperatorNode, isConstantNode, isSymbolNode, isParenthesisNode } from "mathjs";

interface ExpressionProps {
  expression: string;
  onAnswerChange: (answer: number | null) => void;
}

const Expression: FC<ExpressionProps> = ({ expression, onAnswerChange }) => {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const node = parse(expression);

  const onSubAnswerChange = (subExpression: string, answer: number | null) => {
    answers[subExpression] = answer;
    setAnswers({ ...answers });
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
                type="number"
                className="intermediary-answer"
                style={{
                  width: '4em',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginBottom: '0.25em'
                }}
                value={subAnswer ?? ""}
                onChange={(e) => onSubAnswerChange(subExpression, e.target.valueAsNumber)}
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


  return <div className="expression">{renderNode(node, true)}</div>;
};

export default Expression;
