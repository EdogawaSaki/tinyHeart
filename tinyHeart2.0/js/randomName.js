var names = [
	"缥缈","羽裳","轩辕","韶华","浮光","烟雨","蝶舞","星月",
	"绝恋","碧影","星愿","落霞","忘忧","幻真","翩飞","惊鸿",
	"化羽","绝影","醉梦","波澜","山岚","春华","星雨","浩瀚",
	"风萧","浮波","逐风","沧澜","鸿鹄","如梦","入画","青衣",
	"流影","舒荷","清曲","醉月","风和","瑞雪","舞纱","夜渺",
	"无微","晨阳","佳容","宛碧","纹香","梵音","静晓","润玉",
	"嬛绵","明秀","归云","春媱","夏露","秋颜","冬耀","涟漪",
	"若溪","微凉","暖阳","半夏","崖悔","洛尘","矜柔","绚烂",
	"真淳","明媚","迷离","隐忍","灼热","幻灭","落拓","锦瑟",
	"邪殇","离殇","恋夏","白绾","虞兮","故黎","青辞","未央" 
]
function randomName(){
	var randomNumber = Math.floor(Math.random() * (names.length));
	document.getElementById('newName').value = names[randomNumber];
	/*console.log(names[randomNumber]);*/
}

