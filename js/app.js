
function showNewSearch(){
  $('.back-container').delay(2000).show('slide', { direction: "right" }, 500);
}

function newSearchEvent(){
  $('input[type="text"]').val('');
  $('html, body').animate(
    {
      scrollTop: 0
    },1300, function(){$('.back-container').hide()});
}

/* Función que toma el valor del campo de texto y crea una petición Ajax con las variables de autenticación de la API
    y el nombre ingresado; al recibir respuesta invoca la función appendHTML y envía la respuesta como parámetro. */
function submitAction(event){
  event.preventDefault();
  var valorBuscado = $('input[type="text"]').val();
  var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0e09546ebe0ee48298dbea11a0936b42&hash=286da862b199d8afd85824bdae9cbe95";
  $.get(url, {name: valorBuscado}, function(response){
    appendHTML(response);
  })
}

/* Función appendHTML que recibe la respuesta de la API como parámetro*/
function appendHTML(response){
  $('.nombre').text(response.data.results[0].name);
  $('#descripcion').text(response.data.results[0].description);
  $('#image').attr('src', response.data.results[0].thumbnail.path+"."+response.data.results[0].thumbnail.extension);
  $.each(response.data.results[0].comics.items, function(index, value){
    $('#comics').append(`<li><a href="#">${value.name}</a></li>`);
  })
  $.each(response.data.results[0].series.items, function(index, value){
    $('#series').append(`<li><a href="#">${value.name}</a></li>`);
  })
  $.each(response.data.results[0].stories.items, function(index, value){
    $('#stories').append(`<li><a href="#">${value.name}</a></li>`);
  })
  $.each(response.data.results[0].events.items, function(index, value){
    $('#events').append(`<li><a href="#">${value.name}</a></li>`);
  })

/*-- ANIMACIÓN PROPIA DE LA VISTA, NO MODIFICAR --*/
  $('html, body').animate(
    {
      scrollTop: $("#page2").offset().top
    },1300, showNewSearch);
/*-- ------------------------------------------ --*/
}

/* FUNCIÓN DOCUMENT.READY */
$(function(){
  $(window).scrollTop(0)
  $('input[type="text"]').val('');
  $('.character-form').submit(submitAction);
  $('.back-container').click(newSearchEvent);
})
