"use client";
export default function TodoItem(props) {
  return (
    <>
      <div className="flex flex-ro mt-1 items-center px-2 py-1 rounded-lg">
        <div className="ml-3">
          <div
            className={
              props.todoItem?.completed
                ? "line-through text-gray-700 w-52 text-md capitalize"
                : "w-52 text-md capitalize"
            }
          >
            {props.todoItem?.task == "" ? "Empty Task" : props.todoItem?.task}
            <div className="text-xs text-gray-400">
              {(props.todoItem?.deadline &&
                `${new Date(
                  props.todoItem.deadline
                ).toLocaleDateString()} ${new Date(
                  props.todoItem.deadline
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}`) ||
                "No deadline"}
            </div>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        className="checkbox checkbox-warning ml-3 checkbox-sm"
        onClick={() => {
          props.handleCompleted(props.todoItem.id);
        }}
      />
      <button
        className="text-red-700 items-center ml-4"
        onClick={() => {
          props.handleDelete(props.todoItem.id);
        }}
      >
        delete
      </button>
    </>
  );
}
