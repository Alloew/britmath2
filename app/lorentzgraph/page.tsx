// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import Chart from "chart.js";

export default function LorentzGraph() {
  useEffect(() => {
    var x = [],
      y = [];
    const c = 299792458;
    const samples = 500;

    for (var i = 0; i < samples; i++) {
      var gamma = 1 / Math.sqrt(1 - ((i * c) / samples / c) ** 2);

      x.push((i * c) / samples);
      y.push(gamma);
    }

    var layout = {
      title: "Lorentz Factor",
      xaxis: {
        title: "Speed (m/s)",
      },
      yaxis: {
        title: "Relativity Gamma",
      },
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const chart = new Chart(document.getElementById("graph"), {
      type: "line",
      data: {
        labels: x,
        datasets: [
          {
            label: "Lorentz Factor",
            data: y,
            fill: false,
            borderColor: "white",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              callback: (val, i, ticks) => {
                return val + " m/s";
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <>
      <canvas id="graph"></canvas>
    </>
  );
}
