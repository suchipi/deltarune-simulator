export function typedEntries<Obj extends {}>(
  obj: Obj,
): Array<
  [
    keyof Obj,
    // TODO: Unnecessarily removes real 'undefined' value type, but is otherwise
    // necessary to work around TS strict property presence checking
    Exclude<Obj[keyof Obj], undefined>,
  ]
> {
  return Object.entries(obj) as Array<
    [keyof Obj, Exclude<Obj[keyof Obj], undefined>]
  >;
}

export function typedKeys<Obj extends {}>(obj: Obj): Array<keyof Obj> {
  return Object.keys(obj) as Array<keyof Obj>;
}

export function typedValues<Obj extends {}>(obj: Obj): Array<Obj[keyof Obj]> {
  return Object.values(obj);
}
