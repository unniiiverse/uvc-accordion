import React, { useEffect, useState, createContext, useContext } from 'react';
import { generateID } from './handlers';

import '../styles/accordion.scss';

interface IAccordionProps {
  children: React.ReactElement | React.ReactElement[],
  className?: string,
}

interface IContext {
  accordion: string,
  items: IContextItem[],
  setItems: (props: IContextItem[]) => void
}

interface IContextItem {
  item: string,
  button: string | null,
  pannel: string | null,
  active: boolean
}

const Context = createContext<IContext | null>(null);

export const Accordion: React.FC<IAccordionProps> = ({ children, className }) => {
  const [id] = useState(generateID());
  const [accItems, setAccItems] = useState<IContextItem[]>([]);

  return (
    <Context.Provider value={{
      accordion: id,
      items: accItems,
      setItems: setAccItems
    }}>
      <ul className={`uvc-accordion ${className ? className : ''}`} id={`uvc-acc-${id}`}>
        {children}
      </ul>
    </Context.Provider>
  );
};



interface IAccordionItemProps {
  children: React.ReactElement | React.ReactElement[],
  className?: string,
  blah?: string
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({ children, className }) => {
  const [itemId] = useState(generateID());
  const ctx = useContext(Context);

  useEffect(() => {
    if (ctx?.items.some(el => el.item === itemId)) return;

    ctx?.setItems([...ctx.items, {
      item: itemId,
      button: null,
      pannel: null,
      active: false
    }]);
  }, [ctx?.items]);

  return (
    <li className={`uvc-accordion-item ${className ? className : ''}`} id={`uvc-acc-i-${itemId}`}>
      {children}
    </li>
  );
};



interface IAccordionHeadingProps {
  children: React.ReactElement | React.ReactElement[],
  className?: string
}

export const AccordionHeading: React.FC<IAccordionHeadingProps> = ({ children, className }) => {
  const [headingId] = useState(generateID());

  return (
    <div className={`uvc-accordion-heading ${className ? className : ''}`} id={`uvc-acc-h-${headingId}`}>
      {children}
    </div>
  );
};



interface IAccordionButtonProps {
  children: React.ReactElement | React.ReactElement[],
  className?: string
}

export const AccordionButton: React.FC<IAccordionButtonProps> = ({ children, className }) => {
  const [buttonId] = useState(generateID());
  const [item, setItem] = useState<IContextItem>();

  const ctx = useContext(Context);

  useEffect(() => {
    const self = document.querySelector(`#uvc-acc-b-${buttonId}`)!;
    const item = self.closest('.uvc-accordion-item');
    const itemId = item?.getAttribute('id')?.replace('uvc-acc-i-', '');

    const ctxItem = ctx?.items.find(el => el.item === item?.getAttribute('id')?.replace('uvc-acc-i-', ''));

    setItem(ctxItem);

    if (!ctxItem || ctxItem.button !== null) return;

    ctxItem.button = buttonId;
    ctx?.setItems([...ctx.items.filter(el => el.item !== itemId), ctxItem]);
  }, [ctx?.items]);

  function toggle() {
    item!.active = !item!.active;
    ctx!.setItems([...ctx!.items.filter(el => el.item !== item!.item), item!]);
    setItem(item);
  }

  return (
    <button className={`uvc-accordion-button ${className ? className : ''} ${item?.active ? 'uvc-accordion-button--active' : ''}`} id={`uvc-acc-b-${buttonId}`} tabIndex={0} aria-controls={`uvc-acc-p-${item?.pannel}`} onClick={() => toggle()}>
      {children}
    </button>
  );
};



interface IAccordionPannelProps {
  children: React.ReactElement | React.ReactElement[],
  className?: string
}

export const AccordionPannel: React.FC<IAccordionPannelProps> = ({ children, className }) => {
  const [pannelId] = useState(generateID());
  const [item, setItem] = useState<IContextItem>();

  const ctx = useContext(Context);

  useEffect(() => {
    const self = document.querySelector(`#uvc-acc-p-${pannelId}`)!;
    const item = self.closest('.uvc-accordion-item');
    const itemId = item?.getAttribute('id')?.replace('uvc-acc-i-', '');

    const ctxItem = ctx?.items.find(el => el.item === itemId);

    setItem(ctxItem);

    if (!ctxItem || ctxItem.pannel !== null) return;

    //* Init
    ctxItem.pannel = pannelId;
    ctx?.setItems([...ctx.items.filter(el => el.item !== itemId), ctxItem]);
  }, [ctx?.items]);

  useEffect(() => {
    const self = document.querySelector(`#uvc-acc-p-${pannelId}`)!;

    if (item?.active) {
      const selfPaddings = JSON.parse(self.getAttribute('data-uvc-acc-py')!) as { top: string, bottom: string }

      self.setAttribute('aria-hidden', 'false');
      self.setAttribute('style', `max-height: ${self.scrollHeight + +selfPaddings.top + +selfPaddings.bottom}`)
    } else {
      if (!self.getAttribute('data-uvc-acc-py')) {
        self.setAttribute('data-uvc-acc-py', JSON.stringify({ top: window.getComputedStyle(self).paddingTop.replace('px', ''), bottom: window.getComputedStyle(self).paddingBottom.replace('px', '') }));
      }

      self.setAttribute('aria-hidden', 'true')
      self.setAttribute('style', 'padding-top: 0; padding-bottom: 0; max-height: 0');
    }
  }, [ctx?.items])

  return (
    <div className={`uvc-accordion-pannel px-[24px] py-[16px] bg-slate-600 ${className ? className : ''} ${item?.active ? 'uvc-accordion-pannel--active' : ''}`} id={`uvc-acc-p-${pannelId}`} role='region' tabIndex={0} aria-hidden={!item?.active} aria-labelledby={`uvc-acc-b-${item?.button}`}>
      {children}
    </div>
  );
};