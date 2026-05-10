import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">🎙️ {siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">

          <div className="col col--4">
            <div className="text--center padding-horiz--md padding-vert--md">
              <h3>🚀 Quick to Integrate</h3>
              <p>Start capturing clinical conversations in minutes with a single API call.</p>
            </div>
          </div>

          <div className="col col--4">
            <div className="text--center padding-horiz--md padding-vert--md">
              <h3>⚡ Async Processing</h3>
              <p>Non-blocking — start a session and get notified via webhook when notes are ready.</p>
            </div>
          </div>

          <div className="col col--4">
            <div className="text--center padding-horiz--md padding-vert--md">
              <h3>📄 Structured Notes</h3>
              <p>AI automatically turns doctor-patient conversations into clean clinical notes.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Clean and structured developer documentation for ambient session APIs">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}