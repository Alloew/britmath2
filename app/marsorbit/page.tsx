// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import p5 from "p5";

export default function MarsOrbit() {
  useEffect(() => {
    var sketch = new p5((p) => {
      var lastEarthX = -1;
      var lastEarthY = -1;
      var lastMarsX = -1;
      var lastMarsY = -1;

      var earthRotation = 0;
      var marsRotation = 0;
      const earthr = 150000000;
      const marsr = 228000000;
      var frames = 0;
      var totalSpeed = 0;
      var done = false;

      var average, averageMs;

      var img;

      var w = Math.min(
        document.documentElement.clientWidth * 0.9,
        document.documentElement.clientWidth - 50
      );
      var h = Math.min(
        document.documentElement.clientHeight * 0.9,
        document.documentElement.clientHeight - 75
      );

      p.preload = () => {
        img = p.loadImage("e.png");
      };

      p.setup = () => {
        p.createCanvas(w - 1, h - 4);
      };

      p.draw = () => {
        w = Math.min(
          document.documentElement.clientWidth * 0.9,
          document.documentElement.clientWidth - 50
        );
        h = Math.min(
          document.documentElement.clientHeight * 0.9,
          document.documentElement.clientHeight - 75
        );
        p.resizeCanvas(w, h);
        // One second = one hour
        var scale = (marsr * 2) / Math.min(h - 100, w - 100);

        earthRotation += ((360 / 365.256) * p.PI) / 180;
        marsRotation += ((360 / 686.98) * p.PI) / 180;

        p.background(20);

        p.stroke("white");
        p.noFill();
        p.ellipse(w / 2, h / 2, (earthr * 2) / scale);
        p.ellipse(w / 2, h / 2, (marsr * 2) / scale);

        p.noStroke();
        p.fill("yellow");
        p.ellipse(w / 2, h / 2, 24);

        var earthX = w / 2 + (Math.cos(earthRotation) * earthr) / scale;
        var earthY = h / 2 + (Math.sin(earthRotation) * earthr) / scale;

        p.fill(0, 0, 255);
        p.ellipse(earthX, earthY, 16);

        var marsX = w / 2 + (Math.cos(marsRotation) * (marsr + 417)) / scale;
        var marsY = h / 2 + (Math.sin(marsRotation) * (marsr + 417)) / scale;

        p.fill(255, 0, 0);
        p.ellipse(marsX, marsY, 16);

        p.stroke(0, 0, 255);
        p.line(earthX, earthY, marsX, marsY);

        var diff = Math.sqrt(
          (Math.abs(lastEarthX * scale - earthX * scale) -
            Math.abs(lastMarsX * scale - marsX * scale)) **
            2 +
            (Math.abs(lastEarthY * scale - earthY * scale) -
              Math.abs(lastMarsY * scale - marsY * scale)) **
              2
        );

        p.fill(255);
        p.noStroke();

        lastEarthX = earthX;
        lastEarthY = earthY;
        lastMarsX = marsX;
        lastMarsY = marsY;

        if (
          earthRotation <= ((360 * p.PI) / 180) * 6 &&
          marsRotation <= ((360 * p.PI) / 180) * 6
        ) {
          frames++;
          totalSpeed += diff;
          // console.log(frames);
        } else if (!done) {
          average = totalSpeed / frames;
          averageMs = (average * 1000) / 60;
          console.log(average);
          console.log(`${averageMs}m/s`);
          alert(`Average Velocity: ${averageMs}m/s`);
          done = true;
        }
      };

      // window.addEventListener("resize", () => {
      //   w = Math.min(document.documentElement.clientWidth * 0.9, document.documentElement.clientWidth - 50);
      //   h = Math.min(document.documentElement.clientHeight * 0.9, document.documentElement.clientHeight - 75);
      //   p.resizeCanvas(w, h);
      // });
    });
  }, []);

  return (
    <>
      <main></main>
    </>
  );
}
