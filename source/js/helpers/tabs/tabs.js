const active = 'active';
const tabs = document.querySelector(".tabs");
const tabButton = document.querySelectorAll(".tabs__link");
const contents = document.querySelectorAll(".tabs__content");

function tab () {
  tabs.onclick = e => {
    const id = e.target.dataset.id;
    if (id) {
      tabButton.forEach(btn => {
        btn.classList.remove(active);
      });
      e.target.classList.add(active);

      contents.forEach(content => {
        content.classList.remove(active);
      });
      const element = document.getElementById(id);
      element.classList.add(active);
    }
  }
}

module.exports = {tab};
