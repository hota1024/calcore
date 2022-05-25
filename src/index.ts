import { Formula } from './formula/Formula'

const formula = new Formula()

formula.pushNum(3)
formula.pushOp('*')
formula.pushParen()
formula.pushNum(4)
formula.pushOp('+')
formula.pushNum(1)
formula.pushParen()

console.log(formula['items'])

console.log(formula.toString())
