"use client";

import { useEffect } from "react";

const Qty = require("js-quantities");

const c = 299792458;

export default function Percent() {
  useEffect(() => {
    const inputElement = document.getElementById("input") as HTMLInputElement;
    const resultElement = document.getElementById("result") as HTMLSpanElement;

    var valid = true;
    var vel = Qty.parse(inputElement ? inputElement.value + "m/s" : "0 m/s");

    if (!vel) {
      valid = false;
    } else if (vel.kind() != "speed") {
      valid = false;
    }

    if (valid) {
      vel = vel.to("m/s"); // To meters per second

      var y = 1 / Math.sqrt(1 - (parseFloat(vel.toString()) / c) ** 2);

      resultElement.innerHTML = `<code>${(
        (parseFloat(vel.toString()) / c) *
        100
      ).toFixed(2)}%</code> Speed of Light (<code>${vel.toString()}</code>)<br>
      Relativistic Gamma: <code>${y}</code>`;
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="input">Percentage of lightspeed: </label>
        <input
          type="range"
          name="percent"
          id="input"
          min={"29979"}
          max={"299762478"}
          defaultValue={"29979"}
          autoComplete="off"
          placeholder="Type here..."
          className="outline-none p-1 ps-2 pe-2 rounded hover:bg-gray-200 focus:bg-gray-100 transition-colors text-black"
          onInput={() => {
            const inputElement = document.getElementById(
              "input"
            ) as HTMLInputElement;
            const resultElement = document.getElementById(
              "result"
            ) as HTMLSpanElement;

            var valid = true;
            var vel = Qty.parse(
              inputElement ? inputElement.value + "m/s" : "0 m/s"
            );

            if (!vel) {
              valid = false;
            } else if (vel.kind() != "speed") {
              valid = false;
            }

            if (valid) {
              vel = vel.to("m/s"); // To meters per second

              var y = 1 / Math.sqrt(1 - (parseFloat(vel.toString()) / c) ** 2);

              resultElement.innerHTML = `<code>${(
                (parseFloat(vel.toString()) / c) *
                100
              ).toFixed(
                2
              )}%</code> Speed of Light (<code>${vel.toString()}</code>)<br>
              Relativistic Gamma: <code>${y}</code>`;
            }
          }}
        />
      </div>
      <span id="result"></span>
    </div>
  );
}
