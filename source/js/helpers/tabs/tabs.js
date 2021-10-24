const active = 'active';

const DOM = {
  tabs: document.querySelector(".tabs"),
  tabButton: tabs.querySelectorAll(".tabs__tab"),
  contents: tabs.querySelectorAll(".tabs__content")
}


const tabs = () => {
  DOM.tabButton.array.forEach(el => {
    if(el.classList.contents(active)){
      el.classList.remove(active);
    } else {
      el.classList.add(active);
    }
  });

  DOM.contents.array.forEach(el => {
    if(el.classList.contents(active)){
      el.classList.remove(active);
    } else {
      el.classList.add(active);
    }
  });
}

module.exports = tabs;
