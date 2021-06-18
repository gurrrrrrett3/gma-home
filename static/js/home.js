function checkUpdate() {

var cookies = document.cookie.split("; ")

if (cookies.find(row => row.startsWith("update=")).split("=")[1])

document.cookie = "update= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

document.getElementById("update-alert").style.display = "block"


document.getElementById("update-time").innerText = Date.now() - parseInt(cookies.find(row => row.startsWith("start=")).split("=")[1])
}
