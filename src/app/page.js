"use client";
import { useState, useEffect, Suspense } from "react";
import CurrentDate from "@/component/CurrentDate";
import TodoItem from "@/component/ToDoItem";
import Image from "next/image";
import * as chrono from "chrono-node";
import { removeStopwords } from "stopword";

const stopWords = [
  "by",
  "BY",
  "By",
  "The",
  "the",
  "THE",
  "a",
  "A",
  "from",
  "From",
  "FROM",
  "at",
  "AT",
  "At",
  "in",
  "IN",
  "In",
  "for",
  "For",
  "FOR",
  "to",
  "To",
  "TO",
  "I",
  "i",
  "want",
  "Want",
  "WANT",
];

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");

  const ISSERVER = typeof window === "undefined";

  let [todos, setTodos] = useState(
    !ISSERVER && localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    const referenceDate = new Date();
    const parsedResults = chrono.parse(input, referenceDate, {
      forwardDate: true,
    });

    const oldTaskStrings = input.slice(0, parsedResults[0]?.index).split(" ");

    const newTaskString = removeStopwords(oldTaskStrings, stopWords);

    const taskString = newTaskString.join(" ");

    const todoItem = {
      id: Date.now(),
      deadline: parsedResults[0]?.start.date(),
      task: taskString,
      completed: false,
    };
    setTodos([...todos, todoItem]);
    localStorage.setItem("todos", JSON.stringify([...todos, todoItem]));
    setInput("");
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id != id))
    );
  };

  const handleCompleted = (id) => {
    let todosCopy = [...todos];
    for (let i = 0; i < todosCopy.length; i++) {
      if (todosCopy[i].id == id) {
        todosCopy[i].completed = !todosCopy[i].completed;
      }
    }
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
  };

  if (!hydrated) return null;

  return (
    <>
      <main className="flex h-screen flex-col items-center sm:flex-row justify-around">
        <div className="mx-auto font-inter">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
            <div className="pr-8 font-bold absolute left-12 top-6 z-50 font-inter text-gray-600">
                 Made with
              </div>
              <Image
                src="/vercel.svg"
                alt="Abstract Image"
                width={500}
                height={500}
                className="z-40 h-56 w-80 rounded-xl shadow-md blur-xs"
              />
               <div className="pr-8 absolute right-12 top-36 z-50 font-inter text-gray-700">
                  <CurrentDate/>
              </div>
            </figure>
            <div className="card-body">
              <form className="flex flex-row">
                <input
                  type="text"
                  // placeholder="example - Meeting at 9am on thursday"
                  placeholder={input ? "" : "example - Meeting at 9am on Thursday"}
                  className="input input-bordered w-3/4 input-md font-montserrat ml-3"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onKeyUp={handleKeyUp}
                  value={input}
                  autoFocus={true}
                  id="text"
                />
                <button
                  className="btn btn-primary btn-md font-montserrat ml-3 py-2"
                  onClick={handleSubmit}
                >
                  +
                </button>
              </form>
              <section className="overflow-y-auto h-56">
                {todos.length > 0 ? (
                  todos.map((todoItem, index) => (
                    <div
                      className="flex flex-row justify-between items-center rounded-lg border mt-3 border-gray-700 p-3"
                      key={index}
                    >
                      <TodoItem
                        key={index}
                        todoItem={todoItem}
                        handleCompleted={handleCompleted}
                        handleDelete={handleDelete}
                      />
                    </div>
                  ))
                ) : (
                  <div className="font-montserrat text-gray-600 text-center pt-4">
                    don`t you got anything to done?
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
