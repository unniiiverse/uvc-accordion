import React from 'react';
import { Accordion, AccordionButton, AccordionHeading, AccordionItem, AccordionPannel } from './components/Accordion';

const Example: React.FC = () => {
  return (
    <div className="Home">
      <Accordion>
        <AccordionItem>
          <AccordionHeading>
            <AccordionButton>
              <p>Open me</p>
            </AccordionButton>
          </AccordionHeading>

          <AccordionPannel>
            <p>blah-blah</p>
          </AccordionPannel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeading>
            <AccordionButton>
              <p>Open me 2</p>
            </AccordionButton>
          </AccordionHeading>

          <AccordionPannel>
            <p>blah-blah 2</p>
          </AccordionPannel>
        </AccordionItem>
      </Accordion>

      {/* <Accordion>
        <AccordionItem>
          <AccordionHeading>
            <AccordionButton>
              <p>Open me 3</p>
            </AccordionButton>
          </AccordionHeading>

          <AccordionPannel>
            <p>blah-blah 3</p>
          </AccordionPannel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeading>
            <AccordionButton>
              <p>Open me 4</p>
            </AccordionButton>
          </AccordionHeading>

          <AccordionPannel>
            <p>blah-blah 4</p>
          </AccordionPannel>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};

export default Example;