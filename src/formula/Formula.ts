const kinds = ['num', 'op', 'paren'] as const

type Kind = typeof kinds[number]

type FormulaItemBase<K extends Kind> = {
  kind: K
}

type NumElement = number | '.' | '-'

type Num = FormulaItemBase<'num'> & {
  elements: NumElement[]
}

type OpType = '+' | '-' | '*' | '/'

type Op = FormulaItemBase<'op'> & {
  op: OpType
}

type ParenType = '(' | ')'

type Paren = FormulaItemBase<'paren'> & {
  type: ParenType
}

type FormulaItem = Num | Op | Paren

/**
 * Formula class.
 */
export class Formula {
  private items: FormulaItem[] = []

  pushNum(value: number): void {
    const last = this.lastItem()

    if (last && last.kind === 'num') {
      const lastEl = last.elements[last.elements.length - 1]

      if (last.elements.length === 1 && (lastEl === 0 || lastEl === '-')) {
        if (value === 0) {
          return
        } else {
          if (lastEl === 0) {
            last.elements.shift()
          }

          last.elements.push(value)

          return
        }
      }

      last.elements.push(value)
    } else {
      this.items.push({
        kind: 'num',
        elements: [value],
      })
    }
  }

  pushNumDot(): void {
    const last = this.lastItem()

    if (
      last &&
      last.kind === 'num' &&
      !last.elements.includes('.') &&
      last.elements.length > 0
    ) {
      last.elements.push('.')
    }
  }

  pushNumMinus(): void {
    const last = this.lastItem()

    if (last?.kind === 'num') {
      if (last.elements[0] === 0) {
        last.elements[0] = '-'
        last.elements.push(0)
      } else if (last.elements[0] === '-') {
        return
      } else {
        last.elements.unshift('-')
      }
    } else {
      this.items.push({
        kind: 'num',
        elements: ['-'],
      })
    }
  }

  pushOp(op: OpType): void {
    const last = this.lastItem()

    if (last && last.kind !== 'op') {
      this.items.push({
        kind: 'op',
        op,
      })
    }
  }

  pushParen(): void {
    const last = this.lastItem()

    if (last?.kind === 'num') {
      this.items.push({
        kind: 'paren',
        type: ')',
      })
    } else {
      this.items.push({
        kind: 'paren',
        type: '(',
      })
    }
  }

  toString(): string {
    const items: string[] = []

    for (const item of this.items) {
      if (item.kind === 'num') {
        items.push(item.elements.join(''))
      } else if (item.kind === 'op') {
        items.push(item.op)
      } else if (item.kind === 'paren') {
        items.push(item.type)
      }
    }

    return items.join(' ')
  }

  private lastItem() {
    return this.items[this.items.length - 1]
  }
}
