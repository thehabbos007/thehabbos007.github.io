var num = [0,0,0,0,0,0];
function beginCalc(times){
	var nu = [0,0,0,0,0,0];
	while( times > 0 ){
		dice = Math.floor(Math.random() * 6) + 1;
		switch(dice){
			case 1:
				nu[0]++;
				break;
			case 2:
				nu[1]++;
				break;
			case 3:
				nu[2]++;
				break;
			case 4:
				nu[3]++;
				break;
			case 5:
				nu[4]++;
				break;
			case 6:
				nu[5]++;
				break;
		}
		times--;
	}
	num = nu;
	return num;
}

var kk;
function kast (a) {
	var kk = 0;
	for (var i = a; i >= a; i--) {
		kk += beginCalc(1);
	};

	return kk;
}