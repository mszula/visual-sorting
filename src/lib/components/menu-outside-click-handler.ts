export const handleMenuOutsideClick =
  (ref: HTMLElement, datasetElement: string) => () => {
    const close = (e: Event) => {
      if (
        e !== null &&
        e.target instanceof HTMLElement &&
        e.target.dataset &&
        e.target.dataset[datasetElement] === undefined
      ) {
        document.body.removeEventListener('click', close);
        ref.removeAttribute('open');
      }
    };
    document.body.addEventListener('click', close);
  };
