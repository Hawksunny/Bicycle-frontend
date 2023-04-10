import * as types from "./mutaion-types";

const actions = {
  [types.DELAYINCRE](context, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // context.state.count = payload.param;
        context.commit({
          type: types.INCREMENT,
          param: payload.param,
        });
        resolve("状态修改成功！");
      }, 1000);
    });
  },
};

export default actions;
