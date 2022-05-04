// inverse of predicate
// in set of prediate
// binary predicate?
// case sensitivity?

// export interface Predicate<Tv> {
//   readonly value: Tv;
//   call(Tv): boolean;
//   type:
//     | Equal<Tv>['type']
//     | NotEqual<Tv>['type']
//     | LessThan<Tv>['type']
//     | GreaterThan<Tv>['type']
//     | LessThanOrEqual<Tv>['type']
//     | GreaterThanOrEqual<Tv>['type']
//     | In<Tv>['type']
//     | NotIn<Tv>['type'];
// }

export type Predicate<Tv> =
  | Equal<Tv>
  | NotEqual<Tv>
  | LessThan<Tv>
  | GreaterThan<Tv>
  | LessThanOrEqual<Tv>
  | GreaterThanOrEqual<Tv>
  | In<Tv>
  | NotIn<Tv>;

export class Equal<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "equal";

  call(what: Tv): boolean {
    return what === this.value;
  }

  invert(): NotEqual<Tv> {
    return new NotEqual(this.value);
  }
}

export class NotEqual<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "notEqual";

  call(what: Tv): boolean {
    return what !== this.value;
  }

  invert(): Equal<Tv> {
    return new Equal(this.value);
  }
}

export class LessThan<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "lessThan";

  call(what: Tv): boolean {
    return what < this.value;
  }

  invert(): GreaterThan<Tv> {
    return new GreaterThan(this.value);
  }
}

export class GreaterThan<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "greaterThan";

  call(what: Tv): boolean {
    return what > this.value;
  }

  invert(): LessThan<Tv> {
    return new LessThan(this.value);
  }
}

export class LessThanOrEqual<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "lessThanOrEqual";

  call(what: Tv): boolean {
    return what <= this.value;
  }

  invert(): GreaterThanOrEqual<Tv> {
    return new GreaterThanOrEqual(this.value);
  }
}

export class GreaterThanOrEqual<Tv> {
  constructor(public readonly value: Tv) {}
  readonly type = "greaterThanOrEqual";

  call(what: Tv): boolean {
    return what >= this.value;
  }

  invert(): LessThanOrEqual<Tv> {
    return new LessThanOrEqual(this.value);
  }
}

export class In<Tv> {
  constructor(public readonly value: Set<Tv>) {}
  readonly type = "in";

  call(what: Tv): boolean {
    return this.value.has(what);
  }

  invert(): NotIn<Tv> {
    return new NotIn(this.value);
  }
}

export class NotIn<Tv> {
  constructor(public readonly value: Set<Tv>) {}
  readonly type = "notIn";

  call(what: Tv): boolean {
    return !this.value.has(what);
  }

  invert(): In<Tv> {
    return new In(this.value);
  }
}

const P = {
  equals<Tv>(value: Tv) {
    return new Equal(value);
  },

  notEqual<Tv>(value: Tv) {
    return new NotEqual(value);
  },

  lessThan<Tv>(value: Tv) {
    return new LessThan(value);
  },

  greaterThan<Tv>(value: Tv) {
    return new GreaterThan(value);
  },

  lessThanOrEqual<Tv>(value: Tv) {
    return new LessThanOrEqual(value);
  },

  greaterThanOrEqual<Tv>(value: Tv) {
    return new GreaterThanOrEqual(value);
  },

  in<Tv>(value: Set<Tv>) {
    return new In(value);
  },

  notIn<Tv>(value: Set<Tv>) {
    return new NotIn(value);
  },
};

export default P;
