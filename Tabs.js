export class Tabs {
  #tabs;
  #content;
  #hashes;
  #data;
  #tabId;

  constructor() {
    this.#tabs = document.querySelector(".tabs");
    if (!this.#tabs) {
      throw new Error("Tabs element are bot exist in DOM");
    }

    this.#content = this.#tabs.querySelector(".tabs__content");
    if (!this.#content) {
      throw new Error("Content element are not exist in Tabs");
    }

    this.#hashes = new Map([
      ["#Tab_1", "tab1"],
      ["#Tab_2", "tab2"],
      ["#Tab_3", "tab3"],
    ]);

    this.#data = new Map([
      [
        "tab1",
        {
          url: "#Tab_1",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates provident, laboriosam voluptas alias amet architecto quasi neque delectus beatae corrupti sed illum labore natus officiis deleniti nulla quia, praesentium cupiditate!",
        },
      ],
      [
        "tab2",
        {
          url: "#Tab_2",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut rem labore quae unde amet tempora cupiditate velit omnis quis beatae. Perspiciatis cupiditate fuga in dolor earum, quos ipsum debitis ut.",
        },
      ],
      [
        "tab3",
        {
          url: "#Tab_3",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis totam ipsam eveniet ratione nostrum odio repudiandae impedit suscipit consequuntur? Nam fuga laboriosam tempore sit accusantium perferendis error similique ducimus praesentium!",
        },
      ],
    ]);
    this.#tabId = this.#hashes.get(window.location.hash);

    if (this.#tabId) {
      this.#update(this.#tabId);
    }

    this.#tabs.addEventListener("click", this.#onTabClick);
  }

  #onTabClick = (event) => {
    if (!event.target.id) {
      return;
    }
    this.#update(event.target.id);
  };

  #update = (tabId) => {
    const currentTab = this.#tabs.querySelector(".tabs__tab_active");

    if (currentTab.id !== tabId) {
      currentTab.classList.remove("tabs__tab_active");
    }

    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add("tabs__tab_active");

    const entry = this.#data.get(tabId);

    if (entry !== undefined) {
      history.pushState(null, "", entry.url);

      this.#content.innerHTML = entry.content;
    }
  };
}
