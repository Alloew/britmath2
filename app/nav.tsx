export default function Nav() {
  return (
    <nav className="sticky top-0 left-0 backdrop-blur backdrop-brightness-75 p-1 flex flex-wrap gap-3 uppercase ps-3">
      <a href="/">Speed</a>
      <a href="/gamma">Gamma</a>
      <a href="/percent">Percent Lightspeed</a>
      <a href="/lorentzgraph">Lorentz Factor Graph</a>
      <a href="/issorbit">ISS</a>
      <a href="/marsorbit">Mars</a>
    </nav>
  );
}
