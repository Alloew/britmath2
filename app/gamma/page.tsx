"use client";
const Qty = require("js-quantities");

const c = 299792458;

export default function Gamma() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="input">Relativity Gamma: </label>
        <input
          type="number"
          pattern="[0-9,.]*"
          name="gamma"
          id="input"
          min={"1"}
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

            if (parseFloat(inputElement.value)) {
              var v2 = c ** 2 - (c / parseFloat(inputElement.value)) ** 2;
              var v = Math.sqrt(v2);

              var vel = Qty(v, "m/s");
              resultElement.innerText = `${parseFloat(
                vel.to("m/s")
              ).toLocaleString()} ${"m/s"}
            ${parseFloat(vel.to("mph")).toLocaleString()} ${"mph"}
            ${parseFloat(vel.to("kph")).toLocaleString()} ${"kph"}
            ${parseFloat(vel.to("mi/s")).toLocaleString()} ${"mi/s"}
            ${parseFloat(vel.to("km/s")).toLocaleString()} ${"km/s"}`;
            }
          }}
        />
      </div>
      <span id="result"></span>
    </div>
  );
}
