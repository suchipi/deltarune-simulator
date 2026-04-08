export function assertNever(input: never): never {
  throw new Error(`Expected unreachable code, but received: ${input}`);
}
