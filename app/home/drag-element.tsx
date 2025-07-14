import { useDraggable } from "@/hooks/useDraggable";
import { useEffect } from "react";

const DragElementWrap: React.FC<{}> = () => {
  const { onDraggable, offDraggable, dragRef, targetRef } = useDraggable<
    HTMLDivElement,
    HTMLDivElement
  >();
  useEffect(() => {
    onDraggable();
    return () => {
      offDraggable();
    };
  }, []);
  return (
    <div className="h-full w-full">
      <div
        ref={targetRef}
        className="w-[400] h-[400] relative z-[1000] bg-white"
        style={{ boxShadow: "0px 0px 7px 0px red", margin: "auto" }}
      >
        <div ref={dragRef} style={{ height: "200px", cursor: "move" }}>
          drag
        </div>

        <div>
          <div className="md:max-xl:flex">内容</div>
          <div className="md:max-lg:flex [background-color:red]">内容</div>
          <ul>
            <li className="lg:[&:nth-child(3)]:hover:underline">0</li>
            <li className="lg:[&:nth-child(3)]:hover:underline">1</li>
            <li className="lg:[&:nth-child(3)]:hover:underline">2</li>
            <li className="lg:[&:nth-child(3)]:hover:underline">3</li>
          </ul>
        </div>
      </div>
      {/* <div className="draggable w-[400] h-[400]  bg-black"></div> */}
    </div>
  );
};

export default DragElementWrap;
