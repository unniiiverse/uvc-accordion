# Accordion UVC
Simple react accordion component

## Usage
```tsx
import React from 'react';
import { Accordion, AccordionButton, AccordionHeading, AccordionItem, AccordionPannel } from 'uvc-accordion';
import 'uvc-accordion/style.css' // Simple styles that adds transition & visibility

const Example: React.FC = () => {
  return (
    <div className="Home">
    {/* Accordion wrapper */}
      <Accordion>

      {/* Accordion item */}
        <AccordionItem>

        {/* Accordion tab */}
          <AccordionHeading>

          {/* Accordion trigger bytton */}
            <AccordionButton>
              <p>Trigger</p>
            </AccordionButton>
          </AccordionHeading>

          {/* Accordion content */}
          <AccordionPannel>
            <p>Content</p>
          </AccordionPannel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeading>
            <AccordionButton>
              <p>Trigger 2</p>
            </AccordionButton>
          </AccordionHeading>

          <AccordionPannel>
            <p>Content 2</p>
          </AccordionPannel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
```

## Get it now
```
npm i uvc-accordion 
```

unniiiverse 2024