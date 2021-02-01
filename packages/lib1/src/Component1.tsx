export const doSomething = (): void => {
  // do something
};

export class Something {}

export const doSomething2 = (): void => {
  // do something
};

export const Component1 = (props: {}): React.ReactElement => {
  doSomething();
  return (
    <div>Component1</div>
  );
}