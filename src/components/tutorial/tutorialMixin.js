import loadXmlToBlock from "./loadXmlToBlock";

export const tutorialMixin = {
  props: {
    xmlArrayObj: Object
  },
  methods: {
    loadBlocks(id) {
      loadXmlToBlock(this.xmlArrayObj[id]);
    }
  }
};
