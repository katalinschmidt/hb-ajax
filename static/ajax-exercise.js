'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // Get fortune. Execute successFunction when fortune received:
  $.get('/fortune', (res) => {
    // Update text at #fortune-text div:
    $('#fortune-text').html(res);
  })
}

$('#get-fortune-button').on('click', showFortune);



// PART 2: SHOW WEATHER

function showWeather(evt) {
  // Prevent entire JSON string from being printed:
  evt.preventDefault();

  const url = '/weather.json';
  const formData = {zipcode: $('#zipcode-field').val()};

  // Get weather of provided zipcode:
  $.get(url, formData, (res) => {
    // Update text at #weather-info div with forecast:
    $('#weather-info').html(res.forecast);
  })
}

$('#weather-form').on('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  // Prevent entire JSON string from being printed:
  evt.preventDefault();

  // Get input from the form. Server.py form.get() now pulls from here (not HTML) so variable names must match:
  const formData = {qty: $('#qty-field').val(), melon_type: $('#melon-type-field').val()};

  // Send formData to func order_melons() - server.py - to get JSON dict with code & msg:
  $.post('/order-melons.json', formData, (res) => {
    // Key into JSON dict & update text at #order-status div with msg: 
    $('#order-status').html(res.msg);
    // If the result code is ERROR, show the result in red:
    if (res.code === "ERROR"){
      $('#order-status').addClass('order-error');
    }
  })
}

$('#order-form').on('submit', orderMelons);
