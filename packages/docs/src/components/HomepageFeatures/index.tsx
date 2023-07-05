/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Graphql using Apollo',
    Svg: require('@site/static/img/apollo.svg').default,
    description: <>Run Apollo server to host manage and resolve the Graphql Queries and Mutations</>,
  },
  {
    title: 'Typescript support',
    Svg: require('@site/static/img/ts.svg').default,
    description: <>Using Typescript for type checking and hints</>,
  },
  {
    title: 'Integration with external service',
    Svg: require('@site/static/img/api.svg').default,
    description: <>Integrated with a mock server to store the todos</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
