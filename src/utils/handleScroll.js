export default function handleScroll({ navigationType, pathname }) {
  if (navigationType === "trigger") {
    window.scrollTo(0, 0);
  } else {
    const storageKey = `@@scroll|${pathname}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    window.scrollTo(...JSON.parse(savedPosition));
  }
}
