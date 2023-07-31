"use client";
import { useState } from "react";
const Qty = require("js-quantities");

const c = 299792458;

export default function Home() {
  var [textColor, setTextColor] = useState("black");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="input">Relative Speed: </label>
        <input
          type="text"
          name="gamma"
          id="input"
          autoComplete="off"
          placeholder="Type here..."
          className="outline-none p-1 ps-2 pe-2 rounded hover:bg-gray-200 focus:bg-gray-100 transition-colors"
          style={{ color: textColor }}
          onInput={() => {
            const inputElement = document.getElementById(
              "input"
            ) as HTMLInputElement;
            const resultElement = document.getElementById(
              "result"
            ) as HTMLSpanElement;

            var valid = true;
            var vel = Qty.parse(inputElement ? inputElement.value : "0");

            if (!vel) {
              valid = false;
            } else if (vel.kind() != "speed") {
              valid = false;
            }

            if (valid) {
              vel = vel.to("m/s"); // To meters per second

              var y = 1 / Math.sqrt(1 - (parseFloat(vel.toString()) / c) ** 2);

              resultElement.innerText = `Relativistic Gamma: ${y}`;
              setTextColor("#1cb300");
            } else {
              setTextColor("red");
            }
          }}
        />
      </div>
      <span id="result"></span>
    </div>
  );
}
