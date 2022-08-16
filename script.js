const button = document.getElementById("button");
button.addEventListener("click", sendLocation);
const message = document.getElementById("message");
const distance = document.getElementById("distance");
function sendLocation() {
  message.innerHTML = "Loading ...";
  if (!navigator.geolocation) {
    alert("Not supported");
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}
async function onSuccess(position) {
  console.log(
    "lat : " +
      position.coords.latitude +
      "\nlong : " +
      position.coords.longitude
  );
  const res = await axios.get(
    `https://attendencegdsc.herokuapp.com/give_attendence/7003149748/${position.coords.latitude}/${position.coords.longitude}`
  );
  console.log(res.data);
  if (res.data.error) {
    message.innerHTML = res.data.error || res.data.message;
    distance.innerHTML = parseFloat(res.data.distance).toFixed(2) + "m";
  } else {
    message.innerHTML = "In range";
    distance.innerHTML =
      "lat : " +
      position.coords.latitude +
      "\nlong : " +
      position.coords.longitude;
  }
}
function onError(err) {
  console.log("error : ", err);
}
