function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}
function setWithExpiry(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}
function min(data) {
  var result = []
  data.forEach((item) => {
  delete item.repo.id;
  delete item.repo.url;
  delete item.id;
  delete item.actor;
  delete item.payload;
  delete item.public;
  delete item.type;
  item.owner = item.repo.name.split("/")[0]
  item.repo = item.repo.name.split("/")[1]
  item.date = item.created_at.replace("Z","").split("T")
  delete item.created_at
  result.push(item)
  });
  result = [result[0],result[1],result[2],result[3]]
  return result
}
function desc(item) {
  if (item.repo == 'blooket.js') {
    return ["Blooket.JS is a terminal client for the quiz service Blooket", "img/favicon.ico.png"]
  }
  else {
    return ["NULL","NULL"]
  }
}
function card(Recent, index, data) {
  Recent[1].innerHTML = data[index].repo
  Recent[2].innerHTML = desc(data[index])[0]
  Recent[3].src = desc(data[index])[1]
}
window.onload = async function() {
  if (localStorage.request == null) {
    const octokit = new Octokit();
    var { data } = await octokit.request({
      url: "https://api.github.com/users/RedYetiDev/events"
    })
    data = min(data)
    setWithExpiry("request",data,"600000")
    console.log("New Token Set")
}
  var data = getWithExpiry("request")
  console.log(data)
  var RecentA = Array.from($("[data-recent=0]"))
  var RecentB = Array.from($("[data-recent=1]"))
  var RecentC = Array.from($("[data-recent=2]"))
  var RecentD = Array.from($("[data-recent=3]"))
  card(RecentA, 0, data)
  card(RecentB, 1, data)
  card(RecentC, 2, data)
  card(RecentD, 3, data)
}
