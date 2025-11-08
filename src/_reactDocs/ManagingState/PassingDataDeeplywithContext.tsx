import {FC, ReactNode, useId, useMemo} from 'react';

import {LevelContext, useLevelContext, HeadingProvider, useHeading} from "@/hooks";
import {TLevel} from "@/models-view";

import './index.scss'


//#region components
export const SectionsContextPage: FC = () => {
  return (
    <HeadingProvider>
      <Section>
        <Heading>Title</Heading>
        <Section>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Section>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </HeadingProvider>
  );
};

export const Section: FC<SectionProps> = ({level, children}) => {
  const currentLevel = useLevelContext();
  level ??= currentLevel;

  const limitedLevel = Math.min(level + 1, 6) as TLevel;

  return (
    <section className="section">
      <LevelContext value={limitedLevel}>
        {children}
      </LevelContext>
    </section>
  );
};


export const Heading: FC<HeadingProps> = ({children}) => {
  const level = useLevelContext();
  const id = useId();
  const heading = useHeading(id, level);

  const isSelected = id === heading?.currentHeader?.id;

  if (isSelected) {
    console.log(heading?.currentHeader);
    //todo заненсти classNames и реализовать через стили выделение выбранного header
  }

  const header = useMemo(() => {
    switch (level) {
      case 1:
        return <h1 onClick={(e) => heading?.setSelectedHeading()}>{children}</h1>;
      case 2:
        return <h2 onClick={(e) => heading?.setSelectedHeading()}>{children}</h2>;
      case 3:
        return <h3 onClick={(e) => heading?.setSelectedHeading()}>{children}</h3>;
      case 4:
        return <h4 onClick={(e) => heading?.setSelectedHeading()}>{children}</h4>;
      case 5:
        return <h5 onClick={(e) => heading?.setSelectedHeading()}>{children}</h5>;
      case 6:
        return <h6 onClick={(e) => heading?.setSelectedHeading()}>{children}</h6>;
      default:
        throw Error('Unknown level: ' + level);
    }
  }, [level]);

  return <>
    {header}
  </>
};
//#endregion

//#region types
interface SectionProps {
  level?: TLevel;
  children: ReactNode;
}

interface HeadingProps {
  children: ReactNode;
}


//#endregion
