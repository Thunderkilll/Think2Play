var configDefault = {
	     playOption : "twoplayers",
		 playDifficultyLevel : "Easy",
		 playEasyLevel: true,
		 playMediumLevel : false,
		 playHardLevel: false
 };
 
 
 function getConfig() {
	 var config = localStorage.getItem('configPref');
	 if (config) {
		 return JSON.parse(config);
	 } else {
		 return configDefault;
	 }
 }
 
 function saveConfig(config) {
    var dataToStore = JSON.stringify(config);
    localStorage.setItem('configPref', dataToStore);
 }