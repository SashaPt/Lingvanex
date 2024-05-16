const changeActive = (elem, elems, activeClass) => {
  if (elem && elems.length) {
    if (elem.classList.contains(`${activeClass}`)) return;
    elems.forEach((el) => {
      el.classList.remove(`${activeClass}`);
    });
    elem.classList.add(`${activeClass}`);
  }
};

const reorderCards = (cards, activeDataInfo) => {
  const prevActiveDataInfo = [...cards]
    .filter((card) => card.classList.contains('front'))
    .map((card) => card.dataset.info)[0];

  const prevClass = [...cards]
    .filter((card) => card.dataset.info === activeDataInfo)
    .map((card) => (card.classList.contains('middle') ? 'middle' : 'back'))[0];

  cards.forEach((card) => {
    if (card.dataset.info === activeDataInfo) {
      changeActive(card, cards, 'front');
      card.classList.remove(prevClass);
    } else if (card.dataset.info === prevActiveDataInfo) {
      card.classList.add(prevClass);
    }
  });
};

const changeCards = () => {
  const btns = document.querySelectorAll('.for-who__btns .btn');
  const cards = document.querySelectorAll('.for-who__card');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      changeActive(btn, btns, 'active');
      const dataInfo = btn.dataset.info;
      reorderCards(cards, dataInfo);
    });
  });
};

const onLoad = () => {
  changeCards();
};

window.addEventListener('DOMContentLoaded', onLoad);
