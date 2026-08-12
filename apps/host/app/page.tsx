import Counter from './counter';
import HostSsrComponent from './host-ssr-component';
import { RemoteCounter, RemoteWidget } from './remote-component';
import './host.css';
// @ts-expect-error Module Federation provides this opt-in island component.
import RemoteIsland from 'island/Counter?mf-island';

export default function Home() {
  return (
    <main className="cards">
      <section className="card host-card">
        <h1>Vinext host</h1>
        <Counter />
      </section>
      <HostSsrComponent />
      <RemoteWidget />
      <RemoteCounter />
      <RemoteIsland />
    </main>
  );
}
