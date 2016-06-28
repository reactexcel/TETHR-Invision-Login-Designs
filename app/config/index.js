var DeviceInfo = require('react-native-device-info');


export const CONFIG = {
	api_url: 'http://144.76.34.244:8080/magento/1.9/web/index.php/excellence/mobile/api/',
	app_id : DeviceInfo.getBundleId()
};