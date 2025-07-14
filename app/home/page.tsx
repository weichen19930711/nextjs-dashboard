"use client";

import DragElement from "./drag-element";
// import * as Slot from '@radix-ui/react-slot';
import * as React from "react";
// import { Tooltip } from './tooltips';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  formAction?: any;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export interface HTMLProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  formAction?: any;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

// const SlotTest = React.forwardRef<HTMLButtonElement, HTMLProps>(
//   ({ asChild, children, leftElement, rightElement, ...props }, ref) => {
//     const Comp = asChild ? Slot.Root : 'button';
//     return (
//       <Comp ref={ref} {...props}>
//         <div>{leftElement}</div>
//         {/* {children} */}
//         <Slot.Slottable>{children}</Slot.Slottable>
//         <div>{rightElement}</div>
//       </Comp>
//     );
//   },
// );
// const Home: React.FC<{}> = () => {
//   const leftElement = <div>left</div>;
//   const rightElement = <div>right</div>;
//   return (
//     <>
//       <SlotTest
//         asChild
//         leftElement={leftElement}
//         rightElement={rightElement}
//         style={{ color: 'red' }}
//       >
//         <a href="#aa">ccc</a>
//       </SlotTest>
//       {/* <DragElement>
//         <div>aaaa</div>
//       </DragElement> */}
//     </>
//   );
// };

const HomeDraggable: React.FC<{}> = () => {
  return <DragElement />;
};
// const TooltipTest: React.FC<{}> = () => {
//   return (
//     <Tooltip content={'1111'}>
//       <button>cc</button>
//     </Tooltip>
//   );
// };

interface Props {
  foo: string;
}
class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>;
  }
}
{
  /* <MyComponent foo="bar" />; // ok */
}
{
  /* <MyComponent foo={0} />; // error */
}

function MyComponentParent() {
  return <MyComponent foo="bar" />;
}
export default MyComponentParent;
