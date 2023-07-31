// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import p5 from "p5";

export default function ISSOrbit() {
  useEffect(() => {
    var sketch = new p5((p) => {
      var lastPX = -1;
      var lastPY = -1;
      var lastIssX = -1;
      var lastIssY = -1;

      var earthRotation = 0;
      var issRotation = 0;
      const r = 6371;
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
        var scale = (r * 2) / Math.min(h - 100, w - 100);

        earthRotation += ((360 / (60 * 24)) * p.PI) / 180;
        issRotation += ((360 / 92.9) * p.PI) / 180; // 92.9 minute orbital period

        p.background(20);
        p.noStroke();

        p.fill(55);
        p.ellipse(w / 2, h / 2, (r * 2) / scale);
        p.imageMode(p.CENTER);
        p.translate(w / 2, h / 2);
        p.rotate(earthRotation);
        p.image(img, 0, 0, (r * 2) / scale, (r * 2) / scale);
        p.rotate(-earthRotation);
        p.translate(-w / 2, -h / 2);

        var pX = w / 2 + (Math.cos(earthRotation) * r) / scale;
        var pY = h / 2 + (Math.sin(earthRotation) * r) / scale;

        p.fill(255, 0, 0);
        p.ellipse(pX, pY, 12);

        var issX = w / 2 + (Math.cos(issRotation) * (r + 417)) / scale;
        var issY = h / 2 + (Math.sin(issRotation) * (r + 417)) / scale;

        p.fill(0, 255, 0);
        p.ellipse(issX, issY, 12);

        p.stroke(0, 0, 255);
        p.line(pX, pY, issX, issY);

        var diff = Math.sqrt(
          (Math.abs(lastPX * scale - pX * scale) -
            Math.abs(lastIssX * scale - issX * scale)) **
            2 +
            (Math.abs(lastPY * scale - pY * scale) -
              Math.abs(lastIssY * scale - issY * scale)) **
              2
        );

        p.fill(255);
        p.noStroke();

        lastPX = pX;
        lastPY = pY;
        lastIssX = issX;
        lastIssY = issY;

        if (earthRotation <= (360 * p.PI) / 180) {
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
