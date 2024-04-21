import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./sortable-ingredient.module.css";
import { IIngredientWithUID } from "../../utils/types";
import {
  deleteIngredient,
  changeIndexes,
} from "../../services/actions/burger-constructor";
import { useAppDispatch } from "../../hooks/redux";

function SortableIngredient({ cardData, index }: {cardData: IIngredientWithUID, index: number}) {
  const dispatch = useAppDispatch();
  const deleteElement = (uniqueId: string) => {
    dispatch(deleteIngredient(uniqueId));
  };
  const moveItem = (from: number, to: number) => {
    dispatch(changeIndexes(from, to));
  };
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "topping",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.itemCurrentIndex;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      // Time to actually perform the action
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.itemCurrentIndex = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "topping",
    item: () => {
      return { itemCurrentIndex: index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div ref={ref} className={styles.item}>
      <DragIcon type={"primary"} />
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
        handleClose={() => deleteElement(cardData.uniqueId)}
      />
    </div>
  );
}

export default SortableIngredient;