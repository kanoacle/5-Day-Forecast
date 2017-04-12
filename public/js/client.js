/*jshint esversion: 6*/
const dataReq = (source, element, func) => {
  const dReq = new XMLHttpRequest();

  dReq.addEventListener(`load`, function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    func(source, data, element);
  });
  dReq.open(`GET`, source);
  dReq.send();
};

const showWeather = (source, data, element) => {
  const content = document.querySelector(`#content`);
  const city = document.createElement(`h2`);
  const skies = document.createElement(`p`);
  const temp = document.createElement(`p`);
  const wind = document.createElement(`p`);
  city.innerHTML = data.city.name;
  skies.innerHTML = `Weather: ${data.list[0].weather[0].description}`;
  temp.innerHTML = `Temperature: ${kelvinToFarenheight(data.list[0].main.temp)}˚F
    (high: ${kelvinToFarenheight(data.list[0].main.temp_max)}˚F,
    low: ${kelvinToFarenheight(data.list[0].main.temp_min)}˚F)`;
  wind.innerHTML = `Wind: ${Math.floor(2.23694 * (data.list[0].wind.speed))} mph ${direction(data.list[0].wind.deg)}`;
  content.appendChild(city);
  content.appendChild(skies);
  content.appendChild(temp);
  content.appendChild(wind);
};

const kelvinToFarenheight = (K) => {
  let F = Math.floor((K - 273) * 1.8 + 32);
  return F;
};

const direction = (num) => {
  let dir;
  if (num === 0) {
    dir = 'N';
  } else if(num > 0 && num < 30) {
    dir = 'NNE';
  } else if(num >= 30 && num < 60) {
    dir = 'NE';
  } else if(num >= 60 && num < 90) {
    dir = 'ENE';
  } else if(num === 90) {
    dir = 'E';
  } else if(num > 90 && num < 120) {
    dir = 'ESE';
  } else if(num >= 120 && num < 150) {
    dir = 'SE';
  } else if(num >= 150 && num < 180) {
    dir = 'SSE';
  } else if(num === 180) {
    dir = 'S';
  } else if(num > 180 && num < 210) {
    dir = 'SSW';
  } else if(num >= 210 && num < 240) {
    dir = 'SW';
  } else if(num >= 240 && num < 270) {
    dir = 'WSW';
  } else if(num === 270) {
    dir = 'W';
  } else if(num > 270 && num < 300) {
    dir = 'WNW';
  } else if(num >= 300 && num < 330) {
    dir = 'NW';
  } else if(num >= 330 && num < 360) {
    dir = 'NNW';
  } else if(num === 360) {
    dir = 'N';
  }
  return dir;
};

const reset = () => {
  const input = document.querySelector('#input').value;
  const content = document.querySelector(`#content`);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};

const btn = document.querySelector(`#get`);
btn.onmousedown = () => {
  btn.style.backgroundColor = `#333`;
  btn.style.color = `#DDD`;
};
btn.onmouseup = () => {
  btn.style.backgroundColor = `white`;
  btn.style.color = `#333`;
};
btn.onclick = () => {
  const input = document.querySelector(`#input`).value;
  const content = document.querySelector(`#content`);
  input.value = '';
  reset();
  dataReq(`http://api.openweathermap.org/data/2.5/forecast?q=${input},us&appid=${API_KEY}`, content, showWeather);
};