import { notification } from 'ant-design-vue';
const util={
  openNotification: (msg,type='error')=> {
    notification.open({
      type:type,
      message: msg,
      duration:1.5
    });
  }
};

export default util;