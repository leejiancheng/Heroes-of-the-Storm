const superagent = require("superagent");
const request = require("request");
const cheerio = require("cheerio");
const async = require("async");
const fs = require("fs");


const url = "http://nos.netease.com/blzapp/cms/hosapp/heroes_data.json";
const dir = `heros`


console.log("开始抓取爬虫。。。");

superagent
	.get(url)
	.end(function(err, res) {
		if (err) {
			return console.error(err);
		}

		let text = JSON.parse(res.text);
		let lists = text.heroes_list;

		downloadImage(lists)

	})


function downloadImage(lists) {
	lists.forEach((value, index) => {
		let name = value.cnName;

		let icon = `${name}.jpg`;
		let img = `${name}.png`;
		let share = `${name}.png`;
		let stand = `${name}.png`;
		
		console.log(`正在抓取${name}的图片`);

		request(value.icon).pipe(fs.createWriteStream(`./${dir}/icon/${icon}`));
		request(value.img).pipe(fs.createWriteStream(`./${dir}/img/${img}`));
		request(value.shareBackground).pipe(fs.createWriteStream(`./${dir}/share/${share}`));
		request(value.standings).pipe(fs.createWriteStream(`./${dir}/stand/${stand}`));

		console.log(`${name}的图片已经抓取成功`);
	})
}