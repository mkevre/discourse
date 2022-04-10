import Component from "@ember/component";
import layout from "discourse/templates/components/user-menu-wrapper";
import { bind } from "discourse-common/utils/decorators";

export default Component.extend({
  layout,
  // tagName: "",

  didInsertElement() {
    this._super(...arguments);
    document.addEventListener("click", this._outsideClickHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener("click", this._outsideClickHandler);
  },

  @bind
  _outsideClickHandler(e) {
    if (this.isDestroyed || this.isDestroying || this.closed) {
      return;
    }
    if (!this.element.contains(e.target)) {
      // this.set("closed", true);
      const event = new Event("discourse-header:close-user-menu");
      document.dispatchEvent(event);
    }
  },
});
